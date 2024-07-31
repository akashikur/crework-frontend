import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import Error from "./Error";
import { signinAPI } from "@/app/api/userApi";
import { ClipLoader } from "react-spinners";
import { setToggleType } from "./Login";

const Signin: React.FC<setToggleType> = ({ handleToggle }) => {
  const [formDate, setFormDate] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    setErrors({});
    setIsLoading(true);
    try {
      const schema = Yup.object().shape({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formDate, { abortEarly: false });
      let res = await signinAPI(formDate);
      if (res) {
        localStorage.setItem("token", res);
        router.push("/dashboard");
        setIsLoading(false);
      }
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        const newErrors: any = {};
        e.inner.forEach((err) => {
          newErrors[err.path as keyof Error] = err.message;
        });
        setIsLoading(false);
        setErrors(newErrors);
      }
    }
  };

  const router = useRouter();

  return (
    <div className="h-screen flex justify-center items-center body-bg">
      <div className="w-[640px] h-max flex flex-col gap-y-7 justify-around items-center border rounded-[8px] bg-white py-7">
        <p className="font-semibold text-[48px] text-center">
          Welcome to <span className="text-[#4534AC]">Workflo</span> !
        </p>
        <div className="w-[520px] h-max flex flex-col justify-center gap-[15px]">
          <div className="relative">
            <input
              name="fullName"
              className="p-[14px_10px] border rounded-[8px] bg-[#EBEBEB] w-full"
              type="text"
              placeholder="Enter your Full name"
              onChange={handleInputChange}
              value={formDate.fullName}
            />
          </div>
          {errors.fullName && <Error message={errors.fullName} />}
          <div className="relative">
            <input
              name="email"
              className="p-[14px_10px] border rounded-[8px] bg-[#EBEBEB] w-full"
              type="email"
              placeholder="Enter your Email"
              onChange={handleInputChange}
              value={formDate.email}
            />
          </div>
          {errors.email && <Error message={errors.email} />}

          <div className="relative">
            <input
              name="password"
              className="p-[14px_10px] border rounded-[8px] bg-[#EBEBEB] w-full"
              type="password"
              placeholder="Enter your password"
              onChange={handleInputChange}
              value={formDate.password}
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              <path
                d="M3 13C6.6 5 17.4 5 21 13"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {errors.password && <Error message={errors.password} />}
          <button
            className="p-[14px_10px] border rounded-[8px] text-white element"
            onClick={handleSignup}
          >
            {isLoading ? <ClipLoader size={10} color="#36d7b7" /> : "Signin"}
          </button>
        </div>
        <p className="text-[20px] font-normal text-[#606060]">
          Already have an account?
          <span
            className="cursor-pointer text-[#0054A1]"
            onClick={() => handleToggle}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
