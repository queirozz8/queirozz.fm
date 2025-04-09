import { X } from 'lucide-react'

type Props = {
  isSomeFilterOn: boolean
}

export default function RemoveFilters({ isSomeFilterOn }: Props) {
  return (
    /* Botão de remover os filtros - Só é exibido quando algum filtro é ativado */
    <button
      onPointerUp={ () => /* TODO */ console.log('asdas') }
      className={`${isSomeFilterOn ? 'flex justify-center items-center' : 'hidden'} 
      size-8 rounded-4xl bg-[#2a2a2a] hover:bg-[#333333] active:bg-[#444444] transition cursor-pointer`}
    >
      <X color="#b3b3b3" strokeWidth={1.7} size={20} />
    </button>
  )
}
