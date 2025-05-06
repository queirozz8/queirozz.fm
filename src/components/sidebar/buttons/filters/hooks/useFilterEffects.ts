import { useEffect, RefObject } from "react"
import setterItems from "../../items/utils/setterItems"
import useCurrentFilterOn from "../../../../../contexts/currentFilterOn/useCurrentFilterOn"
import useSearchInputValue from "../../../../../contexts/searchInputValue/useSearchInputValue"
import useItems from "../../../../../contexts/items/useItems"
import { Filter, KeyFiltersType, SetFiltersType } from '../../filters/Filters'
import { bgColors, textColors } from "../../../../utils/tailwindClasses"
import { defaultItemClass } from "../../../../utils/tailwindClasses"

export default function useFilterEffects(
  filters: Record<KeyFiltersType, Filter>,
  setFilters: SetFiltersType,
  prevValuesOfIsOn: RefObject<Record<KeyFiltersType, boolean>>
) {

  const { currentFilterOn, setCurrentFilterOn } = useCurrentFilterOn()
  const {inputValue} = useSearchInputValue()
  const { items, setItems } = useItems()

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
        setterItems(filters, filterTyped, filters[filterTyped].isOn, items, setItems, setCurrentFilterOn)
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
  }, [filters, setFilters, filters.playlists.isOn, filters.artists.isOn, prevValuesOfIsOn, items, setItems, currentFilterOn, setCurrentFilterOn])


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
            class: itemDetails.type !== currentFilterOn
              ? defaultItemClass.replace('flex gap-2', 'hidden') // Esconde se for de tipo diferente
              : defaultItemClass // Mostra se for do mesmo tipo
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
};