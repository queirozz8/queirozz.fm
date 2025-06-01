import { useState, ReactNode } from "react";
import { fullscreenContext } from "./fullscreenContext.ts";


/* Criando o Provider. Ele será utilizado no App.tsx para deixar todos os descendentes podendo usar o valor do Context */
export default function FullscreenProvider({ children }: { children: ReactNode }) {
  /* Referência que será compartilhada */
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  return (
    /* O Provider fornece o valor do Context para todos os componentes descendentes */
    <fullscreenContext.Provider value={{ isFullscreen, setIsFullscreen }}>
      {children}
    </fullscreenContext.Provider>
  )
}