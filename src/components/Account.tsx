import { useAuthContext } from '../contexts/Auth.tsx'

export default function Account() {
    const { authenticated, user, logout } = useAuthContext()
    return <div>
        <div>{ authenticated ? 'authenticated' : 'not authenticated' }</div>
        <div>{ user?.name ?? 'none' }</div>
        <div>{ user?.settings?.isDarkMode ? 'dark mode' : 'light mode' }</div>
        <button onClick={logout}>Logout</button>
    </div>
}
