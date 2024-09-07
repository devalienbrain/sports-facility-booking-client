// src/components/Login.tsx
import { useLoginUserMutation } from "../redux/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/userSlice";
import { useAppDispatch } from "../redux/hook";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password }).unwrap();
      if (response.success) {
        const data = response.data;
        const token = response.token;
        console.log({ data });
        console.log({ token });
        localStorage.setItem("accessToken", response.token);
        dispatch(setUser(response.data)); // Store user in Redux
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-20">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-lg"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="text-center mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Forgot password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Sportly. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
