import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import MainMenu from "./MainMenu";
import ProjectSwitch from "./ProjectSwitch";
import SmallProjectInfo from "./ProjectSwitch/SmallProjectInfo";
import ThemeSwitch from "./ThemeSwitch";

export default function Sidebar() {
  return (
    <aside
      id="js-sidebar"
      data-expanded="false"
      className="absolute p-4 lg:relative -translate-x-full lg:translate-x-0 lg:opacity-100 opacity-0 data-[expanded=true]:translate-x-0 data-[expanded=true]:opacity-100 h-[calc(100%-73px)] lg:h-[calc(100vh-73px)] dark:bg-slate-900 w-full max-w-md lg:w-64 transition-all md:border-r-1 dark:border-slate-800 flex flex-col"
    >
      <ProjectSwitch />
      <SmallProjectInfo />
      <hr className="dark:border-slate-600 border-t-1 mt-5 mb-16" />
      <MainMenu />
      <ul className="w-full flex justify-around mt-auto">
        <li>
          <Link
            title="Log out"
            href="/logout"
            className="border-hover text-hover rounded-lg text-2xl block py-2 px-8 dark:bg-slate-800 "
            tabIndex={0}
          >
            <FiLogOut />
          </Link>
        </li>
        <li>
          <ThemeSwitch />
        </li>
      </ul>
    </aside>
  );
}
