"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const MyProfile = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>;

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="card bg-base-100 shadow-xl border">
        <figure className="px-10 pt-10">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
              <Image 
                src={session.user.image || "https://via.placeholder.com/150"} 
                alt="Profile" 
                width={128} 
                height={128} 
              />
            </div>
          </div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl font-bold">{session.user.name}</h2>
          <p className="text-gray-500">{session.user.email}</p>
          
          <div className="card-actions mt-6">
            <Link href="/my-profile/update" className="btn btn-warning">
              Update Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;