import React from "react";

const LoginBanner = () => {
  return (
    <div
      className="w-[600px] relative bg-cover bg-center hidden md:block z-10"
      style={{
        backgroundImage: `url('https://nanu.cc/NANU-Brand-Loader.jpg')`,
      }}
    >
      <div className="absolute top-10 left-10">
        <h1 className="text-l text-white mb-2 font-primary">
          최대 보안. 최대 편리함.
        </h1>
        <img
          src="https://nanu.cc/NANU_Brand_Logo/NANU_ID_FULL_XS.svg"
          alt="NAMU Logo"
          className="w-40"
        />
      </div>

      <div className="absolute bottom-10 left-10 text-left">
        <span className="text-white block mb-1 font-primary">Advanced Security By</span>
        <img
          src="/supporters_crowdstrike.png"
          alt="Crowdstrike"
          className="w-[200px] h-auto"
        />
      </div>
    </div>
  );
};

export default LoginBanner;
