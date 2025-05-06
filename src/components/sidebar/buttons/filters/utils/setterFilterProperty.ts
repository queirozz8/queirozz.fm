import { Filter, KeyFiltersType, SetFiltersType } from '../Filters'
import { CurrentFilterOnType } from './../../../../../contexts/currentFilterOn/CurrentFilterOnContext';

/* Função para modificar as propriedades de um determinado filtro */
export default function SetterFilterProperty(
  filter: KeyFiltersType, 
  property: 'isOn' | 'bg' | 'text' | 'title',
  value: string | boolean,
  /* Eu pego os parâmetros abaixo por props e não importando o context, porque o React reclamaria que setterFilterProperty não é um componente ou um hook */
  filters: Record<KeyFiltersType, Filter>,
  setFilters: SetFiltersType,
  currentFilterOn: CurrentFilterOnType) {
  /* Outras variáveis que são necessárias para o contexto geral da função, mas não serão modificadas diretamente */
  /* Se um botão for ligado, mas já houver outro botão ligado também, então desativamos o primeiro botão e depois ativamos o atual, simultaneamente. */
  if (property === 'isOn' && value === true && currentFilterOn) {
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