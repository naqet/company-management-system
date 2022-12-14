export default function ProjectPage({
  params,
}: {
  params: { projectId: number };
}) {
  return <h1>{params.projectId}</h1>;
}
