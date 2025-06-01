import { createContext } from 'react';

type FullscreenContextType = {
  isFullscreen: boolean
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>
}

/* Criando o Context. Ele começa com null, porque o objeto da ref será atribuído à ele no futuro */
export const fullscreenContext = createContext<FullscreenContextType | null>(null)