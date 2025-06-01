import { ArtistType } from "../Main"

type Props = {
  artists: Record<string, ArtistType>
}

export default function CreateArtists( {artists}: Props) {
  return (
    <>
      { Object.values(artists).map(artistDetails => (
        <article 
          className="flex flex-col gap-1 h-fit p-2 rounded-2xl hover:bg-[#1e1e1e] transition cursor-pointer select-none"
          /* Para diferenciação */
          key={artistDetails.title}
        >
          <img src={artistDetails.image} className="size-[10rem] rounded-3xl" alt="Foto do artista" draggable="false" />
          <h1 className="w-36 text-zinc-300 hover:underline truncate">{artistDetails.title}</h1>
          <h2 className="w-32 max-h-24 text-sm text-zinc-400 truncate hover:underline">Artista</h2>
        </article>
      ))}
    </>
  )
};
