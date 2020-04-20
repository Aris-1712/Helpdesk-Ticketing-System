const initialState={
    Company:{
        Name:'',
        Contact:'',
        ContactDetails:''
    },
    Employee:{
        Name:'',
        Email:'',
        Designation:'Accountant'
    },
    Software:{
        Name:'',
        Technology:'VB6'
    },
    EmployeeData:{
        Name:'',
        Email:'',
        Designation:'',
        key:''

    },
    EmployeeList:[],
    CompanyList:[],
    SoftwareList:[],
    Priority:[1,2,3],
    TicketList:[]

}

    const Reducer=(state=initialState,Action)=>{
    // console.log("Reached Here")
    if(Action.type==='Name'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.Company.Name=Action.value
        return statecopy

    }
    if(Action.type==='ContactName'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.Company.Contact=Action.value
        return statecopy

    }
    if(Action.type==='ContactNum'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.Company.ContactDetails=Action.value
        return statecopy

    }
    if(Action.type==='EmpName'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.Employee.Name=Action.value
        return statecopy

    }
    if(Action.type==='EmpEmail'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.Employee.Email=Action.value
        return statecopy

    }
    if(Action.type==='EmpDesig'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.Employee.Designation=Action.value
        return statecopy

    }
    if(Action.type==='SoftName'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.Software.Name=Action.value
        return statecopy

    }
    if(Action.type==='SoftTech'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.Software.Technology=Action.value
        return statecopy

    }
    if(Action.type==='EmpeName'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.EmployeeData.Name=Action.Empval
        statecopy.EmployeeData.key=Action.Empkey
        return statecopy

    }
    if(Action.type==='EmpEmail'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.EmployeeData.Email=Action.Empval
        statecopy.EmployeeData.key=Action.Empkey
        return statecopy

    }
    if(Action.type==='EmpDesignation'){
        // console.log("Reached Here")
        let statecopy=Object.assign({},state)
        statecopy.EmployeeData.Designation=Action.Empval
        statecopy.EmployeeData.key=Action.Empkey
        return statecopy

    }
    if(Action.type==='fulldata'){
        let statecopy=Object.assign({},state)
        statecopy.EmployeeData.Designation=Action.Empval.Designation
        statecopy.EmployeeData.Email=Action.Empval.Email
        statecopy.EmployeeData.Name=Action.Empval.Name
        statecopy.EmployeeData.key=Action.Empkey
        return statecopy

    }
    if(Action.type==='LoadEmp'){
        let newlist=Action.payload
        return{...state,EmployeeList:newlist}
    }
    if(Action.type==='LoadCom'){
        let newlist=Action.payload
        return{...state,CompanyList:newlist}
    }
    if(Action.type==='LoadSof'){
        let newlist=Action.payload
        return{...state,SoftwareList:newlist}
    }
    if(Action.type==='LoadTickets'){
        let newlist=Action.payload
        return{...state,TicketList:newlist}
    }
return state
}


export default Reducer