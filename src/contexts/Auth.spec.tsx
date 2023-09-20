import { renderHook, waitFor } from '@testing-library/react'
import { AuthProvider, useAuthContext } from './Auth.tsx'

describe('Auth', () => {
    const wrapper = AuthProvider

    it('is not authenticated', () => {
        const { result } = renderHook(() => useAuthContext(), { wrapper })
        expect(result.current.authenticated).toEqual(false)
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
