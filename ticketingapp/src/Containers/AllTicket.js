import React, { Component } from "react";
import { MDBDataTable, MDBContainer, MDBRow, MDBCol, MDBDatePicker  } from "mdbreact";
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
import '../Containers/AllTicket.css'





class AllTicket extends Component {
  _exporter;
  export1 = () => {
    console.log("here")
      this._exporter.save();
  }
    state={
        Software:'--Select--',
        Date:'',
        To:'',
        List:[],
        Row:[],
        export:false,
        TicketNo:''
    }
    
    cols=[{
      label: 'Ticket No.',
      field: 'ticketNo',
      
      width: 150
    },{
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
        label: 'Resolved',
        field: 'resolved',
        
        width: 1000
      },
      {
        label: 'Resolved On',
        field: 'resolvedon',
        
        width: 1000
      },
      {
        label: 'OPEN TICKET',
        field: 'button',
        
        width: 100
      }]

    getValue = (event,Str) => {
      if(Str==="TicketNo"){
        this.setState({TicketNo:+event.target.value})
    }
        if(Str==="Software"){
            this.setState({Software:event.target.value})
        }
        if(Str==="Date"){
        let date=new Date(event.target.value) 
        console.log(date);
        this.setState({Date:date})
        }
        if(Str==='To'){
            let date=new Date(event.target.value) 
            console.log(date);
            this.setState({To:date})
            }
      }
      
      onsubmit=()=>{
          this.row=[]
        let list=[]
          let newtickets=this.props.tickets;
          newtickets.map((obj)=>{
              let flag=false
          let keys=Object.keys(obj)
          console.log(typeof(obj.AssignedTo))

          




          this.props.employees.map((objnew)=>{
              console.log(typeof(objnew.key))
            if(obj.AssignedTo===objnew.key){
                console.log("tesas")

               flag=true
            }})





            if(!flag){
                console.log("in false")

                obj["Employee"]="Unassigned"
            }
        
          
          
          if(keys.includes("Employee")===false){
            
            this.props.employees.map((objnew)=>{
              // console.log(objnew.key+" "+obj.ass)
                if(obj.AssignedTo===objnew.key){
                  // console.log("aris test")
                    obj["Employee"]=objnew.Name
                }
            })
        }
    
          if(keys.includes("Resolved")===false || obj.Resolved===false){
            obj["Resolved"]=false
        }
        if(keys.includes("Resolved")===true && obj.Resolved===true){
            obj["Resolved"]=true
        }
        if(keys.includes("ResolvedOn")===false){
            obj["ResolvedOn"]="-"
        }

          })
          console.log(newtickets)
          newtickets.map((obj)=>{
              let date=new Date(obj.Date)
            //   console.log(date)
            
            if(this.state.Date==="" && this.state.To==="" && this.state.Software==="--Select--" && (this.state.TicketNo==="" || this.state.TicketNo===0)){
              console.log("here now")  
              list.push(obj)
            }
            else{
              if(obj.TicketNo===this.state.TicketNo && this.state.Date==="" && this.state.To==="" && this.state.Software==="--Select--"){
                list.push(obj)
              }
              if(date>=this.state.Date && date<=this.state.To && this.state.Software==="--Select--" && (this.state.TicketNo==="" || this.state.TicketNo===0)){
                  console.log(obj)
                list.push(obj)
              }
              if(date>=this.state.Date && this.state.To==="" && this.state.Software==="--Select--" && (this.state.TicketNo==="" || this.state.TicketNo===0)){
                  console.log(obj)
                list.push(obj)
              }
              if(this.state.Date==="" && date<=this.state.To && this.state.Software==="--Select--" && (this.state.TicketNo==="" || this.state.TicketNo===0)){
                  console.log(obj)
                list.push(obj)
              }
              if(obj.Software===this.state.Software && this.state.Date==="" && this.state.To==="" && (this.state.TicketNo==="" || this.state.TicketNo===0)){
                  list.push(obj)
              }
              if(date>=new Date(this.state.Date) && this.state.To==="" && obj.Software===this.state.Software && (this.state.TicketNo==="" || this.state.TicketNo===0)) {
                  console.log(date)
                  console.log(this.state.Date)
                list.push(obj)
              }
              if(this.state.Date==="" && date<=this.state.To && obj.Software===this.state.Software && (this.state.TicketNo==="" || this.state.TicketNo===0)) {
                  console.log(obj)
                list.push(obj)
              }
              if(date>=this.state.Date && date<=this.state.To && this.state.Software===obj.Software && (this.state.TicketNo==="" || this.state.TicketNo===0)){
                console.log(obj)
              list.push(obj)
            }
            }

          })
         console.log(list)
          list.map((obj)=>{
              let obj2={
                ticketNo:"",
                employee:"",
                company:"",
                date:"",
                priority:"",
                description:"",
                software:"",
                resolved:"",
                resolvedon:"",
                button:""
              }
              obj2.ticketNo=obj.TicketNo
              obj2.employee=obj.Employee
            obj2.company=obj.Company
            obj2.date=obj.Date
            obj2.priority=obj.Priority
            obj2.description=obj.Description
            obj2.software=obj.Software
            obj2.resolved=obj.Resolved===true?"True":"False"
            obj2.resolvedon=obj.ResolvedOn
            obj2.button=<button onClick={()=>this.selected(obj.key)}>OPEN</button>
            this.row.push(obj2)
        
          })
          this.setState({List:list,Row:this.row})
      }

