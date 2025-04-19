import { useEffect, useRef, useCallback, RefObject } from "react"
import { Filter } from '../buttons/filters/Filters'
import { Item, SetItemsType, KeyItemsType } from "../Sidebar"
import { bgColors, textColors } from "../utils/tailwindClasses"
import { defaultItemClass } from "./../utils/tailwindClasses"
/* Tipo do setter do estado filters */
import { SetFiltersType } from "../utils/setterFilterProperty"


export default function useFilterEffects(
  filters: Record<string, Filter>,
  setFilters: SetFiltersType,
  isSomeFilterOn: RefObject<boolean>,
  prevValuesOfIsOn: RefObject<object>,
  items: Record<KeyItemsType, Item>,
  setItems: SetItemsType
) {
  /* Poderia declarar essa função dentro do useEffect, mas isso a recriaria a cada render. 
  Para evitar isso e manter o site leve, usei useCallback. (Futuramente vai virar um arquivo separado.) */
  const setterItems = useCallback((filter: string, isOn: boolean) => {
    /* Se o botão foi ativado: */
    if (isOn) {
      /* Define qual foi o filtro ativado, baseado no título do filtro (plural) e no tipo do item (singular) */
      if (filters[filter].title.startsWith('Playlist')) currentFilterOn.current = 'Playlist'
      else if (filters[filter].title.startsWith('Artista')) currentFilterOn.current = 'Artista'
      else if (filters[filter].title.startsWith('Álbu')) currentFilterOn.current = 'Álbum'
      
      /* Itera pelos itens, atualizando a classe com base no filtro ligado */
      Object.entries(items).forEach(([item, itemDetails]) => {
        setItems(prev => {
          const itemTyped = item as keyof typeof prev

          return {
            ...prev,
            [itemTyped]: {
              ...prev[itemTyped],
              class: itemDetails.type !== currentFilterOn.current
                ? defaultItemClass.replace('flex gap-2', 'hidden') // Esconde se for de tipo diferente
                : defaultItemClass // Mostra se for do mesmo tipo
            }
          }
        })
      })
    /* Se o botão foi desativado: */
    } else {
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
      /* Se nenhum outro está ligado, volta todos os itens ao estado padrão */
      else {
        Object.keys(items).forEach(item => {
          setItems(prev => {
            const itemTyped = item as keyof typeof prev
  
            const newItems = {
              ...prev,
              [itemTyped]: {
                ...prev[itemTyped],
                class: defaultItemClass
              }
            }
  
            return newItems
          })
        })
      }
    }
  }, [filters, items, setItems])

  const currentFilterOn = useRef<'Playlist' | 'Artista' | 'Álbum' | ''>('')

  useEffect(() => {
    /* Se o valor anterior (prevIsOn) for diferente do atual (filters[filter].isOn):
      Significa que esse filtro foi ativado ou desativado recentemente.
      Nesse caso, aplicamos as alterações visuais (cores de bg e text) a esse filtro. */
    
    Object.entries(prevValuesOfIsOn.current).forEach(([filter, prevIsOn]) => {
      if (prevIsOn !== filters[filter].isOn) {
        setFilters(prev => {
          const newFilters = {
            ...prev,
            [filter]: {
              ...prev[filter],
              bg: prev[filter].isOn ? bgColors.clicked : bgColors.hovered,
              text: prev[filter].isOn ? textColors.clicked : textColors.normal
            }
          }

          isSomeFilterOn.current = Object.values(newFilters).some(filter => filter.isOn)
          
          return newFilters
        })

        /* Aqui não tem problema em pegar um valor de um estado logo depois de ter modificado ele;
        pois as propriedades que mudaram e as propriedades que estão sendo passadas para a função são diferentes. */
        setterItems(filter, filters[filter].isOn)
      }
    })

    /* Atualiza os isOn antigos (prevValuesOfIsOn) para ter o valor atual
    (que se tornará de novo o valor anterior quando esse useEffect for executado novamente;
    pois se useEffect for executado, significa que algum isOn do objeto filters teve o seu valor alterado;
    fazendo prevValuesOfIsOn virar o valor antigo daquele isOn novamente) */
    Object.keys(prevValuesOfIsOn.current).forEach(filter => {
      prevValuesOfIsOn.current = {
        ...prevValuesOfIsOn.current,
        [filter]: filters[filter].isOn
      }
    })
  }, [filters, setFilters, filters.playlists.isOn, filters.artists.isOn, isSomeFilterOn, prevValuesOfIsOn, items, setItems, setterItems])
};