import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'

type LoginFormData = {
    username: string,
    password: string,
}

export default function LoginForm() {
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    })

    function onInputChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.id
        const value = event.target.value
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    function isFormDisabled() {
        return formData.username.length === 0 || formData.password.length === 0
    }

    async function onFormSubmit(event: FormEvent) {
        event.preventDefault()
        await axios.post('/api/login', formData)
    }

    return <form onSubmit={onFormSubmit}>
        <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={onInputChange}
            />
        </div>
        <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={onInputChange}
            />
        </div>
        <button
            className="form-button"
            type="submit"
            disabled={isFormDisabled()}
        >Submit</button>
    </form>
}
