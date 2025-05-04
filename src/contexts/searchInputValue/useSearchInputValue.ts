import { useContext } from 'react';
import { searchInputValueContext } from './SearchInputValueContext';

export default function useSearchInputValue() {
  /* UseContext retorna o valor do Context currentFilterOnContext que está sendo armazenado na propriedade Provider dele */
  const context = useContext(searchInputValueContext)

  if (!context) throw new Error('SearchInputValueContext é null. Certifique-se de que ele possui um valor.')
  return context
}