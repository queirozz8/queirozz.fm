import { useState } from "react"
import useCurrentFilterOn from "../../../../contexts/currentFilterOn/useCurrentFilterOn"
import useItems from "../../../../contexts/items/useItems"
import { KeyItemsType, Item } from "../../../../contexts/items/ItemsContext"
import useShouldFilter from "../../../../contexts/searchInputValue/shouldFilter/useShouldFilter"
import { Folder, Pin, ArrowRight } from "lucide-react"
import './../../../../input.css'
import programmingDeepFocus from '@assets/images/items-sidebar/programming_deep_focus.webp'
import codingMusic from '@assets/images/items-sidebar/coding_music.webp'
import purpleCat from '@assets/images/items-sidebar/purple_cat.webp'
import lofiCoding from '@assets/images/items-sidebar/lofi_coding.webp'
import rainPiano from '@assets/images/items-sidebar/rain_piano.webp'
import classicalMusic from '@assets/images/items-sidebar/classical_music.webp'
import oneheart from '@assets/images/items-sidebar/oneheart.webp'
import potsu from '@assets/images/items-sidebar/potsu.webp'
import austinFarwell from '@assets/images/items-sidebar/austin_farwell.webp'
import homeConfort from '@assets/images/items-sidebar/homeconfort.webp'


const imagesAndIcons = {
  workFolder: Folder,
  programmingDeepFocus,
  codingMusic,
  purpleCat,
  lofiCoding,
  rainPiano,
  classicalMusic,
  oneheart,
  potsu,
  austinFarwell,
  homeConfort: homeConfort
} as const

export default function CreateItem() {
  const {currentFilterOn} = useCurrentFilterOn()
  const {items} = useItems()
  const {shouldFilter} = useShouldFilter()
  
  const sectionDefaultClasses = 'flex flex-col justify-center gap-2 relative right-2 w-[16.7rem] overflow-x-hidden overflow-y-auto'
  const [sectionClasses, setSectionClasses] = useState<string>(sectionDefaultClasses)

  const [arrowColor, setArrowColor] = useState('#a6a6a6')

  return (
    /* Essa section vai receber o styling de input.css. Isso vai fazer com que a cor da barra lateral fique escura */
    <section 
      onMouseOver={ () => setSectionClasses(prev => prev + ' section-is-hovering') }
      onMouseLeave={ () => setSectionClasses(sectionDefaultClasses) }
      className={currentFilterOn || shouldFilter ? sectionClasses : sectionClasses + ' pt-44'}
    >
      { (Object.entries(items) as [KeyItemsType, Item][]).map(([item, itemDetails]) => {
        return (
          <button className={itemDetails.class} key={itemDetails.title}>
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