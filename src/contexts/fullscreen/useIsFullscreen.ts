import { useContext } from 'react';
import { fullscreenContext } from './fullscreenContext';

export default function useIsFullscreen() {
  /* UseContext retorna o valor do Context currentFilterOnContext que está sendo armazenado na propriedade Provider dele */
  const context = useContext(fullscreenContext)

  if (!context) throw new Error('isFullScreen é null. Certifique-se de que ele possui um valor.')
  return context
}