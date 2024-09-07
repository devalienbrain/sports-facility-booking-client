// const FeaturedItems = () => {
//   return (
//     <>
//       <div className="text-center">
//         <h1 className="text-5xl font-black text-center mb-8">Featured Facilities</h1>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {/* 1 */}
//         <div className="card glass">
//           <figure>
//             <img
//               src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//               alt="car!"
//             />
//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">Life hack</h2>
//             <p>How to park your car at your garage?</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-primary">Learn now!</button>
//             </div>
//           </div>
//         </div>
//         {/* 2 */}
//         <div className="card glass">
//           <figure>
//             <img
//               src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//               alt="car!"
//             />
//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">Life hack</h2>
//             <p>How to park your car at your garage?</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-primary">Learn now!</button>
//             </div>
//           </div>
//         </div>
//         {/* 3 */}
//         <div className="card glass">
//           <figure>
//             <img
//               src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//               alt="car!"
//             />
//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">Life hack</h2>
//             <p>How to park your car at your garage?</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-primary">Learn now!</button>
//             </div>
//           </div>
//         </div>
//         {/* 4 */}
//         <div className="card glass">
//           <figure>
//             <img
//               src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//               alt="car!"
//             />
//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">Life hack</h2>
//             <p>How to park your car at your garage?</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-primary">Learn now!</button>
//             </div>
//           </div>
//         </div>
//         {/* 5 */}
//         <div className="card glass">
//           <figure>
//             <img
//               src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//               alt="car!"
//             />
//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">Life hack</h2>
//             <p>How to park your car at your garage?</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-primary">Learn now!</button>
//             </div>
//           </div>
//         </div>
//         {/* 6 */}
//         <div className="card glass">
//           <figure>
//             <img
//               src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//               alt="car!"
//             />
//           </figure>
//           <div className="card-body">
//             <h2 className="card-title">Life hack</h2>
//             <p>How to park your car at your garage?</p>
//             <div className="card-actions justify-end">
//               <button className="btn btn-primary">Learn now!</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FeaturedItems;

import { useGetFacilitiesQuery } from "@/redux/api";
import React from "react";

const FeaturedItems: React.FC = () => {
  // Fetch facilities using the RTK Query hook
  const { data, isLoading, error } = useGetFacilitiesQuery("");
  const facilities = data?.data || [];

  // Optionally, filter for featured facilities (you can adjust the filtering logic)
  // const featuredFacilities = facilities.filter(
  //   (facility: any) => facility.isFeatured
  // );
  const featuredFacilities = facilities;
  return (
    <div className="text-center">
      <h1 className="text-5xl font-black text-center mb-8">
        Featured Facilities
      </h1>

      {/* Show loading, error, or featured facilities */}
      {isLoading ? (
        <p>Loading featured facilities...</p>
      ) : error ? (
        <p>Failed to load facilities.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredFacilities.map((facility: any) => (
            <div key={facility._id} className="card glass">
              <figure>
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-64 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{facility.name}</h2>
                <p>{facility.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Learn more!</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedItems;
