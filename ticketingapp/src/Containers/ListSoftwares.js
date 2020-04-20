import React,{Component} from 'react'
import * as Actions from '../Action'
import {connect } from 'react-redux'
import Axios from 'axios'
import { MDBDataTable, MDBContainer, MDBRow, MDBCol, MDBDatePicker  } from "mdbreact";

class ListSoftwares extends Component {
    list=[]
    cols=
        [{
            label: 'Name',
            field: 'Name',
            
            width: 150
          },{
              label: 'Technology',
              field: 'Technology',
              
              width: 150
            },
            {
                label: 'Edit',
                field: 'Edit',
                
                width: 150
              }
        ]
        editopen=(event,key)=>{
            this.props.history.push({pathname:'/SoftwareDetails',
            search:'?'+ key})
        }
    load=()=>{
        let list1=[]
        this.props.softlist.map((obj)=>{
            let row={
                Name:"",
                Technology:"",
                Edit:""
            }
            row.Name=obj.Name
            row.Technology=obj.Technology
            row.Edit=<button onClick={(event)=>{this.editopen(event,obj.key)}}> EDIT </button>
            list1.push(row)
        })
        this.list=list1

    }
    render(){
        console.log(this.props)
        this.load()
        return(
            <div className="container">
                <br></br>
                <h1 style={{fontWeight:"bold"}}>Software List</h1>
                <br></br>
                <MDBDataTable
    striped
    bordered
    small
    data={{columns: this.cols, rows : this.list}}
  />
            </div>
        )
    }

}


const MapStateToProps=(state)=>{
    return{
        softlist:state.SoftwareList
    }
}


export default connect(MapStateToProps)(ListSoftwares)