import React from 'react';
import { Link } from 'react-router';
import logo from "../assets/logo.png";

const HealthConnectLogo = () => {
    return (
        <div>
            <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="MCMS Logo" className="h-8 w-8" />
            <span className="font-bold text-xl">HealthConnect</span>
          </Link>
        </div>
    );
};

export default HealthConnectLogo;