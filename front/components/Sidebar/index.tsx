import ProjectSwitch from "./ProjectSwitch";

export default function Sidebar() {
  return (
    <aside
      id="js-sidebar"
      data-expanded="false"
      className="absolute p-3 lg:relative -translate-x-full lg:translate-x-0 lg:opacity-100 opacity-0 data-[expanded=true]:translate-x-0 data-[expanded=true]:opacity-100 h-[calc(100%-65px)] lg:h-[calc(100vh-65px)] dark:bg-slate-800 w-full max-w-md lg:w-64 transition-all"
    >
      <ProjectSwitch />
    </aside>
  );
}
