import { useState, useRef, useEffect } from "react"
import { normalColor, lightNormalColor } from "../utils/tailwindClasses"
import { Shuffle, SkipBack, SkipForward, Repeat, Repeat1, 
  SquarePlay, MicVocal, ListMusic, Computer, VolumeX, Volume1, Volume2, Maximize, Minimize } from "lucide-react"
import useIsFullscreen from "../../contexts/fullscreen/useIsFullscreen"
import asTheLightFadesImage from '@assets/images/footer/as_the_light_fades.webp'

/* Música que será tocada. */
const song = new Audio('/songs/as_the_light_fades.mp3')
song.volume = 0.5

export default function Footer() {
  /* Cores de botões */
  const [shuffleColor, setShuffleColor] = useState<string>(normalColor)
  const [isShuffleOn, setIsShuffleOn] = useState<boolean>(false)
  
  const [skipBackColor, setSkipBackColor] = useState<string>(normalColor)
  const [skipFowardColor, setSkipFowardColor] = useState<string>(normalColor)

  const [repeatColor, setRepeatColor] = useState<string>(normalColor)
  const [repeatStage, setRepeatStage] = useState<0 | 1 | 2>(0)

  const [nowPlayingViewColor, setNowPlayingViewColor] = useState<string>(normalColor)
  const [queueColor, setQueueColor] = useState<string>(normalColor)
  const [deviceColor, setDeviceColor] = useState<string>(normalColor)

  const [volumeColor, setVolumeColor] = useState<string>(normalColor)
  const [volumeValue, setVolumeValue] = useState<number>(0.5)
  
  const [maxMinColor, setMaxMinColor] = useState<string>(normalColor)

  /* Player de música */
  const [playOrPauseIcon, setPlayOrPauseIcon] = useState<'play' | 'pause'>('play')
  const [playerValue, setPlayerValue] = useState<number>(0)
  const [isClicking, setIsClicking] = useState<boolean>(false)
  const musicInterval = useRef<number | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  /* Verificador se está na fullscreen ou não. Será usado para mudar o tamanho de alguns elementos quando o usuário fica na fullscreen */
  const {setIsFullscreen} = useIsFullscreen()
  
  /* Muda o título da aba no navegador se a música estiver tocando ou não */
  if (isPlaying) document.title = 'queirozz.fm - as the light fades • a vow'
  else document.title = 'queirozz.fm'

  /* Lógica quando o usuário começa/pausa o player */
  useEffect(() => {
    if (playOrPauseIcon === 'pause') {
      /* O título da aba vai virar queirozz.fm com o nome da música tocando e o autor */
      setIsPlaying(true)
      playerLogic()

      song.play()
    } else {
      /* O título da aba vai virar queirozz.fm normal */
      setIsPlaying(false)
      /* Se o ícone é o de play (ou seja, a música foi pausada), então ele deve pausar tudo */
      song.pause()
      clearInterval(musicInterval.current!)
    }
  /* eslint-disable-next-line */
  }, [playOrPauseIcon])

  useEffect(() => {
    if (isClicking) {
      /* Para o player enquanto o usuário estiver mexendo no input */
      clearInterval(musicInterval.current!)
      /* Música pausa por enquanto */
      song.pause()

      /* Adiciona um event listener, para verificar quando o usuário soltar o player */
      document.addEventListener('mouseup', () => setIsClicking(false))
    } else if (!isClicking && playOrPauseIcon === 'pause') {
      /* Player liga novamente */
      playerLogic()

      /* Música toca novamente */
      song.play()

      /* Remove o event listener, visto que ele já foi executado anteriormente, já cumpriu seu propósito */
      removeEventListener('mouseup', () => setIsClicking(false))
    }
  /* eslint-disable-next-line */
  }, [isClicking])

  /* Avança o player conforme um intervalo de 1 seg;
  quando a música chega ao fim:
    verifica repeatStage, e define se pausa a música e acaba com o intervalo, ou se repete a música */
  function playerLogic() {
    musicInterval.current = window.setInterval(() => {
      setPlayerValue(prev => {
        /* Reinicia tudo quando chegar ao fim */
        if (prev === 137) {
          if (repeatStage === 0) {
            setPlayOrPauseIcon('play')
            return 0
          } else {
            song.currentTime = 0
            return 0
          }
        } else return ++prev
      })
    }, 1000);
  }


  /* Verifica se a tecla espaço foi pressionada em qualquer lugar do documento. Se sim, então toca/pausa a música */
  document.addEventListener('keydown', (e) => playOrPauseByKeyboard(e))
  function playOrPauseByKeyboard(e: KeyboardEvent) {
    if (e.code === 'Space') {
      if (playOrPauseIcon === 'play') {
        setPlayOrPauseIcon('pause')
        song.play()
      } else {
        setPlayOrPauseIcon('play')
        song.pause()
      }
    }
  }


  return (
    <footer className="flex grow-[10%] mb-18">
      
      {/* Parte inicial do footer, antes do player, contendo a música atual que está sendo tocada */}
      <div className="flex items-center gap-2 w-fit mt-4 ml-4">
        <img className="size-14 rounded-md select-none" src={asTheLightFadesImage} alt="Music image" />

        {/* Div dos textos da música atual (título e descrição do autor) */}
        <div className="flex flex-col justify-center gap-1 w-52 ml-2">
          <h1 className="w-fit text-white text-sm hover:underline hover:cursor-pointer select-none">as the light fades</h1>
          <p className="w-fit text-zinc-400 text-xs hover:underline hover:cursor-pointer select-none">a vow</p>
        </div>        
      </div>

      {/* Parte central do footer, contendo o player e seus outros botões auxiliares */}
      <div className="flex flex-col gap-2 relative right-8 lg:left-10 top-5 w-screen">

        {/* Div dos botões auxiliares do player */}
        <div className="flex justify-center items-center gap-5">
          <button 
            onPointerOver={ () => setShuffleColor(lightNormalColor) }
            onClick={ () => setIsShuffleOn(prev => !prev) }
            onPointerLeave={ () => setShuffleColor(normalColor) }
            className="hover:scale-105 active:scale-95 transition cursor-pointer"
            title={isShuffleOn ? "Desativar a ordem aleatória" : "Ativar a ordem aleatória"}
          >
            <Shuffle color={isShuffleOn ? '#9E1FFF' : shuffleColor} size={20} />
          </button>

          {/* Botão de retroceder, que reinicia a música e o player quando for pressionado */}
          <button 
            onPointerOver={ () => setSkipBackColor(lightNormalColor) }
            onClick={ () => {
              setPlayerValue(0) 
              song.currentTime = 0
            } }
            onPointerLeave={ () => setSkipBackColor(normalColor) }
            className="hover:scale-105 active:scale-95 transition cursor-pointer"
            title="Retroceder"
          >
            <SkipBack color={skipBackColor} size={20} />
          </button>
          
          {/* Botão de play/pause */}
          <button 
            onClick={ () => {
              setPlayOrPauseIcon(prev => {
                if (prev === 'pause') return 'play'
                if (prev === 'play') return 'pause'
                
                /* Fallback para o TypeScript não reclamar */
                return prev
              })
            } }
            className="flex items-center p-2 rounded-4xl bg-white hover:scale-105 active:scale-95 active:bg-zinc-400 transition cursor-pointer"
            title={playOrPauseIcon === 'play' ? "Play" : "Pausar"}
            /* Ele não deve ser tabbable */
            tabIndex={-1}
          >
            {/* O ícone vai mudar conforme playOrPauseIcon mudar */}
            {
            playOrPauseIcon === 'play' ? 
              /* Ícone de play */
              <svg className="relative left-[0.15rem]" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="1rem" width="1rem" version="1.1" viewBox="0 0 210 210" xmlSpace="preserve">
                <path d="M179.07,105L30.93,210V0L179.07,105z" />
              </svg> 
            : playOrPauseIcon === 'pause' ?
              /* Ícone de pause */
              <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 16 16" fill="none">
                <path d="M7 1H2V15H7V1Z" fill="#000000"/>
                <path d="M14 1H9V15H14V1Z" fill="#000000"/>
              </svg>
            :
              /* Fallback pro ícone de play de novo */
              <svg className="relative left-[0.15rem]" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="1rem" width="1rem" version="1.1" viewBox="0 0 210 210" xmlSpace="preserve">
                <path d="M179.07,105L30.93,210V0L179.07,105z" />
              </svg> 
            }
          </button>

          <button 
            onPointerOver={ () => setSkipFowardColor(lightNormalColor) }
            onPointerLeave={ () => setSkipFowardColor(normalColor) }
            className="hover:scale-105 active:scale-95 transition cursor-pointer"
            title="Avançar"
          >
            <SkipForward color={skipFowardColor} size={20} />
          </button>

          <button 
            onPointerOver={ () => setRepeatColor(lightNormalColor) }
            /* repeatStage vai definir qual dos ícones/cores deverão ser exibidos no botão */
            onClick={ () => setRepeatStage(prev => {
              if (prev === 0) return 1;
              if (prev === 1) return 2;
              return 0;
            }) }
            onPointerLeave={ () => setRepeatColor(normalColor) }
            className="hover:scale-105 active:scale-95 transition cursor-pointer"
            title={repeatStage === 0 ? 'Repetir' : repeatStage === 1 ? 'Repetir uma faixa' : 'Não repetir'}
          >
            {/* 
              0 é o botão desligado;
              1 é o botão ligado, porém repetindo tudo (cor verde);
              2 é o botão ligado, porém repetindo só uma faixa (muda o ícone, cor verde).
            */}
            { repeatStage !== 2 
              /* Se for diferente de 2, então faz a verificação para saber se o botão está ligado ou não.
              Para assim definir se deve mudar a cor dele.
              Se for igual a 2, então exibe o outro ícone, e já com a cor verde */
              ? <Repeat color={repeatStage === 0 ? repeatColor : '#9E1FFF'} size={20} />
              : <Repeat1 color="#9E1FFF" size={20} />
            }
          </button>
        </div>

        {/* Div do input central (player) */}
        <div className="flex justify-center items-center gap-2 text-zinc-300 text-xs">
          {/* Minutos/segundos da música */}
          <p className="select-none">{Math.floor(playerValue / 60)}:{String(playerValue % 60).padStart(2, '0')}</p>
          <input
            onChange={ (e) => {
              const inputValue = Number(e.target.value)

              /* Se o usuário tiver interagido com o player, então o player deve alterar o tempo da música para o valor do input */
              if (isClicking) {
                song.currentTime = inputValue
              }

              setPlayerValue(inputValue)
            } }
            onPointerDown={ () => setIsClicking(true) }
            min={0}
            /* 2:18 minutos = 138 segundos */
            max={138}
            step={1}
            value={playerValue}
            className="w-[30rem] 2md:w-[36rem] h-[0.3rem] accent-white hover:accent-[#9E1FFF] cursor-pointer"
            type="range"
            id="player"
          />
          <p className="select-none">2:18</p>
        </div>
      </div>

      {/* Parte dos outros botões da direita, depois do player */}
      <div className="flex justify-end items-center gap-[0.80rem] mt-4 mr-4">
        <button 
          onPointerOver={ () => setNowPlayingViewColor(lightNormalColor) }
          onPointerLeave={ () => setNowPlayingViewColor(normalColor) }
          className="hover:scale-105 active:scale-95 transition cursor-pointer z-1"
          title="Tela Tocando agora"
        >
          <SquarePlay color={nowPlayingViewColor} size={20} />
        </button>

        <button 
          className="hover:scale-105 active:scale-95 transition cursor-not-allowed z-1"
          title="Letra"
        >
          <MicVocal color={'#333333'} size={20} />
        </button>

        <button 
          onPointerOver={ () => setQueueColor(lightNormalColor) }
          onPointerLeave={ () => setQueueColor(normalColor) }
          className="hover:scale-105 active:scale-95 transition cursor-pointer"
          title="Fila"
        >
          <ListMusic color={queueColor} size={20} />
        </button>

        <button 
          onPointerOver={ () => setDeviceColor(lightNormalColor) }
          onPointerLeave={ () => setDeviceColor(normalColor) }
          className="hidden lg:inline hover:scale-105 active:scale-95 transition cursor-pointer"
          title="Conectar a um dispositivo"
        >
          <Computer color={deviceColor} size={20} />
        </button>

        {/* Botão de volume */}
        <button 
          onClick={ () => {
            setVolumeValue(prev => {
              if (prev > 0) {
                song.volume = 0
                return 0
              } else {
                song.volume = 0.5
                return 0.5
              } 
            })
          } }
          onPointerOver={ () => setVolumeColor(lightNormalColor) }
          onPointerLeave={ () => setVolumeColor(normalColor) }
          className="hover:scale-105 active:scale-95 transition cursor-pointer"
          title={volumeValue === 0 ? 'Com som' : 'Mudo'}
        >
          {
            volumeValue === 0 ? <VolumeX color={volumeColor} size={20} /> : 
            volumeValue < 0.45 ? <Volume1 color={volumeColor} size={20} /> : 
            <Volume2 color={volumeColor} size={20} />
          }
        </button>

        {/* Input de volume */}
        <input
          onChange={ (e) => {
            setVolumeValue(Number(e.target.value))
            song.volume = Number(e.target.value)
          } }
          min={0}
          max={1}
          step={0.01}
          value={volumeValue}
          className="w-24 h-[0.33rem] accent-white hover:accent-[#9E1FFF] cursor-pointer"
          type="range"
          id="volume"
        />

        <button 
          onClick={ () => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen()
              setIsFullscreen(true)
            } else {
              document.exitFullscreen()
              setIsFullscreen(false)
            }
          } }
          onPointerOver={ () => setMaxMinColor(lightNormalColor) }
          onPointerLeave={ () => setMaxMinColor(normalColor) }
          className="hover:scale-105 active:scale-95 transition cursor-pointer"
          title={!document.fullscreenElement ? 'Entrar em tela cheia' : 'Sair da tela cheia'}
        >
          {
            !document.fullscreenElement ? <Maximize color={maxMinColor} size={20} /> : <Minimize color={maxMinColor} size={20} />
          }
        </button>
      </div>
    </footer>
  )
}