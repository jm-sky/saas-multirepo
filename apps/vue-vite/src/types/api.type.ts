export interface ApiResource<T> {
  data: T
  message?: string
}

export interface ApiResourceCollection<T> {
  data: T[]
  message?: string
}
