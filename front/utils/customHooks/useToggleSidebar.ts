import { useCallback } from "react";

const useToggleSidebar = (closeOnly: boolean = false) => {
  const toggleSidebar = useCallback(() => {
    if (typeof document === "undefined") return;

    const sidebar = document.querySelector("#js-sidebar");

    if (!sidebar || !(sidebar instanceof HTMLElement)) return;

    sidebar.setAttribute(
      "data-expanded",
      closeOnly
        ? "false"
        : sidebar.dataset.expanded === "true"
        ? "false"
        : "true"
    );

    document.documentElement.style.overflow =
      sidebar.dataset.expanded === "true" ? "hidden" : "scroll";
  }, []);

  return toggleSidebar;
};

export default useToggleSidebar;
