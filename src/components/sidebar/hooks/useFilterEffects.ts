import { RefObject, useEffect } from "react"
import { Filter } from '../buttons/filters/Filters'
import { bgColors, textColors } from "../utils/bgAndTextColors"

/* Tipo do setter do estado */
type setFiltersType = React.Dispatch<React.SetStateAction<Record<string, Filter>>>

export default function useFilterEffects(
  filters: Record<string, Filter>,
  setFilters: setFiltersType,
  isSomeFilterOn: RefObject<boolean>,
  prevValuesOfIsOn: RefObject<object>,
) {
  useEffect(() => {
    /* Nessa explicação, os botões de filtro serão chamados somente de "filtros".
      Dentro desse loop, percorremos todos os filtros. Cada filtro possui um estado isOn, indicando se está ativado ou não.
      Armazenamos todos os estados anteriores de isOn de cada filtro usando useRef (prevValuesOfIsOn), e comparamos com o estado atual (que está dentro de filters).
      Se:
        Se o valor anterior (prevIsOn) for diferente do atual (filters[filter].isOn), significa que esse filtro foi ativado ou desativado recentemente.
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

          const atLeastOneOn = Object.values(newFilters).some(filter => filter.isOn)
          isSomeFilterOn.current = atLeastOneOn
          
          return newFilters
        })
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
  }, [filters, setFilters, filters.playlists.isOn, filters.artists.isOn, isSomeFilterOn, prevValuesOfIsOn])
};
