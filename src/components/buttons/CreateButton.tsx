import { useState } from "react";
import { Plus, Music, Blend, Folder } from "lucide-react";
import { normalColor, lightNormalColor } from "../utils/tailwindClasses";

type Props = {
  isSidebar: boolean
}

export default function CreateButton( {isSidebar}: Props) {
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState<boolean>(false)
  const [colorCreateButton, setColorCreateButton] = useState<string>('#b3b3b3')

  const [colorMusicIcon, setColorMusicIcon] = useState<string>(lightNormalColor)
  const [colorBlendIcon, setColorBlendIcon] = useState<string>(lightNormalColor)
  const [colorFolderIcon, setColorFolderIcon] = useState<string>(lightNormalColor)
  
  return (
    /* Wrapper para não permitir que o botão de Criar afete a o posicionamento dos elementos ao lado quando ele for hovered. */
    <div 
      onBlur={ () => setIsCreateButtonClicked(false) }
      className={isSidebar ? 'z-50' : 'relative right-[5.1rem] w-28 z-50'}
    >

      {/* Botão de Criar */}
      <button
        onPointerOver={ () => setColorCreateButton(lightNormalColor) }
        onPointerLeave={ () => setColorCreateButton(normalColor) }
        onClick={ () => setIsCreateButtonClicked(prev => !prev) }
        className={`flex justify-center items-center ${isSidebar ? 'gap-1' : 'gap-2'} ${isSidebar ? 'p-1' : 'p-2'} pr-0 rounded-4xl text-[#cdcdcd] font-bold bg-[#1f1f1f]
          hover:bg-[#2b2b2a] ${!isSidebar && 'hover:pr-14'} ${!isSidebar && isCreateButtonClicked && 'pr-14 bg-[#2b2b2a]'} transition-all cursor-pointer group`}
        title='Crie uma playlist, pasta ou Jam'
        type='button'
      >
        <Plus 
          className={`${isCreateButtonClicked && 'rotate-45'} transition ${isSidebar && 'duration-300'}`} 
          color={isCreateButtonClicked ? lightNormalColor : colorCreateButton} 
          size={isSidebar ? 24 : 33}
          strokeWidth={isSidebar ? 1.7 : 1.5}
        />
        <span className={`w-0 text-white
          ${!isSidebar && 'group-hover:opacity-100 group-hover:text-base'} ${!isSidebar && isCreateButtonClicked ? 'opacity-100 text-base' : 'opacity-0 text-[0rem]'} transition`}>
            Criar
        </span>
      </button>

      {/* Menu do botão de Criar - Só é exibido quando ele é clicado */}
      <menu
        onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
        /* Os displays não conflitam pois o block/hidden é adicionado dinâmicamente; ou seja, sobrescreve todos os outros displays existentes. */
        className={`flex flex-col items-start gap-4 absolute top-14 ${isCreateButtonClicked ? 'block' : 'hidden'} w-[23rem] p-2 rounded-xl bg-[var(--bg-color)]`}
      >

        {/* Botão de criar playlist */}
        <li><button
          onPointerOver={ () => setColorMusicIcon('#3dc46e') }
          onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
          onClick={ () => setIsCreateButtonClicked(false) } /* Evento para computadores */
          onTouchEnd={ () => setIsCreateButtonClicked(false) } /* Evento para dispositivos móveis */
          onPointerLeave={ () => setColorMusicIcon(lightNormalColor) }
          className='flex items-center gap-2 w-[22rem] p-2 rounded-md bg-[var(--bg-color)] hover:bg-[#3f3e3e] active:bg-[#191818] group'
          type='button'
        >

          {/* Círculo com o ícone */}
          <div className='flex justify-center items-center size-12 rounded-4xl bg-[#3e3f3e] group-hover:bg-[#525252]'>
            <Music className='group-hover:rotate-6 group-hover:scale-105 transition' color={colorMusicIcon} />
          </div>

          <span> {/* Título e descrição */}
            <h1 className='flex items-center gap-2 text-white font-bold'>Playlist</h1>
            <p className='text-sm text-[var(--normal-color)]'>Crie uma playlist com músicas ou episódios</p>
          </span>
        </button></li>

        {/* Linha horizontal que separa o primeiro botão dos outros */}
        <svg className='-m-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 20">
          <line x1="43" y1="10" x2="370" y2="10" stroke="#434444" strokeWidth="1"/>
        </svg>

        {/* Botão de criar Match */}
        <li><button
          onPointerOver={ () => setColorBlendIcon('#3dc46e') }
          onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
          onClick={ () => setIsCreateButtonClicked(false) } /* Evento para computadores */
          onTouchEnd={ () => setIsCreateButtonClicked(false) } /* Evento para dispositivos móveis */
          onPointerLeave={ () => setColorBlendIcon(lightNormalColor) }
          className='flex items-center gap-2 w-[22rem] p-2 rounded-md bg-[var(--bg-color)] hover:bg-[#3f3e3e] active:bg-[#191818] group'
          type='button'
        >

          {/* Círculo com o ícone */}
          <div className='flex justify-center items-center size-12 rounded-4xl bg-[#3e3f3e] group-hover:bg-[#525252]'>
            <Blend className='-scale-x-100 group-hover:rotate-6 group-hover:-scale-x-105 transition' color={colorBlendIcon} />
          </div>

          <span> {/* Título e descrição */}
            <h1 className='flex items-center gap-2 text-white font-bold'>Match</h1>
            <p className='text-sm text-[var(--normal-color)]'>Mistre seu gosto musical com o da galera</p>
          </span>
        </button></li>

        {/* Botão de criar pasta */}
        <li><button
          onPointerOver={ () => setColorFolderIcon('#3dc46e') }
          onPointerDown={ (e) => e.preventDefault() } /* Faz com que a div maior não perca o foco e o menu não desapareça enquanto o usuário não tiver terminado de clicar */
          onClick={ () => setIsCreateButtonClicked(false) } /* Evento para computadores */
          onTouchEnd={ () => setIsCreateButtonClicked(false) } /* Evento para dispositivos móveis */
          onPointerLeave={ () => setColorFolderIcon(lightNormalColor) }
          className='flex items-center gap-2 w-[22rem] p-2 rounded-md bg-[var(--bg-color)] hover:bg-[#3f3e3e] active:bg-[#191818] group'
          type='button'
        >

          {/* Círculo com o ícone */}
          <div className='flex justify-center items-center size-12 rounded-4xl bg-[#3e3f3e] group-hover:bg-[#525252]'>
            <Folder className='group-hover:rotate-6 group-hover:scale-105 transition' color={colorFolderIcon} />
          </div>

          <span> {/* Título e descrição */}
            <h1 className='flex items-center gap-2 text-white font-bold'>Pasta</h1>
            <p className='text-sm text-[var(--normal-color)]'>Organize suas playlists</p>
          </span>
        </button></li>
      </menu>
    </div>
  )
}