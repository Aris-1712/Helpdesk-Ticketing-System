import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { connect } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../Containers/ListTicket.css";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup
} from '@progress/kendo-react-excel-export';

class ListTicket extends Component {
  _exporter;
    export = () => {
      console.log("here")
        this._exporter.save();
    }


  state = {
    Software: "",
    Company: "",
    Employee: "",
    Priority: "",
    TicketNo:"",
    List:undefined
  };

  changehandler = (event, objname) => {
    let value = event.target.value;
    if (objname === "TicketNo") {
      console.log("ere")
      this.setState({ TicketNo: +value });
    }
    if (objname === "Software") {
      this.setState({ Software: value });
    }
    if (objname === "Company") {
      this.setState({ Company: value });
    }
    if (objname === "Employee") {
      this.setState({ Employee: value });
    }
    if (objname === "Priority") {
      this.setState({ Priority: value });
    }
  };
  object1 = {};
  
  onSubmit = event => {
    let List = [];
    // console.log("here");
    
    
    this.object1={}
    // List=List.slice()
    event.preventDefault();

    let keys = Object.keys(this.state);
    keys.map(obj => {
      if (this.state[obj] !== "" && obj !== "List" && this.state[obj]!==0) {
        this.object1[obj] = this.state[obj];
      }
    });
    let object1keys = Object.keys(this.object1);
    let propcopy=this.props.tickets;
    propcopy.map((objnew)=>{
        this.props.employees.map((objnew2)=>{
            if(objnew.AssignedTo===objnew2.key)
            {
                // console.log(objnew2.Name)
                objnew["Employee"]=objnew2.Name
                // console.log(objnew)
            }
        })
    })

    console.log(this.object1.TicketNo )

    propcopy.map(obj => {
        // console.log(obj.Resolved)
        if(object1keys.length===4){
            if (
                obj.Company === this.object1.Company &&
                obj.Software === this.object1.Software &&
                obj.Priority === this.object1.Priority &&
                obj.Employee === this.object1.Employee && obj.Employee !== undefined && obj.AssignedTo !== "" && obj.Resolved!==true
              ) {
                // console.log("here1");
                List.push(obj);
              }
        }


        
      if (object1keys.length === 3) {
        if (
          obj.Company === this.object1.Company &&
          obj.Software === this.object1.Software &&
          obj.Priority === this.object1.Priority && obj.AssignedTo !== "" && obj.Resolved!==true
        ) {
        //   console.log("here1");
          List.push(obj);
        }
        if (
            obj.Employee === this.object1.Employee && 
            obj.Software === this.object1.Software &&
            obj.Priority === this.object1.Priority  && obj.Employee !== undefined && obj.AssignedTo !== "" && obj.Resolved!==true
          ) {
            // console.log("here1");
            List.push(obj);
          }
          if (
            obj.Company === this.object1.Company &&
            obj.Employee === this.object1.Employee &&
            obj.Priority === this.object1.Priority  && obj.Employee !== undefined && obj.AssignedTo !== "" && obj.Resolved!==true
          ) {
            // console.log("here1");
            List.push(obj);
          }
          if (
            obj.Company === this.object1.Company &&
            obj.Software === this.object1.Software &&
            obj.Employee === this.object1.Employee  && obj.Employee !== undefined && obj.AssignedTo !== "" && obj.Resolved!==true
          ) {
            // console.log("here1");
            List.push(obj);
          }
      }
      if (object1keys.length === 2) {
        if (
          obj.Company === this.object1.Company &&
          obj.Software === this.object1.Software && obj.AssignedTo !== "" && obj.Resolved!==true
        ) {
        //   console.log("here1");
          List.push(obj);
        }

        if (
          obj.Company === this.object1.Company &&
          obj.Priority === this.object1.Priority && obj.AssignedTo !== "" && obj.Resolved!==true
        ) {
        //   console.log("here1");
          List.push(obj);
        }

        if (
          obj.Software === this.object1.Software &&
          obj.Priority === this.object1.Priority && obj.AssignedTo !== "" && obj.Resolved!==true
        ) {
        //   console.log("here1");
          List.push(obj);
        }
        if (
            obj.Employee === this.object1.Employee && 
            obj.Software === this.object1.Software && obj.Employee !== undefined && obj.AssignedTo !== "" && obj.Resolved!==true
          ) {
            // console.log("here1");
            List.push(obj);
          }
          if (
            obj.Company === this.object1.Company &&
            obj.Employee === this.object1.Employee && obj.Employee !== undefined && obj.AssignedTo !== "" && obj.Resolved!==true
          ) {
            // console.log("here1");
            List.push(obj);
          }
          if (
            obj.Employee === this.object1.Employee &&
            obj.Priority === this.object1.Priority && obj.Employee !== undefined && obj.AssignedTo !== "" && obj.Resolved!==true
          ) {
            // console.log("here1");
            List.push(obj);
          }
          
      }
      if (object1keys.length === 1) {
        if (obj.Company === this.object1.Company && obj.AssignedTo !== "" && obj.Resolved!==true) {
        //   console.log("here11");
          List.push(obj);
        }
        if (obj.TicketNo === this.object1.TicketNo && obj.AssignedTo !== "" && obj.Resolved!==true && this.object1.TicketNo!==undefined) {
            console.log("here11");
            List.push(obj);
          }

        if (obj.Software === this.object1.Software && obj.AssignedTo !== "" && obj.Resolved!==true) {
        //   console.log("here12");
          List.push(obj);
        }

        if (obj.Priority === this.object1.Priority && obj.AssignedTo !== "" && obj.Resolved!==true) {
        //   console.log("here13");
          List.push(obj);
        }
        if (obj.Employee === this.object1.Employee && obj.Employee !== undefined && obj.AssignedTo !== "" && obj.Resolved!==true) {
            // console.log("here14");
            List.push(obj);
          }
      }
    });
    console.log(List);
    let data1=[]
    List.map((obj)=>{
        let obj2={ticketNo:"",employee:"",
        company:"",
        date:"",
        priority:"",
        description:"",
        software:"",
        button:""
        
    }
        obj2.ticketNo=obj.TicketNo
        obj2.employee=obj.Employee
        obj2.company=obj.Company
        obj2.date=obj.Date
        obj2.priority=obj.Priority
        obj2.description=obj.Description
        obj2.software=obj.Software
        obj2.button=<button onClick={()=>this.selected(obj.key)}>OPEN</button>   
        data1.push(obj2)
        // console.log(obj2)

    })
    this.data=data1

    console.log(this.data);
    this.setState({List:List})
    
  };

