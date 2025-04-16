import { Item, keyItemsType } from "../../Sidebar"
import { Folder } from "lucide-react"
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
  return (
    <section className="flex flex-col justify-center gap-4">
      { (Object.entries(items) as [keyItemsType, Item][]).map(([item, itemDetails]) => {
        console.log(imagesAndIcons[item], typeof imagesAndIcons[item]);
        return (
          <article className="flex gap-2">
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
              <h1 className="text-[#c5c5c5]">{itemDetails.title}</h1>
              <h2 className="text-[#6a6a6a] text-sm">{itemDetails.type} {itemDetails.author && ` • ${itemDetails.author}`}</h2>
            </div>
          </article>
        )
      }) }
    </section>
  )
};