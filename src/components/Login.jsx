import React from "react";
import { BiWinkTongue } from "react-icons/bi";
import { FcPhone } from "react-icons/fc";
import bgVideo from "../assets/bg.mp4";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={bgVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            {/* <img src={logo} alt="" width="260px" /> */}
            <div className="shadow-2xl">
              <button
                type="button"
                className="bg-cyan-500 hover:bg-cyan-600 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              >
                <BiWinkTongue className="mr-4" /> 进入交流会
              </button>
            </div>
            <div className="shadow-2xl mt-6">
              <button
                type="button"
                className="bg-cyan-500 hover:bg-indigo-500 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              >
                <FcPhone className="mr-4" /> 申请交流卡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
