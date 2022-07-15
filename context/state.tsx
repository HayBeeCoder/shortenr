import React, { useState, createContext, useContext, useEffect, useLayoutEffect } from 'react'
// import { createContext, useContext } from 'react'
import { REGEX_EMAIL } from '../constants'
type Action = { type: 'increment' } | { type: 'decrement' }
// type Dispatch = (action: Action) => void
// type Dispatch = (action: Action) => void
interface IsetState {
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setAccessToken: React.Dispatch<React.SetStateAction<string>>
    setRefreshToken: React.Dispatch<React.SetStateAction<string>>
    setLink:  React.Dispatch<React.SetStateAction<IUserLink | null>>
}
type Tstate = { email: string, accessToken: string, refreshToken: string ,link: IUserLink | null}
type AppProviderProps = { children: React.ReactNode, setToken: React.Dispatch<React.SetStateAction<string>> }

const AppContext = createContext<{ state: Tstate, setState: IsetState } | undefined>(undefined)

export function AppWrapper({ children, setToken }: AppProviderProps) {
    const [email, setEmail] = useState('')
    const [link, setLink] = useState<IUserLink | null>(null)
    // const [user,setUser] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')


    let sharedState = {
        state: {
            link,
            email,
            accessToken,
            refreshToken
        },
        setState: {
            setLink,
            setEmail,
            setAccessToken,
            setRefreshToken
        }
    }
    useEffect(
        () => {
            if ( accessToken == '' ) {
                setAccessToken(

                    JSON.parse(localStorage.getItem("access_token") as string)
                )
            }else{
                localStorage.setItem("access_token" , JSON.stringify(accessToken))
            }
        },
        [accessToken])

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


