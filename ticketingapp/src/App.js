import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./Containers/Layout";
import { Route, Switch } from "react-router-dom";
import Company from "./Containers/Company";
import Employee from "./Containers/Employee";
import Softwares from "./Containers/Softwares";
import ListEmployee from "./Containers/ListEmployees";
import { connect } from "react-redux";
import * as actions from "../src/Action";
import Axios from "axios";
import Ticket from '../src/Containers/Ticket'
import TicketAssign from "./Containers/TicketAssign";
import ListTicket from "./Containers/ListTicket";
import TicketDetails from "./Containers/TicketDetails";
import AllTicket from "./Containers/AllTicket";
import EmployeeDetails from "./Containers/EmployeeDetails";
import ListSoftwares from "./Containers/ListSoftwares";
import SoftwareDetails from "./Containers/SoftwareDetails";
import Home from "./Home";
import Notfound from "./Notfound";


class App extends Component {
  componentDidMount = async () => {
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
  render() {
    return (
      <div className="App">
        <Layout></Layout>

        <Switch>
          <Route
            exact
            path="/"
            component={Home}
          ></Route>
          <Route path="/Company" component={Company}></Route>
          <Route path="/Employee" component={Employee}></Route>
          <Route path="/Software" component={Softwares}></Route>
          <Route path="/ListEmployee" component={ListEmployee}></Route>
          <Route path="/Ticket" component={Ticket}></Route>
          <Route path='/AssignTickets' component={TicketAssign}></Route>
          <Route path='/ListTicket' component={ListTicket}></Route>
          <Route path='/TicketDetails' component={TicketDetails}></Route>
          <Route path='/TicketAll' component={AllTicket}></Route>
          <Route path='/EmployeeDetails' component={EmployeeDetails}></Route>
          <Route path='/ListSoftware' component={ListSoftwares}></Route>
          <Route path='/SoftwareDetails' component={SoftwareDetails}></Route>
          {/* <Route path='/Email' component={Email1}></Route> */}
          <Route component={Notfound}></Route>
        </Switch>
      </div>
    );
  }
}
const mapPropsToStore = state => {
  return {
    cmp: state
  };
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

export default connect(mapPropsToStore,MapPropsToAction)(App);
