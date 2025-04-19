import { useState, useRef } from "react"
import RemoveFilters from "./RemoveFilters"
import { Item, SetItemsType, KeyItemsType } from "../../Sidebar"
/* Função que atualiza uma propriedade específica de um botão do objeto filters */
import setterFilterProperty from "../../utils/setterFilterProperty"
import useFilterEffects from "../../hooks/useFilterEffects"
import { bgColors, textColors } from "../../utils/tailwindClasses"

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
  const prevValuesOfIsOn = useRef<{ playlists: boolean; artists: boolean; albums: boolean; }>({
    playlists: filters.playlists.isOn,
    artists: filters.artists.isOn,
    albums: filters.albums.isOn
  })

  /* Variável que verifica se algum filtro está ligado. Ela serve para definir se o botão de remover filtros deve ser exibido ou não.
  Ela é um useRef — e não uma variável normal —, porque ela será alterada dentro de um useEffect. */
  const isSomeFilterOn = useRef<boolean>(false)


  /* UseEffect que é executado quando a propriedade "isOn" de algum dos botões dentro de filters mudam. 
  Esse useEffect fica responsável de modificar as propriedades bg e text do botão que tiver seu isOn alterado.
  Futuramente ele vai filtrar as playlists/artistas que estiverem na barra lateral */
  useFilterEffects(filters, setFilters, isSomeFilterOn, prevValuesOfIsOn, items, setItems)

  
  return (
    <div className="flex items-center gap-3">
      {/* { Botão de remover os filtros — Só é exibido quando algum filtro é ativado } */}
      <RemoveFilters filters={filters} setFilters={setFilters} isSomeFilterOn={isSomeFilterOn.current} />

      <div className="flex items-center gap-2">
        { Object.entries(filters).map(([filter, filterConfig]) => {
          return (
            <button 
              onPointerOver={ () => !filterConfig.isOn && setterFilterProperty(filter, 'bg', bgColors.hovered, filters, setFilters, isSomeFilterOn) }
              onPointerDown={ () => (
                filterConfig.isOn
                ? setterFilterProperty(filter, 'bg', bgColors.clickingWhenOn, filters, setFilters, isSomeFilterOn) 
                : setterFilterProperty(filter, 'bg', bgColors.clicking, filters, setFilters, isSomeFilterOn)
              ) }
              onPointerUp={ () => setterFilterProperty(filter, 'isOn', !filterConfig.isOn, filters, setFilters, isSomeFilterOn) }
              onPointerLeave={ () => !filterConfig.isOn && setterFilterProperty(filter, 'bg', bgColors.normal, filters, setFilters, isSomeFilterOn) }
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