import { RefObject, useEffect } from 'react';
import { Item, KeyItemsType, SetItemsType } from './../../Sidebar';
import { defaultItemClass } from './../../../utils/tailwindClasses';


export default function useSearchItems(
  inputValue: string,
  items: Record<KeyItemsType, Item>,
  setItems: SetItemsType,
  isFirstRender: RefObject<boolean>
) {
  useEffect(() => {
    /* Debounce para evitar ficar re-renderizando excessivamente */
    const debounce = setTimeout(() => {
      /* Já reinicia todos os itens se o input estiver voltado para o estado vazio */
      if (!inputValue && !isFirstRender.current) {
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
      } else if (inputValue) {
        Object.keys(items).forEach(item => {
            setItems(prev => {
              /* Assertion types para o TypeScript saber que os tipos estão corretos */
              const itemTyped = item as KeyItemsType
              return {
                ...prev,
                [itemTyped]: {
                  ...prev[itemTyped],
                  /* Se o título do item atual incluir o texto do input, então ele será exibido. Caso contrário, ele é ocultado */
                  class: item.toLowerCase().includes(inputValue.toLowerCase()) ? defaultItemClass : defaultItemClass.replace('flex', 'hidden')
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
};