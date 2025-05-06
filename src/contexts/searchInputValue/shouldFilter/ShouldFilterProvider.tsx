import { useState, ReactNode } from "react";
import { shouldFilterContext } from "./ShouldFilterContext";


/* Criando o Provider. Ele será utilizado no App.tsx para deixar todos os descendentes podendo usar o valor do Context */
export default function ShouldFilterProvider({ children }: { children: ReactNode }) {
  /* Referência que será compartilhada */
  const [shouldFilter, setShouldFilter] = useState<boolean>(false)

  return (
    /* O Provider fornece o valor do Context para todos os componentes descendentes */
    <shouldFilterContext.Provider value={{ shouldFilter, setShouldFilter }}>
      {children}
    </shouldFilterContext.Provider>
  )
}