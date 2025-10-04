import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    toast.loading("Signing in with Google...");
    signInWithGoogle()
      .then((result) => {
        toast.dismiss();
        toast.success("Logged in successfully!");
        console.log(result.user);

        
        navigate("/");
      })
      .catch((error) => {
        toast.dismiss();
        console.error(error);
        toast.error(error.message);
      });
  };

  return (
    <div className='mt-3 text-center'> 
      <button 
        onClick={handleGoogleSignIn} 
        className="btn btn-outline btn-google w-full"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
