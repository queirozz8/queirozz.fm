import { useEffect } from "react";
import { Filter, KeyFiltersType } from "../../filters/Filters"
import { CurrentFilterOnSetterType } from '../../../../../contexts/currentFilterOn/CurrentFilterOnContext';
import useCurrentFilterOn from "../../../../../contexts/currentFilterOn/useCurrentFilterOn";
import useItems from "../../../../../contexts/items/useItems";
import useSearchInputValue from "../../../../../contexts/searchInputValue/inputValue/useSearchInputValue";
import { defaultItemClass } from "../../../../utils/tailwindClasses"

export default function useSetterItems(filters: Record<KeyFiltersType, Filter>, setCurrentFilterOn: CurrentFilterOnSetterType) {
  const {currentFilterOn} = useCurrentFilterOn()
  const { items, setItems } = useItems()
  const {inputValue} = useSearchInputValue()

  /* UseEffect do setterItems, que será executado quando o filtro atual ligado mudar
  Ele filtra quais são os itens que serão exibidos ou não, baseado no filtro atual ligado */
  useEffect(() => {
    /* Verifica se existe algum outro filtro ligado */
    const isSomeOtherFilterOn = Object.values(filters).some(filterConfig => filterConfig.isOn)
    /* Se o filtro atual estiver desligado e também não houver nenhum outro ligado, então ele não deve filtrar nenhum item
    Se existir texto dentro do input ainda, então também não é para ele fazer nada. UseSearchItems.ts já cuida de tudo. */
    if ((!currentFilterOn && !isSomeOtherFilterOn) || inputValue) return;
    /* Se estiver algum filtro ligado, então ele Itera pelos itens, atualizando a classe com base no filtro ligado */
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
  /* Desabilitei o ESLint porque ele não entende que a lógica está realmente segura.
    Ele exigia que setItems estivessem no array de dependências, mas isso faria com que caísse em um loop infinito;
    Pois setItems muda items; e se items está no array de dependências, o useEffect será executado de novo, gerando um loop indesejado.
    Aqui, items não é usado para fazer verificações ou algo do tipo. Por isso é seguro desabilitar.
    As chaves de items (o motivo pelo qual estamos usando ele dentro do useEffect) são fixas, então também é seguro desabilitar. */
  /* eslint-disable-next-line */
  }, [currentFilterOn])


  /* Função real que começará tudo */
  function setterItems(filter: KeyFiltersType, isOn: boolean) {
    /* Se o botão foi ativado: */
    if (isOn) {
      /* Define qual foi o filtro ativado, baseado no título do filtro (plural) e no tipo do item (singular) */
      setCurrentFilterOn(() => (
        filters[filter].title.startsWith('Playlist') ? 'Playlist' :
        filters[filter].title.startsWith('Artista') ? 'Artista' :
        filters[filter].title.startsWith('Álbu') ? 'Álbum' : ''
      ))
      
      /* === useEffect será executado, filtrando os itens === */
  
    /* Se o botão foi desativado: */
    } else {
      /* Resumo: verifica se existe um outro filtro ligado. */
      /* Como eu faço um forEach, se essas verificações não existissem e eu ativasse, por exemplo, o filtro de artistas e depois ativar o da playlist, ele faria isso:
      - Filtraria todas as playlists, pois playlists agora foi ligado;
      - Voltaria todos os filtros para o normal, pois artistas mudou para desativado, e quando um botão é desativado, os filtros voltam todos ao normal.
      
      Isso não acontece com playlists (desativei playlists e liguei artistas/álbuns), pois a ordem do loop segue a mesma ordem de ativação e desativação dos botões.
      Sendo assim, fazemos as verificações somente para os botões seguintes. 
      Verificamos se algum outro filtro que não seja ele está ligado. Se sim, então ele não faz nada.
      Aqui eu poderia fazer de uma forma mais simples, mas eu quis criar uma solução escalável. */
      const isSomeOtherFilterOn = Object.keys(filters).some(filterBeingTurnedOff => {
        const index = Object.keys(filters).indexOf(filterBeingTurnedOff)
        if (index === 1 || index === 2) {
          /* Faz um outro loop de novo.
          Para ver se existe algum outro filtro ligado (incluindo os anteriores à ele na ordem; por isso o loop, e não só usar a mesma variável do loop passado)
          que não tenha o mesmo índice que ele mesmo */
          return Object.entries(filters).some(([otherFilter, otherFilterConfig]) => (
            otherFilterConfig.isOn && Object.keys(filters).indexOf(otherFilter) !== index
          ))
        }
      })
      
      if (isSomeOtherFilterOn) return;
      /* Se não existe nenhum outro filtro ligado, e o atual foi desligado, então não existe nenhum filtro ligado atualmente */
      setCurrentFilterOn('')
      /* Se nenhum outro está ligado, volta todos os itens ao estado padrão */
      Object.keys(items).forEach(item => {
        setItems(prev => {
          /* Assertion types para o TypeScript saber que os tipos estão corretos */
          const itemTyped = item as keyof typeof prev
  
          return {
            ...prev,
            [itemTyped]: {
              ...prev[itemTyped],
              class: defaultItemClass
            }
          }
        })
      })
    }
  }
  return setterItems
};
