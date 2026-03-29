"use client"

const BACKGROUND_IMAGE = "/oil-rig-background.jpg"

export function BackgroundSlideshow() {
  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
    />
  )
}

