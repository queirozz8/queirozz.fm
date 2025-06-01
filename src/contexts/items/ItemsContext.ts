import { createContext } from 'react';

export type Item = {
  /* Tipo do item, será mostrado na tela */
  type: 'Playlist' | 'Artista' | 'Álbum' | 'Folder' | ''
  /* Nome do item */
  title: string
  /* Author é opcional, pois quando o item é um artista ou uma pasta, ela não possui autor */
  author?: string
  /* Classe do Tailwind. Será usada para definir se deverá ser exibida ou não na tela, conforme os filtros */
  class: string
}

/* Descreve as chaves dos itens. */
export type KeyItemsType = 'workFolder' | 'programmingDeepFocus' | 'codingMusic' | 'purpleCat' | 'lofiCoding' | 'rainPiano' | 
'classicalMusic' | 'oneheart' | 'reidenshi' | 'potsu' | 'austinFarwell' | 'homeConfort'

/* Descreve o setter do estado items. */
export type SetItemsType = React.Dispatch<React.SetStateAction<Record<KeyItemsType, Item>>>

/* Define o tipo completo do contexto */
type ItemsContextType = {
  items: Record<KeyItemsType, Item>,
  setItems: SetItemsType
}

/* Criando o Context. Ele começa com null, porque o objeto da ref será atribuído à ele no futuro */
export const itemsContext = createContext<ItemsContextType | null>(null)