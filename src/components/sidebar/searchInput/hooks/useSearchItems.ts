import { useEffect, RefObject } from 'react';
import useCurrentFilterOn from '../../../../contexts/currentFilterOn/useCurrentFilterOn';
import useItems from '../../../../contexts/items/useItems';
import { KeyItemsType } from '../../../../contexts/items/ItemsContext';
import useSearchInputValue from '../../../../contexts/searchInputValue/inputValue/useSearchInputValue';
import useShouldFilter from '../../../../contexts/searchInputValue/shouldFilter/useShouldFilter';
import { defaultItemClass } from '../../../utils/tailwindClasses';


export default function useSearchItems(isFirstRender: RefObject<boolean>) {
  const {inputValue} = useSearchInputValue()
  const { items, setItems } = useItems()
  const {setShouldFilter} = useShouldFilter()


  /* Função que filtra os itens por texto */
  function filterItems() {
    /* Se essa função foi executada, então ele deve filtrar por texto */
    setShouldFilter(true)
    Object.entries(items).forEach(([item, itemDetails]) => {
      setItems(prev => {
        /* Assertion types para o TypeScript saber que os tipos estão corretos */
        const itemTyped = item as KeyItemsType
        return {
          ...prev,
          [itemTyped]: {
            ...prev[itemTyped],
            /* Se o título do item atual incluir o texto do input, então ele será exibido. Caso contrário, ele é ocultado.
            Se existir um botão de filtro ligado, então os tipos dos itens também precisarão ser verificados pelo filtro. */
            class: currentFilterOn
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
      /* Se não existir nada dentro do input, então ele não deve filtrar por texto */
      if (!inputValue) setShouldFilter(false)
      /* Já reinicia todos os itens se o input estiver vazio e nenhum outro botão de filtro estiver ligado. 
      Essa verificação existe com currentFilterOn, pois se não existisse, o usuário poderia deixar o input
      vazio e o código voltaria todos os itens à exibição, por mais que exista um botão de filtro ativado. */
      if (!inputValue && !currentFilterOn && !isFirstRender.current) {
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
      /* Se o input ficar vazio, mas ainda existir um botão de filtro ligado,
      então eu só faço a lógica normal de filtragem dos botões de filtro. */
      } else if (!inputValue && currentFilterOn) {
        Object.entries(items).forEach(([item, itemDetails]) => {
          setItems(prev => {
            /* Assertion types para o TypeScript saber que os tipos estão corretos */
            const itemTyped = item as keyof typeof prev
    
            return {
              ...prev,
              [itemTyped]: {
                ...prev[itemTyped],
                class: itemDetails.type === currentFilterOn
                  ? defaultItemClass // Mostra se for do mesmo tipo
                  : defaultItemClass.replace('flex gap-2', 'hidden') // Esconde se for de tipo diferente
              }
            }
          })
        })
      }
      /* filterItems() verificará se existe um outro filtro ligado (e mudar a sua lógica) na função setterItems(). */
      else if (inputValue) filterItems()
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

  /* Independente se algum filtro ligado mudar, ele sempre estará chamando a função filterItems() se existir algo dentro de inputValue.
  Dentro de filterItems(), ele irá verificar se existe um filtro ligado, e realizar a lógica adaptada se existir. */
  useEffect(() => {
    if (inputValue) filterItems()
    
    /* Aqui, eu desabilito o ESLint, porque ele estava pedindo que inputValue estivesse dentro do array de dependências do useEffect.
    Mas isso faz com que esse useEffect seja executado indesejadamente. Aqui, não tem nenhum risco em fazer essa verificação com inputValue. */
    /* eslint-disable-next-line */
  }, [currentFilterOn])
};