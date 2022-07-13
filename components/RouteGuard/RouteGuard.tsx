import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/state';

interface IRouteGuard {
    children: JSX.Element
}

const RouteGuard = ({children}: IRouteGuard) => {
    const router = useRouter()
    const {state: {accessToken}} = useAppContext()
    const [authorized , setAuthorized] = useState(false)

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);


    function authCheck(url: string) {
        // redirect to login page if accessing a private page and not logged in 
        // const privatePaths = ['/dashboard' , '/analytics'];
        const publicPaths = ['/login' , '/signup','/','confirmation']
        // const publicPaths = ['/login' , '/signup','/','confirmation']
        const path = url.split('?')[0];

        // console.log(path)
        // console.log(accessToken)
        // console.log("accesstoken:  " , accessToken)
        // console.log('router.asPath: ', router.asPath)
        // if(accessToken.length > 10){
        //     setAuthorized(true)
        //     router.push(router.query.returnUrl as string)
        //     return children
        // }
        //still need to remove this
        if (accessToken == '' && (!publicPaths.includes(path) || !path.includes('/activate'))) {
            setAuthorized(false);

            router.push({
                pathname: '/login',
                query: { returnUrl: publicPaths.includes(router.asPath) ? "/dashboard" : router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }
  return (
    authorized ? children : <></>
  )
}

export default RouteGuard