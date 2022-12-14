"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RemindPasswordPanel() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    //TODO: Add remind password logic
    setFormSubmitted(true);
  };

  if (formSubmitted)
    return (
      <div className="max-w-md w-[90%] grid gap-2">
        <h1 className="text-center text-2xl font-semibold">Form submitted</h1>
        <p className="text-center font-roboto">
          If account with this email exists, message will be sent.
        </p>
        <Link href="/" className="blue-button" tabIndex={0}>
          Go back home
        </Link>
      </div>
    );

  return (
    <div className="max-w-md w-[90%]">
      <h1 className="text-center mb-2 text-2xl font-semibold">No worries</h1>
      <section className="dark:border-slate-700 border-1 p-4 rounded-lg grid gap-2">
        <form className="grid gap-4" onSubmit={handleSubmit}>
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
            />
          </div>
          <button
            type="submit"
            title="Submit remind password form"
            className="blue-button"
          >
            Remind password
          </button>
        </form>
      </section>
    </div>
  );
}
