"use client";
import { useId } from "react";

const ProgressBar = ({
  value,
  ...rest
}: React.HTMLProps<HTMLProgressElement>) => {
  const id = useId();

  return (
    <div className="grid">
      <label
        className="text-end font-roboto text-xs dark:text-slate-400"
        htmlFor={id}
      >
        {value}%
      </label>
      <progress
        value={value}
        id={id}
        className="h-1 w-full rounded-full overflow-hidden"
        max={100}
        {...rest}
      />
    </div>
  );
};

export default ProgressBar;
