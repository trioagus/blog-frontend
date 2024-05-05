"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/store/authStore";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormValues) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      await registerUser(userData);
      router.push("/login");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-black">
      <h1 className="text-2xl font-bold">Register</h1>
      <div className="mt-4 w-[300px] border border-bgray-300 p-5 bg-white rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-5">
          <label htmlFor="username" className="mb-[5px] font-bold text-left">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full p-[5px] border-2 border-gray-300 rounded-md  focus:border-blue-500 hover:border-blue-600 outline-none"
            autoComplete="username"
            placeholder="Your username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <label htmlFor="email" className="mb-[5px] font-bold text-left">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-[5px] border-2 border-gray-300 rounded-md  focus:border-blue-500 hover:border-blue-600 outline-none"
            autoComplete="email"
            placeholder="Your email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <label htmlFor="password" className="mb-[5px] font-bold text-left">
            Password
          </label>
          <div className="relative flex items-center w-full mt-2">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              className="w-full p-[5px] border-2 border-gray-300 rounded-md  focus:border-blue-500 hover:border-blue-600 outline-none"
              autoComplete="current-password"
              placeholder="********"
            />
            {showPassword ? (
              <FiEyeOff
                className="absolute right-2 text-gray-800 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEye
                className="absolute right-2 text-gray-800 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-md">
            Register
          </button>
          <p className="mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
