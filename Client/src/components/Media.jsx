import { useState } from "react";
import { motion } from "framer-motion";

const Media = ({ setShowMedia }) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState("");

  const handlePlayVideo = () => {
    // Extract video ID from YouTube URL
    const videoIdMatch = youtubeUrl.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    if (videoIdMatch) {
      setVideoId(videoIdMatch[1]);
      setShowVideo(true);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      className={`feature media z-90 absolute rounded-md flex-col items-stretch overflow-hidden bg-white shadow-lg ${
        showVideo ? "p-0" : ""
      }`}
      style={{
        width: "400px",
        height: "300px",
      }}
    >
      <div
        className={`flex py-2 px-4 items-center justify-between border-b border-[#e9e9e9] cursor-grab ${
          showVideo ? "px-2" : ""
        }`}
        style={{ touchAction: "none" }}
      >
        <div className="flex items-center gap-2">
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
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span className="text-sm text-gray-600 font-medium">Media</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMedia(true)}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
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
      </div>

      {!showVideo ? (
        <div className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter YouTube URL"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePlayVideo();
                  }
                }}
              />
              <button
                onClick={handlePlayVideo}
                className="px-4 py-2 font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-500 duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={!youtubeUrl}
              >
                Play
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Paste a YouTube URL to start watching
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[calc(100%-2.5rem)]">
          <div className="relative w-full h-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Media;
