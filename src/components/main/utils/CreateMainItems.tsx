import { MainItemType } from "../Main"

type Props = {
  items: Record<string, MainItemType>
}

export default function CreateMainItems( {items}: Props) {
  return (
    <>
      { Object.values(items).map(itemDetails => (
          <button 
            className="flex items-center gap-2 h-20 p-2 rounded-lg bg-[#292929] hover:bg-[#1e1e1e] transition cursor-pointer text-left select-none"
            /* Para diferenciação */
            key={itemDetails.title}
          >
            <img src={itemDetails.image} className="w-16 rounded-lg" alt={`Imagem de ${itemDetails.title}.`} />
            <h1 className="w-full truncate">{itemDetails.title}</h1>
          </button>
      )) }
    </>
  )
};
