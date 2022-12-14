import Avatar from "../Avatar";
import NotificationsBell from "../NotificationsBell";
import SearchPanel from "../SearchPanel";
import MenuButton from "./MenuButton";

export default function Header() {
  return (
    <header className="sticky top-0 dark:bg-slate-900 p-4 flex items-center justify-between border-b-1 dark:border-slate-800">
      <MenuButton />

      {/* TODO: Add Logo*/}
      <div className="hidden lg:block w-10 h-10 bg-red-300" />

      <div className="flex items-center gap-4">
        <SearchPanel />
        <NotificationsBell />
        <Avatar />
      </div>
    </header>
  );
}
