import React,{Component} from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import * as Actions from '../Action'

class EmployeeDetails extends Component {
    state={
        Employee:{},
        empEdit:{
            Name:"",
            Email:"",
            Designation:"",
            nameerr:false,
            emailerr:false,
            designationerr:false
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            // console.log(param[0]); // yields ['start', '5']
       
        this.props.emp.map((obj)=>{
            if(obj.key===param[0]){
                this.setState({Employee:obj})
                // console.log(obj)
            }
        })
    }
        
    }

    edit=(event,obj)=>{
        let value=event.target.value
        if(obj==="Name"){
            if(value.length>4){
            this.setState({empEdit:{...this.state.empEdit,Name:value,nameerr:false}})
            }
            else{
                this.setState({empEdit:{...this.state.empEdit,nameerr:true}}) 
            }
            // this.state.empEdit.Name=value
        }
        if(obj==="Designation"){
            if(value.length>4){
            this.setState({empEdit:{...this.state.empEdit,Designation:value,designationerr:false}})
            }
            else{
                this.setState({empEdit:{...this.state.empEdit,designationerr:true}}) 
            }
        }
        if(obj==="Email"){
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)===true){
            this.setState({empEdit:{...this.state.empEdit,Email:value,emailerr:false}})
            }
            else{
                this.setState({empEdit:{...this.state.empEdit,emailerr:true}}) 
            }
        }
    }
    submit=async()=>{
        if(this.state.empEdit.nameerr===false && this.state.empEdit.emailerr===false && this.state.empEdit.designationerr===false && 
            this.state.empEdit.name!=="" && this.state.empEdit.Email!=="" && this.state.empEdit.Designation!==""
            ){

                let result=await Axios.put("https://ticketingapp-c05c2.firebaseio.com/Employee/"+this.state.Employee.key+".json",this.state.empEdit)
                if(result.status===200){
                    let List=[]
                    let result2= await Axios.get("https://ticketingapp-c05c2.firebaseio.com/Employee.json")
                    if(result2.status===200){
                        let keys = Object.keys(result2.data);
                        keys.map(obj => {
                            let res = result2.data[obj];
                            res["key"] = obj;
                            List.push(res);
                          });
                        await this.props.updateemplist(List)

                    }

                }
//    this.setState({Employee:{...this.state,Name:this.state.empEdit.Name,Email:this.state.empEdit.Email,Designation:this.state.empEdit.Designation}})
//    this.setState({empEdit:{
//     Name:"",
//     Email:"",
//     Designation:"",
//     nameerr:false,
//     emailerr:false,
//     designationerr:false
// }}) 
this.props.history.push({pathname:'/ListEmployee'})
  // console.log(this.props)

            }
            else{
                alert("Error in form")
            }
    }
    delete=async()=>{
        let result=await Axios.delete("https://ticketingapp-c05c2.firebaseio.com/Employee/"+this.state.Employee.key+".json")
        if(result.status===200){
            let result2=await Axios.get("https://ticketingapp-c05c2.firebaseio.com/Employee.json")
            if(result2.status===200){
                let list=[]
                let keys=Object.keys(result2.data)
                keys.map((obj)=>{
                    let emp
                    emp=result2.data[obj]
                    emp["key"]=obj
                    list.push(emp)

                })
                this.props.updateemplist(list)
            }

        }
        this.props.history.push({pathname:'/ListEmployee'})

    }

    render(){
        console.log(this.state)
        return(<div className="container">
            <br></br>
            <h1 style={{fontWeight:"bold"}}>Employee Details</h1>
            <br></br>
            <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Name:   </label>
    <input class="col-lg-9  form-control" value={this.state.Employee.Name} disabled></input>
    
   
  </div>
  <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Email:   </label>
    <input class="col-lg-9  form-control" value={this.state.Employee.Email} disabled></input>
   
  </div>
  <div class="form-group row">
  <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Designation:   </label>
  <input class="col-lg-9  form-control" value={this.state.Employee.Designation} disabled></input>
 
</div>
<div class="row">
  
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">EDIT</button>
   
        <button type="button" class="btn btn-danger" onClick={this.delete} disabled>DELETE</button>
    {/* </div> */}
</div>
<div class="modal" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
      
        
        <div class="modal-header" style={{backgroundColor:"#2bbbad"}}>
          <h4 class="modal-title">EDIT</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        
        <div class="modal-body" style={{backgroundColor:"azure"}}>
            <div class="container">
        <div class="form-group row">
            <div class="col-lg-4">
    <label class=" col-form-label form-control-label" style={{fontWeight:"bold"}}>Name:   </label>
    </div>
    <div class="col-lg-8">
    <input class=" form-control" placeholder={this.state.Employee.Name} onChange={(event)=>{this.edit(event,"Name")}}></input>
    {this.state.empEdit.nameerr?<label class="col-form-label form-control-label" style={{color:"Red"}}>Enter proper Name.</label>:<div></div>}
    </div>
  </div>    
  <div class="form-group row">
  <div class="col-lg-4">
    <label class=" col-form-label form-control-label" style={{fontWeight:"bold"}}>Email:   </label>
    </div>
    <div class="col-lg-8">
    <input class=" form-control" placeholder={this.state.Employee.Email} onChange={(event)=>{this.edit(event,"Email")}}></input>
    {this.state.empEdit.emailerr?<label style={{color:"Red"}}>Enter proper Email address.</label>:<div></div>}
    </div>
  </div>
  <div class="form-group row">
  <div class="col-lg-4">
  <label class=" col-form-label form-control-label" style={{fontWeight:"bold"}}>Designation:   </label>
  </div>
  <div class="col-lg-8">
  <input class="  form-control" placeholder={this.state.Employee.Designation} onChange={(event)=>{this.edit(event,"Designation")}}></input>
  {this.state.empEdit.designationerr?<label style={{color:"Red"}}>Enter proper Designation.</label>:<div></div>}
  </div>
</div>
</div>
        </div>
        
       
        <div class="modal-footer" style={{backgroundColor:"azure"}}> 
          <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.submit}>EDIT</button>
        </div>
        
      </div>
    </div>
  </div>









        </div>)
    }


}
const MapActionToProps=(dispatch)=>{
    return{
        updateemplist:(obj)=>{dispatch(Actions.LoadEmp(obj))}
    }
}
const MapStateToProps=(state)=>{
    return{
        emp:state.EmployeeList
    }
}
export default connect(MapStateToProps,MapActionToProps)(EmployeeDetails)