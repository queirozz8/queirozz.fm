import { Item } from "../../Sidebar"
import { Folder as workFolder } from "lucide-react"
import programmingDeepFocus from '@assets/images/items-sidebar/programming_deep_focus.jpg'
import codingMusic from '@assets/images/items-sidebar/coding_music.png'
import purpleCat from '@assets/images/items-sidebar/purple_cat.png'
import lofiCoding from '@assets/images/items-sidebar/lofi_coding.png'
import rainPiano from '@assets/images/items-sidebar/rain_piano.png'
import classicalMusic from '@assets/images/items-sidebar/classical_music.png'
import oneheart from '@assets/images/items-sidebar/oneheart.png'

const imagesAndIcons = {
  workFolder,
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
    <section className="flex flex-col gap-2">
      { Object.entries(items).map(([item, itemDetails]) => {
        return (
          <article className="flex gap-2">
            <img src={imagesAndIcons[item]} alt={`Image of ${itemDetails.type}.`} />
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