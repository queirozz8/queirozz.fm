import { useContext } from 'react';
import { currentFilterOnContext } from './CurrentFilterOnContext';

export default function useCurrentFilterOn() {
  /* UseContext retorna o valor do Context currentFilterOnContext que está sendo armazenado na propriedade Provider dele */
  const context = useContext(currentFilterOnContext)

  if (!context) throw new Error('CurrentFilterOn é null. Certifique-se de que ele possui um valor.')
  return context
}