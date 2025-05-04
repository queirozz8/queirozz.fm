import { useState } from "react"
import CreateButton from "../buttons/CreateButton"
import Filters from "./buttons/filters/Filters"
import SearchInput from "./searchInput/SearchInput"
import CreateItem from "./buttons/items/CreateItem"
import { defaultItemClass } from "../utils/tailwindClasses"
import { LibraryBig, ArrowRight } from "lucide-react"
import { normalColor, lightNormalColor } from "../utils/tailwindClasses"

export type Item = {
  /* Tipo do item, será mostrado na tela */
  type: 'Playlist' | 'Artista' | 'Álbum' | 'Folder' | ''
  /* Nome do item */
  title: string
  /* Author é opcional, pois quando o item é um artista ou uma pasta, ela não possui autor */
  author?: string
  /* Classe do Tailwind. Será usada para definir se deverá ser exibida ou não na tela, conforme os filtros */
  class: string
}

/* Tipo que será passado para outros arquivos. Ele é definido aqui pois os outros arquivos são filhos dele. 
Esse tipo descreve as chaves dos itens. */
export type KeyItemsType = 'workFolder' | 'programmingDeepFocus' | 'codingMusic' | 'purpleCat' | 'lofiCoding' | 'rainPiano' | 'classicalMusic' | 'oneheart' | 'potsu'
/* Tipo que também será passado para outros arquivos
Esse tipo descreve o setter do estado items. */
export type SetItemsType = React.Dispatch<React.SetStateAction<Record<KeyItemsType, Item>>>


export default function Sidebar() {
  /* Cor do botão Sua Biblioteca */
  const [libraryColor, setLibraryColor] = useState<string>('#b3b3b3')
  /* Cor do botão de expandir a barra lateral (ver mais) */
  const [showMoreButtonColor, setShowMoreButtonColor] = useState<string>(normalColor)


  /* Estado centralizado dos itens que compõem a barra lateral */
  const [items, setItems] = useState<Record<KeyItemsType, Item>>({
    workFolder: {
      /* Type sendo Folder será substituído para '15 playlists' no futuro.
      Só defino como Folder inicialmente para ser mais fácil de visualizar. */
      type: 'Folder',
      title: 'Work',
      author: '',
      class: defaultItemClass
    },

    programmingDeepFocus: {
      type: 'Playlist',
      title: 'Programming 💻 - Deep Focus',
      author: 'Rickzin',
      class: defaultItemClass
    },
    
    codingMusic: {
      type: 'Playlist',
      title: 'Coding Music 💻 Programming Playlist',
      author: 'Soave',
      class: defaultItemClass
    },

    purpleCat: {
      type: 'Playlist',
      title: 'Purple Cat 💜',
      author: 'Purple Cat',
      class: defaultItemClass
    },
    
    lofiCoding: {
      type: 'Playlist',
      title: 'Lofi Coding (beats to chill/relax to)',
      author: 'Retro Jungle',
      class: defaultItemClass
    },

    rainPiano: {
      type: 'Álbum',
      title: 'Rain Piano Covers',
      author: 'goated.',
      class: defaultItemClass
    },

    classicalMusic: {
      type: 'Playlist',
      title: 'Música Clássica Relax Study',
      author: 'Classical Music',
      class: defaultItemClass
    },

    oneheart: {
      type: 'Artista',
      title: 'Øneheart',
      author: '',
      class: defaultItemClass
    },

    potsu: {
      type: 'Artista',
      title: 'potsu',
      author: '',
      class: defaultItemClass
    }
  })

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
      <Filters items={items} setItems={setItems} />
      {/* Input de busca dos itens */}
      <SearchInput items={items} setItems={setItems} />
      {/* Itens da barra lateral */}
      <CreateItem items={items} />
    </aside>
  )
}