import type { TDateTime, TUUID } from './common.type'

export interface User {
  id: TUUID
  email: string
  name: string
  isActive: boolean
  createdAt: TDateTime
}
