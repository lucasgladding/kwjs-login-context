import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm.tsx'

describe('Login form', () => {
    it('can submit username and password', async () => {
        const user = userEvent.setup()
        render(<LoginForm />)
        const usernameTextField = await screen.findByLabelText('Username')
        const passwordTextField = await screen.findByLabelText('Password')
        const submitButton = await screen.findByRole('button')
        await user.type(usernameTextField, 'admin')
        await user.type(passwordTextField, 'secret')
        expect(submitButton).toBeEnabled()
    })

    it('disables submit when the password is missing', async () => {
        const user = userEvent.setup()
        render(<LoginForm />)
        const usernameTextField = await screen.findByLabelText('Username')
        const submitButton = await screen.findByRole('button')
        await user.type(usernameTextField, 'admin')
        expect(submitButton).toBeDisabled()
    })

    it('can send the request', async () => {
        const user = userEvent.setup()
        render(<LoginForm />)
        const usernameTextField = await screen.findByLabelText('Username')
        const passwordTextField = await screen.findByLabelText('Password')
        const submitButton = await screen.findByRole('button')
        await user.type(usernameTextField, 'admin')
        await user.type(passwordTextField, 'secret')
        await user.click(submitButton)
    })
})
