import { cookies } from "next/headers";
import LoginPanel from "../../../components/auth/LoginPanel";

export default function LoginPage() {
  const nextCookies = cookies();
  const signupSuccess = nextCookies.has("signup-success");
  return (
    <>
      {signupSuccess && (
        <div className="text-green-900 dark:text-green-200 bg-green-500 bg-opacity-20 absolute top-4 p-2 rounded-lg animate-hide animation-delay-[5000]">
          Account created
        </div>
      )}
      <LoginPanel />
    </>
  );
}
