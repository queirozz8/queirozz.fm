import { useContext } from 'react';
import { shouldFilterContext } from './ShouldFilterContext';

export default function useShouldFilter() {
  /* UseContext retorna o valor do Context currentFilterOnContext que está sendo armazenado na propriedade Provider dele */
  const context = useContext(shouldFilterContext)

  if (!context) throw new Error('ShouldFilter é null. Certifique-se de que ele possui um valor.')
  return context
}