import { useState, useRef, useEffect } from "react"
import { CirclePlus } from "lucide-react"
import { normalColor, lightNormalColor } from "../utils/tailwindClasses"

export default function Footer() {
  const [isAddedToPlaylist, setIsAddedToPlaylist] = useState<boolean>(false)
  const [addToPlaylistColor, setAddToPlaylistColor] = useState<string>(normalColor)
  const isFirstRender = useRef<boolean>(true)

  useEffect(() => {
    console.log(isFirstRender.current);
    if (!isFirstRender.current) setAddToPlaylistColor('#10d85c')
    isFirstRender.current = false
  }, [isAddedToPlaylist])

  return (
    <footer className="mt-11 bg-transparent">
      <div className="flex gap-2">
        <img src={undefined} alt="Music image" />
        <div className="flex flex-col gap-2">
          <h1></h1>
          <p></p>
        </div>
        <button 
          onPointerOver={ () => setAddToPlaylistColor(lightNormalColor) }
          onClick={ () => setIsAddedToPlaylist(prev => !prev) }
          onPointerLeave={ () => !isAddedToPlaylist && setAddToPlaylistColor(normalColor) }
          className="hover:scale-105 transition-all cursor-pointer"
        >
          <CirclePlus color={addToPlaylistColor} size={18} />
        </button>
      </div>
    </footer>
  )
}