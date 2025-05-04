import { Item, SetItemsType, KeyItemsType } from "../../../Sidebar"
import { Filter, KeyFiltersType } from "../../filters/Filters"
import { CurrentFilterOnSetterType } from '../../../../../contexts/currentFilterOn/CurrentFilterOnContext';
import { defaultItemClass } from "../../../../utils/tailwindClasses"

export default function SetterItems(
  filters: Record<KeyFiltersType, Filter>,
  filter: KeyFiltersType,
  isOn: boolean,
  items: Record<KeyItemsType, Item>,
  setItems: SetItemsType,
  setCurrentFilterOn: CurrentFilterOnSetterType) {
  /* Se o botão foi ativado: */
  if (isOn) {
    /* Define qual foi o filtro ativado, baseado no título do filtro (plural) e no tipo do item (singular) */
    setCurrentFilterOn(() => (
      filters[filter].title.startsWith('Playlist') ? 'Playlist' :
      filters[filter].title.startsWith('Artista') ? 'Artista' :
      filters[filter].title.startsWith('Álbu') ? 'Álbum' : ''
    ))
    
    /* === useEffect dentro de useFilterEffects.ts será executado, filtrando os itens === */

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
};
