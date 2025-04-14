import { X } from 'lucide-react'
import { filter } from './Filters'

type setFiltersType = React.Dispatch<React.SetStateAction<Record<string, filter>>>

type Props = {
  filters: Record<string, filter>
  setFilters: setFiltersType
  isSomeFilterOn: boolean
}

export default function RemoveFilters({ filters, setFilters, isSomeFilterOn }: Props) {
  function handleClickRemoveFilters() {
    Object.keys(filters).forEach(filter => {
      setFilters(prev => (
        {
          ...prev,
          [filter]: {
            ...prev[filter],
            isOn: false
          }
        }
      ))
    })
  }

  return (
    /* Botão de remover os filtros - Só é exibido quando algum filtro é ativado */
    <button
      onPointerUp={handleClickRemoveFilters}
      className={`${isSomeFilterOn ? 'flex justify-center items-center' : 'hidden'} 
      size-8 rounded-4xl bg-[#2a2a2a] hover:bg-[#333333] active:bg-[#444444] transition cursor-pointer`}
    >
      <X color="#b3b3b3" strokeWidth={1.7} size={20} />
    </button>
  )
}
