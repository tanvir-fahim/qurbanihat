"use client";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  const { data, error } = await authClient.signIn.email({
    email,
    password,
  }, {
    onSuccess: () => {
      toast.success("Welcome back to QurbaniHat!");
      router.push("/");
    },
    onError: (ctx) => {
      toast.error(ctx.error.message || "Invalid credentials");
    },
  });
};

const handleGoogleLogin = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login to QurbaniHat</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold">Email</label>
              <input type="email" placeholder="email@example.com" className="input input-bordered focus:border-warning" required />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Password</label>
              <input type="password" placeholder="••••••••" className="input input-bordered focus:border-warning" required />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-warning w-full">Login</button>
            </div>
          </form>

          <div className="divider">OR</div>

          <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center gap-2">
            <FaGoogle className="text-red-500" /> Login with Google
          </button>

          <p className="text-center mt-6 text-sm">
            New here? <Link href="/register" className="text-orange-600 font-bold hover:underline">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;