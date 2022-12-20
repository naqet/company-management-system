import ProjectPreview from "../../components/ProjectPreview";
import { getProjects } from "../../prisma/repositories/Project";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="grid p-4 align-top w-full h-fit gap-4">
      <h1 className="text-2xl">
        Hi James,{" "}
        <span className="font-roboto font-normal text-base dark:text-slate-400">
          here are your current projects
        </span>
      </h1>
      <div className="border-1 dark:border-slate-800 p-4 rounded-lg w-full grid gap-4 @container">
        <h2 className="font-semibold dark:text-slate-400">Projects</h2>
        <ul className="flex flex-wrap gap-4 @lg:grid @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="w-full @lg:row-span-1 @lg:col-span-1 grid"
            >
              <ProjectPreview project={project} />
            </li>
          ))}
          {/* TODO: handle adding new project */}
        </ul>
      </div>
    </main>
  );
}
