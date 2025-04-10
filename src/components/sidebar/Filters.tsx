import { useState, useEffect, useRef } from "react"
import RemoveFilters from "./buttons/RemoveFilters"

/* Nesse código, eu poderia ter feito uma solução um pouco mais simples,
criando por exemplo, um estado para cada botão, ao invés de um estado centralizado.
Mas eu quis criar uma solução escalável, e não uma solução simples, porém limitada. */

/* Cores de background para os botões de filtro */
const bgColors = {
  normal: 'bg-[#2a2a2a]',
  hovered: 'bg-[#333333]',
  clicking: 'bg-[#444444]',
  clicked: 'bg-[#ffffff]',
  clickingWhenOn: 'bg-[#c6c6c6]'
} as const

/* Cores de texto para os botões de filtro */
const textColors = {
  normal: 'text-zinc-200',
  clicked: 'text-zinc-700'
} as const

/* Tipo de cada botão de fitro (que é uma propriedade dentro do objeto filters) */
type filter = {
  isOn: boolean
  bg: 'bg-[#2a2a2a]' | 'bg-[#333333]' | 'bg-[#444444]' | 'bg-[#ffffff]' | 'bg-[#c6c6c6]'
  text: 'text-zinc-200' | 'text-zinc-700'
  title: string
}


export default function Filters() {
  /* Estado centralizado que contém todos os botões de filtro.
  Cada propriedade dentro de filters representa um botão. */
  const [filters, setFilters] = useState<Record<string, filter>>({
    playlists: {
      isOn: false,
      bg: bgColors.normal,
      text: textColors.normal,
      title: 'Playlists'
    },
    
    artists: {
      isOn: false,
      bg: bgColors.normal,
      text: textColors.normal,
      title: 'Artistas'
    }
  })
  
  /* Objeto que armazena os valores antigos das propriedades "isOn" dos botões.
  Ela servirá no useEffect, para verificar qual "isOn" dos botões mudou. Para assim mudar os valores das propriedades corretamente. */
  const prevValuesOfIsOn = useRef<{ playlists: boolean; artists: boolean }>({
    playlists: filters.playlists.isOn,
    artists: filters.artists.isOn
  })

  /* Variável que verifica se algum filtro está ligado. Ela serve para definir se o botão de remover filtros deve ser exibido ou não. */
  const isSomeFilterOn = useRef<boolean>(false)
  

  /* Função para modificar as propriedades de um determinado filtro */
  function setterFilterProperty(filter: string, property: string, value: string | boolean) {
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


  /* UseEffect que é executado quando a propriedade "isOn" de algum dos botões dentro de filters mudam. 
  Esse useEffect fica responsável de modificar as propriedades bg e text do botão que tiver seu isOn alterado. */
  useEffect(() => {
    /* Nessa explicação, os botões de filtro serão chamados somente de "filtros".
      Dentro desse loop, percorremos todos os filtros. Cada filtro possui um estado isOn, indicando se está ativado ou não.
      Armazenamos todos os estados anteriores de isOn de cada filtro usando useRef (prevValuesOfIsOn), e comparamos com o estado atual (que está dentro de filters).
      Se:
        Se o valor anterior (prevIsOn) for diferente do atual (filters[filter].isOn), significa que esse filtro foi ativado ou desativado recentemente.
          Nesse caso, aplicamos as alterações visuais (cores de bg e text) apenas a esse filtro. */
    Object.entries(prevValuesOfIsOn.current).forEach(([filter, prevIsOn]) => {
      if (prevIsOn !== filters[filter].isOn) {
        setFilters(prev => ({
          ...prev,
          [filter]: {
            ...prev[filter],
            bg: prev[filter].isOn ? bgColors.clicked : bgColors.hovered,
            text: prev[filter].isOn ? textColors.clicked : textColors.normal
          }
        }))

        if (filters[filter].isOn) isSomeFilterOn.current = true
        /* Se um filtro anterior estiver ligado, mas o atual do loop não estiver, então isSomeFilterOn iria receber false, mesmo que o botão anterior estivesse ligado.
        Sendo assim, fazemos essa verificação para saber se o botão anterior estava ligado ou não. */
        else if (!filters[filter].isOn && isSomeFilterOn.current !== true) isSomeFilterOn.current = false
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
  }, [filters, filters.playlists.isOn, filters.artists.isOn])

  return (
    <div className="flex items-center gap-3">
      {/* { Botão de remover os filtros — Só é exibido quando algum filtro é ativado } */}
      <RemoveFilters isSomeFilterOn={isSomeFilterOn.current} />

      <div className="flex items-center gap-3">
        { Object.entries(filters).map(([filter, filterConfig]) => {
          return (
            <button 
              onPointerOver={ () => !filterConfig.isOn && setterFilterProperty(filter, 'bg', bgColors.hovered) }
              onPointerDown={ () => filterConfig.isOn ? setterFilterProperty(filter, 'bg', bgColors.clickingWhenOn) : setterFilterProperty(filter, 'bg', bgColors.clicking) }
              onPointerUp={ () => { setterFilterProperty(filter, 'isOn', !filterConfig.isOn); console.log(filterConfig, filterConfig.isOn) } }
              onPointerLeave={ () => !filterConfig.isOn && setterFilterProperty(filter, 'bg', bgColors.normal) }
              className={`flex justify-center items-center relative right-1 w-fit px-3 py-[0.40rem] rounded-4xl 
              text-sm ${filterConfig.text} font-semibold ${filterConfig.bg} transition cursor-pointer`}
              key={filterConfig.title} /* Diferencia ele dos outros botões */
            >
              {filterConfig.title}
            </button>
          )
        }) }
      </div>
    </div>
  )
};