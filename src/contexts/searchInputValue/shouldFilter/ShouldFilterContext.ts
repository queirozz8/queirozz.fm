import { createContext } from 'react';

/* Define o tipo completo do contexto */
export type ShouldFilterType = {
  shouldFilter: boolean,
  setShouldFilter: React.Dispatch<React.SetStateAction<boolean>>
}

/* Criando o Context. Ele começa com null, porque o objeto da ref será atribuído à ele no futuro */
export const shouldFilterContext = createContext<ShouldFilterType | null>(null)