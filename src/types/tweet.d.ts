export interface Tweet {
  id: string,
  text: string,
  author: {
    name: string,
    image: string,
    id: string
  }
  createdAt: string,
  updatedAt: string
}


