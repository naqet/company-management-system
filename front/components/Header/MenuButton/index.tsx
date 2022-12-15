"use client";
import { BiMenuAltLeft } from "react-icons/bi";
import useToggleSidebar from "../../../utils/customHooks/useToggleSidebar";

export default function MenuButton() {
  const toggleSidebar = useToggleSidebar();

  return (
    <button
      type="button"
      title="Sidebar menu"
      className="lg:hidden text-4xl text-hover"
      onClick={toggleSidebar}
    >
      <BiMenuAltLeft />
    </button>
  );
}
