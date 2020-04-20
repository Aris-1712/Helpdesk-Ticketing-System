import React, { Component } from "react";
import "../Containers/ListEmployee.css";
import Axios from "axios";
import {connect} from 'react-redux' 
import * as Actions from '../Action'
import { MDBDataTable, MDBContainer, MDBRow, MDBCol, MDBDatePicker  } from "mdbreact";



class ListEmployee extends Component {
  state={
    list:[],
    // loaded:0
  }

  _exporter;
  export1 = () => {
    console.log("here")
      this._exporter.save();
  }
  cols=[{
    label: 'Name',
    field: 'Name',
    
    width: 150
  },{
      label: 'Email',
      field: 'Email',
      
      width: 50
    },
    {
      label: 'Designation',
      field: 'Designation',
      
      width: 150
    },
    {
      label: 'EDIT',
      field: 'edit',
      
      width: 50
    }]
    onclick=(event,objdet)=>{
      this.props.history.push({pathname:'/EmployeeDetails',
    search:'?'+ objdet})

  }

    list=[]
    componentDidMount= async()=>{
      // let listnew=[]
      // // console.log(this.props.emp)
      // let result=await Axios.get("https://ticketingapp-c05c2.firebaseio.com/Employee.json")
      // if(result.status===200){
      //   let keys=Object.keys(result.data)
        
      //   keys.map((obj)=>{
      //     let emp=result.data[obj]
      //     emp["key"]=obj
      //     listnew.push(emp)
      //   })
      //   listnew.map((obj)=>{
      //     let row={
      //           Name:"",
      //           Email:"",
      //           Designation:"",
      //           edit:""
      //         }
              
      //         row.Name=obj.Name
      //         row.Email=obj.Email,
      //         row.Designation=obj.Designation
      //         row.edit=<button onClick={(event)=>{this.onclick(event,obj.key)}}>EDIT</button>
      //         this.list.push(row)
      
      //   })

      //   this.setState({})

      }
      //  this.props.emp.map((obj)=>{
      //   console.log(obj)
      //   let row={
      //     Name:"",
      //     Email:"",
      //     Designation:"",
      //     edit:""
      //   }
        
      //   row.Name=obj.Name
      //   row.Email=obj.Email,
      //   row.Designation=obj.Designation
      //   row.edit=<button onClick={(event)=>{this.onclick(event,obj.key)}}>EDIT</button>


      //    list1.push(row)



      // })
      // this.list=list1
      // this.setState({list:this.list})
      // console.log(this.list)
      
    
    componentDidUpdate=()=>{
      console.log("here")
    }
    //   console.log(this.state.list)
    //   if(this.state.list===[]){
      
    //   let list1=[]
    //   console.log(this.props.emp)
    //   this.props.emp.map((obj)=>{
    //     let row={
    //       Name:"",
    //       Email:"",
    //       Designation:"",
    //       edit:""
    //     }
        
    //     row.Name=obj.Name
    //     row.Email=obj.Email,
    //     row.Designation=obj.Designation
    //     row.edit=<button onClick={(event)=>{this.onclick(event,obj.key)}}>EDIT</button>


    //      list1.push(row)



    //   })
    //   this.list=list1
    //    this.setState({list:this.list})
    //   console.log(this.list)
    // }
    // }
    load=()=>{
        let list1=[]
   
      this.props.emp.map((obj)=>{
        let row={
          Name:"",
          Email:"",
          Designation:"",
          edit:""
        }
        
        row.Name=obj.Name
        row.Email=obj.Email,
        row.Designation=obj.Designation
        row.edit=<button onClick={(event)=>{this.onclick(event,obj.key)}}>EDIT</button>


         list1.push(row)



      })
      this.list=list1
  

    }
render(){
 this.load()
  console.log(this.props)
  return(
    <div className="container">
      <br></br>
      <h1>Employee List</h1><br></br>    <MDBDataTable responsive
    striped
    bordered
    small
    data={{columns: this.cols, rows : this.list}}
  />
  </div>

  )
}


}

const mapPropsToState=(state)=>{
    return{
        emp:state.EmployeeList
    }
}
export default connect(mapPropsToState)(ListEmployee);
