import { useEffect, RefObject } from "react"
import setterItems from "../../items/utils/SetterItems"
import { UseCurrentFilterOn } from "../../../../../contexts/CurrentFilterOnContext"
import { Filter, KeyFiltersType, SetFiltersType } from '../../filters/Filters'
import { Item, KeyItemsType, SetItemsType } from "../../../Sidebar"
import { bgColors, textColors } from "../../../../utils/tailwindClasses"

export default function useFilterEffects(
  filters: Record<KeyFiltersType, Filter>,
  setFilters: SetFiltersType,
  isSomeFilterOn: RefObject<boolean>,
  prevValuesOfIsOn: RefObject<Record<KeyFiltersType, boolean>>,
  items: Record<KeyItemsType, Item>,
  setItems: SetItemsType,
) {

  const { currentFilterOn, setCurrentFilterOn } = UseCurrentFilterOn()


  useEffect(() => {
    /* Se o valor anterior (prevIsOn) for diferente do atual (filters[filter].isOn):
      Significa que esse filtro foi ativado ou desativado recentemente.
      Nesse caso, aplicamos as alterações visuais (cores de bg e text) a esse filtro. */
    
    Object.entries(prevValuesOfIsOn.current).forEach(([filter, prevIsOn]) => {
      /* Assertion types para o TypeScript saber que os tipos estão corretos */
      const filterTyped = filter as KeyFiltersType

      if (prevIsOn !== filters[filterTyped].isOn) {
        setFilters(prev => {
          const newFilters = {
            ...prev,
            [filterTyped]: {
              ...prev[filterTyped],
              bg: prev[filterTyped].isOn ? bgColors.clicked : bgColors.hovered,
              text: prev[filterTyped].isOn ? textColors.clicked : textColors.normal
            }
          }

          isSomeFilterOn.current = Object.values(newFilters).some(filter => filter.isOn)
          
          return newFilters
        })

        /* Aqui não tem problema em pegar um valor de um estado logo depois de ter modificado ele;
        pois as propriedades que mudaram e as propriedades que estão sendo passadas para a função são diferentes. */
        setterItems(filters, filterTyped, filters[filterTyped].isOn, items, setItems, currentFilterOn, setCurrentFilterOn)
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
  }, [filters, setFilters, filters.playlists.isOn, filters.artists.isOn, isSomeFilterOn, prevValuesOfIsOn, items, setItems, currentFilterOn, setCurrentFilterOn])
};