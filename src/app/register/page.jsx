"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.photo.value;

    await authClient.signUp.email({
      email,
      password,
      name,
      image,
    }, {
      onSuccess: () => {
        toast.success("Account Created! Please login.");
        router.push("/login");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Join QurbaniHat</h2>

          <form onSubmit={handleRegister} className="space-y-5">
            
            <fieldset className="border border-gray-300 rounded-lg px-3 pb-1">
              <legend className="text-xs font-bold text-orange-600 px-2 ml-2 uppercase tracking-wide">
                Full Name
              </legend>
              <input 
                name="name" 
                type="text" 
                placeholder="Enter your name" 
                className="input w-full border-none focus:outline-none focus:ring-0 h-10 bg-transparent" 
                required 
              />
            </fieldset>

            <fieldset className="border border-gray-300 rounded-lg px-3 pb-1">
              <legend className="text-xs font-bold text-orange-600 px-2 ml-2 uppercase tracking-wide">
                Email Address
              </legend>
              <input 
                name="email" 
                type="email" 
                placeholder="example@mail.com" 
                className="input w-full border-none focus:outline-none focus:ring-0 h-10 bg-transparent" 
                required 
              />
            </fieldset>

            <fieldset className="border border-gray-300 rounded-lg px-3 pb-1">
              <legend className="text-xs font-bold text-orange-600 px-2 ml-2 uppercase tracking-wide">
                Photo URL
              </legend>
              <input 
                name="photo" 
                type="url" 
                placeholder="https://image-link.com" 
                className="input w-full border-none focus:outline-none focus:ring-0 h-10 bg-transparent" 
                required 
              />
            </fieldset>

            <fieldset className="border border-gray-300 rounded-lg px-3 pb-1 relative">
              <legend className="text-xs font-bold text-orange-600 px-2 ml-2 uppercase tracking-wide">
                Set Password
              </legend>
              <div className="flex items-center">
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="input w-full border-none focus:outline-none focus:ring-0 h-10 bg-transparent pr-10" 
                  required 
                />
                <button 
                  type="button"
                  className="absolute right-4 top-3 text-gray-500 hover:text-orange-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </fieldset>

            <button type="submit" className="btn btn-warning w-full shadow-md mt-4">
              Create Account
            </button>
          </form>

          <div className="divider">OR</div>

          <button 
            type="button"
            onClick={() => authClient.signIn.social({ provider: 'google', callbackURL: '/' })}
            className="btn btn-outline w-full flex items-center gap-2"
          >
            <FaGoogle className="text-red-500" /> Sign up with Google
          </button>

          <p className="text-center mt-6 text-sm">
            Already a member? <Link href="/login" className="text-orange-600 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;