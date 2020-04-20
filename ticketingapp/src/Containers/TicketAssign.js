import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from 'axios'
import * as actions from "../Action";
class TicketAssign extends Component {
    state={
        AssignedToKey:"",
        Ticketkey:""
    }

    onSelect=(event,obj)=>{
        //console.log(event.target.value)
        let value=event.target.value;
        this.setState({Ticketkey:obj.key,AssignedToKey:value})
    }

    onSubmit=async(event,obj)=>{
        console.log(this.state)
        event.preventDefault();
        if(this.state.Ticketkey!==obj.key){
            alert("Please select a support person")
        }
        else{
            obj.AssignedTo=this.state.AssignedToKey
            let res=await Axios.put("https://ticketingapp-c05c2.firebaseio.com/Tickets/"+this.state.Ticketkey+".json",obj)
            if (res.status===200){
              alert("Ticket assigned.")
                let List3=[];
                const result3 = await Axios.get(
                  "https://ticketingapp-c05c2.firebaseio.com/Tickets.json"
                );
                if(result3.status===200){
                  console.log(result3.data)
                  let keys3=Object.keys(result3.data)
                  keys3.map((obj)=>{
                    let restemp=result3.data[obj];
                    restemp["key"]=obj
                    List3.push(restemp)
                  })
                  this.props.load3(List3)

            }
        }

        }
    }
  render() {
    let card = this.props.List.map(obj => {
        if(obj.AssignedTo===""){
      return (
        <div>
            
          <div class="card">
            <div class="card-header">{obj.Company}</div>
            <div class="card-body">
            <h5 class="card-title" style={{ display: "inline" }}>
                Ticket Number :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.TicketNo}
              </h5>
              <br></br>
              <h5 class="card-title" style={{ display: "inline" }}>
                Software :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.Software}
              </h5>
              <br></br>
              <h5 class="card-title" style={{ display: "inline" }}>
                Description :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.Description}
              </h5>
              <br></br>
              <h5 class="card-title" style={{ display: "inline" }}>
                Priority :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.Priority}
              </h5>
              <br></br>
              <h5 class="card-title" style={{ display: "inline" }}>
                Assign To :{" "}
              </h5>
              {/* onChange={(event)=>{this.onSelect(event, obj.key)}} */}
              <select onChange={(event)=>{this.onSelect(event,obj)}}>
              <option disabled selected value> -- select an option -- </option>
                {this.props.Emplist.map(obj1 => {
                //   onSelect={(event)=>{this.onSelect(event,obj1,obj)}}
                  return (<option value={obj1.key}>{obj1.Name}</option>);
                })}

              </select>
              <button
            type="submit"
            className="btn btn-danger"
            style={{ margin: "5px" }}
            onClick={(event)=>{this.onSubmit(event,obj)}}
          >
            Assign
          </button>
            </div>
          </div>
          <br></br>
        </div>
      );
            }
    });

    return (
      <div className="container">
        <br></br>
        <h1 style={{textAlign:"Left",fontWeight:"bold"}}>Unassigned Tickets</h1>
        <hr></hr>
            <br></br>
        {card}
      </div>
    );
  }
}
const MapStateToProps = state => {
  return { List: state.TicketList, Emplist: state.EmployeeList };
};
const MapPropsToAction = dispatch => {
    return {
      load: li => {
        dispatch(actions.LoadEmp(li));
      },
      load1: li => {
        dispatch(actions.LoadCom(li));
      },
      load2: li => {
        dispatch(actions.LoadSof(li));
      },
      load3: li=>{
        dispatch(actions.LoadTickets(li))
      }
    };
  };
export default connect(MapStateToProps,MapPropsToAction)(TicketAssign);
