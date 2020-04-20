import React,{Component} from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import * as Actions from '../Action'

class SoftwareDetails extends Component {
    state={
        Software:{},
        Softwareedit:{
            Name:"",
            Technology:"",
            Nameerr:false,
            Technologyerr:false
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            // console.log(param[0]); // yields ['start', '5']
       
        this.props.softlist.map((obj)=>{
            if(obj.key===param[0]){
                this.setState({Software:obj})
                // console.log(obj)
            }
        })
    }
        
    }
    submit=async()=>{
        let result=await Axios.put("https://ticketingapp-c05c2.firebaseio.com/Software/"+this.state.Software.key+".json",this.state.Softwareedit)
        if(result.status===200){
            let result2=await Axios.get("https://ticketingapp-c05c2.firebaseio.com/Software.json")
            if(result2.status===200){
                let key=Object.keys(result2.data)
                let list=[]
                key.map((obj)=>{
                    let soft=result2.data[obj]
                    soft["key"]=obj
                    list.push(soft)

                })
                this.props.updatesoftlist(list)
            }
        }
        this.props.history.push({pathname:'/ListSoftware'})
    }
    edit=(event,obj)=>{
        let value=event.target.value
        if(obj==="Name"){
            if(value.length>4){
                this.setState({Softwareedit:{...this.state.Softwareedit,Name:value,Nameerr:false}})
            }
            else{
                this.setState({Softwareedit:{...this.state.Softwareedit,Nameerr:true}})
            }
        }
            if(obj==="Technology"){
                if(value.length>4){
                    this.setState({Softwareedit:{...this.state.Softwareedit,Technology:value,Technologyerr:false}})
                }
                else{
                    this.setState({Softwareedit:{...this.state.Softwareedit,Technologyerr:true}})
                }

        }
    }
render(){
    console.log(this.state)
    return(
        <div className="container">
            <br></br>
            <h1 style={{fontWeight:"bold"}}>Software Details</h1>
            <br></br>
            <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Name:   </label>
    <input class="col-lg-9  form-control" value={this.state.Software.Name} disabled></input>
    
   
  </div>
  <div class="form-group row">
    <label class="col-lg-3 col-form-label form-control-label" style={{fontWeight:"bold"}}>Technology:   </label>
    <input class="col-lg-9  form-control" value={this.state.Software.Technology} disabled></input>
   
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
    <input class=" form-control" placeholder={this.state.Software.Name} onChange={(event)=>{this.edit(event,"Name")}}></input>
    {this.state.Softwareedit.Nameerr?<label class="col-form-label form-control-label" style={{color:"Red"}}>Enter proper Name.</label>:<div></div>}
    </div>
  </div>    
  <div class="form-group row">
  <div class="col-lg-4">
    <label class=" col-form-label form-control-label" style={{fontWeight:"bold"}}>Technology:   </label>
    </div>
    <div class="col-lg-8">
    <input class=" form-control" placeholder={this.state.Software.Technology} onChange={(event)=>{this.edit(event,"Technology")}}></input>
    {this.state.Softwareedit.Technologyerr?<label style={{color:"Red"}}>Enter proper Technology.</label>:<div></div>}
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
</div>
    )
}



}

const MapPropsToState=(state)=>{
    return{
        softlist:state.SoftwareList
    }
}
const MapPropsToAction=(dispatch)=>{
    return{
        updatesoftlist:(obj)=>{dispatch(Actions.LoadSof(obj))}
    }
}

export default connect(MapPropsToState,MapPropsToAction)(SoftwareDetails)
