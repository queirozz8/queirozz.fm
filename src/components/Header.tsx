import { useState, ChangeEvent } from 'react'
import { House, Compass, Search, CircleArrowDown,
Plus, Bell, User, Music, Blend, Folder, X } from 'lucide-react'

export default function Header() {
  /* Criação de variáveis contendo o hex das cores mais usadas pelos elementos. Vale somente para o TypeScript */
  const normalColor: string = '#989999'
  const lightNormalColor: string = '#fffefe'
  const clickedColor: string = '#7a7a7a'

  /* Estados dos elementos */
  const [colorHouseButton, setColorHouseButton] = useState<string>(normalColor)
  const [colorSearchButton, setColorSearchButton] = useState<string>('#b3b3b3')
  const [inputValue, setInputValue] = useState<string>('')
  const [colorCompassButton, setColorCompassButton] = useState<string>(normalColor)
  const [colorCreateButton, setColorCreateButton] = useState<string>('#b3b3b3')
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState<boolean>(false)
  const [colorMusicIcon, setColorMusicIcon] = useState<string>(lightNormalColor)
  const [colorBlendIcon, setColorBlendIcon] = useState<string>(lightNormalColor)
  const [colorFolderIcon, setColorFolderIcon] = useState<string>(lightNormalColor)
  const [colorInstallButton, setColorInstallButton] = useState<string>('#b3b3b3')
  const [colorBellButton, setColorBellButton] = useState<string>(normalColor)

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) { setInputValue(e.target.value) }

  return (
    /* Criação das variáveis de cor para o CSS também */
    <header className='flex justify-between items-center sticky w-screen p-2 [--normal-color:#989999] [--clicked-color:#7a7a7a] [--light-normal-color:#fffefe]'>

      {/* Ícone branco do Spotify no canto superior esquerdo */}
      <a className='size-8 ml-5 cursor-pointer z-10' href="#">
        <img title='Spotify' src="/spotify-white.png" alt="Spotify logo" />
      </a>

      {/* Div do input central com seus outros botões */}
      <div className='flex justify-center items-center gap-1 absolute w-screen left-[5.1rem]'>
        
        {/* Botão de Início */}
        <button
          onMouseOver={ () => setColorHouseButton(prev => prev === clickedColor ? prev : lightNormalColor) } 
          onMouseLeave={ () => setColorHouseButton(normalColor) }
          onMouseDown={ () => setColorHouseButton(clickedColor) }
          onMouseUp={ () => setColorHouseButton(normalColor) }
          className='p-3 rounded-4xl bg-[#1f1f1f] cursor-pointer transition hover:bg-[#2b2b2a] hover:scale-105 active:scale-95 active:bg-[#1c1c1c]' 
          title='Início'
          type='button'> 
            <House color={colorHouseButton} /> 
        </button>

        {/* Label/botão de busca */}
        <label 
          onMouseOver={ () => setColorSearchButton(lightNormalColor) } 
          onMouseLeave={ () => setColorSearchButton(normalColor) } 
          className='relative left-4 w-0 cursor-pointer' 
          title='Buscar' 
          htmlFor="search"> 
            <Search color={colorSearchButton} />
        </label>

        {/* Input central */}
        <input 
          onChange={e => handleInputChange(e)}
          value={inputValue}
          className='w-[27.1rem] h-12 p-3 pt-3 pl-12 pr-24 text-zinc-100 bg-[#1f1f1f] border border-[#1f1f1f] rounded-3xl
          placeholder:text-[#b3b3b3] transition-all duration-500 [&:hover,&:focus]:bg-[#2b2b2a] [&:hover,&:focus]:border-[#3d3c3d]'
          placeholder="O que você quer ouvir?"
          type="text" 
          id="search" 
        />

        {/* Div dos outros botões adicionais do input */}
        <div className='flex justify-center items-center gap-3 relative right-[6.3rem]' title='Navegar'>

          {/* Botão de apagar tudo */}
          <button 
            onClick={ () => setInputValue('') } 
            className={`transition ${inputValue !== '' ? 'opacity-100' : 'opacity-0'} cursor-pointer`} 
            type='button'>
              <X color={normalColor} size={30} strokeWidth={1.5} />
          </button>

          {/* Linha vertical que separa o botão de apagar tudo do botão de Navegar */}
          <svg xmlns="http://www.w3.org/2000/svg" width="1" height="26">
            <line x1="0.5" y1="0" x2="0.5" y2="28" stroke="#767777" strokeWidth="1"/>
          </svg>

          {/* Botão de Navegar */}
          <button 
            onMouseOver={ () => setColorCompassButton(prev => prev === clickedColor ? prev : lightNormalColor) } 
            onMouseLeave={ () => setColorCompassButton(normalColor) } 
            onMouseDown={ () => setColorCompassButton(clickedColor) }
            onMouseUp={ () => setColorCompassButton(normalColor) }
            className='hover:scale-105 active:scale-95 transition cursor-pointer'
            title='Navegar' 
            type='button'> 
              <Compass color={colorCompassButton} size={27} /> 
          </button>
        </div>

        {/* Wrapper para não permitir que o botão de Criar afete a o posicionamento dos elementos ao lado quando ele for hovered */}
        <div className='relative right-[5.1rem] w-28'>

          {/* Botão de Criar */}
          <button
            onMouseOver={ () => setColorCreateButton(lightNormalColor) }
            onMouseLeave={ () => setColorCreateButton(normalColor) }
            onClick={ () => setIsCreateButtonClicked(prev => !prev) }
            onBlur={ () => setIsCreateButtonClicked(false) }
            className={`flex justify-center items-center gap-2 p-2 pr-0 rounded-4xl text-[#cdcdcd] font-bold bg-[#1f1f1f] 
              cursor-pointer group transition-all hover:pr-14 hover:bg-[#2b2b2a] ${isCreateButtonClicked && 'pr-14 bg-[#2b2b2a]'}`}
            title='Crie uma playlist, pasta ou Jam'
            type='button'>
              <Plus 
                className={`transition ${isCreateButtonClicked && 'rotate-45'}`} 
                color={isCreateButtonClicked ? lightNormalColor : colorCreateButton} 
                size={33}
                strokeWidth={1.5}
              />
              <span className={`w-0 text-[var(--light-normal-color)] group-hover:text-base group-hover:opacity-100 ${isCreateButtonClicked ? 'opacity-100 text-base' : 'opacity-0 text-[0px]'} transition`}>
                Criar
              </span>
          </button>

          {/* Menu do botão de Criar - Só é exibido quando ele é clicado */}
          <ul className={`flex flex-col items-start gap-4 absolute top-14 w-[23rem] p-2 bg-[#282828] rounded-xl ${isCreateButtonClicked ? 'opacity-100' : 'opacity-0'} transition`}>

            {/* Opção de criar playlist */}
            <li>
              <button
                onMouseOver={ () => setColorMusicIcon('#3dc46e') }
                onMouseLeave={ () => setColorMusicIcon(lightNormalColor) }
                className='flex items-center gap-2 w-[22rem] p-2 bg-[#282828] hover:bg-[#3f3e3e] active:bg-[#191818] rounded-md group'
                type='button'>

                {/* Círculo com o ícone */}
                <div className='flex justify-center items-center relative size-12 bg-[#3e3f3e] group-hover:bg-[#525252] rounded-4xl'>
                  <Music className='group-hover:rotate-6 group-hover:scale-105 transition' color={colorMusicIcon} />
                </div>

                <div> {/* Título e descrição */}
                  <h2 className='flex items-center gap-2 text-[var(--light-normal-color)] font-bold'>Playlist</h2>
                  <p className='text-[var(--normal-color)] text-sm'>Crie uma playlist com músicas ou episódios</p>
                </div>
              </button>
            </li>

            {/* Linha horizontal que separa o primeiro botão dos outros */}
            <svg className='-m-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 20">
              <line x1="43" y1="10" x2="370" y2="10" stroke="#434444" strokeWidth="1"/>
            </svg>

            {/* Botão de criar Match */}
            <li>
              <button
                onMouseOver={ () => setColorBlendIcon('#3dc46e') }
                onMouseLeave={ () => setColorBlendIcon(lightNormalColor) }
                className='flex items-center gap-2 w-[22rem] p-2 bg-[#282828] hover:bg-[#3f3e3e] active:bg-[#191818] rounded-md group'
                type='button'>

                {/* Círculo com o ícone */}
                <div className='flex justify-center items-center relative size-12 bg-[#3e3f3e] group-hover:bg-[#525252] rounded-4xl'>
                  <Blend className='group-hover:rotate-6 group-hover:-scale-x-105 -scale-x-100 transition' color={colorBlendIcon} />
                </div>

                <div> {/* Título e descrição */}
                  <h2 className='flex items-center gap-2 text-[var(--light-normal-color)] font-bold'> Match</h2>
                  <p className='text-[var(--normal-color)] text-sm'>Mistre seu gosto musical com o da galera</p>
                </div>
              </button>
            </li>

            {/* Botão de criar pasta */}
            <li>
              <button
                onMouseOver={ () => setColorFolderIcon('#3dc46e') }
                onMouseLeave={ () => setColorFolderIcon(lightNormalColor) }
                className='flex items-center gap-2 w-[22rem] p-2 bg-[#282828] hover:bg-[#3f3e3e] active:bg-[#191818] rounded-md group'
                type='button'>

                {/* Círculo com o ícone */}
                <div className='flex justify-center items-center relative size-12 bg-[#3e3f3e] group-hover:bg-[#525252] rounded-4xl'>
                  <Folder className='group-hover:rotate-6 group-hover:scale-105 transition' color={colorFolderIcon} />
                </div>

                <div> {/* Título e descrição */}
                  <h2 className='flex items-center gap-2 text-[var(--light-normal-color)] font-bold'>Pasta</h2>
                  <p className='text-[var(--normal-color)] text-sm'>Organize suas playlists</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Div dos outros botões do Header. Engloba:
      - Botões de "Ver planos Premium" e "Instalar aplicativo";
      - Botão de Novidades
      - Botão de Usuário */}
      <div className='flex justify-center items-center gap-6'>

        {/* Div dos botões de "Ver planos Premium" e "Instalar aplicativo" */}
        <div className='flex justify-center items-center gap-6 relative right-2'>

          {/* Botão de "Ver planos Premium" */}
          <button className='flex justify-center items-center w-[10.2rem] h-8 p-4 text-sm font-extrabold [word-spacing:-2px] rounded-3xl bg-white cursor-pointer hover:scale-105 active:scale-95 active:bg-[#c6c6c7] transition' type='button'>Ver planos Premium</button>

          {/* Botão/Link de "Instalar aplicativo" */}
          <a 
            onMouseOver={ () => setColorInstallButton(lightNormalColor) }
            onMouseLeave={ () => setColorInstallButton(normalColor) }
            onMouseDown={ () => setColorInstallButton(clickedColor) }
            onMouseUp={ () => setColorInstallButton(lightNormalColor) }
            className='flex justify-center items-center gap-[0.5rem] relative right-1 text-[#a1a1a1] cursor-pointer text-sm font-extrabold [word-spacing:-2px] hover:text-[var(--light-normal-color)] transition-transform hover:scale-105 active:scale-95 active:text-[var(--clicked-color)]'
            href='#'>
              <span> <CircleArrowDown color={colorInstallButton} size={17} /> </span>
              <span>Instalar aplicativo</span>
          </a>
        </div>

        {/* Botão de Novidades */}
        <button
          onMouseOver={ () => setColorBellButton(prev => prev === clickedColor ? prev : lightNormalColor) } 
          onMouseLeave={ () => setColorBellButton(normalColor) } 
          onMouseDown={ () => setColorBellButton(clickedColor) }
          onMouseUp={() => setColorBellButton(normalColor) }
          className='flex justify-center items-center cursor-pointer z-10 hover:scale-105 transition' 
          title='Novidades'>
             <Bell color={colorBellButton} size={18} />
        </button>

        {/* Botão de Usuário */}
        <button className='p-3 bg-[#1f1f1f] rounded-4xl cursor-pointer z-10 hover:scale-105 active:scale-95 active:bg-[#181818] transition' title='Usuário'>
          <User color='#a1a1a1' size={25} />
        </button>
      </div>
    </header>
  )
}