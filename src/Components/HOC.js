import React from 'react'
import Component_navbar from './Component.navbar'
import Home from '../pages/Home/Home'
import Component_footer from './Component.footer'

const HOC = (Component) => ({ ...props }) => {
    return (
        <>
            <Component_navbar />
            <Component {...props} />
            <Component_footer />
        </>
    )
}

export default HOC(Home)