"use client";
import Link from 'next/link';
import Image from 'next/image';
import { FaPaw } from 'react-icons/fa';

import { authClient, useSession } from "@/lib/auth-client"; // Real Auth Client
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session, isPending } = useSession(); 
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const navLinks = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/animals">All Animals</Link></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 font-medium">
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <FaPaw className="text-orange-600" />
          <span>Qurbani<span className="text-orange-600">Hat</span></span>
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 font-medium gap-2">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end">
        {isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : session ? (
          /* --- LOGGED IN VIEW --- */
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border">
                <Image
                  src={session.user.image || "https://via.placeholder.com/40"}
                  alt="profile"
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
              <li className="px-4 py-2 font-bold text-orange-600 border-b">
                {session.user.name}
              </li>
              <li><Link href="/my-profile">My Profile</Link></li>
              <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
            </ul>
          </div>
        ) : (
          /* --- LOGGED OUT VIEW --- */
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm hidden sm:flex">Login</Link>
            <Link href="/register" className="btn btn-warning btn-sm">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;