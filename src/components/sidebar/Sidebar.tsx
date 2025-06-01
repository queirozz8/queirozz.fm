import { useState } from "react"
import CreateButton from "../buttons/CreateButton"
import Filters from "./buttons/filters/Filters"
import CreateSidebarItem from "./buttons/items/CreateSidebarItem"
import SearchInput from "./searchInput/SearchInput"
import { LibraryBig, ArrowRight } from "lucide-react"
import { normalColor, lightNormalColor } from "../utils/tailwindClasses"
import '../../input.css'


export default function Sidebar() {
  /* Cor do botão Sua Biblioteca */
  const [libraryColor, setLibraryColor] = useState<string>('#b3b3b3')
  /* Cor do botão de expandir a barra lateral (ver mais) */
  const [showMoreButtonColor, setShowMoreButtonColor] = useState<string>(normalColor)

  
  return (
    <aside className="flex flex-col flex-[3%] gap-3 w-[17.5rem] ml-2 p-5 rounded-lg bg-[#121212]">

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
          <h1 className="text-zinc-300 group-hover:text-white font-extrabold select-none">Sua Biblioteca</h1>
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

      {/* Botões de filtros */}
      <Filters />
      {/* Input de busca dos itens */}
      <SearchInput />
      {/* Itens da barra lateral */}
      <CreateSidebarItem />
    </aside>
  )
}