import React, { useState } from "react";
import Lottie from "lottie-react";
import securityShield from "../../../public/security.json";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../../assets/google.png";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/UseAuth";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Login = () => {
  const [visible, setVisible] = useState(false);

  const { loading, setLoading, googleSignIn, signIn } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        reset();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        toast.success("Login success");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="grid md:grid-cols-2">
      <div className="h-[90vh]">
        {" "}
        <Lottie
          className="w-[100%] h-[100%]"
          animationData={securityShield}
          loop={true}
        ></Lottie>
      </div>
      <div className="flex flex-col justify-center bg-[#aacef5b3] bg-opacity-50 ">
        <div className="text-center mb-10">
          <h1 className="text-[35px] font-bold">Welcome Back</h1>
          <p className="text-[#727695] mt-4">
            New to Global Linguistics Hub?{" "}
            <Link to="/register">
              <span className="text-[#007CFF] font-semibold mx-2">
                Register
              </span>
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 py-10 space-y-4"
        >
          <div>
            <input
              className="px-2 py-3 w-[100%] rounded-md outline-1 outline-[#007CFF]"
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>
          <div className="relative">
            <input
              className="px-2 py-3 w-[100%] rounded-md outline-1 outline-[#007CFF]"
              type={visible ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-600">Password is required</span>
            )}
            {visible ? (
              <AiOutlineEyeInvisible
                onClick={() => setVisible(!visible)}
                className="h-6 w-6 text-[#007CFF] absolute right-3 cursor-pointer top-3"
              />
            ) : (
              <AiFillEye
                onClick={() => setVisible(!visible)}
                className="h-6 w-6 text-[#007CFF] absolute right-3 cursor-pointer top-3"
              />
            )}
            {/*  */}
          </div>
          <div>
            <button
              className="px-2 py-3 w-[100%] rounded-md bg-[#007CFF] text-white cursor-pointer"
              type="submit"
              value="Login"
            >
              {loading ? (
                <AiOutlineLoading3Quarters
                  className="m-auto animate-spin"
                  size={24}
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="divider py-4">Or</div>
        </form>
        <div>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center border border-[#007CFF] hover:border-transparent rounded-md hover:bg-[#516c8984] btn-outline py-3 w-[50%] mx-auto justify-center duration-500"
          >
            {" "}
            <img className="h-7 w-8 mr-2" src={googleLogo} alt="" /> Connect
            with Google
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
