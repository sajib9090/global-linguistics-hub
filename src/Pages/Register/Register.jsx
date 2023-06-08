import React, { useState } from "react";
import Lottie from "lottie-react";
import welcome from "../../../public/welcome.json";
import { Link } from "react-router-dom";
import googleLogo from "../../assets/google.png";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const validatePassword = (value) => {
    const password = value.trim();
    const confirmPassword = watch("confirmPassword").trim();

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return true;
  };
  return (
    <div className="grid md:grid-cols-2">
      <div className="">
        {" "}
        <Lottie
          className="w-[100%] h-[100%]"
          animationData={welcome}
          loop={true}
        ></Lottie>
      </div>
      <div className="flex flex-col justify-center bg-[#aacef5b3] bg-opacity-50 ">
        <div className="text-center mb-10">
          <h1 className="text-[35px] font-bold">Create Account Now</h1>
          <p className="text-[#727695] mt-4">
            Already signed up?{" "}
            <Link to="/login">
              <span className="text-[#007CFF] font-semibold mx-2">Login</span>
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
              type="text"
              placeholder="Enter your Full Name"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <input
              className="px-2 py-3 w-[100%] rounded-md outline-1 outline-[#007CFF]"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="relative">
            <input
              className="px-2 py-3 w-[100%] rounded-md outline-1 outline-[#007CFF]"
              type={visible ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: true,
                validate: validatePassword,
              })}
            />
            {errors.password?.type === "validate" && (
              <p className="text-red-500">Passwords do not match.</p>
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
          <div className="relative">
            <input
              className="px-2 py-3 w-[100%] rounded-md outline-1 outline-[#007CFF]"
              type={visible ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePassword,
              })}
            />
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
            <input
              className="px-2 py-3 w-[100%] rounded-md outline-1 outline-[#007CFF]"
              type="text"
              placeholder="Photo url"
              {...register("photo", { required: true })}
            />
          </div>
          <div>
            <input
              className="px-2 py-3 w-[100%] rounded-md bg-[#007CFF] text-white cursor-pointer"
              type="submit"
              value="Register"
            />
          </div>
          <div className="divider py-4">Or</div>
          <div>
            <button className="flex items-center border border-[#007CFF] hover:border-transparent rounded-md hover:bg-[#516c8984] btn-outline py-3 w-[50%] mx-auto justify-center duration-500">
              {" "}
              <img className="h-7 w-8 mr-2" src={googleLogo} alt="" /> Connect
              with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
