import React, { Component } from "react";
import {connect} from 'react-redux'
import Axios from 'axios'
import * as Actions from '../Action'

class TicketDetails extends Component{
    state={
        Ticket:{},
        Remarks:""
        
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            console.log(param[0]); // yields ['start', '5']
       
        this.props.ticks.map((obj)=>{
            if(obj.key===param[0]){
                this.setState({Ticket:obj})
                console.log(obj)
            }
        })
    }
        
    }
    changehandler=(event)=>{
      let value=event.target.value
      this.setState({Remarks:value})
    }
componentDidUpdate=()=>{
  console.log()
}


    resolve=async(event)=>{
        event.preventDefault()
        let newticket=this.state.Ticket
        newticket["Resolved"]=true
        newticket["ResolvedOn"]=new Date()
        newticket["Remarks"]=this.state.Remarks
        this.setState({Ticket:newticket})
        console.log(newticket)
        const result=await Axios.put("https://ticketingapp-c05c2.firebaseio.com/Tickets/"+newticket.key+".json",newticket)
        if(result.status===200){
            alert("Ticket Resolved.")

            const result2=await Axios.get("https://ticketingapp-c05c2.firebaseio.com/Tickets.json")
            if(result2.status===200){
                let List=result2.data
                this.props.updateTickets(List)
            }
        }
        else{
            alert("Network Error.")
        }
        this.props.history.push({pathname:'/ListTicket'})
        // this.setState
    }
    render(){
        console.log(this.state.Ticket)
       
    
        return(<div className="container">
            <br></br>
            <h1 style={{fontWeight:"bold"}}>Ticket Details</h1>
            <br></br>
            <form >
            <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Ticket Number:   </label>
    <input class="col-lg-9  form-control" value={this.state.Ticket.TicketNo} disabled></input>
   
  </div>
  <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Software:  </label>
    <input class="col-lg-9  form-control" value={this.state.Ticket.Software} disabled></input>
    {/* <input type="email" class="form-control" placeholder="Enter email" id="email"></input> */}
  </div>
  <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Company:  </label>
    <input class="col-lg-9  form-control" value={this.state.Ticket.Company} disabled></input>
    {/* <input type="email" class="form-control" placeholder="Enter email" id="email"></input> */}
  </div>
  <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Priority:  </label>
    <input class="col-lg-9  form-control" value={this.state.Ticket.Priority} disabled></input>
    {/* <input type="email" class="form-control" placeholder="Enter email" id="email"></input> */}
  </div>
  <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Date:  </label>
    <input class="col-lg-9  form-control" value={this.state.Ticket.Date} disabled></input>
    {/* <input type="email" class="form-control" placeholder="Enter email" id="email"></input> */}
  </div>
  <div class="form-group row"> 
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Description:  </label>
    <input class="col-lg-9  form-control" value={this.state.Ticket.Description} disabled></input>
    {/* <input type="email" class="form-control" placeholder="Enter email" id="email"></input> */}
  </div>
  <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Resolved:  </label>
    { this.state.Ticket.Resolved === true ? <input class="col-lg-9  form-control" value="True" disabled></input> : <input class="col-lg-9  form-control" value="False" disabled></input>}
    {/* <input type="email" class="form-control" placeholder="Enter email" id="email"></input> */}
  </div>
  <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Remarks:  </label>
    { this.state.Ticket.Resolved === true ? <input class="col-lg-9  form-control" value={this.state.Ticket.Remarks} disabled></input> : <input class="col-lg-9  form-control" onChange={this.changehandler} ></input>}
    {/* <input type="email" class="form-control" placeholder="Enter email" id="email"></input> */}
  </div>
  <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Attachment:  </label>
    <a class="col-lg-9  form-control" href={this.state.Ticket.Fileurl} target="_blank"> Attachment</a>
    {/* <input type="email" class="form-control" placeholder="Enter email" id="email"></input> */}
  </div>
  {/* <button type="submit" class="btn btn-primary" onClick={(event)=>{this.resolve(event)}}>Resolve</button> */}
  {this.state.Ticket.Resolved === true || this.state.Ticket.Resolved === true  ?<button disabled type="button" class="btn btn-primary col-lg-12" data-toggle="modal" data-target="#myModal">RESOLVE</button>:<button  type="button" class="btn btn-primary col-lg-12" data-toggle="modal" data-target="#myModal">RESOLVE</button>}
  <div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      {/* <!-- Modal Header --> */}
      <div class="modal-header" style={{backgroundColor:"#2bbbad"}}>
        <h4 class="modal-title">Attention</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      {/* <!-- Modal body --> */}
      <div class="modal-body" style={{backgroundColor:"azure"}}>
        Are you sure you want to resolve the ticket
      </div>

      {/* <!-- Modal footer --> */}
      <div class="modal-footer" style={{backgroundColor:"azure"}}>
        <button type="button" class="btn btn-danger" data-dismiss="modal">NO</button>
        <button type="submit" class="btn btn-primary" data-dismiss="modal" onClick={(event)=>{this.resolve(event)}}>Resolve</button> 
      </div>

    </div>
  </div>
</div>
</form>









        </div>)
    }
}


const MapStateToProps=(state)=>{
return{
    ticks:state.TicketList
}
}

const MapActionToProps=(dispatch)=>{
    return{
        updateTickets:(List)=>{dispatch(Actions.LoadTickets(List))}
    }
}



export default connect(MapStateToProps,MapActionToProps)(TicketDetails)  