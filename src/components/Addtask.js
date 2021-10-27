import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Redirect } from "react-router-dom"

export class Addtask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            task: "", priority: "", redirect: false,
            tasks: []

        }
    }

    ///////////////////////////////////////////////////////////
    handler = (event) => {
        event.preventDefault()
        const { name, value } = event.target

        this.setState({ [name]: value })
        console.log(value)
    }

    //////////////////////////////////////////////////////////////////
    //for adding task
    addTask = () => {
        // let data = {"task":this.state.task,"priority":this.state.priority,"status":false}

        let { task, priority,status, tasks } = this.state;
        //let todoData = JSON.parse(localStorage.getItem('todolist')) || []
        if (this.state.task !== "" && this.state.priority !== "") {
            this.setState({ tasks: [...tasks, { task, priority ,status}] });

            /*  todoData.push(data);
             console.log(todoData)
             localStorage.setItem('todolist',JSON.stringify(todoData))
             window.location.replace('/addtask') */
        } else {
            alert('please enter task and priority')
        }

    }

    ////////////////////////////////////////////////////////////
    //for deleting task
    deleteTask = (id) => {
        /* let todoData = JSON.parse(localStorage.getItem('todolist'))
        todoData.splice(id,1)
        localStorage.setItem('todolist',JSON.stringify(todoData))
        window.location.replace('/addtask')
 */
        const tasks = [...this.state.tasks];
        tasks.splice(id, 1);
        this.setState({ tasks: [...tasks] })
    }

    ////////////////////////////////////////////////////
    //for task completion
    completeTask = (id) => {

        //   const newList = this.state.tasks.map((values) => {

        /*         let todoData = JSON.parse(localStorage.getItem('todolist'))
                todoData[id].status="true"
                localStorage.setItem('todolist',JSON.stringify(todoData))
                window.location.replace('/addtask') */

        
        let tasks = [...this.state.tasks];
        let task = {...tasks[id]}
        task.status=true;
        tasks[id]=task;
        console.log(tasks);
       // console.log(tasks);
        this.setState({ tasks: [...tasks]})
    }

    ////////////////////    //logout
    logOut = () => {
        this.setState({ redirect: true });
    }


    ///////////////////////////////////////////////////////////   
    //Login form
    render() {
        //let tableData = JSON.parse(localStorage.getItem("todolist")) || []

        if (this.state.redirect) {
            return (
                <Redirect to={'/'} />
            )
        }
        const { tasks } = this.state;
        return (
            <div>

                <Container className="container-fliud pb-2 mt-2  text-light" id="todo">
                    <h2 className="text-center text-warning col-md-6">Todo List
                        <button className="btn btn-danger col-md-4 ml-5" onClick={this.logOut}>LOG OUT</button>
                    </h2>
                    <div className="mb-3 mx-5 mt-5 w-50">
                        <label className="form-label ">Task</label>
                        <input type="text" className="form-control w-25" name="task" value={this.state.task} onChange={this.handler} />
                        <select className="form-select w-25 my-3 " name="priority" onChange={this.handler} aria-label="Default select example">
                            <option selected>Priority</option>
                            <option value="Highest">Highest</option>
                            <option value="High">High</option>
                            <option value="Average">Average</option>
                            <option value="Low">Low</option>
                            <option value="Lowest">Lowest</option>
                        </select>
                        <br />
                        <button type="button" onClick={this.addTask} className="btn btn-primary my-3">Add Task</button>
                    </div>
                </Container>
                <Container className="mt-5" id="table">
                    <table className="table bord"  >
                        <thead className=" text-light">
                            <tr>
                                <th>Id</th>
                                <th>Task</th>
                                <th>Priority</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks.map((values, index) => (
                                <tr className="bg-dark text-light">
                                    <td>{index + 1}</td>
                                    <td>{values.status ? <strike>{values.task}</strike> : values.task}
                                    </td>
                                    <td>{values.priority}</td>
                                    <td>
                                        {!values.status ? <button onClick={() => this.completeTask(index)} className="btn btn-success mx-2">Complete</button>:null}
                                        <button onClick={() => this.deleteTask(index)} className="btn btn-danger">Delete</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>
            </div>



        )
    }
}

export default Addtask



