"use client";

export default function RemindPasswordPanel() {
  return (
    <div className="max-w-md w-[90%]">
      <h1 className="text-center mb-2 text-2xl font-semibold">Join the team</h1>
      <section className="dark:border-slate-700 border-1 p-4 rounded-lg grid gap-2">
        <form className="grid gap-4">
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
