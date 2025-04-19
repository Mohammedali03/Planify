import { useState } from "react";
import Timer from "./Timer";
import Media from "./Media";
import Tasks from "./Tasks";
import Fortune from "./Fortune";
import {
  ClockIcon,
  PencilSquareIcon,
  PlayCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import ShowFeatures from "./ShowFeatures";

const RoomFeatures = ({ ref }) => {
  const [showTimer, setShowTimer] = useState(true);
  const [showMedia, setShowMedia] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showFortune, setShowFortune] = useState(false);

  return (
    <div className="w-fit p-[6px] rounded-md flex flex-col items-center ml-2 bg-[#fcfcfc]">
      <ShowFeatures
        condition={showTimer}
        onClick={() => setShowTimer(!showTimer)}
      >
        <button className="size-6 cursor-pointer">
          <ClockIcon />
        </button>
        <span className="text-xs hover:text-indigo-600">Timer</span>
      </ShowFeatures>

      <div
        className={`absolute duration-300 ${
          showTimer ? "opacity-100" : "opacity-0"
        }`}
      >
        <Timer ref={ref} setShowTimer={setShowTimer} />
      </div>

      <ShowFeatures
        condition={showMedia}
        onClick={() => setShowMedia(!showMedia)}
      >
        <button className="size-6 cursor-pointer">
          <PlayCircleIcon />
        </button>
        <span className="text-xs hover:text-indigo-600">Media</span>
      </ShowFeatures>
      <div
        className={`absolute duration-300 ${
          showMedia ? "opacity-100" : "opacity-0"
        }`}
      >
        <Media ref={ref} setShowMedia={setShowMedia} />
      </div>

      <ShowFeatures
        condition={showTasks}
        onClick={() => setShowTasks(!showTasks)}
      >
        <button className="size-6 cursor-pointer">
          <PencilSquareIcon />
        </button>
        <span className="text-xs hover:text-indigo-600">Tasks</span>
      </ShowFeatures>
      <div
        className={`absolute duration-300 ${
          showTasks ? "opacity-100" : "opacity-0"
        }`}
      >
        <Tasks ref={ref} setShowTasks={setShowTasks} />
      </div>

      <ShowFeatures
        condition={showFortune}
        onClick={() => setShowFortune(!showFortune)}
      >
        <button className="size-6 cursor-pointer">
          <SparklesIcon />
        </button>
        <span className="text-xs hover:text-indigo-600">Fortune</span>
      </ShowFeatures>
      <div
        className={`absolute duration-300 ${
          showFortune ? "opacity-100" : "opacity-0"
        }`}
      >
        <Fortune ref={ref} setShowFortune={setShowFortune} />
      </div>
    </div>
  );
};

export default RoomFeatures;
