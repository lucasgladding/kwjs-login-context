import { renderHook, waitFor } from '@testing-library/react'
import { AuthProvider, useAuthContext } from './Auth.tsx'

describe('Auth', () => {
    const wrapper = AuthProvider

    it('is not authenticated', () => {
        const { result } = renderHook(() => useAuthContext(), { wrapper })
        expect(result.current.authenticated).toEqual(false)
        expect(result.current.user?.name).toEqual(undefined)
        expect(result.current.user?.settings).toEqual(undefined)
    })

    it('can get the user on login', async () => {
        const { result } = renderHook(() => useAuthContext(), { wrapper })
        await result.current.login()
        await waitFor(() => {
            expect(result.current.authenticated).toEqual(true)
            expect(result.current.user?.name).toEqual('John Smith')
            expect(result.current.user?.settings).toEqual({ isDarkMode: true })
        })
    })

    it('can login then logout', async () => {
        const { result } = renderHook(() => useAuthContext(), { wrapper })
        await waitFor(() => {
            expect(result.current.authenticated).toEqual(false)
        })
        await result.current.login()
        await waitFor(() => {
            expect(result.current.authenticated).toEqual(true)
        })
        await result.current.logout()
        await waitFor(() => {
            expect(result.current.authenticated).toEqual(false)
        })
    })
})
