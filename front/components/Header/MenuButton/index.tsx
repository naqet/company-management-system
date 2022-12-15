"use client";
import { BiMenuAltLeft } from "react-icons/bi";

export default function MenuButton() {
  // TODO: Add sidebar logic

  const handleMenuOpen = () => {
    const sidebar = document.querySelector("#js-sidebar");

    if (!sidebar || !(sidebar instanceof HTMLElement)) return;

    sidebar.setAttribute(
      "data-expanded",
      sidebar.dataset.expanded === "true" ? "false" : "true"
    );
  };

  return (
    <button
      type="button"
      title="Sidebar menu"
      className="lg:hidden text-4xl text-hover"
      onClick={handleMenuOpen}
    >
      <BiMenuAltLeft />
    </button>
  );
}
