import KanbanViewSettings from "../../../../components/KanbanViewSettings";

export default function ProjectPage({
  params,
}: {
  params: { projectId: number };
}) {
  return (
    <main className="p-4 grid w-full">
      <div className="flex justify-between items-center h-fit">
        <h1 className="text-2xl">Project</h1>
        <KanbanViewSettings />
      </div>
    </main>
  );
}
