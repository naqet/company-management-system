"use client";
import { FiGithub, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import signInSchema from "../../../schemas/SignInSchema";
import { ZodError, ZodIssue } from "zod";
import { useRouter } from "next/navigation";

type InputErrors = {
  [key: string]: string;
};

export default function SignInPanel() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [passType, setPassType] = useState<"text" | "password">("password");
  const [errors, setErrors] = useState<InputErrors>({});
  const [loading, setLoading] = useState(false);

  const handlePasswordType = (): void => {
    setPassType((prev) => (prev === "text" ? "password" : "text"));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      event.preventDefault();
      if (!formRef.current) throw Error("Form not valid");
      setLoading(true);
      const data = Object.fromEntries(new FormData(formRef.current));

      signInSchema.parse(data);

      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // If it's a Bad Request, we need to handle errors
      if (response.status === 400) {
        const error = (await response.json()) as ZodIssue[];

        if (error && Array.isArray(error)) throw new ZodError(error);
        // If it's any other error, we handle it.
      } else if (400 < response.status && response.status < 600) {
        const errorText = await response.text();
        throw new Error(errorText ?? response.statusText);
      }

      // If redirect is happening, we need to handle it manually
      if (response.redirected) {
        router.push(response.url);
        return;
      }
    } catch (e) {
      setLoading(false);
      if (e instanceof ZodError) {
        setErrors(
          e.errors.reduce(
            (allErrors: InputErrors, currentError) => ({
              ...allErrors,
              ...{ [currentError.path[0]]: currentError.message },
            }),
            {}
          )
        );
      } else if (e instanceof Error) {
        setErrors({ generalError: e.message });
      }
    }
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
        <form className="grid gap-4" onSubmit={handleSubmit} ref={formRef}>
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
              aria-errormessage="emailError"
            />
            <span
              id="emailError"
              data-visible={!!errors.email}
              className="form--error"
            >
              {errors.email}
            </span>
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
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <ul
          className={`text-xs flex justify-between w-full px-3 dark:text-slate-400 ${
            loading && "pointer-events-none opacity-50"
          }`}
        >
          <li>
            <Link
              href="remindPassword"
              className="text-hover"
              tabIndex={loading ? undefined : 0}
            >
              Remind password
            </Link>
          </li>
          <li>
            <Link
              href="signup"
              className="text-hover"
              tabIndex={loading ? undefined : 0}
            >
              Sign up
            </Link>
          </li>
        </ul>
        <span data-visible={!!errors.generalError} className="form--error">
          {errors.generalError}
        </span>
      </section>
    </div>
  );
}
