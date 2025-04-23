import { useState, useRef } from "react"
import { Item, KeyItemsType, SetItemsType } from "../../Sidebar"
/* Função que atualiza uma propriedade específica de um botão do objeto filters */
import setterFilterProperty from "./utils/setterFilterProperty"
import useFilterEffects from "./hooks/useFilterEffects"
import { bgColors, textColors, normalColor, lightNormalColor, clickedColor } from "../../../utils/tailwindClasses"
import { Search, List } from "lucide-react"

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

  /* Variável que verifica se algum filtro está ligado. Ela serve para impedir que múltiplos botões possam ser ligados.
  Ela é um useRef — e não uma variável normal —, porque ela será alterada dentro de um useEffect. */
  const isSomeFilterOn = useRef<boolean>(false)

  /* UseEffect que é executado quando a propriedade "isOn" de algum dos botões dentro de filters mudam. 
  Esse useEffect fica responsável de modificar as propriedades bg e text do botão que tiver seu isOn alterado.
  Futuramente ele vai filtrar as playlists/artistas que estiverem na barra lateral */
  useFilterEffects(filters, setFilters, isSomeFilterOn, prevValuesOfIsOn, items, setItems)

  const [searchIsOn, setSearchIsOn] = useState<boolean>(false)
  const [searchButtonColor, setSearchButtonColor] = useState<string>(normalColor)

  const [colorOrderButton, setColorOrderButton] = useState<string>(normalColor)
  
  return (
    <>
      <div className="flex items-center gap-2">
        { Object.entries(filters).map(([filter, filterConfig]) => {
          /* Assertion types para o TypeScript saber que os tipos estão corretos */
          const filterTyped = filter as KeyFiltersType

          return (
            <button 
              onPointerOver={ () => !filterConfig.isOn && setterFilterProperty(filterTyped, 'bg', bgColors.hovered, filters, setFilters, isSomeFilterOn) }
              onPointerDown={ () => (
                filterConfig.isOn
                ? setterFilterProperty(filterTyped, 'bg', bgColors.clickingWhenOn, filters, setFilters, isSomeFilterOn) 
                : setterFilterProperty(filterTyped, 'bg', bgColors.clicking, filters, setFilters, isSomeFilterOn)
              ) }
              onPointerUp={ () => setterFilterProperty(filterTyped, 'isOn', !filterConfig.isOn, filters, setFilters, isSomeFilterOn) }
              onPointerLeave={ () => !filterConfig.isOn && setterFilterProperty(filterTyped, 'bg', bgColors.normal, filters, setFilters, isSomeFilterOn) }
              className={`flex justify-center items-center relative right-1 w-fit px-3 py-[0.40rem] rounded-4xl 
              text-sm ${filterConfig.text} font-semibold ${filterConfig.bg} transition cursor-pointer`}
              key={filterConfig.title} /* Diferencia ele dos outros botões */
            >
              {filterConfig.title}
            </button>
          )
        }) }
      </div>

      <div className="flex items-center">
        <div
          onPointerOver={ () => setSearchButtonColor(lightNormalColor) }
          onClick={ () => setSearchIsOn(prev => !prev) }
          onTouchEnd={ () => setSearchIsOn(prev => !prev) }
          onPointerLeave={ () => setSearchButtonColor(normalColor) }
          className="size-fit p-[6px] rounded-4xl bg-transparent hover:bg-[#2a2a2a] z-50 cursor-pointer"
        >
          <label className="cursor-pointer" htmlFor="search">
            <Search color={searchButtonColor} size={20} />
          </label>
        </div>

        <input
          className={`${searchIsOn ? 'opacity-100' : 'opacity-0 right-96'} relative right-10 p-1 pl-11 rounded-xl bg-[#2a2a2a] placeholder:text-sm placeholder:text-zinc-300 transition-all`}
          type="text"
          placeholder="Buscar em Sua Biblioteca"
          id="search"
        />

        <div
          onPointerOver={ () => colorOrderButton !== clickedColor && setColorOrderButton(lightNormalColor) }
          onPointerDown={ () => setColorOrderButton(clickedColor) }
          onPointerUp={ () => setColorOrderButton(lightNormalColor) }
          onPointerLeave={ () => setColorOrderButton(normalColor) } 
          className="flex justify-center items-center gap-2 relative right-[8.3rem] w-fit text-[var(--normal-color)]
          hover:text-white hover:scale-105 active:scale-95 active:text-[#7a7a7a] transition cursor-pointer"
        >
          <p className="select-none">Recentes</p>
          <List color={colorOrderButton} size={20} />
        </div>
      </div>
    </>
  )
};