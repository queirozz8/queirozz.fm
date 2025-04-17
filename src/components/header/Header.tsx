import { useState, ChangeEvent } from 'react'
import CreateButton from '../buttons/CreateButton'
import UserButton from './buttons/UserButton'
import { House, Compass, Search, CircleArrowDown, Bell, X } from 'lucide-react'
import spotifyWhite from '@assets/images/spotify_white.jpg'

export default function Header() {
  /* Criação de variáveis contendo o hex das cores mais usadas pelos elementos. 
  Vale somente para o TypeScript */
  const normalColor = '#989999'
  const lightNormalColor = '#fffefe'
  const clickedColor = '#7a7a7a'

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

      {/* Ícone branco do Spotify no canto superior esquerdo */}
      <a className='size-8 ml-5 cursor-pointer z-10' href="">
        <img title='Spotify' src={spotifyWhite} alt="Spotify logo" />
      </a>

      {/* Seção de busca que engloba o input central com seus outros botões */}
      <search className='flex justify-center items-center gap-1 absolute left-[5.1rem] w-screen'>
        
        {/* Botão de Início */}
        <button
          onPointerOver={ () => setColorHouseButton(prev => prev === clickedColor ? prev : lightNormalColor) }
          onPointerLeave={ () => setColorHouseButton(normalColor) }
          onPointerDown={ () => setColorHouseButton(clickedColor) }
          onPointerUp={ () => setColorHouseButton(normalColor) }
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
          htmlFor="search"
        > 
          <Search color={colorSearchButton} />
        </label>

        {/* Input central */}
        <input
          onChange={e => handleInputChange(e)}
          value={inputValue}
          className='w-[27.1rem] h-12 p-3 pt-3 pr-24 pl-12 border border-[#1f1f1f] rounded-3xl text-zinc-100 bg-[#1f1f1f]
          placeholder:text-[#b3b3b3] duration-500 [&:hover,&:focus]:bg-[#2b2b2a] [&:hover,&:focus]:border-[#3d3c3d] transition-all'
          placeholder="O que você quer ouvir?"
          type="text" 
          id="search" 
        />

        {/* Div dos outros botões adicionais do input */}
        <div className='flex justify-center items-center gap-3 relative right-[6.3rem]' title='Navegar'>

          {/* Botão de apagar tudo */}
          <button 
            onClick={ () => setInputValue('') } 
            className={`${inputValue !== '' ? 'opacity-100' : 'opacity-0'} transition cursor-pointer`} 
            type='button'
          >
            <X color={normalColor} size={30} strokeWidth={1.5} />
          </button>

          {/* Linha vertical que separa o botão de apagar tudo do botão de Navegar */}
          <svg xmlns="http://www.w3.org/2000/svg" width="1" height="26">
            <line x1="0.5" y1="0" x2="0.5" y2="28" stroke="#767777" strokeWidth="1"/>
          </svg>

          {/* Botão de Navegar */}
          <button 
            onPointerOver={ () => setColorCompassButton(prev => prev === clickedColor ? prev : lightNormalColor) } 
            onPointerLeave={ () => setColorCompassButton(normalColor) } 
            onPointerDown={ () => setColorCompassButton(clickedColor) }
            onPointerUp={ () => setColorCompassButton(normalColor) }
            className='hover:scale-105 active:scale-95 transition cursor-pointer'
            title='Navegar' 
            type='button'
          > 
            <Compass color={colorCompassButton} size={27} /> 
          </button>
        </div>

        {/* Botão de Criar com seu respectivo menu */}
        <CreateButton isSidebar={false} />
      </search>

      {/* Seção dos outros botões do Header. Engloba:
      - Botões de "Ver planos Premium" e "Instalar aplicativo";
      - Botão de Novidades
      - Botão de Usuário */}
      <section className='flex justify-center items-center gap-6'>

        {/* Div dos botões de "Ver planos Premium" e "Instalar aplicativo" */}
        <nav className='flex justify-center items-center gap-6 relative right-2'>

          {/* Botão de "Ver planos Premium" */}
          <button className='flex justify-center items-center w-[10.2rem] h-8 p-4 rounded-3xl text-sm font-extrabold bg-white 
            hover:scale-105 active:scale-95 active:bg-[#c6c6c7] transition cursor-pointer [word-spacing:-2px]' type='button'
          >
            Ver planos Premium
          </button>

          {/* Botão/Link de "Instalar aplicativo" */}
          <a 
            onPointerOver={ () => setColorInstallButton(lightNormalColor) }
            onPointerLeave={ () => setColorInstallButton(normalColor) }
            onPointerDown={ () => setColorInstallButton(clickedColor) }
            onPointerUp={ () => setColorInstallButton(lightNormalColor) }
            className='flex justify-center items-center gap-[0.5rem] relative right-1 text-[#a1a1a1] text-sm font-extrabold 
            hover:scale-105 hover:text-[var(--light-normal-color)] active:scale-95 active:text-[var(--clicked-color)] transition-transform cursor-pointer [word-spacing:-2px]'
            href='#'
          >
            <span> <CircleArrowDown color={colorInstallButton} size={17} /> </span>
            <span>Instalar aplicativo</span>
          </a>
        </nav>

        {/* Botão de Novidades */}
        <button
          onPointerOver={ () => setColorBellButton(prev => prev === clickedColor ? prev : lightNormalColor) } 
          onPointerLeave={ () => setColorBellButton(normalColor) } 
          onPointerDown={ () => setColorBellButton(clickedColor) }
          onPointerUp={ () => setColorBellButton(normalColor) }
          className='flex justify-center items-center hover:scale-105 transition z-10 cursor-pointer' 
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