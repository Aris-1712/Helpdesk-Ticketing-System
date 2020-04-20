import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../Action";
import Axios from "axios";

class Softwares extends Component {
  state = {
    saved: false,
    nameerr:false,
    name:"",
    saving:false
  };
  componentDidUpdate=async()=>{
    
  }

  Technology = ["VB6", ".NET", "HTML/CSS"];
  alertclose = () => {
    window.location.reload();
  };

  changehandler = (event, id) => {
    let value = event.target.value;
    if (id === "SoftName") {
      if(value.length<4){
        this.setState({nameerr:true})
      }
      else(
        this.setState({nameerr:false})
      )
      this.setState({name:value})
      this.props.Softnamechange(id, value);
    }
    if (id === "SoftTech") {
      this.props.Softnamechange(id, value);
    }
  };

  submitHandler = async event => {
    event.preventDefault();
    this.setState({saving:true})
    if(this.state.nameerr || this.state.name===""){
      this.setState({saving:false})
      alert("Enter valid software name")
    }
    else{

    
    const result = await Axios.post(
      "https://ticketingapp-c05c2.firebaseio.com/Software.json",
      this.props.software
    );
    if (result.status === 200) {
      this.setState({ saved: true });
      let List2 = [];
    const result2 = await Axios.get(
      "https://ticketingapp-c05c2.firebaseio.com/Software.json"
    );
    if (result2.status == 200) {
      let keys2 = Object.keys(result2.data);
      keys2.map(obj => {
        let res = result2.data[obj];
        res["key"] = obj;
        List2.push(res);
      });
      console.log(List2);
      //this.setState({ ListEmp: List });
      this.props.load2(List2);
    }
    }
    console.log(this.state);
  }};

  render = () => {
    let Toast = (
      <div class="alert alert-success alert-dismissible">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        <strong>Success!</strong> Saved Successfully!
      </div>
    );
    return (
      <div className="container">
        <br></br>
        {this.state.saved ? Toast : null}
        <h1 style={{ textAlign: "Left",fontWeight:"bold" }}>Software Info</h1>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label>Software Name:</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              placeholder="Enter Software Name"
              onChange={event => this.changehandler(event, "SoftName")}
            ></input>
            {this.state.nameerr?<label style={{color:"Red"}}>Software name should be atleast 4 characters.</label>:<div></div>}
          </div>
          <div className="form-group">
            <label>Technology used:</label>
            <select
              class="form-control"
              onChange={event => {
                this.changehandler(event, "SoftTech");
              }}
            >
              {this.Technology.map(obj => {
                return <option>{obj}</option>;
              })}
            </select>
          </div>
          {this.state.saving?<button
            type="submit"
            className="btn btn-primary"
            style={{ margin: "5px" }}
            disabled
          >
            Submit
          </button>
          :<button
          type="submit"
          className="btn btn-primary"
          style={{ margin: "5px" }}
          
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

const mapPropsToState = state => {
  return {
    software: state.Software
  };
};

const mapPropsToActions = dispatch => {
  return {
    Softnamechange: (a, b) => {
      dispatch(action.add(a, b));
    },
    load2: li => {
      dispatch(action.LoadSof(li));
    }
  };
};

export default connect(mapPropsToState, mapPropsToActions)(Softwares);
