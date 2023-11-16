import React, { useState, useEffect } from 'react'

const TodoList = () => {

    const [input1, setInput1 ] = useState('')
    const [tasks, setTasks] = useState([])

    //fetch API
     useEffect(() => {
         fetchTasksFromAPI();
       }, []);
          const fetchTasksFromAPI = () => {    
            fetch("https://playground.4geeks.com/apis/fake/todos/user/pascual")
              .then((response) => response.json())
              .then((data) => setTasks(data))
              .catch((error) => console.error("Error fetching tasks from API", error));
    };

      //Add Task
    const addTask = (event) => {
        if (event.key === "Enter" && input1.trim() !== '') {
            setTasks(tasks.concat(input1)) 
            //setInput1("")
          const newtask = { label: input1, done: false};
          
          fetch("https://playground.4geeks.com/apis/fake/todos/user/pascual", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify([...tasks, newtask]),
          })
            .then((response) => response.json())
            .then(() => {
              fetchTasksFromAPI();
            })
            .catch((error) => console.error("Error adding task to API", error));
    
          setInput1("");
        }
      };

    //Delete Task
        const deleteTask = (task) => {

        //setTasks(tasks.filter(item => item !== task))

        let add = tasks.filter((item => item !== task))

        let requestOptions = {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(add),
          redirect: 'follow'
      };

         fetch("https://playground.4geeks.com/apis/fake/todos/user/pascual", requestOptions)
           .then((response) => response.json())
           .then(() => {
             // Fetch the updated task list from the API
             fetchTasksFromAPI();
           })
           .catch((error) => console.error("Error deleting task from API", error));
       };
       
    return (
      <>
        <div>
            <h1 className="p-3 m-2 mx-auto text-center"> TODOS </h1>

            <div className="list-group mx-auto" style={{width:"400px"}}>

                <input className="list-group-item list-group-item-action"
                value={input1}
                onChange={e => setInput1(e.target.value)}
                onKeyDown={addTask} 
                placeholder="Write a note"
                />
               
        {tasks.map( (task, index) => (
          <li className="list-group-item list-group-item-action text-secondary"
              key={index}
          >
              {task.label}

              <button 
                  className="btn btn-light btn-sm float-end text-secondary link-hover"
                  onClick={() => deleteTask(task)}
              >
              <i>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                  </svg>
              </i>
              </button>   
          </li>
          ))}
                <p className="list-group-item list-group-item-action text-start text-small text-secondary">{tasks.length} Items left</p>
                </div>

        </div>
        </>
    )
}

export default TodoList