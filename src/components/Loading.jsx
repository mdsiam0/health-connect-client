import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/50">
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    );
};

export default Loading;