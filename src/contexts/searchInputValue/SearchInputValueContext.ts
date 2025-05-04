import { createContext } from 'react';

/* Define o tipo completo do contexto */
export type SearchInputValueContextType = {
  inputValue: string,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

/* Criando o Context. Ele começa com null, porque o objeto da ref será atribuído à ele no futuro */
export const searchInputValueContext = createContext<SearchInputValueContextType | null>(null)