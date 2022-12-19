"use client";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { FormEvent, useRef, useState } from "react";
import { ZodError, ZodIssue } from "zod";
import signUpSchema from "../../../schemas/SignUpSchema";
import { useRouter } from "next/navigation";

type InputErrors = {
  [key: string]: string;
};

export default function SignUpPanel() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
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

      signUpSchema.parse(data);

      const response = await fetch("/api/auth/signup", {
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

  const checkPasswords = () => {
    // If any of the fields is not filled
    if (!passwordRef.current?.value || !confirmPasswordRef.current?.value)
      return;

    if (confirmPasswordRef.current.value !== passwordRef.current.value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...{
          confirmPassword: "Passwords do not match",
        },
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-md w-[90%]">
      <h1 className="text-center mb-2 text-2xl font-semibold">Join the team</h1>
      <section className="dark:border-slate-700 border-1 p-4 rounded-lg grid gap-2">
        <form className="grid gap-4" ref={formRef} onSubmit={handleSubmit}>
          <div className="grid">
            <label htmlFor="name" className="dark:text-slate-400 text-sm ml-3">
              Name
            </label>
            <input
              name="name"
              id="name"
              className="auth-input"
              required
              aria-errormessage="nameError"
            />
            <span
              id="nameError"
              data-visible={!!errors.name}
              className="form--error"
            >
              {errors.name}
            </span>
          </div>
          <div className="grid">
            <label htmlFor="email" className="dark:text-slate-400 text-sm ml-3">
              Email
            </label>
            <input
              name="email"
              id="email"
              className="auth-input"
              type="email"
              required
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
                ref={passwordRef}
                name="password"
                id="password"
                className="auth-input	w-full"
                required
                minLength={8}
                type={passType}
                aria-errormessage="passwordError"
                onChange={checkPasswords}
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
            <span
              id="passwordError"
              data-visible={!!errors.password}
              className="form--error"
            >
              {errors.password}
            </span>
          </div>
          <div className="grid">
            <label
              htmlFor="confirmPassword"
              className="dark:text-slate-400 text-sm ml-3"
            >
              Confirm password
            </label>
            <input
              ref={confirmPasswordRef}
              name="confirmPassword"
              id="confirmPassword"
              className="auth-input w-full"
              required
              type={passType}
              onChange={checkPasswords}
              aria-errormessage="confirmPasswordError"
            />
            <span
              id="confirmPasswordError"
              data-visible={!!errors.confirmPassword}
              className="form--error"
            >
              {errors.confirmPassword}
            </span>
          </div>
          <button
            type="submit"
            title="Submit sign up form"
            className="blue-button"
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              "Sign up"
            )}
          </button>
          <span data-visible={!!errors.generalError} className="form--error">
            {errors.generalError}
          </span>
        </form>
      </section>
    </div>
  );
}
