import { render, screen } from '@testing-library/react'
import Account from './Account.tsx'

describe('Account', () => {
    it('renders the user name', async () => {
        render(<Account />)
        expect(await screen.findByText('not authenticated')).toBeInTheDocument()
    })
})
