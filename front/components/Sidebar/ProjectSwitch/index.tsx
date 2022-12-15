"use client";

import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export default function ProjectSwitch() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        title="Choose project"
        className="text-lg lg:text-sm flex gap-2 justify-between items-center w-full font-extrabold text-hover dark:text-slate-600"
        onClick={() => setIsOpen((prevOpen) => !prevOpen)}
      >
        PROJECTS {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {/* TODO: add proper project changing logic with isOpen state */}
    </div>
  );
}
