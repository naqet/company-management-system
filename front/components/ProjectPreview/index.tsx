import React from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import { Project } from "../../types/Project";
import ProgressBar from "../shared/ProgressBar";
import TimeTag from "./TimeTag";

type Props = {
  project: Project;
};

const ProjectPreview: React.FC<Props> = ({ project }) => {
  return (
    <div className="w-full rounded-lg dark:bg-gray-800 p-4 grid gap-1 dark:bg-opacity-30">
      <div className="grid grid-cols-[1fr_2rem] gap-1 grid-rows-1 items-center">
        <h3 className="font-semibold text-ellipsis overflow-hidden w-full whitespace-nowrap">
          {project.name}
        </h3>
        <button
          type="button"
          title="Project action buttons"
          className="text-3xl justify-self-end"
        >
          {/* TODO: add menu logic */}
          <BiDotsHorizontal />
        </button>
      </div>
      <h4 className="font-roboto text-sm opacity-80">{project.client}</h4>
      <TimeTag deadline={project.deadLine} />
      <ProgressBar value={project.completionPercentage} />
    </div>
  );
};

export default ProjectPreview;
