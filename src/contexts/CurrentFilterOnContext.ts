import { createContext } from 'react';

/* Define o tipo do valor interno do Contexto */
export type CurrentFilterOnType = 'Playlist' | 'Artista' | 'Álbum' | ''

/* Tipa o setter de estado do currentFilterOn */
export type CurrentFilterOnSetterType = React.Dispatch<React.SetStateAction<CurrentFilterOnType>>

/* Define o tipo completo do contexto */
type CurrentFilterOnContextType = {
  currentFilterOn: CurrentFilterOnType,
  setCurrentFilterOn: CurrentFilterOnSetterType
}

/* Criando o Context. Ele começa com null, porque o objeto da ref será atribuído à ele no futuro */
export const currentFilterOnContext = createContext<CurrentFilterOnContextType | null>(null)