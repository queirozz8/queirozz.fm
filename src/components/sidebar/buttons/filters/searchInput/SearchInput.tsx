import { useState } from "react"
import ClearButton from "../../../../buttons/ClearButton"
import { normalColor, lightNormalColor, clickedColor } from "../../../../utils/tailwindClasses"
import { Search, List } from "lucide-react"


export default function SearchInput() {
  const [inputValue, setInputValue] = useState<string>('')
  const [searchIsOn, setSearchIsOn] = useState<boolean>(false)
  const [searchButtonColor, setSearchButtonColor] = useState<string>(normalColor)

  const [colorOrderButton, setColorOrderButton] = useState<string>(normalColor)

  return (
    <div className="flex items-center">
      <div
        onPointerOver={ () => setSearchButtonColor(lightNormalColor) }
        onClick={ () => setSearchIsOn(prev => !prev) }
        onTouchEnd={ () => setSearchIsOn(prev => !prev) }
        onPointerLeave={ () => setSearchButtonColor(normalColor) }
        className="size-fit p-[6px] rounded-4xl bg-transparent hover:bg-[#2a2a2a] z-50 transition cursor-pointer"
      >
        <label className="cursor-pointer" htmlFor="search-items">
          <Search color={searchButtonColor} size={20} />
        </label>
      </div>

      <input
        value={inputValue}
        onChange={ (e) => setInputValue(e.target.value) }
        className={`${searchIsOn ? 'opacity-100' : 'opacity-0 right-96'} relative w-56 right-10 p-1 pl-11 rounded-lg text-zinc-300 bg-[#2a2a2a]
        placeholder:text-sm placeholder:text-zinc-300 transition-all focus:outline-none focus:ring-0 placeholder:select-none`}
        type="text"
        placeholder="Buscar em Sua Biblioteca"
        id="search-items"
      />

      <div 
        onPointerUp={ () => setSearchIsOn(false) }
        className="flex items-center absolute left-[12.8rem] size-fit">
        <ClearButton inputValue={inputValue} setInputValue={setInputValue} isSidebar={true} />
      </div>

      {/* Botão de ordem dos itens da sidebar */}
      <div
        onPointerOver={ () => colorOrderButton !== clickedColor && setColorOrderButton(lightNormalColor) }
        onPointerDown={ () => setColorOrderButton(clickedColor) }
        onPointerUp={ () => {
          setColorOrderButton(lightNormalColor)
          if (!inputValue) setSearchIsOn(false)
        } }
        onPointerLeave={ () => setColorOrderButton(normalColor) } 
        className={`flex justify-center items-center gap-2 relative ${searchIsOn ? 'right-[1.90rem]' : 'right-[6.5rem]'} w-fit text-[var(--normal-color)]
        hover:text-white hover:scale-105 active:scale-95 active:text-[#7a7a7a] transition-transform cursor-pointer`}
      >
        <p className={`${searchIsOn ? 'hidden' : 'inline'} select-none`}>Recentes</p>
        <List color={colorOrderButton} size={20} />
      </div>
    </div>
  )
};