import { createContext, useContext, useState, ReactNode } from "react";

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
const currentFilterOnContext = createContext<CurrentFilterOnContextType | null>(null)

/* Criando o Provider. Ele será utilizado no App.tsx para deixar todos os descendentes podendo usar o valor do Context */
export function CurrentFilterOnProvider({ children }: { children: ReactNode }) {
  /* Referência que será compartilhada */
  const [currentFilterOn, setCurrentFilterOn] = useState<CurrentFilterOnType>('')

  return (
    /* O Provider fornece o valor do Context para todos os componentes descendentes */
    <currentFilterOnContext.Provider value={{ currentFilterOn, setCurrentFilterOn }}>
      {children}
    </currentFilterOnContext.Provider>
  )
}

export function UseCurrentFilterOn() {
  /* UseContext retorna o valor do Context currentFilterOnContext que está sendo armazenado na propriedade Provider dele */
  const context = useContext(currentFilterOnContext)

  if (context !== null) return context
  else throw new Error('CurrentFilterOn é null. Certifique-se de que ele possui um valor.')
}