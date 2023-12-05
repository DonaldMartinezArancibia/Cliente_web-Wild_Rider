import videojs from "video.js"
import "video.js/dist/video-js.css"
import React, { useRef, useEffect } from "react"

const VideoPlayer = ({ sources }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const player = videojs(
      videoRef.current,
      {
        autoplay: true,
        controls: true,
        preload: "auto",
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2],
        responsive: true,
      },
      () => {
        console.log("Reproductor de video listo")
        player.src(sources[0].sources)

        // Escuchar el evento 'ended' del video para cambiar al siguiente video cuando el actual termina
        player.on("ended", () => {
          const currentSourceIndex = sources.findIndex(
            source => source.sources[0].src === player.src()
          )

          if (currentSourceIndex < sources.length - 1) {
            player.src(sources[currentSourceIndex + 1].sources)
            player.play() // Iniciar la reproducción automáticamente
          }
        })
      }
    )

    return () => {
      if (player) {
        player.dispose()
      }
    }
  }, [sources])

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  )
}

export default VideoPlayer
