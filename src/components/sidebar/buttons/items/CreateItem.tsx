import { useState } from "react"
import { Item, keyItemsType } from "../../Sidebar"
import { Folder, Pin, ArrowRight } from "lucide-react"
import programmingDeepFocus from '@assets/images/items-sidebar/programming_deep_focus.jpg'
import codingMusic from '@assets/images/items-sidebar/coding_music.jpg'
import purpleCat from '@assets/images/items-sidebar/purple_cat.jpg'
import lofiCoding from '@assets/images/items-sidebar/lofi_coding.jpg'
import rainPiano from '@assets/images/items-sidebar/rain_piano.jpg'
import classicalMusic from '@assets/images/items-sidebar/classical_music.jpg'
import oneheart from '@assets/images/items-sidebar/oneheart.jpg'

const imagesAndIcons = {
  workFolder: Folder,
  programmingDeepFocus,
  codingMusic,
  purpleCat,
  lofiCoding,
  rainPiano,
  classicalMusic,
  oneheart
} as const

type Props = {
  items: Record<string, Item>
}

export default function CreateItem({ items }: Props) {
  const [arrowColor, setArrowColor] = useState('#a6a6a6')

  return (
    <section className="flex flex-col justify-center gap-3 relative right-2">
      { (Object.entries(items) as [keyItemsType, Item][]).map(([item, itemDetails]) => {
        return (
          <button className="flex gap-2 w-64 p-2 rounded-2xl hover:bg-[#1f1f1f] cursor-pointer">
            <div className={`flex justify-center items-center ${typeof imagesAndIcons[item] !== 'string' ? 'size-11' : 'size-fit'} rounded-lg bg-[#282828]`}>
              { 
                typeof imagesAndIcons[item] !== 'string' ? (
                  <Folder color="#a6a6a6" />
                ) : (
                  <img src={imagesAndIcons[item]} alt={`Image of this ${itemDetails.type}.`} width={45} height={45} />
                )
              }
            </div>
            <div>
              { 
                typeof imagesAndIcons[item] !== 'string' ? (
                  <div 
                    onPointerOver={ () => setArrowColor('#ffffff') } 
                    onPointerLeave={ () => setArrowColor('#a6a6a6') }
                    className="relative"
                  >
                    <h1 className="text-start w-[11.7rem] text-[#eeeeee] truncate">Work</h1>
                    <h2 className="flex gap-1 text-start text-[#ababab] text-sm truncate"><Pin color="#1dd45e" size={18} />15 playlists</h2>
                    <div className="absolute bottom-3 left-40"><ArrowRight color={arrowColor} size={20} /></div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-start w-[11.7rem] text-[#eeeeee] truncate">{itemDetails.title}</h1>
                    <h2 className="text-start text-[#ababab] text-sm truncate">{itemDetails.type} {itemDetails.author && ` • ${itemDetails.author}`}</h2>
                  </>
                )
              }
            </div>
          </button>
        )
      }) }
    </section>
  )
};