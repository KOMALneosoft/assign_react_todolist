import React, { Component } from 'react'
import { Container, Form,Row ,Col, Button} from 'react-bootstrap';

const regExForTask = RegExp(/^[ A-Za-z0-9]*$/);

export class Addtask extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            task:null,
            priority:null,
            errors:{task:'',priority:''},
            tasks:[{id:1,task:"Learning Python",priority:2},
                   {id:2,task:"Learning React js",priority:1}
                      ]}
    }

    handler=(event)=>
    {
        event.preventDefault();
        const{name,value}=event.target;
        let errors=this.state.errors;
        switch(name){
            case 'task':
                errors.task=regExForTask.test(value)?'':'alphnumberic';
                break;
            case 'priority':
                errors.priority=value>5?'Priority shoulb be 1-5':'';
                break;
         
        }
        this.setState({errors,[name]:value},()=>{
            console.log(errors)
        })
    }

   addTask=(event)=>{
       event.preventDefault();
       let{task,priority,tasks}=this.state;
       this.setState({tasks:[...tasks,{task,priority}]});
       document.querySelectorAll("input").forEach(ele=>{ele.value=" "})

   }

   deleteTask=(id)=>{
     const tasks=[...this.state.tasks];
     tasks.splice(id,1);
      this.setState({tasks:[...tasks]})

   }
    render() {
      const {errors}=this.state;
        return (
            <div>
            
               <Container className="container pb-4">
                   <Container className="container-fliud  mt-4  text-light" id="todo">
                   <h2 className="text-center text-warning">Todo List</h2>
                        <Form onSubmit={this.addTask} className="form-style"  >
                            
                            <Row>
                                <Col>
                                   <label>Task Title</label>
                               </Col>
                            </Row>
                            <Row>
                                <Col>
                                   <input type="text" name="task" className="form-control" onChange={this.handler}/>
                                   {errors.task.length>0&&<span style={{color:'red'}}>{errors.task}</span>}
                               </Col>
                            </Row>
                            <Row>
                                <Col>
                                   <label>Priority</label>
                               </Col>
                            </Row>
                            <Row>
                                <Col>
                                   <input type="number" name="priority" className="form-control" onChange={this.handler}/>
                                   {errors.priority.length>0&&<span style={{color:'red'}}>{errors.priority}</span>}
                               </Col>
                            </Row>
                           <br/>
                            <input type="submit" value="Add Task" className="btn btn-success" />
                        </Form>
                   </Container>
                   <Container className="mt-5" id="table">
                   <table className="table bord"  >
                       <thead className="bg-dark text-light">
                           <tr>
                               <th>Id</th>
                               <th>Task</th>
                               <th>Priority</th>
                               <th>Action</th>
                           </tr>
                       </thead>
                       
                          <tbody>
                          {this.state.tasks.map((pro,index)=>
                        
                          <tr key={index}>
                              <td>{index+1}</td>
                              <td>{pro.task}</td>
                              <td>{pro.priority}</td>
                            
                               <td><button type="button" className="btn btn-danger" onClick={()=>this.deleteTask(index)} >X</button></td>

                          </tr>
                            )}
                      </tbody>
                      

                      
                   </table>
                   
               </Container>
               </Container>
            </div>
        )
    }
}

export default Addtask