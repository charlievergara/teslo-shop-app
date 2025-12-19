import type { User } from '@/types/user.interface'

export interface LoginResponse {
    user: User
    token: string
}
