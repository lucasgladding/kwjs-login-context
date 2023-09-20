import LoginForm from './components/LoginForm.tsx'
import Account from './components/Account.tsx'
import { AuthProvider } from './contexts/Auth.tsx'

function App() {
    return <>
        <AuthProvider>
            <LoginForm />
            <Account />
        </AuthProvider>
    </>
}

export default App
