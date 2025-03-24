import { useState } from "react"
import CreateButton from "./buttons/CreateButton"
import { LibraryBig, ArrowRight } from "lucide-react"

export default function Sidebar() {
  /* Criação de variáveis contendo o hex das cores mais usadas pelos elementos. 
  Vale somente para o TypeScript */
  const normalColor: string = '#989999'
  const lightNormalColor: string = '#fffefe'

  const [libraryColor, setLibraryColor] = useState<string>('#b3b3b3')
  const [showMoreButtonColor, setShowMoreButtonColor] = useState<string>(normalColor)

  return (
    <aside className="flex flex-col gap-3 relative left-2 p-5 w-[17.5rem] rounded-lg bg-[#121212]">

      {/* Div que engloba todos os botões superiores da Sidebar (menos os filtros) */}
      <div className="flex justify-between items-center">

        {/* Botão da biblioteca. Engloba o ícone e o texto dele */}
        <button 
          onPointerOver={ () => setLibraryColor(lightNormalColor) } 
          onPointerLeave={ () => setLibraryColor(normalColor) }
          className="flex gap-1 cursor-pointer group" 
          title="Ocultar sua biblioteca"
        >
          <LibraryBig color={libraryColor} />
          <h1 className="text-zinc-300 group-hover:text-[var(--light-normal-color)] font-extrabold">Sua Biblioteca</h1>
        </button>

        {/* Div que engloba o botão de criar e o botão de mostrar mais */}
        <div className="flex gap-3">

          {/* Botão de Criar adaptado para a barra lateral com seu respectivo menu */}
          <CreateButton isSidebar={true} />

          {/* Botão de mostrar mais */}
          <button 
            onPointerOver={ () => setShowMoreButtonColor(lightNormalColor) }
            onPointerLeave={ () => setShowMoreButtonColor(normalColor) }
            className="cursor-pointer"
            title="Mostrar mais">
            <ArrowRight color={showMoreButtonColor} />
          </button>
        </div>

      </div>

      {/* Botão de filtro por playlists */}
      <button 
        className='flex justify-center items-center relative right-1 w-fit mt-2 px-3 py-2 rounded-4xl 
        text-sm text-zinc-200 font-semibold bg-[#2a2a2a] hover:bg-[#333333] active:bg-[#444444] transition cursor-pointer'
      >
        Playlists
      </button>
    </aside>
  )
}