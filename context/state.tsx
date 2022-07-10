import React, { useState } from 'react'
import { createContext, useContext } from 'react'
import { REGEX_EMAIL } from '../constants'
type Action = { type: 'increment' } | { type: 'decrement' }
// type Dispatch = (action: Action) => void
// type Dispatch = (action: Action) => void
interface IsetState {
    [key: string]: React.Dispatch<React.SetStateAction<string>>
}
type Tstate = { email: string }
type AppProviderProps = { children: React.ReactNode }

const AppContext = createContext<{ state: Tstate, setState: IsetState } | undefined>(undefined)

export function AppWrapper({ children }: AppProviderProps) {
    const [email, setEmail] = useState('Oguntadeabass1@gmail.com')


    let sharedState = {
        state: {
            email
        },
        setState: {
            setEmail
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
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}


