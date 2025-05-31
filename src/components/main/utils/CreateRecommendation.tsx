type Props = {
  image: string
  title: string
  desc: string
}

export default function CreateRecommendation( { image, title, desc }: Props) {
  return (
    <article className="flex flex-col gap-1 h-64 p-2 rounded-2xl hover:bg-[#1e1e1e] transition cursor-pointer select-none">
      <img src={image} className="size-[10rem] rounded-lg" alt="Imagem do item" />
      <h1 className="w-36 text-zinc-300 text-wrap truncate hover:underline">{title}</h1>
      <h2 className="w-32 max-h-24 text-sm text-zinc-400 text-wrap truncate hover:underline">{desc}</h2>
    </article>
  )
};
