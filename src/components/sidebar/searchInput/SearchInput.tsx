import { useState, useRef, useEffect } from "react"
import ClearButton from "../../buttons/ClearButton"
import { Item, KeyItemsType, SetItemsType } from "../Sidebar"
import { normalColor, lightNormalColor, clickedColor, defaultItemClass } from "../../utils/tailwindClasses"
import { Search, List } from "lucide-react"

type Props = {
  items: Record<KeyItemsType, Item>
  setItems: SetItemsType
}

export default function SearchInput({ items, setItems }: Props) {
  const [inputValue, setInputValue] = useState<string>('')
  /* Será usado para mudar o foco da página para o input quando o botão de lupa for apertado */
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchIsOn, setSearchIsOn] = useState<boolean>(false)
  const [searchButtonColor, setSearchButtonColor] = useState<string>(normalColor)

  const [colorOrderButton, setColorOrderButton] = useState<string>(normalColor)

  const isFirstRender = useRef<boolean>(true)
  useEffect(() => {
    /* Debounce para evitar ficar re-renderizando excessivamente */
    const debounce = setTimeout(() => {
      /* Já reinicia todos os itens se o input estiver voltado para o estado vazio */
      if (!inputValue && !isFirstRender.current) {
        Object.keys(items).forEach(item => {
          /* Assertion types para o TypeScript saber que os tipos estão corretos */
          const itemTyped = item as KeyItemsType
          
          setItems(prev => {
            return {
              ...prev,
              [itemTyped]: {
                ...prev[itemTyped],
                class: defaultItemClass
              }
            }
          })
        })
      } else if (inputValue) {
        Object.keys(items).forEach(item => {
            setItems(prev => {
              /* Assertion types para o TypeScript saber que os tipos estão corretos */
              const itemTyped = item as KeyItemsType
              return {
                ...prev,
                [itemTyped]: {
                  ...prev[itemTyped],
                  /* Se o título do item atual incluir o texto do input, então ele será exibido. Caso contrário, ele é ocultado */
                  class: item.toLowerCase().includes(inputValue.toLowerCase()) ? defaultItemClass : defaultItemClass.replace('flex', 'hidden')
                }
              }
            })
        })
      }
    }, 300)
    
    /* Agora será considerado, pois o useEffect executa tudo isso quando a página carrega. E não queremos que ele gere um loop infinito. */
    isFirstRender.current = false

    /* Um return dentro de um useEffect agenda o que está dentro dele para a próxima execução desse mesmo useEffect.
    Sendo assim, então o cancelamento do setTimeout (antes dele executar) ocorrerá quando houver uma outra execução do useEffect.
    E se houver um timeout chamado debounce, o TS cancelará ele. */
    return () => clearTimeout(debounce)
    /* Desabilitei o ESLint porque ele não entende que a lógica está realmente segura.
    Ele exigia que items e setItems estivessem no array de dependências, mas isso faria com que caísse em um loop infinito;
    Pois setItems muda items; e se items está no array de dependências, o useEffect será executado de novo, gerando um loop indesejado.
    Aqui, items não é usado para fazer verificações ou algo do tipo. Por isso é seguro desabilitar.
    As chaves de items (o motivo pelo qual estamos usando ele dentro do useEffect) são fixas, então também é seguro desabilitar. */
    // eslint-disable-next-line
  }, [inputValue])

  
  return (
    <div className="flex items-center">
      <div
        onPointerOver={ () => setSearchButtonColor(lightNormalColor) }
        onPointerUp={ () => {
          setSearchIsOn(prev => !prev) 
          /* Faz o foco da página ir para o input */
          inputRef.current?.focus()
        } }
        onPointerLeave={ () => setSearchButtonColor(normalColor) }
        className="size-fit p-[6px] rounded-4xl bg-transparent hover:bg-[#2a2a2a] z-50 transition cursor-pointer"
      >
        <label className="cursor-pointer" htmlFor="search-items">
          <Search color={searchButtonColor} size={20} />
        </label>
      </div>

      <input
        value={inputValue}
        onChange={ (e) => setInputValue(e.target.value) }
        className={`${searchIsOn ? 'opacity-100' : 'opacity-0 right-96'} relative w-56 right-10 p-1 pl-11 rounded-lg text-zinc-300 bg-[#2a2a2a]
        placeholder:text-sm placeholder:text-zinc-300 transition-all focus:outline-none focus:ring-0 placeholder:select-none`}
        ref={inputRef}
        type="text"
        placeholder="Buscar em Sua Biblioteca"
        id="search-items"
      />

      <div 
        onPointerUp={ () => setSearchIsOn(false) }
        className="flex items-center absolute left-[12.8rem] size-fit">
        <ClearButton inputValue={inputValue} setInputValue={setInputValue} isSidebar={true} />
      </div>

      {/* Botão de ordem dos itens da sidebar */}
      <div
        onPointerOver={ () => colorOrderButton !== clickedColor && setColorOrderButton(lightNormalColor) }
        onPointerDown={ () => setColorOrderButton(clickedColor) }
        onPointerUp={ () => {
          setColorOrderButton(lightNormalColor)
          if (!inputValue) setSearchIsOn(false)
        } }
        onPointerLeave={ () => setColorOrderButton(normalColor) } 
        className={`flex justify-center items-center gap-2 relative ${searchIsOn ? 'right-[1.90rem]' : 'right-[6.5rem]'} w-fit text-[var(--normal-color)]
        hover:text-white hover:scale-105 active:scale-95 active:text-[#7a7a7a] transition-transform cursor-pointer`}
      >
        <p className={`${searchIsOn ? 'hidden' : 'inline'} select-none`}>Recentes</p>
        <List color={colorOrderButton} size={20} />
      </div>
    </div>
  )
};