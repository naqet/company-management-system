import { redirect } from "next/navigation";
import "server-only";

// This route is for logout only. It doesn't show any content, just handles logging out.
export default function LogoutPage() {
  redirect("/login");

  return <></>;
}
