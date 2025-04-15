import { useState } from "react"
import CreateButton from "../header/buttons/CreateButton"
import Filters from "./buttons/filters/Filters"
import CreateItem from "./buttons/items/CreateItem"
import { LibraryBig, ArrowRight } from "lucide-react"

export type item = {
  type: string
  image: string
  title: string
  author?: string
}

export default function Sidebar() {
  /* Criação de variáveis contendo o hex das cores mais usadas pelos elementos. 
  Vale somente para o TypeScript */
  const normalColor = '#989999'
  const lightNormalColor = '#fffefe'

  const [libraryColor, setLibraryColor] = useState<string>('#b3b3b3')
  const [showMoreButtonColor, setShowMoreButtonColor] = useState<string>(normalColor)

  const items: Record<string, item> = {
    workFolder: {
      type: 'Folder',
      image: 'FolderImage',
      title: 'Work',
      author: ''
    },

    programmingDeepFocus: {
      type: 'Playlist',
      image: '@assets/images/items-sidebar/programming_deep_focus.jpg',
      title: 'Programming 💻 - Deep Focus',
      author: 'Rickzin'
    },
    
    codingMusic: {
      type: 'Playlist',
      image: '@assets/images/items-sidebar/coding_music.png',
      title: 'Coding Music 💻 Programming Playlist',
      author: 'Soave'
    },

    purpleCat: {
      type: 'Playlist',
      image: '@assets/images/items-sidebar/purple_cat.png',
      title: 'Purple Cat 💜',
      author: 'Purple Cat'
    },
    
    lofiCoding: {
      type: 'Playlist',
      image: '@assets/images/items-sidebar/lofi_coding.png',
      title: 'Lofi Coding (beats to chill/relax to)',
      author: 'Retro Jungle'
    },

    rainPiano: {
      type: 'Album',
      image: '@assets/images/items-sidebar/rain_piano.png',
      title: 'Rain Piano Covers',
      author: 'goated.'
    },

    classicalMusic: {
      type: 'Playlist',
      image: '@assets/images/items-sidebar/classical_music.png',
      title: 'Música Clássica Relax Study',
      author: 'Classical Music'
    },

    oneheart: {
      type: 'Artist',
      image: '@assets/images/items-sidebar/oneheart.png',
      title: 'Øneheart',
      author: ''
    },
  }

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

      {/* Filtros */}
      <Filters />
      <CreateItem items={items} />
    </aside>
  )
}