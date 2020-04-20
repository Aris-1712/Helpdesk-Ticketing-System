import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const Navbar=(props)=>{
    return(
        <div>
      
<nav class="mb-1 navbar navbar-expand-lg navbar-dark default-color">
  {/* <a class="navbar-brand" href="#">Navbar</a> */}
  <Link class="navbar-brand" style={{fontWeight:"bold"}} to='/'>Ticketing App</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
    aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent-333">
    <ul class="navbar-nav mr-auto">
      
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">Masters
        </a>
        <div class="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
          <Link class="dropdown-item" to='/Company'>Add Company</Link>
          <Link class="dropdown-item" to='/Employee'>Add Employee</Link>
          <Link class="dropdown-item" to='/Software'>Add Software</Link>     
        </div>
      </li>
      <li class="nav-item">
     
        <Link class="nav-link" to='/Ticket'>Register Ticket</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to='/AssignTickets'>Assign Ticket</Link>
      </li>
      <li class="nav-item">
      <Link class="nav-link" to='/ListTicket'>Un-Resolved Tickets</Link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-334" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">Search
        </a>
        <div class="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
          <Link class="dropdown-item" to='/TicketAll'>Ticket</Link>
          <Link class="dropdown-item" to='/ListEmployee'>Employee</Link>
          <Link class="dropdown-item" to='/ListSoftware'>Software</Link>     
        </div>
      </li>
    </ul>
    
  </div>
</nav>
</div>
    )
    

}


export default Navbar