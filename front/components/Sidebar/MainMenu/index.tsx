"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  FiCheckSquare,
  FiGrid,
  FiMessageCircle,
  FiSettings,
} from "react-icons/fi";
import useToggleSidebar from "../../../utils/customHooks/useToggleSidebar";

type Path = {
  icon: JSX.Element;
  url: string;
  label?: string;
};

const paths: Path[] = [
  { icon: <FiGrid />, url: "/", label: "dashboard" },
  { icon: <FiCheckSquare />, url: "project" },
  { icon: <FiMessageCircle />, url: "messages" },
  { icon: <FiSettings />, url: "settings" },
];

export default function MainMenu() {
  const currentSegment = useSelectedLayoutSegment();
  const toggleSidebar = useToggleSidebar(true);

  return (
    <nav>
      <ul className="grid gap-6">
        {paths.map((path) => (
          <li key={path.url} className="capitalize">
            <Link
              href={path.url}
              className="flex items-center dark:data-[active=true]:text-slate-200 data-[active=true]:before:bg-current before:w-1 before:h-6 before:rounded-full before:left-0 before:absolute text-hover before:transition-colors"
              data-active={
                currentSegment === path.url ||
                (path.url === "/" && currentSegment === null)
              }
              tabIndex={0}
              onClick={toggleSidebar}
            >
              <span className="text-2xl mr-5">{path.icon}</span>{" "}
              {path.label ?? path.url}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
