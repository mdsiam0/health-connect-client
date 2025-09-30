import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import SocialLogin from "../components/SocialLogin";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    toast.loading("Logging in...");
    signIn(data.email, data.password)
      .then((result) => {
        toast.dismiss();
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Login to MCMS</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" {...register("email", { required: "Email is required" })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" placeholder="Enter your email" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" {...register("password", { required: "Password is required" })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300" placeholder="Enter your password" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Login</button>
      </form>

      <SocialLogin />

      <p className="text-sm text-center mt-4">
        Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </p>
    </div>
  );
};

export default Login;
