import { tesloAPI } from '@/api/teslo-api'
import type { LoginResponse } from '../types/login.response'

export const checkAuthAction = async (): Promise<LoginResponse> => {
    const token = localStorage.getItem('token')

    if (!token) throw new Error('no token found')

    try {
        const { data } = await tesloAPI.get<LoginResponse>('/auth/check-status')

        localStorage.setItem('token', data.token)

        return data
    } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
        throw new Error('Token expired or not valid')
    }
}
