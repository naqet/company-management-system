"use client";

import { useState } from "react";
import { FiBarChart, FiList } from "react-icons/fi";

export default function KanbanViewSettings() {
  const [listView, setListView] = useState<boolean>(
    typeof document !== "undefined" &&
      !!document.documentElement
        .querySelector("#js-kanban-board")
        ?.getAttribute("data-list-view")
  );

  const handleViewChange = (viewName: "columns" | "list") => () => {
    if (typeof document === "undefined") return;

    switch (viewName) {
      case "columns":
        if (!listView) break;
        document
          .querySelector("#js-kanban-board")
          ?.removeAttribute("data-list-view");
        setListView(false);
        break;
      case "list":
        if (listView) break;
        document
          .querySelector("#js-kanban-board")
          ?.setAttribute("data-list-view", "true");

        setListView(true);
        break;
      default:
        break;
    }
  };
  return (
    <ul className="flex h-fit items-center">
      <li className="grid w-fit">
        <button
          type="button"
          title="Columns project view"
          onClick={handleViewChange("columns")}
          data-active={!listView}
          className="rounded-l-lg dark:bg-gray-700 dark:bg-opacity-30 dark:hover:bg-opacity-40 dark:focus-visible:bg-opacity-40 transition-colors grid place-items-center p-1 text-xl dark:data-[active=true]:bg-gray-700"
        >
          <FiBarChart className="rotate-180" />
        </button>
      </li>
      <li className="grid w-fit">
        <button
          type="button"
          title="List project view"
          onClick={handleViewChange("list")}
          data-active={listView}
          className="rounded-r-lg dark:bg-gray-700 dark:bg-opacity-30 dark:hover:bg-opacity-40 dark:focus-visible:bg-opacity-40 transition-colors grid place-items-center p-1 text-xl dark:data-[active=true]:bg-gray-700"
        >
          <FiList />
        </button>
      </li>
    </ul>
  );
}
