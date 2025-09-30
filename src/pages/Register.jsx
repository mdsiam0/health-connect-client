import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import SocialLogin from "../components/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();

  const onSubmit = (data) => {
    const imageFile = data.image[0];
    console.log("Registration Data:", data);
    console.log("Selected Image File:", imageFile);
    createUser(data.email, data.password)
      .then(result => {
        console.log(result.user)
      })
      .catch(error => {
        console.error(error);
      })
  };

  return (
    <div className="w-full max-w-md bg-base-200 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true, minLength: 6 })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">Profile image is required</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
      <SocialLogin></SocialLogin>

      {/* Login Link */}
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
      
    </div>
  );
};

export default Register;
