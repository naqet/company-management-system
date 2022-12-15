import { useCallback } from "react";

const useToggleSidebar = (closeOnly: boolean = false) => {
  const toggleSidebar = useCallback(() => {
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
  }, []);

  return toggleSidebar;
};

export default useToggleSidebar;
