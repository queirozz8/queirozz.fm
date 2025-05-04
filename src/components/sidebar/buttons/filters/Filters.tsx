import { useState, useRef } from "react"
import { Item, KeyItemsType, SetItemsType } from "../../Sidebar"
/* Função que atualiza uma propriedade específica de um botão do objeto filters */
import useCurrentFilterOn from "../../../../contexts/currentFilterOn/useCurrentFilterOn"
import setterFilterProperty from "./utils/setterFilterProperty"
import useFilterEffects from "./hooks/useFilterEffects"
import { bgColors, textColors } from "../../../utils/tailwindClasses"

/* Nesse código, eu poderia ter feito uma solução um pouco mais simples,
criando por exemplo, um estado para cada botão, ao invés de um estado centralizado.
Mas eu quis criar uma solução escalável, e não uma solução simples, porém limitada. */

/* Tipo de cada botão de fitro (que é uma propriedade dentro do objeto filters) */
export type Filter = {
  isOn: boolean
  bg: 'bg-[#2a2a2a]' | 'bg-[#333333]' | 'bg-[#444444]' | 'bg-[#ffffff]' | 'bg-[#c6c6c6]'
  text: 'text-zinc-200' | 'text-zinc-700'
  title: string
}

export type KeyFiltersType = 'playlists' | 'artists' | 'albums'

/* Tipo do setter do estado filters. Ele é definido aqui pois useFilterEffects usará ele. */
export type SetFiltersType = React.Dispatch<React.SetStateAction<Record<string, Filter>>>

type Props = {
  items: Record<KeyItemsType, Item>
  setItems: SetItemsType
}


export default function Filters({ items, setItems }: Props) {
  /* Estado centralizado que contém todos os botões de filtro.
  Cada propriedade dentro de filters representa um botão. */
  const [filters, setFilters] = useState<Record<string, Filter>>({
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
    },

    albums: {
      isOn: false,
      bg: bgColors.normal,
      text: textColors.normal,
      title: "Álbuns"
    }
  })
  
  /* Objeto que armazena os valores antigos das propriedades "isOn" dos botões.
  Ela servirá no useEffect, para verificar qual "isOn" dos botões mudou. Para assim mudar os valores das propriedades corretamente. */
  const prevValuesOfIsOn = useRef<Record<KeyFiltersType, boolean>>({
    playlists: filters.playlists.isOn,
    artists: filters.artists.isOn,
    albums: filters.albums.isOn
  })

  const {currentFilterOn} = useCurrentFilterOn()

  /* UseEffect que é executado quando a propriedade "isOn" de algum dos botões dentro de filters mudam. 
  Esse useEffect fica responsável de modificar as propriedades bg e text do botão que tiver seu isOn alterado,
  e filtrar os itens na barra lateral. */
  useFilterEffects(filters, setFilters, prevValuesOfIsOn, items, setItems)
  
  return (
    <>
      {/* Div que engloba todos os botões de filtro */}
      <div className="flex items-center gap-2">
        { Object.entries(filters).map(([filter, filterConfig]) => {
          /* Assertion types para o TypeScript saber que os tipos estão corretos */
          const filterTyped = filter as KeyFiltersType

          return (
            /* Botão de filtro */
            <button 
              onPointerOver={ () => !filterConfig.isOn && setterFilterProperty(filterTyped, 'bg', bgColors.hovered, currentFilterOn, filters, setFilters) }
              onPointerDown={ () => (
                filterConfig.isOn
                ? setterFilterProperty(filterTyped, 'bg', bgColors.clickingWhenOn, currentFilterOn, filters, setFilters) 
                : setterFilterProperty(filterTyped, 'bg', bgColors.clicking, currentFilterOn, filters, setFilters)
              ) }
              onPointerUp={ () => setterFilterProperty(filterTyped, 'isOn', !filterConfig.isOn, currentFilterOn, filters, setFilters) }
              onPointerLeave={ () => !filterConfig.isOn && setterFilterProperty(filterTyped, 'bg', bgColors.normal, currentFilterOn, filters, setFilters) }
              className={`flex justify-center items-center relative right-1 w-fit px-3 py-[0.40rem] rounded-4xl 
              text-sm ${filterConfig.text} font-semibold ${filterConfig.bg} transition cursor-pointer select-none`}
              key={filterConfig.title} /* Diferencia ele dos outros botões */
            >
              {filterConfig.title}
            </button>
          )
        }) }
      </div>
    </>
  )
};