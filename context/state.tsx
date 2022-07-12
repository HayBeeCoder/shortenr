import React, { useState,createContext,useContext } from 'react'
// import { createContext, useContext } from 'react'
import { REGEX_EMAIL } from '../constants'
type Action = { type: 'increment' } | { type: 'decrement' }
// type Dispatch = (action: Action) => void
// type Dispatch = (action: Action) => void
interface IsetState {
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setAccessToken: React.Dispatch<React.SetStateAction<string>>
    setRefreshToken: React.Dispatch<React.SetStateAction<string>>
}
type Tstate = { email: string, accessToken: string,refreshToken: string }
type AppProviderProps = { children: React.ReactNode }

const AppContext = createContext<{ state: Tstate, setState: IsetState } | undefined>(undefined)

export function AppWrapper({ children }: AppProviderProps) {
    const [email, setEmail] = useState('')
    // const [user,setUser] = useState('')
    const [accessToken,setAccessToken] = useState('')
    const [refreshToken,setRefreshToken] = useState('')


    let sharedState = {
        state: {
            email,
            accessToken,
            refreshToken
        },
        setState: {
            setEmail,
            setAccessToken,
            setRefreshToken
        }
    }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}


export function useAppContext() {
    const context = React.useContext(AppContext)
    //  console.log(context)
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}


