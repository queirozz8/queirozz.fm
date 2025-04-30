import { createContext, RefObject, useContext, useRef, ReactNode } from "react";

export type currentFilterOnType = 'Playlist' | 'Artista' | 'Álbum' | ''

/* Criando o Context. Ele começa com null, porque o objeto da ref será atribuído à ele no futuro */
const currentFilterOnContext = createContext<RefObject<currentFilterOnType> | null>(null)

/* Criando o Provider. Ele será utilizado no App.tsx para deixar todos os descendentes podendo usar o valor do context */
export function CurrentFilterOnProvider({ children }: { children: ReactNode }) {
  /* Referência que será compartilhada */
  const currentFilterOn = useRef<currentFilterOnType>('')

  return (
    /* O Provider fornece o valor do context para todos os componentes descendentes */
    <currentFilterOnContext.Provider value={currentFilterOn}>
      {children}
    </currentFilterOnContext.Provider>
  )
}

export function useCurrentFilterOn() {
  /* UseContext retorna o valor do context currentFilterOnContext que está sendo armazenado na propriedade Provider dele */
  const context = useContext(currentFilterOnContext)

  if (context !== null) return context
  else throw new Error('CurrentFilterOn é null. Certifique-se de que ele possui um valor.')
}