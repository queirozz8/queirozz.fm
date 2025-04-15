import { item } from "../../Sidebar"

type Props = {
  items: Record<string, item>
}

export default function CreateItem({ items }: Props) {
  Object.values(items).map(itemDetails => {
    return (
      <article className="flex gap-2">
        <img src={itemDetails.image} alt={`Image of ${itemDetails.type}.`} />
        <div>
          <h1 className="">{itemDetails.title}</h1>
          <h2 className="">{itemDetails.type} {itemDetails.author && ` • ${itemDetails.author}`}</h2>
        </div>
      </article>
    )
  })
};