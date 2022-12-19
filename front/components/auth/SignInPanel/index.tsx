"use client";
import { FiGithub, FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";

export default function SignInPanel() {
  const [passType, setPassType] = useState<"text" | "password">("password");

  const handlePasswordType = (): void => {
    setPassType((prev) => (prev === "text" ? "password" : "text"));
  };

  return (
    <div className="max-w-md w-[90%]">
      <h1 className="text-center mb-2 text-2xl font-semibold">Welcome back</h1>
      <section className="dark:border-slate-700 border-1 p-4 rounded-lg grid gap-2">
        <ul className="flex gap-4 justify-center mx-auto text-3xl md:text-xl">
          <li>
            <button
              type="button"
              className="p-2 rounded-lg dark:bg-slate-800 text-hover border-hover"
              title="Sign in with GitHub"
            >
              <FiGithub />
            </button>
          </li>
          <li>
            <button
              type="button"
              className="p-2 rounded-lg dark:bg-slate-800 text-hover border-hover"
              title="Sign in with Google"
            >
              <AiOutlineGoogle />
            </button>
          </li>
        </ul>
        <p className="text-center dark:text-slate-400">or</p>
        <form className="grid gap-4">
          <div className="grid">
            <label htmlFor="email" className="dark:text-slate-400 text-sm ml-3">
              Email
            </label>
            <input
              name="email"
              id="email"
              className="auth-input"
              required
              type="email"
            />
          </div>
          <div className="grid">
            <label
              htmlFor="password"
              className="dark:text-slate-400 text-sm ml-3"
            >
              Password
            </label>
            <div className="flex gap-2">
              <input
                name="password"
                id="password"
                className="auth-input w-full"
                required
                type={passType}
              />
              <button
                type="button"
                title="Show password"
                className="border-hover p-2 dark:bg-slate-800 rounded-lg"
                onClick={handlePasswordType}
              >
                {passType === "password" ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            title="Submit sign in form"
            className="blue-button"
          >
            Sign in
          </button>
        </form>
        <ul className="text-xs flex justify-between w-full px-3 dark:text-slate-400">
          <li>
            <Link href="remindPassword" className="text-hover" tabIndex={0}>
              Remind password
            </Link>
          </li>
          <li>
            <Link href="signup" className="text-hover" tabIndex={0}>
              Sign up
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
