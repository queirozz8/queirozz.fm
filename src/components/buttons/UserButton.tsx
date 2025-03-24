import { useState } from 'react'
import { User, SquareArrowOutUpRight } from 'lucide-react'

export default function UserButton() {
  const [isUserButtonClicked, setIsUserButtonClicked] = useState<boolean>(false)
  const lightNormalColor: string = '#fffefe'

  return (
      /* Div que engloba o botão de Usuário e o seu menu */
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
  )
};
