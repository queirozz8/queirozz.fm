import { useEffect, RefObject } from 'react';
import useItems from '../../../../contexts/items/useItems';
import { KeyItemsType } from '../../../../contexts/items/ItemsContext';
import useSearchInputValue from '../../../../contexts/searchInputValue/useSearchInputValue';
import useCurrentFilterOn from '../../../../contexts/currentFilterOn/useCurrentFilterOn';
import { defaultItemClass } from '../../../utils/tailwindClasses';


export default function useSearchItems(isFirstRender: RefObject<boolean>) {
  const {inputValue} = useSearchInputValue()
  const { items, setItems } = useItems()


  function filterItems() {
    Object.entries(items).forEach(([item, itemDetails]) => {
      setItems(prev => {
        /* Assertion types para o TypeScript saber que os tipos estão corretos */
        const itemTyped = item as KeyItemsType
        return {
          ...prev,
          [itemTyped]: {
            ...prev[itemTyped],
            /* Se o título do item atual incluir o texto do input, então ele será exibido. Caso contrário, ele é ocultado */
            class: currentFilterOn
            /* Se existir um botão de filtro ligado, então os filtros também precisarão ser verificados por ele */
            ? itemDetails.title.toLowerCase().includes(inputValue.toLowerCase()) && itemDetails.type === currentFilterOn
              ? defaultItemClass
              : defaultItemClass.replace('flex', 'hidden')
            /* Caso contrário, só faz a filtragem normal */
            : itemDetails.title.toLowerCase().includes(inputValue.toLowerCase())
              ? defaultItemClass
              : defaultItemClass.replace('flex', 'hidden')
          }
        }
      })
    })
  }

  const { currentFilterOn } = useCurrentFilterOn()
  
  useEffect(() => {
    /* Debounce para evitar ficar re-renderizando excessivamente */
    const debounce = setTimeout(() => {
      /* Já reinicia todos os itens se o input estiver voltado para o estado vazio */
      if (!inputValue && !isFirstRender.current && !currentFilterOn) {
        Object.keys(items).forEach(item => {
          /* Assertion types para o TypeScript saber que os tipos estão corretos */
          const itemTyped = item as KeyItemsType
          
          setItems(prev => {
            return {
              ...prev,
              [itemTyped]: {
                ...prev[itemTyped],
                class: defaultItemClass
              }
            }
          })
        })
      } else if (inputValue) filterItems()
        
      else if (!inputValue && currentFilterOn) {
        Object.entries(items).forEach(([item, itemDetails]) => {
          setItems(prev => {
            /* Assertion types para o TypeScript saber que os tipos estão corretos */
            const itemTyped = item as keyof typeof prev
    
            return {
              ...prev,
              [itemTyped]: {
                ...prev[itemTyped],
                class: itemDetails.type !== currentFilterOn
                  ? defaultItemClass.replace('flex gap-2', 'hidden') // Esconde se for de tipo diferente
                  : defaultItemClass // Mostra se for do mesmo tipo
              }
            }
          })
        })
      }
    }, 300)
    
    /* Agora será considerado, pois o useEffect executa tudo isso quando a página carrega. E não queremos que ele gere um loop infinito. */
    isFirstRender.current = false

    /* Um return dentro de um useEffect agenda o que está dentro dele para a próxima execução desse mesmo useEffect.
    Sendo assim, então o cancelamento do setTimeout (antes dele executar) ocorrerá quando houver uma outra execução do useEffect.
    E se houver um timeout chamado debounce, o TS cancelará ele. */
    return () => clearTimeout(debounce)
    /* Desabilitei o ESLint porque ele não entende que a lógica está realmente segura.
    Ele exigia que items e setItems estivessem no array de dependências, mas isso faria com que caísse em um loop infinito;
    Pois setItems muda items; e se items está no array de dependências, o useEffect será executado de novo, gerando um loop indesejado.
    Aqui, items não é usado para fazer verificações ou algo do tipo. Por isso é seguro desabilitar.
    As chaves de items (o motivo pelo qual estamos usando ele dentro do useEffect) são fixas, então também é seguro desabilitar. */
    // eslint-disable-next-line
  }, [inputValue])

  useEffect(() => {
    if (inputValue) filterItems()
    
    /* Aqui, eu desabilito o ESLint, porque ele estava pedindo que inputValue estivesse dentro do array de dependências do useEffect.
    Mas isso faz com que esse useEffect seja executado indesejadamente. Aqui, não tem nenhum risco em fazer essa verificação com inputValue. */
    /* eslint-disable-next-line */
  }, [currentFilterOn])
};