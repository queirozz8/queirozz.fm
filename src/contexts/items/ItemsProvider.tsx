import { useState, ReactNode } from "react";
import { itemsContext, KeyItemsType, Item } from "./ItemsContext";
import { defaultItemClass } from "../../components/utils/tailwindClasses";


/* Criando o Provider. Ele será utilizado no App.tsx para deixar todos os descendentes podendo usar o valor do Context */
export default function ItemsProvider({ children }: { children: ReactNode }) {
  /* Referência que será compartilhada */
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
      },
  
      austinFarwell: {
        type: 'Artista',
        title: 'Austin Farwell',
        author: '',
        class: defaultItemClass
      },
  
      homeConfort: {
        type: 'Álbum',
        title: 'homeconfort',
        author: 'silphia.',
        class: defaultItemClass
      }
    })

  return (
    /* O Provider fornece o valor do Context para todos os componentes descendentes */
    <itemsContext.Provider value={{ items, setItems }}>
      {children}
    </itemsContext.Provider>
  )
}