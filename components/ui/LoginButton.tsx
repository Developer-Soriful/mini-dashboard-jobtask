"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 w-full justify-center px-3 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium transition-all"
        >
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ) : (
            <FaUserCircle className="w-6 h-6" />
          )}
          Profile
        </button>

        <button
          onClick={() => signOut()}
          className="w-full px-3 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="w-full flex  items-center justify-center gap-4  py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 font-medium transition-all"
    >
      <span>
        <FcGoogle size={20}/>
      </span>{" "}
      <span>Google Login</span>
    </button>
  );
}
