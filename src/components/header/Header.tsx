import { useState, ChangeEvent } from 'react'
import CreateButton from '../buttons/CreateButton'
import ClearButton from '../buttons/ClearButton'
import UserButton from './buttons/UserButton'
import { House, Compass, Search, CircleArrowDown, Bell } from 'lucide-react'
import { normalColor, lightNormalColor, clickedColor } from '../utils/tailwindClasses'

export default function Header() {
  /* Estados dos elementos */
  const [colorHouseButton, setColorHouseButton] = useState<string>(normalColor)
  const [colorSearchButton, setColorSearchButton] = useState<string>('#b3b3b3')
  const [inputValue, setInputValue] = useState<string>('')
  const [colorCompassButton, setColorCompassButton] = useState<string>(normalColor)
  const [colorInstallButton, setColorInstallButton] = useState<string>('#b3b3b3')
  const [colorBellButton, setColorBellButton] = useState<string>(normalColor)

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) { setInputValue(e.target.value) }

  return (
    <header className='flex justify-between items-center sticky w-screen p-2'>

      {/* Ícone do queirozz.fm no canto superior esquerdo */}
      <a className='hidden sm:inline relative right-[0.4rem] cursor-pointer z-10 select-none' href="https://github.com/queirozz8/queirozz.fm" target='_blank'>
        <svg width="200" height="40" viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="60" rx="10" fill="#0F0F0F"/>
          <path d="M20 30C22 24 24 24 26 30C28 36 30 36 32 30C34 24 36 24 38 30C40 36 42 36 44 30C46 24 48 24 50 30" stroke="#8F00FF" strokeWidth="2" strokeLinecap="round"/>
          <text x="60" y="38" fill="white" fontFamily="Fira Code, monospace" fontSize="21">queirozz.fm</text>
        </svg>
      </a>

      {/* Seção de busca que engloba o input central com seus outros botões */}
      <search className='flex justify-center items-center gap-1 absolute left-[3.7rem] w-screen'>
        
        {/* Botão de Início */}
        <button
          onPointerOver={ () => setColorHouseButton(prev => prev === clickedColor ? prev : lightNormalColor) }
          onPointerDown={ () => setColorHouseButton(clickedColor) }
          onClick={ () => setColorHouseButton(normalColor) }
          onPointerLeave={ () => setColorHouseButton(normalColor) }
          className='p-3 rounded-4xl bg-[#1f1f1f] hover:bg-[var(--bg-color)] hover:scale-105 active:scale-95 active:bg-[#1c1c1c] transition cursor-pointer' 
          title='Início'
          type='button'
        > 
          <House color={colorHouseButton} /> 
        </button>

        {/* Label/botão de busca */}
        <label 
          onPointerOver={ () => setColorSearchButton(lightNormalColor) } 
          onPointerLeave={ () => setColorSearchButton(normalColor) } 
          className='relative left-4 w-0 cursor-pointer' 
          title='Buscar' 
          htmlFor="search-music"
        > 
          <Search color={colorSearchButton} />
        </label>

        {/* Input central */}
        <input
          onChange={e => handleInputChange(e)}
          value={inputValue}
          className='w-[27.1rem] h-12 p-3 pt-3 pr-24 pl-12 border border-[#1f1f1f] rounded-3xl text-zinc-100 bg-[#1f1f1f]
          placeholder:text-[#b3b3b3] duration-500 [&:hover,&:focus]:bg-[#2b2b2a] [&:hover,&:focus]:border-[#3d3c3d] transition-all placeholder:select-none'
          placeholder="O que você quer ouvir?"
          type="text" 
          id="search-music" 
        />

        {/* Div dos outros botões adicionais do input */}
        <div className='flex justify-center items-center gap-3 relative right-[3.5rem]' title='Navegar'>

          <div className='flex items-center absolute right-12'>
            {/* Botão de apagar tudo */}
            <ClearButton inputValue={inputValue} setInputValue={setInputValue} isSidebar={false} />
          </div>

          {/* Linha vertical que separa o botão de apagar tudo do botão de Navegar */}
          <svg xmlns="http://www.w3.org/2000/svg" width="1" height="26">
            <line x1="0.5" y1="0" x2="0.5" y2="28" stroke="#767777" strokeWidth="1"/>
          </svg>

          {/* Botão de Navegar */}
          <button 
            onPointerOver={ () => setColorCompassButton(prev => prev === clickedColor ? prev : lightNormalColor) } 
            onPointerDown={ () => setColorCompassButton(clickedColor) }
            onClick={ () => setColorCompassButton(normalColor) }
            onPointerLeave={ () => setColorCompassButton(normalColor) } 
            className='hover:scale-105 active:scale-95 transition cursor-pointer'
            title='Navegar' 
            type='button'
          > 
            <Compass color={colorCompassButton} size={27} /> 
          </button>
        </div>

        {/* Botão de Criar com seu respectivo menu */}
        <div className='relative left-[2.6rem]'>
          <CreateButton isSidebar={false} />
        </div>
      </search>

      {/* Seção dos outros botões do Header. Engloba:
      - Botões de "Ver planos Premium" e "Instalar aplicativo";
      - Botão de Novidades
      - Botão de Usuário */}
      <section className='flex justify-center items-center gap-6'>

        {/* Div dos botões de "Ver planos Premium" e "Instalar aplicativo" */}
        <nav className='flex justify-center items-center gap-6 relative right-2'>

          {/* Botão de "Ver planos Premium" */}
          <button className='hidden lg:flex justify-center items-center w-[10.2rem] h-8 p-4 rounded-3xl text-sm font-extrabold bg-white 
            hover:scale-105 active:scale-95 active:bg-[#c6c6c7] transition cursor-pointer [word-spacing:-0.125rem] select-none' 
            type='button'
          >
            Ver planos Premium
          </button>

          {/* Botão/Link de "Instalar aplicativo" */}
          <a 
            onPointerOver={ () => setColorInstallButton(lightNormalColor) }
            onClick={ () => setColorInstallButton(lightNormalColor) }
            onPointerDown={ () => setColorInstallButton(clickedColor) }
            onPointerLeave={ () => setColorInstallButton(normalColor) }
            className='hidden 1.2xl:flex justify-center items-center gap-[0.5rem] relative right-1 text-[#a1a1a1] text-sm font-extrabold 
            hover:scale-105 hover:text-white active:scale-95 active:text-[var(--clicked-color)] transition-transform cursor-pointer [word-spacing:-0.125rem] select-none'
            href='#'
          >
            <span> <CircleArrowDown color={colorInstallButton} size={17} /> </span>
            <span>Instalar aplicativo</span>
          </a>
        </nav>

        {/* Botão de Novidades */}
        <button
          onPointerOver={ () => setColorBellButton(prev => prev === clickedColor ? prev : lightNormalColor) } 
          onClick={ () => setColorBellButton(normalColor) }
          onPointerDown={ () => setColorBellButton(clickedColor) }
          onPointerLeave={ () => setColorBellButton(normalColor) } 
          className='hidden sm:flex justify-center items-center hover:scale-105 transition z-10 cursor-pointer' 
          title='Novidades'
        >
          <Bell color={colorBellButton} size={18} />
        </button>

        {/* Botão de usuário com seu respectivo menu */}
        <UserButton />
      </section>
    </header>
  )
}