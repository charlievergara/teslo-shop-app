import { tesloAPI } from '@/api/teslo-api'
import type { LoginResponse } from '@/auth/types/login.response'

export const registerAction = async (
    email: string,
    password: string,
    fullname: string
): Promise<LoginResponse> => {
    try {
        const { data } = await tesloAPI.post<LoginResponse>('/auth/register', {
            email,
            password,
            fullName: fullname,
        })

        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}
