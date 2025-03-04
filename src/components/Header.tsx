import { useState } from 'react'
import { House, Compass, Search, CircleArrowDown, Plus, Bell, User } from 'lucide-react'

export default function Header() {
  const [buttonText, setButtonText] = useState<string>('')
  const [colorHouseButton, setColorHouseButton] = useState<string>('#989999')
  const [colorInstallIcon, setColorInstallIcon] = useState<string>('#a1a1a1')

  /* Estou adicionando as classes por aqui, e não por `hover:` para que o botão consiga esperar pelo texto vindo. 
  Se não, o botão fica com um tamanho e posição alterados (que se estabiliza quando o texto vem pelo TS) antes do TS adicionar o texto; 
  o que faz com que o mouse saia de cima do botão, pois o botão mudou de lugar, porque o TS ainda não teve tempo de adicionar o texto;
  com o mouse fora do botão, ele se recolhe e o texto não é exibido. Isso fica num loop eterno.
  Então eu estou adicionando as classes pelo TS, para que tudo venha ao mesmo tempo e esse erro não ocorra. */

  function handleMouseOverPlus(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove('right-0')
      e.target.classList.add('pr-6', '-right-15')
      setButtonText('Criar')
    }
  }

  function handleMouseLeavePlus(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove('pr-6', '-right-15')
      e.target.classList.add('right-0')
      setButtonText('')
    }
  }


  return (
    <header className='flex justify-between items-center relative w-screen p-2'>
      <img className='w-8 h-8 ml-5 cursor-pointer' title='Spotify' src="/spotify-white.png" alt="Spotify logo" />

      <div className='flex justify-center items-center gap-3 absolute w-screen'>
        <div className='flex justify-center items-center gap-1 relative left-5'>
          <button 
            onMouseOver={ () => setColorHouseButton('#fffefe') } 
            onMouseLeave={ () => setColorHouseButton('#989999') } 
            className='p-3 rounded-4xl bg-[#1f1f1f] cursor-pointer transition hover:bg-[#2b2b2a] hover:scale-105' 
            title='Início'
            type='button'> 
              <House color={colorHouseButton} /> 
          </button>

          <label className='relative left-4 w-0 cursor-pointer' title='Buscar' htmlFor="search"> <Search color='#989999' /> </label>
          <input 
            className='w-[434px] h-12 p-3 pl-12 pr-20 text-zinc-100 bg-[#1f1f1f] border border-[#1f1f1f] rounded-3xl
            placeholder:text-[#c3c3c3] transition-all duration-500 [&:hover,&:focus]:bg-[#2b2b2a] [&:hover,&:focus]:border-[#3d3c3d]'
            placeholder="O que você quer ouvir?"
            type="text" 
            id="search" 
          />

          <button
            onMouseOver={e => handleMouseOverPlus(e)} 
            onMouseLeave={e => handleMouseLeavePlus(e)} 
            className='flex justify-center items-center gap-2 relative left-1 p-2 rounded-4xl text-[#cdcdcd] font-bold bg-[#1f1f1f] cursor-pointer transition duration-300 ease-in-out' 
            title='Crie uma playlist, pasta ou Jam'
            type='button'>
              <Plus color='#989999' size={30} /> <span>{buttonText}</span>
          </button>
        </div>
        
        <div className='flex justify-center items-center gap-3 relative right-24' title='Navegar'>
          <div className='w-[1px] h-7 border border-[#767777]'></div>
          <button className='cursor-pointer' title='Navegar' type='button'> <Compass color='#989999' size={27} /> </button>
        </div>
      </div>

      <div className='flex justify-center items-center gap-6'>
        <div className='flex justify-center items-center gap-6 relative right-2'>
          <button className='flex justify-center items-center h-8 p-4 text-sm font-bold rounded-3xl bg-white cursor-pointer' type='button'>Ver planos Premium</button>
          <a 
            href='#'
            onMouseOver={ () => setColorInstallIcon('#fffefe') }
            onMouseLeave={ () => setColorInstallIcon('#a1a1a1') }
            className='flex justify-center items-center gap-2 text-[#a1a1a1] cursor-pointer text-sm font-bold hover:text-[#fffefe] transition-transform hover:scale-110'
            draggable="false"> 
              <span> <CircleArrowDown color={colorInstallIcon} size={18} /> </span>
              <span>Instalar aplicativo</span>
          </a>
        </div>

        <button className='flex justify-center items-center cursor-pointer' title='Novidades'> <Bell color='#a1a1a1' size={18} /> </button>
        <button className='p-3 bg-[#1f1f1f] rounded-4xl cursor-pointer' title='Usuário'>
          <User color='#a1a1a1' size={25} />
        </button>
      </div>
    </header>
  )
}