/* Cores de background para os botões de filtro */
export const bgColors = {
  normal: 'bg-[#2a2a2a]',
  hovered: 'bg-[#333333]',
  clicking: 'bg-[#444444]',
  clicked: 'bg-[#ffffff]',
  clickingWhenOn: 'bg-[#c6c6c6]'
} as const

/* Cores de texto para os botões de filtro */
export const textColors = {
  normal: 'text-zinc-200',
  clicked: 'text-zinc-700'
} as const

export const defaultItemClass = 'flex gap-2 w-64 p-2 rounded-2xl hover:bg-[#1f1f1f] active:bg-black cursor-pointer'

export const normalColor = '#999999'
export const lightNormalColor = '#ffffff'
export const clickedColor = '#7a7a7a'