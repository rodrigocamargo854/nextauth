
import Router from "next/router"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContexts"

function handleBackHome(){
    return Router.push('/')
}

export default function Dashboards(){

    const {user} = useContext(AuthContext)


    return (
        <>
        <h1>Hello mr{user?.email}</h1>
        <button onClick={handleBackHome}> home</button>
        </>
    )
}