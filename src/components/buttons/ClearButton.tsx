import { X } from "lucide-react"
import { normalColor } from "../utils/tailwindClasses"

type SetInputType = React.Dispatch<React.SetStateAction<string>>

type Props = {
  inputValue: string
  setInputValue: SetInputType
  isSidebar: boolean
}

export default function ClearButton({ inputValue, setInputValue, isSidebar }: Props) {
  return (
    <button 
      onClick={ () => setInputValue('') } 
      className={`${inputValue !== '' ? 'inline' : 'hidden'} transition cursor-pointer`} 
      type='button'
    >
      <X className="z-10" color={normalColor} size={isSidebar ? 25 : 30} strokeWidth={1.5} />
    </button>
  )
};
