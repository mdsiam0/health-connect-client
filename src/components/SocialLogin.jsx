import React from 'react';
import useAuth from '../hooks/useAuth';

const SocialLogin = () => {
    const {signInWithGoogle} = useAuth();
    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result =>{
            console.log(result.user)
        })
        .catch(error =>{
            console.error(error);
        })
    }
    return (
        <div className='mt-3 text-center '> 
            <button onClick={handleGoogleSignIn} className="btn btn-outline btn-google w-full">

                Continue with Google
      </button>
           
        </div>
    );
};

export default SocialLogin;