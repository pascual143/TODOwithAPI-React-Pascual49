import React, { useState, useEffect } from 'react'

const GetData = () => {

    const [tareas, setTareas ] = useState([])

//fetch API
    useEffect(() => {
      fetchTasksFromAPI();
    }, []);


    const fetchTasksFromAPI = () => {
     
      fetch("https://playground.4geeks.com/apis/fake/todos/user/mariano")
        .then((response) => response.json())
        .then((data) => setTasks(data))
        .catch((error) => console.error("Error fetching tasks from API", error));
    };
    
    useEffect(()=>{
        fetch('https://playground.4geeks.com/apis/fake/todos/user/pascual')
        .then(response => response.json())
        .then((data)=> setTareas(data))
    })
//add task
    const handleAddtarea = () => {
        if (tareaText) {
          const newtarea = { label: tareaText, done: false };
          
          fetch("https://playground.4geeks.com/apis/fake/todos/user/pascual", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([...tareas, newtarea]),
          })
            .then((response) => response.json())
            .then(() => {
              fetchtareasFromAPI();
            })
            .catch((error) => console.error("Error adding task to API", error));
    
          settareaText("");
        }
      };
//delete a task    
      const handletareaDelete = (index) => {
        const updatedtareas = [...tareas];
        updatedtareas.splice(index, 1);
       
        fetch("https://playground.4geeks.com/apis/fake/todos/user/pascual", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedtareas),
        })
          .then((response) => response.json())
          .then(() => {
            // Fetch the updated tarea list from the API
            fetchtareasFromAPI();
          })
          .catch((error) => console.error("Error deleting tarea from API", error));
      };
    return (
        <div>
           {tareas.map((item)=> 
           <li  
                className="list-group-item list-group-item-action text-secondary" 
                key={item.id}
            >
            {item.label}
           <button 
                className="btn btn-light btn-sm float-end text-secondary link-hover"
                onClick={() => handletareaDelete(item.id)}
            >
            <i>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                </svg>
            </i>
            </button>
           </li>)}
           {tareas.length}
        </div>
    )
}

export default GetData