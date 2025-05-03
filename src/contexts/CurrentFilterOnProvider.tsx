import { useState, ReactNode } from "react";
import { currentFilterOnContext, CurrentFilterOnType } from "./CurrentFilterOnContext";


/* Criando o Provider. Ele será utilizado no App.tsx para deixar todos os descendentes podendo usar o valor do Context */
export default function CurrentFilterOnProvider({ children }: { children: ReactNode }) {
  /* Referência que será compartilhada */
  const [currentFilterOn, setCurrentFilterOn] = useState<CurrentFilterOnType>('')

  return (
    /* O Provider fornece o valor do Context para todos os componentes descendentes */
    <currentFilterOnContext.Provider value={{ currentFilterOn, setCurrentFilterOn }}>
      {children}
    </currentFilterOnContext.Provider>
  )
}