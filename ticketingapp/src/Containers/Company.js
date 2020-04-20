import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../Action";
import Axios from 'axios'
import '../Containers/Company.css'
import 'react-phone-input-2/lib/style.css'
// import 'react-phone-input-2/lib/material.css';
// import '../../node_modules/react-phone-number-input/style.css'
import PhoneInput from 'react-phone-input-2'
import TicketAssign from "./TicketAssign";

class Company extends Component {
  state={
    name:"",
    contact:"",     
    number:"+971",
      saved:false,
      nameerr:false,
      comperr:false,
      saving:false
  }
  componentDidUpdate=async()=>{
    
    // this.setState({saved:false})
      console.log(this.state)
  }
  alertclose=()=>{
    window.location.reload();
  }
  eventHandler = (event, id) => {
    let value = event.target.value;

    if (id === "Name") {
      if(value==="" || value.length<4){
        this.setState({comperr:true})

      }else{
        this.setState({comperr:false})
      }
      // console.log(value);
      this.setState({name:value})
      this.props.add1(id, value);
    }

    if (id === "ContactName") {
      if(value==="" || value.length<4){
        this.setState({nameerr:true})

      }else{
        this.setState({nameerr:false})
      }
      this.setState({contact:value})
      // console.log(value);
      this.props.add1(id, value);
    }

    if (id === "ContactNum") {
      this.setState({number:value})
      // console.log(value);
      this.props.add1(id, value);
    }
  };
  eventhandler1=(val)=>{
    this.setState({number:val})
  }
  submitHandler = async(event) => {
    this.setState({saving:true})
    event.preventDefault();
    if(this.state.comperr===true || this.state.nameerr===true || this.state.contact==="" || this.state.name==="" || this.state.number==="+971"){
      this.setState({saving:false})
      alert("Errors in the form. Cannot Submit.")
    }else{
    console.log(this.props.cmp)
    let result=await Axios.post('https://ticketingapp-c05c2.firebaseio.com/Company.json',this.props.cmp)
    if(result.status===200){
        this.setState({saved:true})
        let List1 = [];
    const result1 = await Axios.get(
      "https://ticketingapp-c05c2.firebaseio.com/Company.json"
    );
    
    if (result1.status == 200) {
      let keys1 = Object.keys(result1.data);
      keys1.map(obj => {
        let res = result1.data[obj];
        res["key"] = obj;
        List1.push(res);
      });
      console.log(List1);
      //this.setState({ ListEmp: List });
      this.props.load1(List1);
    }
    }
    console.log(this.state)
    // setTimeout(window.location.reload(),2000)
    // window.location.reload();
  }};
  render = () => {
      let Toast=(  
      <div class="alert alert-success alert-dismissible">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
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
      )
    return (
      <div className="container">
        <br></br>
          {this.state.saved?Toast:null}
        <h1 style={{ textAlign: "Left",fontWeight:"bold" }}>Company Info</h1>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              placeholder="Enter Company Name"
              onChange={event => this.eventHandler(event, "Name")}
            ></input>
            {this.state.comperr?<label style={{color:"Red"}}>Company name should be atleast 4 characters.</label>:<div></div>}
          </div>
          <div className="form-group">
            <label>Contact Person:</label>
            <input
              type="text"
              className="form-control"
              id="Contact"
              placeholder="Enter Contact Person"
              onChange={event => this.eventHandler(event, "ContactName")}
            ></input>
            {this.state.nameerr?<label style={{color:"Red"}}>Name should be atleast 4 characters.</label>:<div></div>}
          </div>
          <div className="form-group">
            <label>Contact Number:</label>
            <PhoneInput
      placeholder="Enter phone number"
      value={this.state.number}
      onChange={this.eventhandler1}/>
      {/* {this.state.number==="+971"?<label style={{color:"Red"}}>Company name should be atleast 4 characters.</label>:<div></div>} */}
            {/* <input
              type="text"
              className="form-control"
              id="ContactNum"
              placeholder="Enter Contact Number"
              onChange={event => this.eventHandler(event, "ContactNum")}
            ></input> */}
          </div>

        {this.state.saving?<button type="submit" className="btn btn-primary" style={{margin:"5px"}} disabled>
            Submit
          </button>:<button type="submit" className="btn btn-primary" style={{margin:"5px"}}>
            Submit
          </button>}  
          
          <button onClick={this.alertclose} className="btn btn-danger" style={{margin:"5px"}}>
              New
          </button>
        </form>
      </div>
    );
  };
}
const mapPropsToStore = state => {
  return {
    cmp: state.Company
  };
};
const mapPropsToAction = dispatch => {
  return {
    add1: (a, b) => {
      dispatch(action.add(a, b));
    },
    load1: li => {
      dispatch(action.LoadCom(li));
    }
  };
};

export default connect(mapPropsToStore, mapPropsToAction)(Company);
