type Props = {
  image: string
  title: string
}

export default function CreateArtist( { image, title }: Props) {
  return (
    <article className="flex flex-col gap-2">
      <img src={image} className="size-[10rem] rounded-4xl" alt="Foto do artista" />
      <h1 className="text-zinc-300">{title}</h1>
      <h2 className="text-sm text-zinc-400">Artista</h2>
    </article>
  )
};
