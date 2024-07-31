import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import Error from "./Error";
import { loginAPI } from "@/app/api/userApi";
import { ClipLoader } from "react-spinners";

export interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export interface setToggleType {
  handleToggle: () => void;
}
const Login: React.FC<setToggleType> = ({ handleToggle }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setErrors({});
    setIsLoading(true);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      let res = await loginAPI(formData);
      if (res) {
        setIsLoading(false);
        localStorage.setItem("token", res);
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: Errors = {};
        error.inner.forEach((err) => {
          newErrors[err.path as keyof Errors] = err.message;
        });
        setIsLoading(false);
        setErrors(newErrors);
      } else {
        console.error("Unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center body-bg">
      <div className="w-[640px] h-max flex flex-col justify-around items-center border rounded-[8px] bg-white gap-y-7 py-7">
        <p className="font-semibold text-[48px] text-center">
          Welcome to <span className="text-[#4534AC]">Workflo</span> !
        </p>
        <div className="w-[520px] h-max flex flex-col justify-center gap-[15px]">
          <div className="relative">
            <input
              name="email"
              className="p-[14px_10px] border rounded-[8px] bg-[#EBEBEB] w-full"
              type="email"
              placeholder="Enter your Email"
              onChange={handleInputChange}
              value={formData.email}
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
              value={formData.password}
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
            onClick={handleLogin}
          >
            {isLoading ? <ClipLoader size={10} color="#36d7b7" /> : "Login"}
          </button>
        </div>
        <p className="text-[20px] font-normal text-[#606060]">
          Don’t have an account? Create a{" "}
          <span
            className="cursor-pointer text-[#0054A1]"
            onClick={() => handleToggle()}
          >
            new account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
