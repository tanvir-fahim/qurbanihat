"use client";
import Link from 'next/link';
import Image from 'next/image';
import { FaPaw } from 'react-icons/fa';

import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';

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
            <GiHamburgerMenu />
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
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-500">Welcome back,</p>
              <p className="text-sm font-bold text-orange-600">{session.user.name}</p>
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-blue-200">
                <div className="w-10 rounded-full border-2 border-blue-200 aspect-square overflow-hidden">
                  <Image
                    src={session.user.image || "https://i.ibb.co.dev/placeholder.png"}
                    alt="profile"
                    width={40}
                    height={40}
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                    }}
                  />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-xl bg-base-100 rounded-box w-52 border right-0 origin-top-right">
                <li className="px-4 py-3 bg-orange-50 rounded-t-lg">
                  <span className="block text-xs font-semibold text-gray-400">LOGGED IN AS</span>
                  <span className="block text-sm font-bold text-orange-600 truncate">{session.user.email}</span>
                </li>
                <div className="divider my-0"></div>
                <li><Link href="/my-profile" className="py-3">My Profile</Link></li>
                <li><button onClick={handleLogout} className="text-red-500 py-3 font-semibold">Logout</button></li>
              </ul>
            </div>
          </div>
        ) : (
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