import { useState } from "react";
import { Rnd } from "react-rnd";
import { MinusIcon } from "@heroicons/react/24/outline";
import Input from "../ui/Input";

const Media = ({ setShowMedia }) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState("");

  const handlePlayVideo = () => {
    const videoIdMatch = youtubeUrl.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    if (videoIdMatch) {
      setVideoId(videoIdMatch[1]);
      setShowVideo(true);
    }
  };

  return (
    <Rnd
      default={{
        x: 0,
        y: 100,
        width: 400,
        height: 300,
      }}
      minWidth={400}
      minHeight={300}
      bounds="window"
      enableResizing={showVideo ? { bottomRight: true } : false}
      style={{ zIndex: 100, border: "6px" }}
    >
      <div
        className={`w-full h-full rounded-md flex flex-col bg-white shadow-lg ${
          showVideo && "p-0"
        }`}
      >
        <div
          className="flex py-2 px-4 items-center justify-between border-b
           border-gray-200 bg-gray-50 cursor-grab"
          style={{ touchAction: "none", borderRadius: "6px 6px 0 0" }}
        >
          <span className="text-sm font-medium text-gray-600">Media</span>
          <button
            onClick={() => setShowMedia(false)}
            className="size-6 p-1 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
          >
            <MinusIcon />
          </button>
        </div>

        {!showVideo ? (
          <div className="flex flex-col gap-4 mt-4 p-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter YouTube URL"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handlePlayVideo();
                }}
              />
              <button
                onClick={handlePlayVideo}
                className="px-4 py-2 font-semibold bg-indigo-600 text-white
                cursor-pointer rounded-md hover:bg-indigo-500 transition disabled:opacity-50"
                disabled={!youtubeUrl}
              >
                Play
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Paste a YouTube URL to start watching
            </div>
          </div>
        ) : (
          <div className="flex-1 relative">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default Media;