  selected=(objdet)=>{
      this.props.history.push({pathname:'/TicketDetails',
    search:'?'+ objdet})

  }
data=[]
data1 = {
        columns: [
          
        ],
        rows:[]}
  render() {
    const cards=this.data.map((obj)=>{
      return(
        <div className="test2">
      <div class="card">
      <div class="card-header">Ticket No: {obj.ticketNo}</div>
      <div class="card-body">
            <h5 class="card-title" style={{ display: "inline" }}>
                Company :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.company}
              </h5>
              <br></br>
              <h5 class="card-title" style={{ display: "inline" }}>
                Employee :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.employee}
              </h5>
              <br></br>
              <h5 class="card-title" style={{ display: "inline" }}>
                Date :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.date}
              </h5>
              <br></br>
              <h5 class="card-title" style={{ display: "inline" }}>
              Priority :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.priority}
              </h5>
              <br></br>
              <h5 class="card-title" style={{ display: "inline" }}>
                Description :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.description}
              </h5>
              <br></br>
              <h5 class="card-title" style={{ display: "inline" }}>
                Software :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.software}
              </h5>
              <br></br>
              <h5 class="card-title" style={{ display: "inline" }}>
              OPEN TICKET :{" "}
              </h5>
              <h5 class="card-title" style={{ display: "inline" }}>
                {obj.button}
              </h5>
              <br></br>
              </div>
      </div>
      <br></br>
    </div>
    
      )
    })
      console.log(this.state)
    const cols=[{
      label: 'Ticket No.',
      field: 'ticketNo',
      
      width: 150
    },
    {
        label: 'Employee',
        field: 'employee',
        
        width: 150
      },
      {
        label: 'Company',
        field: 'company',
        
        width: 270
      },
      {
        label: 'Date',
        field: 'date',
        
        width: 200
      },
      {
        label: 'Priority',
        field: 'priority',
        
        width: 100
      },
      {
        label: 'Description',
        field: 'description',
        
        width: 1500
      },
      {
        label: 'Software',
        field: 'software',
        
        width: 1000
      },
      {
        label: 'OPEN TICKET',
        field: 'button',
        
        width: 100
      }]
      this.data1.columns=cols
    this.data1.rows=this.data
    
    // console.log(this.data1)
    const search = (
      <MDBContainer>
        <h4>Search:</h4>
        <MDBRow>
          <MDBCol sm="4">
            <div>
              <label style={{ display: "inline" }}>Software: </label>
              <select
                style={{ display: "inline" }}
                onChange={event => {
                  this.changehandler(event, "Software");
                }}
              >
                <option disabled selected value>
                  {" "}
                  -- select an option --{" "}
                </option>
                {this.props.software.map(obj => {
                  return <option>{obj.Name}</option>;
                })}
              </select>
            </div>
          </MDBCol>
          <MDBCol sm="4">
            <div>
              <label style={{ display: "inline" }}>Employee: </label>
              <select
                style={{ display: "inline" }}
                onChange={event => {
                  this.changehandler(event, "Employee");
                }}
              >
                <option disabled selected value>
                  {" "}
                  -- select an option --{" "}
                </option>
                {this.props.employees.map(obj => {
                  return <option>{obj.Name}</option>;
                })}
              </select>
            </div>
          </MDBCol>
          <MDBCol sm="4">
            <div>
              <label style={{ display: "inline" }}>Priority: </label>
              <select
                style={{ display: "inline" }}
                onChange={event => {
                  this.changehandler(event, "Priority");
                }}
              >
                <option disabled selected value>
                  {" "}
                  -- select an option --{" "}
                </option>
                {this.props.priority.map(obj => {
                  return <option>{obj}</option>;
                })}
              </select>
            </div>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol sm="4">
            <div>
              <label style={{ display: "inline" }}>Company: </label>
              <select
                style={{ display: "inline" }}
                onChange={event => {
                  this.changehandler(event, "Company");
                }}
              >
                <option disabled selected value>
                  {" "}
                  -- select an option --{" "}
                </option>
                {this.props.company.map(obj => {
                  return <option>{obj.Name}</option>;
                })}
              </select>
            </div>
          </MDBCol>
          <MDBCol sm="8">
            {" "}
            <button
              type="submit"
              className="btn btn-danger"
              style={{ margin: "5px" }}
              onClick={event => {
                this.onSubmit(event);
              }}
            >
              Search
            </button>
          </MDBCol>
          </MDBRow>
          <hr></hr>
          <h4>Search By Ticket Number :</h4>
          <MDBRow>
          <MDBCol sm="4">
            <div>
              <br></br>
              <label >Ticket No.    </label>
              <input
                // style={{ display: "inline" }}
                onChange={event => {
                  this.changehandler(event, "TicketNo");
                }}
              ></input>
                {/* <option disabled selected value>
                  {" "}
                  -- select an option --{" "}
                </option>
                {this.props.company.map(obj => {
                  return <option>{obj.Name}</option>;
                })}
              </select> */}
            </div>
          </MDBCol>
          <MDBCol sm="8">
            {" "}
            <button
              type="submit"
              className="btn btn-danger"
              style={{ margin: "5px" }}
              onClick={event => {
                this.onSubmit(event);
              }}
            >
              Search
            </button>
          </MDBCol>
          {/* <MDBCol sm="4">.col-sm-4</MDBCol> */}
        </MDBRow>
      </MDBContainer>
    );

    
    return (
      <div className="container">
        <br></br>
        <h1 style={{fontWeight:"bold"}}>Un-Resolved Tickets</h1>
        <hr></hr>
       
        
        {search}
        <br></br>
        {/* {cards} */}
        <MDBDataTable responsive
      striped
      bordered
      small
      data={{columns: this.data1.columns, rows : this.data1.rows}}
    />
    
     <button className="k-button" onClick={this.export}>Export to Excel</button>
     <ExcelExport
                    data={this.data1.rows}
                    // group={group}
                    fileName="UnresolvedTickets.xlsx"
                    ref={(exporter) => { this._exporter = exporter; }}
                >
                    <ExcelExportColumn field="ticketNo" title="ticketNo" locked={true} width={200} />
                    <ExcelExportColumn field="employee" title="employee" locked={true} width={200} />
                    <ExcelExportColumn field="company" title="company" locked={true} width={200} />
                    <ExcelExportColumn field="date" title="date" locked={true} width={200} />
                    <ExcelExportColumn field="priority" title="priority" locked={true} width={200} />
                    <ExcelExportColumn field="description" title="description" locked={true} width={200} />
                    <ExcelExportColumn field="software" title="software" locked={true} width={200} />
                    </ExcelExport>
                    <br></br>
      </div>
    );
  }
}
// ticketNo:"",employee:"",
//         company:"",
//         date:"",
//         priority:"",
//         description:"",
//         software:"",
//         button:""
const mapPropsToState = state => {
  return {
    tickets: state.TicketList,
    employees: state.EmployeeList,
    software: state.SoftwareList,
    company: state.CompanyList,
    priority: state.Priority
  };
};

export default connect(mapPropsToState)(ListTicket);
