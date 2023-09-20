import { createContext, PropsWithChildren, useContext, useReducer } from 'react'
import axios from 'axios'

type State = {
    token?: string,
}

type LoginAction = {
    type: 'auth.login',
    token: string,
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
            }
        case 'auth.logout':
            return {
                ...state,
                token: undefined,
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
        // make the request against the API...
        const response = await axios.post('/api/login')
        dispatch({
            type: 'auth.login',
            token: response.data.token,
        })
    }
    function logout() {
        dispatch({
            type: 'auth.logout',
        })
    }
    const authenticated = state.token !== undefined
    return { login, logout, authenticated }
}
