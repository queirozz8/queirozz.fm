import { useContext } from 'react';
import { itemsContext } from './ItemsContext';

export default function useItems() {
  /* UseContext retorna o valor do Context currentFilterOnContext que está sendo armazenado na propriedade Provider dele */
  const context = useContext(itemsContext)

  if (!context) throw new Error('Items é null. Certifique-se de que ele possui um valor.')
  return context
}