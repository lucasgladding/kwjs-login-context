import { createContext, PropsWithChildren, useContext, useReducer } from 'react'
import axios from 'axios'

type User = {
    name: string,
    settings: {
        isDarkMode: boolean
    }
}

type State = {
    token?: string,
    user?: User,
}

type LoginAction = {
    type: 'auth.login',
    token: string,
    user: User,
}

type LogoutAction = {
    type: 'auth.logout'
}

type Action = LoginAction | LogoutAction

function reduce(state: State, action: Action): State {
    switch (action.type) {
        case 'auth.login':
            return {
                ...state,
                token: action.token,
                user: action.user,
            }
        case 'auth.logout':
            return {
                ...state,
                token: undefined,
                user: undefined,
            }
    }
    return state
}

type Value = {
    state: State,
    dispatch: (action: Action) => void,
}

const AuthContext = createContext<Value>({ state: {}, dispatch: () => {} })

export function AuthProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reduce, {})
    return <AuthContext.Provider value={{ state, dispatch }}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext() {
    const { state, dispatch } = useContext(AuthContext)
    async function login() {
        const response = await axios.post('/api/login')
        dispatch({
            type: 'auth.login',
            token: response.data.token,
            user: response.data.user,
        })
    }
    function logout() {
        dispatch({
            type: 'auth.logout',
        })
    }
    const user = state.user
    const authenticated = state.token !== undefined
    return { login, logout, authenticated, user }
}
