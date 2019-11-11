import React from "react"
import RegisterForm from './RegisterForm'
import RegisterTable from './RegisterTable'
import API from '../utils/apiURLBase'

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            student_list:[],
            id_counter:0
        }
    }

    componentDidMount()
    {
        let options = {

            headers : {
                Accept : 'application/json'
            },

        }
        fetch(`${API.baseURL}/register`,options )
        .then(res =>{return res.json()})
        .then(data=>{
            console.log(data);          
            this.setState({
                student_list : data.students
            });
        })
        .catch(err => console.log("Ocurrio un error en la conexion"))
    }

    handleSubmit(student){
        student.datetime = new Date();
        let options ={
            method : "POST",
            headers : {
                "Content-type" : "application/json",
                Accept: "application/json"
            },

            body :  JSON.stringify(student)
        }

        fetch(`${API.baseURL}/register/create`,options)
        .then(res =>{return res.json()})
        .then(data=>{
            console.log(data);
            let butter_list = this.state.student_list.slice();
          
            this.setState({
                student_list :butter_list.concat([data.student]),
            });
        })
        .catch(err => console.log("Ocurrio un error en la conexion"))

        
    }

    handleDelete(student){

        let options ={
            method : "DELETE",
            headers : {
                "Content-type" : "application/json",
                Accept: "application/json"
            },

            body :  JSON.stringify({id:student._id})
        }

        fetch(`${API.baseURL}/register/delete`,options)
        .then(res =>{return res.json()})
        .then(data=>{
            console.log(data);

            let index = this.state.student_list.find(value=>{
                return value._id === student._id;
            })
    
            let buffer_list = this.state.student_list.slice();
            buffer_list.splice(index, 1);
    
            this.setState({
                student_list: buffer_list
            });
        })
        .catch(err => console.log("Ocurrio un error en la conexion"))
    }
    
    render(){
        return (
            <div className="container" style={{"marginTop":2+"em", "marginBottom":2+"em"}}>
                <RegisterForm 
                    onSubmit = {(student)=>{
                        this.handleSubmit(student);
                    }}
                />
                <RegisterTable 
                    list={this.state.student_list}
                    onDelete={(student)=>this.handleDelete(student)}
                    />
            </div>
        );
    }
}

export default App;