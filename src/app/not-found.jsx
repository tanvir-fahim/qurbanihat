"use client";
import Link from "next/link";
import Lottie from "lottie-react";

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-100 px-4">
            <div className="w-full max-w-lg">
                <Lottie
                    animationData={require("../../public/lottieNotFound.json")}
                    loop={true}
                />
            </div>

            <div className="text-center -mt-10">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                    Oops! Page Not Found
                </h1>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed,
                    or is temporarily unavailable.
                </p>

                <Link href="/" className="btn btn-warning gap-2 px-8">
                    Take Me Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;