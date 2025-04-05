import { useState, useEffect, useRef } from "react";

const SOUNDS = [
  {
    id: "rain",
    name: "Rain",
    url: "https://www.soundjay.com/nature/rain-01.mp3", // Rain sound (working)
    icon: "🌧️",
  },
  {
    id: "forest",
    name: "Forest",
    url: "https://www.soundjay.com/nature/forest-ambience-01.mp3", // Forest sound (working)
    icon: "🌳",
  },
  {
    id: "waves",
    name: "Ocean",
    url: "https://www.soundjay.com/nature/ocean-waves-01.mp3", // Ocean waves sound (working)
    icon: "🌊",
  },
  {
    id: "cafe",
    name: "Cafe",
    url: "https://www.soundjay.com/ambience/cafe-ambience-01.mp3", // Cafe ambiance sound (working)
    icon: "☕",
  },
  {
    id: "fireplace",
    name: "Fire",
    url: "https://www.soundjay.com/ambience/fireplace-01.mp3", // Fireplace sound (working)
    icon: "🔥",
  },
];

const SoundButton = ({ sound, isPlaying, volume, onToggle }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Audio play failed:", error);
            // Reset playing state if audio fails to play
            onToggle();
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, onToggle]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors cursor-pointer ${
        isPlaying
          ? "bg-indigo-100 text-indigo-600"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <span className="text-2xl" role="img" aria-label={sound.name}>
        {sound.icon}
      </span>
      <span className="text-sm font-medium">{sound.name}</span>
      <div className="flex-1" />
      {isPlaying && (
        <div className="flex gap-1">
          <span className="w-1 h-4 bg-indigo-600 rounded-full animate-pulse" />
          <span className="w-1 h-4 bg-indigo-600 rounded-full animate-pulse delay-75" />
          <span className="w-1 h-4 bg-indigo-600 rounded-full animate-pulse delay-150" />
        </div>
      )}
      <audio ref={audioRef} src={sound.url} preload="none" />
    </button>
  );
};

const VolumeSlider = ({ volume, onChange }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-t border-[#e9e9e9]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
        />
      </svg>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
};

const Sounds = ({ setShowSounds }) => {
  const [playingStates, setPlayingStates] = useState({});
  const [volume, setVolume] = useState(0.5);

  const handleToggleSound = (soundId) => {
    setPlayingStates((prev) => ({
      ...prev,
      [soundId]: !prev[soundId],
    }));
  };

  return (
    <div
      className="feature sounds z-90 absolute right-2 top-16 rounded-md flex-col
      h-auto w-[300px] max-h-[400px] items-stretch overflow-hidden bg-white shadow-lg"
    >
      <div className="flex py-2 px-4 items-center justify-between border-b border-[#e9e9e9]">
        <span className="text-sm text-gray-600 font-medium">Sounds</span>
        <button
          onClick={() => setShowSounds(false)}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Hide sounds panel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-gray-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {SOUNDS.map((sound) => (
            <SoundButton
              key={sound.id}
              sound={sound}
              isPlaying={playingStates[sound.id]}
              volume={volume}
              onToggle={() => handleToggleSound(sound.id)}
            />
          ))}
        </div>
      </div>
      <VolumeSlider volume={volume} onChange={setVolume} />
    </div>
  );
};

export default Sounds;
