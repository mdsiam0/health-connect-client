// Register.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Save user in backend
  const saveUserToBackend = async (userData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const savedUser = await res.json();
      console.log("User saved in backend:", savedUser);
    } catch (err) {
      console.error("Failed to save user in backend:", err);
    }
  };

  // Email/password registration
  const onSubmit = (data) => {
    toast.loading("Creating account...");

    createUser(data.email, data.password)
      .then((result) => {
        // Update Firebase profile
        updateProfile(result.user, {
          displayName: data.name,
          photoURL: data.image
        })
        .then(async () => {
          // Save in backend
          const userData = {
            name: data.name,
            email: data.email,
            image: data.image,
            role: "participant" // default role
          };
          await saveUserToBackend(userData);

          toast.dismiss();
          toast.success("Account created successfully!");
          navigate("/");
        })
        .catch((err) => {
          toast.dismiss();
          toast.error("Failed to update profile");
          console.error(err);
        });
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  // Google login
  const handleGoogleLogin = () => {
    toast.loading("Signing in with Google...");
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;

        // Prepare user data
        const userData = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "participant"
        };

        // Save user in backend
        await saveUserToBackend(userData);

        toast.dismiss();
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
  };

  return (
    <div className="w-full max-w-md bg-base-200 shadow-lg rounded-lg p-6 mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      
      {/* Email/Password Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input input-bordered w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
        </div>

        <div>
          <label className="label">Profile Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            placeholder="Enter image URL"
            className="input input-bordered w-full"
          />
          {errors.image && <p className="text-red-500 text-sm">Profile image URL is required</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>

      {/* Divider */}
      <div className="divider">OR</div>

      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-google w-full"
      >
        Continue with Google
      </button>

      <p className="text-sm text-center mt-4">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Register;
