export const add=(val,id)=>{
    console.log(val+" "+id)
    return{
        value:id,
        type:val

    }

}



export const addemp=(id,value,key)=>{
    return{
        type:id,
        Empval:value,
        Empkey:key
    }

}

export const LoadEmp=(obj)=>{
    return{
        type:"LoadEmp",
        payload:obj
    }
    
}
export const LoadCom=(obj)=>{
    return{
        type:"LoadCom",
        payload:obj
    }
    
}
export const LoadSof=(obj)=>{
    return{
        type:"LoadSof",
        payload:obj
    }
    
}
export const LoadTickets=(obj)=>{
    return{
        type:"LoadTickets",
        payload:obj
    }
}
