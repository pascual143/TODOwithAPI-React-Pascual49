import React, { useState, useEffect } from 'react'

const GetData = () => {

    const [tareas, setTareas ] = useState([])
    

    function getTodos (){
        console.log('cargado')
    }
    
    useEffect(()=>{
        fetch('https://playground.4geeks.com/apis/fake/todos/user/pascual')
        .then(response => response.json())
        .then((data)=> setTareas(data))
    })
    return (
        <div>
           {tareas.map((item)=> <p key={item.id}>{item.label}</p>)}
        </div>
    )
}

export default GetData