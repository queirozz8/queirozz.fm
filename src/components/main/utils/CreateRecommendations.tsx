import { RecommendationType } from "../Main"

type Props = {
  recommendations: Record<string, RecommendationType>
}

export default function CreateRecommendations( {recommendations}: Props) {
  return (
    <>
      { Object.values(recommendations).map(recommendationDetails => (
          <article 
            className="flex flex-col gap-1 h-60 p-2 rounded-2xl hover:bg-[#1e1e1e] transition cursor-pointer select-none"
            /* Para diferenciação */
            key={recommendationDetails.title}
          >
            <img src={recommendationDetails.image} className="size-[10rem] rounded-lg" alt="Imagem do item" draggable="false" />
            <h1 className="w-36 text-zinc-300 text-wrap truncate hover:underline">{recommendationDetails.title}</h1>
            <h2 className="w-32 max-h-24 text-sm text-zinc-400 text-wrap truncate hover:underline">{recommendationDetails.desc}</h2>
          </article>
      )) }
    </>
  ) 
};
