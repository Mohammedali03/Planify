import { useState } from "react";
import Timer from "./Timer";
import Media from "./Media";
import Tasks from "./Tasks";
import Fortune from "./Fortune";

const RoomFeatures = ({ ref }) => {
  const [showTimer, setShowTimer] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showFortune, setShowFortune] = useState(false);

  return (
    <div className="w-fit p-[6px] rounded-md flex flex-col items-center gap-[10px] ml-2 bg-[#fcfcfc]">
      <div
        className={`flex items-center flex-col rounded-md px-3 py-[6px] hover:cursor-pointer
       hover:bg-indigo-200 hover:text-indigo-600 duration-300 
       ${!showTimer ? " text-indigo-600" : "bg-white text-black"}`}
        onClick={() => setShowTimer(!showTimer)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <span className="text-xs hover:text-indigo-600">Timer</span>
      </div>
      <div
        className={`absolute duration-300 ${
          showTimer ? "opacity-0" : "opacity-100"
        }`}
      >
        <Timer ref={ref} setShowTimer={setShowTimer} />
      </div>
      <div
        className={`flex items-center flex-col rounded-md px-3 py-[6px] hover:cursor-pointer
       hover:bg-indigo-200 hover:text-indigo-600 duration-300 
       ${!showMedia ? " text-indigo-600" : "bg-white text-black"}`}
        onClick={() => setShowMedia(!showMedia)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
          />
        </svg>

        <span className="text-xs hover:text-indigo-600">Media</span>
      </div>
      <div
        className={`absolute duration-300 ${
          showMedia ? "opacity-0" : "opacity-100"
        }`}
      >
        <Media ref={ref} setShowMedia={setShowMedia} />
      </div>
      <div
        className={`flex items-center flex-col rounded-md px-3 py-[6px] hover:cursor-pointer
       hover:bg-indigo-200 hover:text-indigo-600 duration-300 
       ${!showTasks ? " text-indigo-600" : "bg-white text-black"}`}
        onClick={() => setShowTasks(!showTasks)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>

        <span className="text-xs hover:text-indigo-600">Tasks</span>
      </div>
      <div
        className={`absolute duration-300 ${
          showTasks ? "opacity-0" : "opacity-100"
        }`}
      >
        <Tasks ref={ref} setShowTasks={setShowTasks} />
      </div>
      <div
        className={`flex items-center flex-col rounded-md px-3 py-[6px] hover:cursor-pointer
       hover:bg-indigo-200 hover:text-indigo-600 duration-300 
       ${!showFortune ? " text-indigo-600" : "bg-white text-black"}`}
        onClick={() => setShowFortune(!showFortune)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>

        <span className="text-xs hover:text-indigo-600">Fortune</span>
      </div>
      <div
        className={`absolute duration-300 ${
          showFortune ? "opacity-0" : "opacity-100"
        }`}
      >
        <Fortune ref={ref} setShowFortune={setShowTasks} />
      </div>
    </div>
  );
};

export default RoomFeatures;
