import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAppContext } from '../../context/state';

interface IRouteGuard {
    children: JSX.Element
}

const RouteGuard = ( Protected : () => JSX.Element) => {
    return () => {
        
        const { state: { accessToken } } = useAppContext()
        // console.log(accessToken)
        const router = useRouter()

        if (accessToken && accessToken != '') {
            return <Protected/>
        }
        
        useEffect(() => {
            const auth = JSON.parse(localStorage.getItem("access_token") as string)
            // console.log(auth)
            // console.log("isNull: ", !accessToken)
            // console.log("Length: ",!!accessToken.length)
            if (!auth) {

                router.push({
                    pathname: '/login',
                    query: { returnUrl: router.asPath }
                });
            }
            // useEffect(() => {
                // on initial load - run auth check 
                // authCheck(router.asPath);
        
                // // on route change start - hide page content by setting authorized to false  
                // const hideContent = () => setAuthorized(false);
                // router.events.on('routeChangeStart', hideContent);
        
                // // on route change complete - run auth check 
                // router.events.on('routeChangeComplete', authCheck)
        
                // // unsubscribe from events in useEffect return function
                // return () => {
                //     router.events.off('routeChangeStart', hideContent);
                //     router.events.off('routeChangeComplete', authCheck);
                // }
        },[])
    
// console.log(accessToken)
        return (
            accessToken && accessToken != '' ? <Protected  /> : <></>
        )
    }
}

export default RouteGuard