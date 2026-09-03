import React, { useState } from "react"
import ReactPlayer from "react-player"

const VideoPlayer = ({ videos }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [isAudioMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length)
  }

  const playPreviousVideo = () => {
    setIsPlaying(false)
    setCurrentVideoIndex(
      prevIndex => (prevIndex - 1 + videos.length) % videos.length
    )
  }

  const playNextVideo = () => {
    setIsPlaying(false)
    setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length)
  }

  const handlePlayerFocus = () => {
    setIsFocused(true)
  }

  const handlePlayerBlur = () => {
    setIsFocused(false)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handlePlayerFocus}
      onMouseLeave={handlePlayerBlur}
      onFocus={handlePlayerFocus}
      onBlur={handlePlayerBlur}
    >
      {videos[currentVideoIndex].sources[0].src ? (
        <div style={{ aspectRatio: "16 / 9" }}>
          <ReactPlayer
            src={videos[currentVideoIndex].sources[0].src}
            light={videos[currentVideoIndex].cover?.url}
            playing={isPlaying}
            onClickPreview={() => setIsPlaying(true)}
            width="100%"
            height="100%"
            controls
            muted={isAudioMuted}
            onEnded={handleEnded}
            onError={e => console.error("Error al cargar el video", e)}
            className="!font-Poppins"
          />
        </div>
      ) : (
        <p>No se encontró un enlace de video válido.</p>
      )}
      {/* Botones de reproducción */}
      {isFocused && (
        <div className="absolute flex items-center space-x-4 transform -translate-y-1/2 left-3 top-1/2">
          <button
            className="px-4 py-2 text-white bg-gray-700 bg-opacity-70"
            onClick={playPreviousVideo}
            onTouchStart={playPreviousVideo}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      )}
      {isFocused && (
        <div className="absolute flex items-center space-x-4 transform -translate-y-1/2 right-3 top-1/2">
          <button
            className="px-4 py-2 text-white bg-gray-700 bg-opacity-70"
            onClick={playNextVideo}
            onTouchStart={playNextVideo}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
