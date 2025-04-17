import { useState } from "react"
import CreateButton from "../buttons/CreateButton"
import Filters from "./buttons/filters/Filters"
import CreateItem from "./buttons/items/CreateItem"
import { LibraryBig, ArrowRight } from "lucide-react"

export type Item = {
  type: string
  title: string
  author?: string
}

export type keyItemsType = 'workFolder' | 'programmingDeepFocus' | 'codingMusic' | 'purpleCat' | 'lofiCoding' | 'rainPiano' | 'classicalMusic' | 'oneheart'

export default function Sidebar() {
  /* Criação de variáveis contendo o hex das cores mais usadas pelos elementos. 
  Vale somente para o TypeScript */
  const normalColor = '#989999'
  const lightNormalColor = '#fffefe'

  const [libraryColor, setLibraryColor] = useState<string>('#b3b3b3')
  const [showMoreButtonColor, setShowMoreButtonColor] = useState<string>(normalColor)


  const items: Record<keyItemsType, Item> = {
    workFolder: {
      type: 'Folder',
      title: 'Work',
      author: ''
    },

    programmingDeepFocus: {
      type: 'Playlist',
      title: 'Programming 💻 - Deep Focus',
      author: 'Rickzin'
    },
    
    codingMusic: {
      type: 'Playlist',
      title: 'Coding Music 💻 Programming Playlist',
      author: 'Soave'
    },

    purpleCat: {
      type: 'Playlist',
      title: 'Purple Cat 💜',
      author: 'Purple Cat'
    },
    
    lofiCoding: {
      type: 'Playlist',
      title: 'Lofi Coding (beats to chill/relax to)',
      author: 'Retro Jungle'
    },

    rainPiano: {
      type: 'Álbum',
      title: 'Rain Piano Covers',
      author: 'goated.'
    },

    classicalMusic: {
      type: 'Playlist',
      title: 'Música Clássica Relax Study',
      author: 'Classical Music'
    },

    oneheart: {
      type: 'Artista',
      title: 'Øneheart',
      author: ''
    },
  } as const

  return (
    <aside className="flex flex-col gap-3 relative left-2 w-[17.5rem] h-[46.5rem] p-5 rounded-lg bg-[#121212]">

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

      {/* Filtros */}
      <Filters />
      <CreateItem items={items} />
    </aside>
  )
}