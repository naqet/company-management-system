import ProgressBar from "../../../shared/ProgressBar";

export default function SmallProjectInfo() {
  return (
    <div className="my-2">
      <h2 className="flex gap-4 items-center text-xl lg:text-base">
        <span className="w-10 h-10 bg-red-400 rounded-lg" /> Project Name
      </h2>
      <ProgressBar value={33} />
    </div>
  );
}
