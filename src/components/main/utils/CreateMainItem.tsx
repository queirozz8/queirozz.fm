type Props = {
  image: string
  title: string
}

export default function CreateMainItem( { image, title }: Props) {
  return (
    <button className="flex items-center gap-2 h-20 p-2 rounded-lg bg-[#292929] hover:bg-[#1e1e1e] transition cursor-pointer text-left select-none">
      <img src={image} className="w-16 rounded-lg" alt={`Imagem de ${title}.`} />
      <h1 className="flex justify-center items-center flex-wrap">{title}</h1>
    </button>
  )
};
