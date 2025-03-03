import { useState } from 'react'
import { House, Compass, Search, CircleArrowDown, Plus, Bell, User } from 'lucide-react'

export default function Header() {
  const [buttonText, setButtonText] = useState<string | null>(null)

  /* Estou adicionando as classes por aqui, e não por `hover:` para que o botão consiga esperar pelo texto vindo. 
  Se não, o botão fica com um tamanho e posição alterados (que se estabiliza quando o texto vem pelo TS) antes do TS adicionar o texto; 
  o que faz com que o mouse saia de cima do botão, pois o botão mudou de lugar, porque o TS ainda não teve tempo de adicionar o texto;
  com o mouse fora do botão, ele se recolhe e o texto não é exibido. Isso fica num loop eterno.
  Então eu estou adicionando as classes pelo TS, para que tudo venha ao mesmo tempo e esse erro não ocorra. */

  function handleMouseOver(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove('right-0')
      e.target.classList.add('pr-6', '-right-15')
      setButtonText('Criar')
    }
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove('pr-6', '-right-15')
      e.target.classList.add('right-0')
      setButtonText(null)
    }
  }

  return (
    <header className='flex justify-between items-center relative w-screen p-2'>
      <img className='w-8 h-8 ml-5 cursor-pointer' title='Spotify' src="/spotify-white.png" alt="Spotify logo" />

      <div className='flex justify-center items-center gap-3 absolute right-96 mr-[18.5rem]'>
        <div className='flex justify-center items-center gap-2 relative'>
          <button className='p-3 rounded-4xl bg-[#1f1f1f] cursor-pointer' title='Início'> <House color='#989999' /> </button>
          <label className='cursor-pointer absolute left-[4.5rem]' title='Buscar' htmlFor="search"> <Search color='#989999' /> </label>
          <input className='w-[434px] h-12 p-3 pl-12 text-zinc-100 bg-[#1f1f1f] rounded-3xl placeholder:text-[#c3c3c3] pr-20' type="text" id="search" placeholder="O que você quer ouvir?" />
        </div>
        
        <div className='flex justify-center items-center gap-3 relative right-16' title='Navegar'>
          <div className='w-[1px] h-7 border border-[#767777]'></div>
          <button className='cursor-pointer' title='Navegar'> <Compass color='#989999' size={27} /> </button>
        </div>
        <button 
          onMouseOver={e => handleMouseOver(e)} 
          onMouseLeave={e => handleMouseLeave(e)} 
          className='flex justify-center items-center gap-2 absolute right-0 p-2 rounded-4xl text-[#cdcdcd] font-bold bg-[#1f1f1f] cursor-pointer transition duration-300 ease-in-out' 
          title='Crie uma playlist, pasta ou Jam'>
            <Plus color='#989999' size={30} /> {buttonText}
        </button>
      </div>

      <div className='flex justify-center items-center gap-5'>
        <button className='flex justify-center items-center h-8 p-4 text-sm font-bold rounded-3xl bg-white cursor-pointer'>Ver planos Premium</button>
        <button className='flex justify-center items-center gap-2 text-[#a1a1a1] cursor-pointer text-sm font-bold'> <CircleArrowDown color="#a1a1a1" size={18} /> Instalar aplicativo</button>
        <button className='flex justify-center items-center cursor-pointer' title='Novidades'> <Bell color='#a1a1a1' size={18} /> </button>
        <button className='p-3 bg-[#1f1f1f] rounded-4xl cursor-pointer' title='Usuário'>
          <User color='#a1a1a1' size={25} />
        </button>
      </div>
    </header>
  )
}