import React, { useState, useRef, useEffect } from "react"
import {
  Player,
  ControlBar,
  CurrentTimeDisplay,
  TimeDivider,
  BigPlayButton,
} from "video-react"
import "video-react/dist/video-react.css"

const VideoPlayer = ({ videos }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const playerRef = useRef(null)

  const handleEnded = () => {
    setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length)
  }

  const handleVideoClick = index => {
    setCurrentVideoIndex(index)
  }

  const playPreviousVideo = () => {
    setCurrentVideoIndex(
      prevIndex => (prevIndex - 1 + videos.length) % videos.length
    )
  }

  const playNextVideo = () => {
    setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length)
  }

  const handlePlayerFocus = () => {
    setIsFocused(true)
  }

  const handlePlayerBlur = () => {
    setIsFocused(false)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.play()
        console.log("Video iniciado después de 5 segundos")
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  console.log(videos)

  return (
    <div
      className="relative"
      onMouseEnter={handlePlayerFocus}
      onMouseLeave={handlePlayerBlur}
      onFocus={handlePlayerFocus}
      onBlur={handlePlayerBlur}
    >
      {videos[currentVideoIndex].sources[0].src ? (
        <Player
          ref={playerRef}
          fluid
          aspectRatio="16:9"
          poster={videos[currentVideoIndex].poster}
          src={videos[currentVideoIndex].sources[0].src}
          onEnded={handleEnded}
          startTime={1}
          onError={e => console.error("Error al cargar el video", e)}
        >
          <BigPlayButton position="center" />
          {isFocused && (
            <div className="absolute z-10 flex items-center space-x-4 transform -translate-y-1/2 left-3 top-1/2">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-full"
                onClick={playPreviousVideo}
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
            <div className="absolute z-10 flex items-center space-x-4 transform -translate-y-1/2 right-3 top-1/2">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-full"
                onClick={playNextVideo}
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
          <ControlBar autoHide={!isFocused}>
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
          </ControlBar>
        </Player>
      ) : (
        <p>No se encontró un enlace de video válido.</p>
      )}
    </div>
  )
}

export default VideoPlayer
