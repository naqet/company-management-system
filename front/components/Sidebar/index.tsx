import MainMenu from "./MainMenu";
import ProjectSwitch from "./ProjectSwitch";
import SmallProjectInfo from "./ProjectSwitch/SmallProjectInfo";

export default function Sidebar() {
  return (
    <aside
      id="js-sidebar"
      data-expanded="false"
      className="absolute p-4 lg:relative -translate-x-full lg:translate-x-0 lg:opacity-100 opacity-0 data-[expanded=true]:translate-x-0 data-[expanded=true]:opacity-100 h-[calc(100%-73px)] lg:h-[calc(100vh-73px)] dark:bg-slate-900 w-full max-w-md lg:w-64 transition-all md:border-r-1 dark:border-slate-800"
    >
      <ProjectSwitch />
      <SmallProjectInfo />
      <hr className="dark:border-slate-600 border-t-1 mt-5 mb-16" />
      <MainMenu />
    </aside>
  );
}
