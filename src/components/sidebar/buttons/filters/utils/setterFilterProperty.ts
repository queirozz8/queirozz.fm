import { RefObject } from 'react'
import { Filter, KeyFiltersType, SetFiltersType } from '../Filters'

/* Função para modificar as propriedades de um determinado filtro */
export default function setterFilterProperty(
  filter: KeyFiltersType, 
  property: 'isOn' | 'bg' | 'text' | 'title',
  value: string | boolean,
  /* Outras variáveis que são necessárias para o contexto geral da função, mas não serão modificadas diretamente */
  filters: Record<KeyFiltersType, Filter>,
  setFilters: SetFiltersType,
  isSomeFilterOn: RefObject<boolean>) {

  /* Se um botão for ligado, mas já houver outro botão ligado também, então desativamos o primeiro botão e depois ativamos o atual, simultaneamente. */
  if (property === 'isOn' && value === true && isSomeFilterOn.current) {
    Object.entries(filters).forEach(([previousFilter, filterConfig]) => {
      if (filterConfig.isOn) {
        setFilters(prev => (
          {
            ...prev,
            [previousFilter]: {
              ...prev[previousFilter],
              isOn: false
            },

            [filter]: {
              ...prev[filter],
              isOn: true
            }
          }
        ))
      }
    })
  /* Se for só um caso normal, onde um botão está sendo ligado ou desligado (quando ele mesmo já estava ligado antes, não outro botão): */
  } else {
    setFilters(prev => (
      {
        ...prev,
        [filter]: {
          ...prev[filter],
          [property]: value
        }
      }
    ))
  }
}