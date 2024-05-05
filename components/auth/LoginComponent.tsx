"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/store/authStore";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormValues) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      await login(userData);
      router.push("/");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-black">
      <h1 className="text-2xl font-bold">Login</h1>
      <div className="mt-4 w-[300px] border border-bgray-300 p-5 bg-white rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full mt-5">
          <label htmlFor="email" className="mb-[5px] font-bold text-left">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-[5px] border-2 border-gray-300 rounded-md  focus:border-green-500 hover:border-green-600 outline-none"
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
              className="w-full p-[5px] border-2 border-gray-300 rounded-md  focus:border-green-500 hover:border-green-600 outline-none"
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
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full p-[5px] mt-4 bg-green-500 text-white rounded-md hover:bg-green-600">
            Login
          </button>
          <p className="mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-green-500 hover:text-green-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
