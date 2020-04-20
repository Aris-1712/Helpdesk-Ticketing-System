import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../Action";
import Axios from "axios";

class Employee extends Component {
  state = {
    saved: false,
    name:"",
    nameerr:false,
    email:"",
    emailerr:false,
    saving:false
  };
  Designation = ["Accountant", "Technical Support", "Programmer"];
  componentDidUpdate = async() => {
    // console.log(this.state)
    
  };
  alertclose = () => {
    window.location.reload();
  };
  eventHandler = (event, id) => {
    let value = event.target.value;

    if (id === "EmpName") {
      console.log(value);
      if(value.length<4){
        this.setState({nameerr:true})
      }
      else(
        this.setState({nameerr:false})
      )
      this.props.add1(id, value);
      this.setState({name:value})
    }

    if (id === "EmpEmail") {
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)===false){
        this.setState({emailerr:true})
      }
      else(
        this.setState({emailerr:false})
      )
      console.log(value);
      this.props.add1(id, value);
      this.setState({email:value})
    }
    if (id === "EmpDesig") {
        console.log(value);
        this.props.add1(id, value);
      }
  };
  submitHandler = async event => {
    event.preventDefault();
    this.setState({saving:true})
    if(this.state.nameerr===true || this.state.emailerr===true || this.state.name==="" || this.state.email===""){
      this.setState({saving:false})
      alert("Enter Proper Details.")
    }else{
    console.log(this.props.cmp);
    let result = await Axios.post(
      "https://ticketingapp-c05c2.firebaseio.com/Employee.json",
      this.props.cmp
    );
    if (result.status === 200) {
      this.setState({ saved: true });
      let List = [];
    const result = await Axios.get(
      "https://ticketingapp-c05c2.firebaseio.com/Employee.json"
    );
    if (result.status == 200) {
      let keys = Object.keys(result.data);
      keys.map(obj => {
        let res = result.data[obj];
        res["key"] = obj;
        List.push(res);
      });
      console.log(List);
      //this.setState({ ListEmp: List });
      this.props.load(List);
    }
    }
    console.log(this.state);
  }};
  render = () => {
    console.log(this.state)
    let Toast = (
      <div class="alert alert-success alert-dismissible">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        <strong>Success!</strong> Saved Successfully!
      </div>
      

      //     <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000" style={{position: "absolute" , top: "0", right: "0"}}>
      //     <div className="toast-header">

      //       <strong className="mr-auto">Bootstrap</strong>
      //       <small>11 mins ago</small>
      //       <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      //         <span aria-hidden="true">&times;</span>
      //       </button>
      //     </div>
      //     <div className="toast-body">
      //       Hello, world! This is a toast message.
      //    </div>
      //   </div>
    );
    return (
      <div className="container">
          <br></br>
        {this.state.saved ? Toast : null}
        <h2 style={{ textAlign: "Left",fontWeight:"bold" }}>Employee Info</h2>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label>Employee Name:</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              placeholder="Enter Employee Name"
              onChange={event => this.eventHandler(event, "EmpName")}
            ></input>
            {this.state.nameerr?<label style={{color:"Red"}}>Employee name should be atleast 4 characters.</label>:<div></div>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              id="Contact"
              placeholder="Enter Email"
              onChange={event => this.eventHandler(event, "EmpEmail")}
            ></input>
            {this.state.emailerr?<label style={{color:"Red"}}>Enter proper Email address.</label>:<div></div>}
          </div>
          <div class="form-group">
            <label>Designation:</label>
            <select class="form-control" onChange={(event)=>{this.eventHandler(event,'EmpDesig')}}>
              {this.Designation.map(obj => {
                return <option>{obj}</option>;
              })}
            </select>
          </div>
         {this.state.saving? <button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "5px" }}
            disabled
          >
            Submit
          </button>:<button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "5px" }}
            diabled
          >
            Submit
          </button>
  }
          <button
            onClick={this.alertclose}
            className="btn btn-danger"
            style={{ margin: "5px" }}
          >
            New
          </button>
        </form>
      </div>
    );
  };
}
const mapPropsToStore = state => {
  return {
    cmp: state.Employee
  };
};
const mapPropsToAction = dispatch => {
  return {
    add1: (a, b) => {
      dispatch(action.add(a, b));
    },
    load: li => {
        dispatch(action.LoadEmp(li));
      }
  };
};
export default connect(mapPropsToStore, mapPropsToAction)(Employee);
