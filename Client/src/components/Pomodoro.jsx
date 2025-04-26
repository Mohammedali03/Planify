import React from "react";
import SecondaryButton from "./ui/SecondaryButton";
import Input from "./ui/Input";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";

const Pomodoro = ({
  showPomo,
  inputValue,
  setShowPomo,
  setInputValue,
  handleSave,
}) => {
  return (
    <>
      <div className="flex py-2 px-4 items-center justify-between">
        <label htmlFor="pomo" className="text-[#4e4e4e] font-medium">
          Pomodoro (Minutes)
        </label>
        <button
          className="cursor-pointer size-10 flex items-center justify-center p-2 rounded-md
          hover:bg-indigo-200 hover:text-indigo-600 duration-300"
          onClick={() => setShowPomo(!showPomo)}
        >
          <AdjustmentsVerticalIcon />
        </button>
      </div>
      <div
        className={`${showPomo ? "flex" : "hidden"}  flex-col gap-3 py-2 px-4`}
      >
        <Input
          type="number"
          id="pomo"
          min={20}
          max={200}
          step={5}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <SecondaryButton onClick={handleSave}>Save</SecondaryButton>
      </div>
    </>
  );
};

export default Pomodoro;
