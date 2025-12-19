import { tesloAPI } from '@/api/teslo-api'
import type { LoginResponse } from '@/auth/types/login.response'

export const loginAction = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    try {
        const { data } = await tesloAPI.post<LoginResponse>('/auth/login', {
            email,
            password,
        })
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}
