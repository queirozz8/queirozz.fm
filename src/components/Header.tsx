import { House, Compass, Search, CircleArrowDown } from 'lucide-react'

export default function Header() {
  return (
    <header className='flex'>
      <div className='flex justify-start w-96'>
        <img className='w-9 h-9' src="/spotify-white.png" alt="Spotify logo" />
      </div>
      <div className='flex items-center'>
        <button className='cursor-pointer' title='Início'><House color='#989999' /></button>
        <label htmlFor="search"><Search color='#989999' /></label>
        <input className='w-[434px] h-12 p-3 bg-[#1f1f1f] rounded-3xl placeholder:text-[#a1a1a1]' type="text" id="search" placeholder="O que você quer ouvir?" />
        <div className='w-[1px] h-8 border border-[#989999]'></div>
        <button className='cursor-pointer' title='Navegar'><Compass color='#989999' /></button>
        <button className='cursor-pointer' title='Crie uma playlist, pasta ou Jam'></button>
      </div>
      <button className='flex justify-center items-center h-9 p-4 font-bold rounded-3xl bg-white cursor-pointer'>Ver planos Premium</button>
      <button className='flex justify-center items-center text-[#a1a1a1] cursor-pointer'><CircleArrowDown color="#a1a1a1" />Instalar aplicativo</button>
    </header>
  )
}