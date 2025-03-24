import { useState, ChangeEvent } from 'react'
import CreateButton from './CreateButton'
import { House, Compass, Search, CircleArrowDown, Bell, User, X,
SquareArrowOutUpRight } from 'lucide-react'

export default function Header() {
  /* Criação de variáveis contendo o hex das cores mais usadas pelos elementos. 
  Vale somente para o TypeScript */
  const normalColor: string = '#989999'
  const lightNormalColor: string = '#fffefe'
  const clickedColor: string = '#7a7a7a'

  /* Estados dos elementos */
  const [colorHouseButton, setColorHouseButton] = useState<string>(normalColor)
  const [colorSearchButton, setColorSearchButton] = useState<string>('#b3b3b3')
  const [inputValue, setInputValue] = useState<string>('')
  const [colorCompassButton, setColorCompassButton] = useState<string>(normalColor)
  const [colorInstallButton, setColorInstallButton] = useState<string>('#b3b3b3')
  const [colorBellButton, setColorBellButton] = useState<string>(normalColor)
  const [isUserButtonClicked, setIsUserButtonClicked] = useState<boolean>(false)

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) { setInputValue(e.target.value) }

  return (
    <header className='flex justify-between items-center sticky w-screen p-2'>

      {/* Ícone branco do Spotify no canto superior esquerdo */}
      <a className='size-8 ml-5 cursor-pointer z-10' href="#">
        <img title='Spotify' src="/spotify-white.png" alt="Spotify logo" />
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

        {/* Botão de Criar */}
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

        {/* Div que enbloba o botão de Usuário e o seu menu */}
        <div onBlur={ () => setIsUserButtonClicked(false) }>

          {/* Botão de Usuário */}
          <button 
            onClick={ () => setIsUserButtonClicked(prev => !prev) } 
            className='relative p-3 rounded-4xl bg-[#1f1f1f] hover:scale-105 active:scale-95 active:bg-[#181818] transition z-10 cursor-pointer' 
            title='Usuário' 
            type='button'
          >
            <User color='#a1a1a1' size={25} />
          </button>

          {/* Menu do botão de usuário (Só é exibido quando é clicado) */}
          <menu
            onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
            /* Os displays não conflitam pois o block/hidden é adicionado dinâmicamente; ou seja, sobrescreve todos os outros displays existentes. */
            className={`flex flex-col justify-center absolute ${isUserButtonClicked ? 'block' : 'hidden'} top-14 right-0 w-[14.3rem] h-80 px-2 py-1 rounded-lg bg-[var(--bg-color)] transition box-content`}
          >
            <li><button 
              onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
              onClick={ () => setIsUserButtonClicked(false) } /* Evento para computadores */
              onTouchEnd={ () => setIsUserButtonClicked(false) } /* Evento para dispositivos móveis */
              className='flex justify-between items-center w-full h-12 pl-[0.40rem] text-sm text-[var(--light-normal-color)] hover:bg-[#3e3e3e] group'
            >
              <h1>Conta</h1>
              <span> <SquareArrowOutUpRight color={lightNormalColor} size={18} /> </span>
            </button></li>

            <li><button 
              onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
              onClick={ () => setIsUserButtonClicked(false) } /* Evento para computadores */
              onTouchEnd={ () => setIsUserButtonClicked(false) } /* Evento para dispositivos móveis */
              className='flex items-center w-full h-12 pl-[0.40rem] text-sm text-[var(--light-normal-color)] hover:bg-[#3e3e3e] group'
            >
              <h1 className='group-hover:underline group-active:no-underline'>Perfil</h1>  
            </button></li>
            
            <li><button 
              onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
              onClick={ () => setIsUserButtonClicked(false) } /* Evento para computadores */
              onTouchEnd={ () => setIsUserButtonClicked(false) } /* Evento para dispositivos móveis */
              className='flex justify-between items-center w-full h-12 pl-[0.40rem] text-sm text-[var(--light-normal-color)] hover:bg-[#3e3e3e] group'
            >
              <h1 className='group-hover:underline group-active:no-underline'>Faça upgrade para o Premium</h1>
              <span> <SquareArrowOutUpRight color={lightNormalColor} size={18} /> </span>
            </button></li>
            
            <li><button 
              onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
              onClick={ () => setIsUserButtonClicked(false) } /* Evento para computadores */
              onTouchEnd={ () => setIsUserButtonClicked(false) } /* Evento para dispositivos móveis */
              className='flex justify-between items-center w-full h-12 pl-[0.40rem] text-sm text-[var(--light-normal-color)] hover:bg-[#3e3e3e] group'
            >
              <h1 className='group-hover:underline group-active:no-underline'>Suporte</h1>
              <span> <SquareArrowOutUpRight color={lightNormalColor} size={18} /> </span>
            </button></li>
            
            <li><button
              onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
              onClick={ () => setIsUserButtonClicked(false) } /* Evento para computadores */
              onTouchEnd={ () => setIsUserButtonClicked(false) } /* Evento para dispositivos móveis */
              className='flex justify-between items-center w-full h-12 pl-[0.40rem] text-sm text-[var(--light-normal-color)] hover:bg-[#3e3e3e] group'
            >
              <h1 className='group-hover:underline group-active:no-underline'>Baixar</h1>
              <span> <SquareArrowOutUpRight color={lightNormalColor} size={18} /> </span>
            </button></li>

            <li><button 
              onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
              onClick={ () => setIsUserButtonClicked(false) } /* Evento para computadores */
              onTouchEnd={ () => setIsUserButtonClicked(false) } /* Evento para dispositivos móveis */
              className='flex items-center w-full h-12 pl-[0.40rem] text-sm text-[var(--light-normal-color)] hover:bg-[#3e3e3e] group'
            >
              <h1 className='group-hover:underline group-active:no-underline'>Configurações</h1>
            </button></li>

            {/* Linha horizontal que separa os outros botões do botão de sair */}
            <svg className='-m-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 20">
              <line x1="-100" y1="10" x2="470" y2="10" stroke="#656666" strokeWidth="0.7"/>
            </svg>

            <li><button 
              onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
              onClick={ () => setIsUserButtonClicked(false) } /* Evento para computadores */
              onTouchEnd={ () => setIsUserButtonClicked(false) } /* Evento para dispositivos móveis */
              className='flex items-center w-full h-12 pl-[0.40rem] text-sm text-[var(--light-normal-color)] hover:bg-[#3e3e3e]'
            >
              <h1>Sair</h1>
            </button></li>
          </menu>
        </div>
      </section>
    </header>
  )
}