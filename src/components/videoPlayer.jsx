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
  const [isAudioMuted, setIsAudioMuted] = useState(true)
  const playerRef = useRef(null)
  console.log(videos)
  useEffect(() => {
    // Comienza la reproducción cuando el componente se monta
    if (isFocused) {
      playerRef.current.play()
    }
  }, [isFocused])

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

  const handleToggleAudio = () => {
    // Cambia el estado de isAudioMuted
    setIsAudioMuted(prev => !prev)
    // Actualiza el estado del reproductor de audio
    playerRef.current.muted = !playerRef.current.muted
  }

  const handlePlayerFocus = () => {
    setIsFocused(true)
  }

  const handlePlayerBlur = () => {
    setIsFocused(false)
    // Pausa la reproducción cuando pierde el foco
    playerRef.current.pause()
  }

  return (
    <div
      className="relative"
      // onMouseEnter={handlePlayerFocus}
      // onMouseLeave={handlePlayerBlur}
      // onFocus={handlePlayerFocus}
      // onBlur={handlePlayerBlur}
    >
      {videos[currentVideoIndex].sources[0].src ? (
        <Player
          ref={playerRef}
          fluid
          aspectRatio="16:9"
          poster={videos[currentVideoIndex].cover?.url}
          src={videos[currentVideoIndex].sources[0].src}
          onEnded={handleEnded}
          muted={isAudioMuted}
          onError={e => console.error("Error al cargar el video", e)}
          className="!font-Poppins"
        >
          <BigPlayButton position="center" />
          <ControlBar autoHide={!isFocused}>
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
          </ControlBar>
          {/* Botón para activar/desactivar el audio */}
          {/* {isAudioMuted && (
            <div className="absolute z-10 top-4 left-[48%]">
              <button
                className="px-4 py-2 text-white bg-gray-700 bg-opacity-70"
                onClick={handleToggleAudio}
                onTouchStart={handleToggleAudio}
              >
                Activar Audio
              </button>
            </div>
          )} */}
        </Player>
      ) : (
        <p>No se encontró un enlace de video válido.</p>
      )}
      {/* Botones de reproducción */}
      {isFocused && (
        <div className="absolute z-10 flex items-center space-x-4 transform -translate-y-1/2 left-3 top-1/2">
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
        <div className="absolute z-10 flex items-center space-x-4 transform -translate-y-1/2 right-3 top-1/2">
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
