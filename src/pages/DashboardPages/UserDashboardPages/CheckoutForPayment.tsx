import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hook";
import { useCreteOrderMutation, useGetUserBookingsQuery } from "@/redux/api";

const CheckoutForPayment = () => {
  const [createOrder] = useCreteOrderMutation();
  const currentUser = useAppSelector((state) => state.user.user);

  // State for user input
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Set the currentUser into the user state when it changes
  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
      });
    }
  }, [currentUser]);

  const {
    data: bookings = [],
    error,
    isLoading,
  } = useGetUserBookingsQuery(currentUser._id);

  // Calculate total amount to pay
  const totalPayableAmount =
    bookings?.data?.reduce((total, item) => total + item.payableAmount, 0) || 0;

  // Handle input changes
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user,
      products: bookings?.map((item) => ({
        product: item?._id,
        quantity: item?.quantity,
      })),
    };
    try {
      const res = await createOrder(data).unwrap();
      if (res.success) {
        window.location.href = res.data.payment_url;
      } else {
        console.error("Order creation failed:", res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-8 border p-5 rounded">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-sm">
                  Product
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings?.data?.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-3 px-4">{item.facility.name}</td>
                  <td className="py-3 px-4">${item.payableAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Display total payable amount */}
        <div className="mb-8 text-right">
          <div className="flex justify-end items-center gap-5">
            <p className="text-lg font-bold text-red-600">
              Total Amount: ${totalPayableAmount}
            </p>
            <button
              type="submit"
              className="bg-slate-800 text-white font-semibold py-2 px-6 rounded-3xl hover:bg-green-700 transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForPayment;
