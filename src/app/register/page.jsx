"use client";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const Register = () => {
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.photo.value;

        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            image,
        }, {
            onRequest: () => {
            },
            onSuccess: () => {
                toast.success("Registration Successful!");
                router.push("/login");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
            },
        });
    };

    const handleGoogleLogin = () => {
        toast.info("Connecting to Google...");
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4 py-12">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="form-control">
                            <label className="label font-semibold">Name</label>
                            <input name="name" type="text" placeholder="Your Name" className="input input-bordered focus:border-warning" required />
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold">Email</label>
                            <input name="email" type="email" placeholder="email@example.com" className="input input-bordered focus:border-warning" required />
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold">Photo URL</label>
                            <input name="photo" type="url" placeholder="https://image-link.com" className="input input-bordered focus:border-warning" required />
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold">Password</label>
                            <input name="password" type="password" placeholder="••••••••" className="input input-bordered focus:border-warning" required />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-warning w-full">Register</button>
                        </div>
                    </form>

                    <div className="divider">OR</div>

                    <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center gap-2">
                        <FaGoogle className="text-red-500" /> Continue with Google
                    </button>

                    <p className="text-center mt-6 text-sm">
                        Already have an account? <Link href="/login" className="text-orange-600 font-bold hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;