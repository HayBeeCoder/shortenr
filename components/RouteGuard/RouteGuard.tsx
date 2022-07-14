import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAppContext } from '../../context/state';

interface IRouteGuard {
    children: JSX.Element
}

const RouteGuard = ( Protected : () => JSX.Element) => {
    return function A() {
        
        const { state: { accessToken } } = useAppContext()
        const router = useRouter()
        // console.log(accessToken)

        if (accessToken && accessToken != '') {
            return <Protected/>
        }
        
        useEffect(() => {
            const auth = JSON.parse(localStorage.getItem("access_token") as string)
            if (!auth) {

                router.push({
                    pathname: '/login',
                    query: { returnUrl: router.asPath }
                });
            }
           
        },[])
    
        return (
            accessToken && accessToken != '' ? <Protected  /> : <></>
        )
    }
}

export default RouteGuard