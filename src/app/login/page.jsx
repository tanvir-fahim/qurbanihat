"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await authClient.signIn.email({
      email,
      password,
    }, {
      onSuccess: () => {
        toast.success("Welcome back!");
        router.push("/");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Fieldset Legend */}
            <fieldset className="border border-gray-300 rounded-lg px-3 pb-2">
              <legend className="text-xs font-bold text-orange-600 px-2 ml-2 uppercase">
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

            {/* Password Fieldset Legend */}
            <fieldset className="border border-gray-300 rounded-lg px-3 pb-2 relative">
              <legend className="text-xs font-bold text-orange-600 px-2 ml-2 uppercase">
                Secret Password
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

            <button type="submit" className="btn btn-warning w-full shadow-md hover:scale-[1.02] transition-transform">
              Access Account
            </button>
          </form>

          <div className="divider">OR</div>

          <button 
            type="button"
            onClick={() => authClient.signIn.social({ provider: 'google', callbackURL: '/' })}
            className="btn btn-outline w-full flex items-center gap-2"
          >
            <FaGoogle className="text-red-500" /> Login with Google
          </button>

          <p className="text-center mt-6 text-sm">
            Don&apos;t have an account? <Link href="/register" className="text-orange-600 font-bold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;