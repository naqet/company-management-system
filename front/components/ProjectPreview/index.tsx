"use client";

import Link from "next/link";
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
    <Link
      href={`project/${project.id}`}
      tabIndex={0}
      className="rounded-lg dark:bg-gray-800 dark:bg-opacity-30 dark:hover:bg-opacity-40 dark:focus-visible:bg-opacity-40 transition-colors p-4 grid gap-1 w-full"
    >
      <div className="grid grid-cols-[1fr_2rem] gap-1 grid-rows-1 items-center">
        <h3 className="font-semibold text-ellipsis overflow-hidden w-full whitespace-nowrap">
          {project.name}
        </h3>
        <button
          type="button"
          title="Project action buttons"
          className="text-3xl justify-self-end text-hover"
          onClick={(e) => {
            // This prevents router to act, as this button is inside a Link
            e.preventDefault();
          }}
        >
          {/* TODO: add menu logic */}
          <BiDotsHorizontal />
        </button>
      </div>
      <h4 className="font-roboto text-sm opacity-80">{project.client}</h4>
      <TimeTag deadline={project.deadline} />
      <ProgressBar value={project.completionPercentage} />
    </Link>
  );
};

export default ProjectPreview;
