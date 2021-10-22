import React, { Component } from 'react';

import {Container,Row,Button,InputGroup,Form,Col} from 'react-bootstrap';
import { Redirect } from 'react-router';

const regForName=RegExp(/^[a-zA-Z]{3,100}$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass=RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

export class Registration extends Component {
    constructor(props){
        super(props);
        this.state={
           dataVal:{ 
                fname:null,
                lname:null,
                uname:null,
                email:null,
                
                password:null,
                confirm:null
            
            },
           errors:{
                fname:'',
                lname:'',
                uname:'',
                email:'',
                password:'',
                confirm:''
              
            },
            formData:[],
            dataform:[]
        }
    }

    componentDidMount(){
        const URL="http://localhost:3001/UserData"
        fetch(URL)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({dataform:data})
        })

    }
    handler=(event)=>{
            const{name,value}=event.target;
            this.setState({[name]:value})
            let errors=this.state.errors;
            let fetchVal = this.state.dataVal;
            console.log(fetchVal)
            switch(name){
                case 'fname':
                    errors.fname=regForName.test(value)?'':'Name should be in aplahbets';
                    fetchVal.fname = value;
                    break;

                case 'lname':
                    errors.lname=regForName.test(value)?'':'Last Name should be in aplahbets';
                    fetchVal.lname = value;
                    break;
                
                case 'uname':
                errors.uname=regForName.test(value)?'':'userName should be in aplahbets';
                fetchVal.uname = value;
                break;

                case 'email':
                       errors.email=regForEmail.test(value)? '':'Email is not valid';
                       fetchVal.email = value;
                       break;
             
                case 'password':
                       errors.password=regForPass.test(value)? '':'password should be in aplhanumeric & special chars';
                       fetchVal.password = value;
                        this.state.password=value;
                       break;
                case 'confirm':
                       errors.confirm=value === this.state.password?'': 'password should not matched';
                       fetchVal.confirm = value;

                       break;
              
                }
                this.setState({errors,[name]:value},()=>{
                    console.log(errors)
                })
               
        }

        formSubmit=(event)=>{
            event.preventDefault();
            let items = this.state.dataVal;
            console.log(items)
           
           if(this.validate(this.state.errors))
            {
                alert("Registration Succesfull");
                this.setState({
                    formData : [...this.state.formData,
                        {"fname":items.fname,
                        "lname":items.lname,
                        "uname":items.uname,
                        "email":items.email,
                        "password":items.password
                      }]
                    });   
                  
                    document.getElementById('fname').value='';  
                    document.getElementById('lname').value='';   
                    document.getElementById('uname').value='';        
                    document.getElementById('email').value='';

                    document.getElementById('password').value='';
                    document.getElementById('confirm').value='';
          
                }            
                else {
                   alert("Invalid Form");
                   document.getElementById('fname').value='';
                   document.getElementById('lname').value='';   
                   document.getElementById('uname').value='';          
                   document.getElementById('email').value='';
                
                   document.getElementById('password').value='';
                   document.getElementById('confirm').value='';
                
                }
            }
          validate=(errors)=>{
             let valid=true;
             Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
             return valid;
         }
       

        showPassword=()=>{
            let checknode=document.getElementById("check")
            let pwd= document.getElementById('password')
            let cpass= document.getElementById('confirm')
            if(checknode.checked){
                pwd.type="text";
                cpass.type="text";

            }
            else{
                pwd.type="password";
                cpass.type="password"
            }

        }
        getData=(event)=>{
            event.preventDefault();
            let formData={uname:this.state.dataVal.uname,email:this.state.dataVal.email,password:this.state.dataVal.password}
            const URL="http://localhost:3002/UserData";
            fetch(URL,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                 },
                 body:JSON.stringify(formData)
            })
    
            .then(res=>res.json())
        
            .then(data=>{
                alert("Data added");
           
            fetch(URL)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                this.setState({dataform:data})
            })
    
           })
        } 

    render() {
        const {errors}=this.state;
       
        return (
            
            <Container className="container1 bg-dark  text-light">
                <h2 className="pt-2 pb-3 text-center text-warning">Registration Form</h2>
                <Row>
                <Col lg={6}>
                    <Form onSubmit={this.getData} className="bord1 ml-5" >
                        
                        <Form.Group className="mb-3" >
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name="fname" id="fname" onChange={this.handler} required/>
                            {errors.fname.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.fname}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" name="lname" id="lname" onChange={this.handler} required/>
                            {errors.lname.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.lname}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>User Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter User Name" name="uname" id="uname" onChange={this.handler} required/>
                            {errors.uname.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.uname}</p>}
                        </Form.Group>

                        
                        <Form.Group className="mb-3" >
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={this.handler} required/>
                            {errors.email.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.email}</p>}
                        </Form.Group>

                  
                        <Form.Group className="mb-3" >
                            <Form.Label>Pasword:</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={this.handler} required />
                            {errors.password.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.password}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter ConfirmPassword" name="confirm" id="confirm" onChange={this.handler} required/>
                            {errors.confirm.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.confirm}</p>}
                        </Form.Group>

                        <InputGroup className="mb-3">
                      
                        <Form.Label className="mr-2" >ShowPassword:</Form.Label>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" id="check" onChange={this.showPassword} />
                        </InputGroup>
                                            
                         <Button variant="success" type="submit" href="/" onSubmit={this.formSubmit} > Register</Button>
                        

                    </Form>
                    </Col>
                </Row>
            </Container>
     )

  }   
  
    }
export default Registration;
