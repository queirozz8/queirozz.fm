import { RefObject } from 'react'
import { filter } from '../Filters'

/* Tipo do setter do estado */
type setFiltersType = React.Dispatch<React.SetStateAction<Record<string, filter>>>

/* Função para modificar as propriedades de um determinado filtro */
export default function setterFilterProperty(
  filter: string, 
  property: string, 
  value: string | boolean,
  /* Outras variáveis que são necessárias para o contexto geral da função, mas não serão modificadas diretamente */
  filters: Record<string, filter>,
  setFilters: setFiltersType,
  isSomeFilterOn: RefObject<boolean>) {

  /* Se um botão for ligado, mas já houver outro botão ligado também, então desativamos o primeiro botão e depois ativamos o atual, normalmente. */
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