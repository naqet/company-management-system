"use client";

import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeSwitch() {
  const [lightMode, setLightMode] = useState(false);

  return (
    <button
      type="button"
      className="border-hover text-hover rounded-lg text-2xl block py-3 px-5 dark:bg-slate-800 "
      onClick={() => setLightMode((prevState) => !prevState)}
    >
      {lightMode ? <FiMoon /> : <FiSun />}
    </button>
  );
}
