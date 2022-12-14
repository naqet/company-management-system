"use client";
import { BiMenuAltLeft } from "react-icons/bi";

export default function MenuButton() {
  // TODO: Add sidebar logic

  return (
    <button
      type="button"
      title="Sidebar menu"
      className="lg:hidden text-3xl text-hover"
    >
      <BiMenuAltLeft />
    </button>
  );
}
