import { useState, ReactNode } from "react";
import { searchInputValueContext } from "./SearchInputValueContext";


/* Criando o Provider. Ele será utilizado no App.tsx para deixar todos os descendentes podendo usar o valor do Context */
export default function SearchInputValueProvider({ children }: { children: ReactNode }) {
  /* Referência que será compartilhada */
  const [inputValue, setInputValue] = useState<string>('')

  return (
    /* O Provider fornece o valor do Context para todos os componentes descendentes */
    <searchInputValueContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </searchInputValueContext.Provider>
  )
}