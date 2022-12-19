import { redirect } from "next/navigation";
import "server-only";

// This route is for signout only. It doesn't show any content, just handles the logic.
export default function SignOutPage() {
  redirect("/signin");

  return <></>;
}