     row=[]
     selected=(objdet)=>{
        this.props.history.push({pathname:'/TicketDetails',
      search:'?'+ objdet})
  
    }
    // export=()=>{
    //     this.setState({export:true})
    // }
render(){
  const cards=this.state.Row.map((obj)=>{
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
              Resolved :{" "}
            </h5>
            <h5 class="card-title" style={{ display: "inline" }}>
              {obj.resolved}
            </h5>
            <br></br>
            <h5 class="card-title" style={{ display: "inline" }}>
              Resolved On :{" "}
            </h5>
            <h5 class="card-title" style={{ display: "inline" }}>
              {obj.resolvedon}
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
  
    // let excel=(
    //     <ExcelFile>
    //             <ExcelSheet data={this.state.row} name="TicketData">
    //                 <ExcelColumn label="Employee" value="employee"/>
    //                 <ExcelColumn label="Company" value="company"/>
    //                 <ExcelColumn label="Date" value="date"/>
    //                 <ExcelColumn label="Priority" value="priority"/>
    //                 <ExcelColumn label="Description" value="description"/>
    //                 <ExcelColumn label="Software" value="software"/>
    //                 <ExcelColumn label="Resolved" value="resolved"/>
    //                 <ExcelColumn label="Resolved On" value="resolvedon"/>
    //             </ExcelSheet>
    //             </ExcelFile>
    // )
    console.log(this.state)
    
return(<div>
  
    <MDBContainer>
      <br></br>
    <h1>All Tickets</h1>
      <h4>Search Tickets</h4>
        <MDBRow><MDBCol sm="6"><label>Software: </label>
              <select
                
                onChange={event => {
                  this.getValue(event, "Software")}}
                
              >
                <option  selected >
                  --Select--
                </option>
                {this.props.software.map(obj => {
                  return <option>{obj.Name}</option>;
                })}
              </select>
              </MDBCol>
              </MDBRow>
        <br></br>
        <MDBRow>
            
          <MDBCol sm="4">
          <label>From: </label>
              <input type="date" id="birthday" name="birthday" onChange={(event)=>{this.getValue(event,"Date")}}></input></MDBCol>
              <MDBCol sm="4">
          <label>To: </label>
              <input type="date" id="birthday" name="birthday" onChange={(event)=>{this.getValue(event,"To")}}></input></MDBCol>
              
         <MDBCol sm="4"><button onClick={this.onsubmit}>SEARCH</button></MDBCol>
          
          </MDBRow>
          <br>
          </br>
          <hr></hr>
          <h4>Search By Ticket Number :</h4>
          <br></br>
          <MDBRow>
          <MDBCol sm="4">
            
              <label >Ticket No.    </label>
              <input
                // style={{ display: "inline" }}
                onChange={event => {
                  this.getValue(event, "TicketNo");
                }}
              ></input>
               
            
          </MDBCol>
          <MDBCol sm="8">
            {" "}
            <button onClick={this.onsubmit}>SEARCH</button>
          </MDBCol>
          </MDBRow>
          {/* {cards} */}
          <MDBDataTable  responsive
      striped
      bordered
      small
      data={{columns: this.cols, rows : this.state.Row}}
    />

<button className="k-button" onClick={this.export1}>Export to Excel</button>
     <ExcelExport
                    data={this.row}
                    // group={group}
                    fileName="Alltickets.xlsx"
                    ref={(exporter) => { this._exporter = exporter; }}
                >
                    <ExcelExportColumn field="ticketNo" title="ticketNo" locked={true} width={200} />
                    <ExcelExportColumn field="employee" title="employee" locked={true} width={200} />
                    <ExcelExportColumn field="company" title="company" locked={true} width={200} />
                    <ExcelExportColumn field="date" title="date" locked={true} width={200} />
                    <ExcelExportColumn field="priority" title="priority" locked={true} width={200} />
                    <ExcelExportColumn field="description" title="description" locked={true} width={200} />
                    <ExcelExportColumn field="software" title="software" locked={true} width={200} />
                     <ExcelExportColumn field="resolvedon" title="resolvedon" locked={true} width={200} />
                     <ExcelExportColumn field="resolved" title="resolved" locked={true} width={200} /> 
                    </ExcelExport>
                    <br></br> 


    {/* {this.state.export?excel:<div></div>} */}
    {/* ticketNo:"",
                employee:"",
                company:"",
                date:"",
                priority:"",
                description:"",
                software:"",
                resolved:"",
                resolvedon:"", */}
        </MDBContainer></div>)


  

}}

const mapPropsToState = state => {
  return {
    tickets: state.TicketList,
    employees: state.EmployeeList,
    software: state.SoftwareList,
    company: state.CompanyList,
    priority: state.Priority
  };
};

export default connect(mapPropsToState)(AllTicket);
