import { useState, useEffect } from "react"

type Props = {
  title: string
}

export default function FilterButton( {title}: Props ) {
  const [isFilterOn, setIsFilterOn] = useState<boolean>(false)
  
  const bgColors: Record<'normal' | 'hovered' | 'clicking' | 'clicked', string> = {
    normal: 'bg-[#2a2a2a]',
    hovered: 'bg-[#333333]',
    clicking: 'bg-[#444444]',
    clicked: 'bg-[#ffffff]'
  }

  const textColors: Record<'normal' | 'clicked', string> = {
    normal: 'text-zinc-200',
    clicked: 'text-zinc-700'
  }

  const [bgFilterButton, setBgFilterButton] = useState<'normal' | 'hovered' | 'clicking' | 'clicked'>('normal')
  const [textFilterButton, setTextFilterButton] = useState<'normal' | 'clicked'>('normal')
  

  useEffect(() => {
    setBgFilterButton(isFilterOn ? 'clicked' : 'hovered')
    setTextFilterButton(isFilterOn ? 'clicked' : 'normal')
  }, [isFilterOn])


  return (
    <button 
      onPointerOver={ () => !isFilterOn && setBgFilterButton('hovered') }
      onPointerDown={ () => setBgFilterButton('clicking') }
      onPointerUp={ () => setIsFilterOn(prev => !prev) }
      onPointerLeave={ () => !isFilterOn && setBgFilterButton('normal') }
      className={`flex justify-center items-center relative right-1 w-fit mt-2 px-3 py-2 rounded-4xl 
      text-sm ${textColors[textFilterButton]} font-semibold ${bgColors[bgFilterButton]} transition cursor-pointer`}
    >
      {title}
    </button>
  )
};
