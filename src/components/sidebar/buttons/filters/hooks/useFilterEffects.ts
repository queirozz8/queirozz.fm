import { useEffect, RefObject } from "react"
import useSetterItems from "../../items/utils/useSetterItems"
import useCurrentFilterOn from "../../../../../contexts/currentFilterOn/useCurrentFilterOn"
import useItems from "../../../../../contexts/items/useItems"
import { Filter, KeyFiltersType, SetFiltersType } from '../../filters/Filters'
import { bgColors, textColors } from "../../../../utils/tailwindClasses"

export default function useFilterEffects(
  filters: Record<KeyFiltersType, Filter>,
  setFilters: SetFiltersType,
  prevValuesOfIsOn: RefObject<Record<KeyFiltersType, boolean>>
) {
  const { currentFilterOn, setCurrentFilterOn } = useCurrentFilterOn()
  const { items, setItems } = useItems()
  /* Esse hook existe justamente para pegar os valores dos contexts para a função setterItems poder ser executada
  com o acesso às variáveis necessárias. Mas como setterItems não é um componente, nem um hook, eu não consigo
  pegar os contexts sem transformar ele num dos dois. Mas ele é executado condicionalmente, e o React não permite isso também.
  Por isso, esse hook existe, justamente para conseguir pegar os valores dessas variáveis, e passar elas para setterItems. */
  const setterItems = useSetterItems(filters, setCurrentFilterOn)

  /* Basicamente, esse useEffect muda as propriedades de cores dos botões quando eles são desligados e ligados,
  e o setterItems filtra os itens da sidebar baseado no filtro atual ligado. */
  useEffect(() => {
    /* Se o valor anterior (prevIsOn) for diferente do atual (filters[filter].isOn):
      Significa que esse filtro foi ativado ou desativado recentemente.
      Nesse caso, aplicamos as alterações visuais (cores de bg e text) a esse filtro. */
    
    Object.entries(prevValuesOfIsOn.current).forEach(([filter, prevIsOn]) => {
      /* Assertion types para o TypeScript saber que os tipos estão corretos */
      const filterTyped = filter as KeyFiltersType

      if (prevIsOn !== filters[filterTyped].isOn) {
        setFilters(prev => {
          return {
            ...prev,
            [filterTyped]: {
              ...prev[filterTyped],
              bg: prev[filterTyped].isOn ? bgColors.clicked : bgColors.hovered,
              text: prev[filterTyped].isOn ? textColors.clicked : textColors.normal
            }
          }
        })

        /* Aqui não tem problema em pegar um valor de um estado logo depois de ter modificado ele;
        pois as propriedades que mudaram e as propriedades que estão sendo passadas para a função são diferentes. */
        setterItems(filterTyped, filters[filterTyped].isOn)
      }
    })

    /* Atualiza os isOn antigos (prevValuesOfIsOn) para ter o valor atual
    (que se tornará de novo o valor anterior quando esse useEffect for executado novamente;
    pois se useEffect for executado, significa que algum isOn do objeto filters teve o seu valor alterado;
    fazendo prevValuesOfIsOn virar o valor antigo daquele isOn novamente) */
    Object.keys(prevValuesOfIsOn.current).forEach(filter => {
      /* Assertion types para o TypeScript saber que os tipos estão corretos */
      const filterTyped = filter as KeyFiltersType

      prevValuesOfIsOn.current = {
        ...prevValuesOfIsOn.current,
        [filter]: filters[filterTyped].isOn
      }
    })
  }, [filters, setFilters, filters.playlists.isOn, filters.artists.isOn, prevValuesOfIsOn, currentFilterOn, setCurrentFilterOn, items, setItems, setterItems])
};