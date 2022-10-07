
import Router from "next/router"

function handleBackHome(){
    return Router.push('/')
}

export default function Dashboards(){


    return (
        <>
        <h1>Dashboards</h1>
        <button onClick={handleBackHome}> home</button>
        </>
    )
}