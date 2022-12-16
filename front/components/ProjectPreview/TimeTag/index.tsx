import { FiClock } from "react-icons/fi";

type Props = {
  deadline: string;
};

const TimeTag: React.FC<Props> = ({ deadline }) => {
  const deadlineTime = new Date(deadline).getTime();
  const timeLeft = Number(
    (
      (deadlineTime - new Date().getTime()) / (1000 * 60 * 60 * 24) +
      1
    ).toFixed()
  );

  if (timeLeft < 0)
    return (
      <div
        className="flex flex-nowrap items-center w-fit text-[0.5rem] gap-1 p-1
			rounded-lg text-violet-900 dark:text-violet-200 bg-violet-500 bg-opacity-20"
      >
        <FiClock /> <span>Past deadline</span>
      </div>
    );

  return (
    <div
      className={`flex flex-nowrap items-center w-fit text-[0.5rem] gap-1 p-1 rounded-lg ${
        timeLeft <= 3
          ? "text-red-900 dark:text-red-200 bg-red-500 bg-opacity-20"
          : timeLeft <= 14
          ? "text-amber-900 dark:text-amber-200 bg-amber-500 bg-opacity-20"
          : "text-green-900 dark:text-green-200 bg-green-500 bg-opacity-20"
      }`}
    >
      <FiClock />{" "}
      <span>
        {timeLeft} day{timeLeft !== 1 && "s"} left
      </span>
    </div>
  );
};

export default TimeTag;
