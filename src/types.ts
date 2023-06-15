export type Message = {
  id: string
  sender: string
  content: string
  title: string
  date: string
  type: string
}

export enum CommentRendering {
  pagination = 'pagination',
  infinite = 'infinite'
}

export enum Language {
  en = 'en',
  pl = 'pl'
}
