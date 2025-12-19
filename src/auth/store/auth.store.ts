import type { User } from '@/types/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action'
import { registerAction } from '../actions/register.action'

type AuthStatus = 'authenticated' | 'no-authenticated' | 'checking'
type AuthState = {
    user: User | null
    token: string | null
    authStatus: AuthStatus

    //getters
    isAdmin: () => boolean

    login: (email: string, password: string) => Promise<boolean>
    register: (
        email: string,
        password: string,
        fullname: string
    ) => Promise<boolean>
    logout: () => void
    avatar: (name: string) => string
    checkAuthStatus: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',
    //getters
    isAdmin: () => {
        const roles = get().user?.roles ?? []
        return roles.includes('admin')
    },
    //actions
    register: async (email: string, password: string, fullname: string) => {
        try {
            const data = await registerAction(email, password, fullname)
            localStorage.setItem('token', data.token)

            set({
                user: data.user,
                token: data.token,
                authStatus: 'authenticated',
            })

            return true
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, authStatus: 'no-authenticated' })
        }

        return false
    },
    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password)
            localStorage.setItem('token', data.token)

            set({
                user: data.user,
                token: data.token,
                authStatus: 'authenticated',
            })

            return true
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            localStorage.removeItem('token')
            set({ user: null, token: null, authStatus: 'no-authenticated' })
        }

        return false
    },
    logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, authStatus: 'no-authenticated' })
    },
    avatar: (name: string) => {
        return (
            name.split(' ')[0]?.charAt(0) +
            (name.split(' ')[1]?.charAt(0) || '')
        )
    },
    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction()

            set({
                user: user,
                token: token,
                authStatus: 'authenticated',
            })

            return true
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            set({ user: null, token: null, authStatus: 'no-authenticated' })
        }

        return false
    },
}))
