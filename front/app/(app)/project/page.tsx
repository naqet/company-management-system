export default function ProjectPage() {
  return (
    <main className="grid w-full place-items-center h-[calc(100vh-90px)] lg:h-auto">
      <div className="grid justify-center gap-4">
        <h1 className="text-2xl">No projects found</h1>
        <button type="button" className="blue-button" title="Add new project">
          Add new project
        </button>
      </div>
    </main>
  );
}
