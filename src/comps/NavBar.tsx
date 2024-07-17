import { useEffect, useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = ()=>{

    
    const navLinkStyles = ({ isActive }:any)=>{
        return {
          color: isActive ? 'white' : '',
          backgroundColor: isActive ? 'green' : '',
        }
      }

    
    return (
        <>
           
        <nav>
           <h5 className="sidebartitle">Navigation</h5>
           <ul className="nav nav-pills nav-stacked nav-bracket navbar">
             <li>
               <NavLink to="/" style={navLinkStyles}>
                 <i className="fa fa-home"></i> <span>Dashboard</span>
               </NavLink>
               

             </li>
             {/* <li>
                   <a href="calendar/">
                     <i className="fa fa-calendar"></i> <span>Calendar</span>
                   </a> 
                 </li> 
             */}

             <li>
                 <NavLink to="/addorder" style={navLinkStyles}>
                   <i className="fa fa-shopping-cart"></i>
                   <span>Add Order</span>
                 </NavLink>
             </li>
             <li>
                 <NavLink to="/vieworders" style={navLinkStyles}>
                   <i className="fa fa-shopping-cart"></i>
                   <span>View/Edit Orders</span>
                 </NavLink>
             </li>

             <li>
                 <NavLink to="/addcustomer" style={navLinkStyles}>
                   <i className="fa fa-home"></i> <span>Add Customer</span>
                 </NavLink>
             </li>

             <li>
               <NavLink to="/viewcustomer" style={navLinkStyles}>                
                 <i className="fa fa-user"></i>
                 <span>View/Edit Customer</span>
               </NavLink>
             </li>

             <li>
               <NavLink to="/viewsms" style={navLinkStyles}>
                 <i className="fa fa-envelope-o"></i>
                 <span>SENT MESSAGES</span>
               </NavLink>
             </li>
             <li>
               <NavLink to="/viewemails" style={navLinkStyles}>
                 <i className="fa fa-envelope"></i>
                 <span>SENT EMAILS</span>
               </NavLink>
             </li>




             <li className="nav-parent">    
               <a href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                   <i className="fa fa-th-list"></i>{" "}
                   <span>Staff Management</span>
               </a>
               
               <ul id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">                  
                 <li>
                   <a href="staffadd#">
                     <i className="fa fa-caret-right"></i>Add Staff
                   </a>
                 </li>
                 <li>
                   <a href="staffview#">
                     <i className="fa fa-caret-right"></i>View/Edit Staff
                   </a>
                 </li>
                 <li>
                   <a href="paysalary#">
                     <i className="fa fa-caret-right"></i> Pay Salary
                   </a>
                 </li>
                 <li>
                   <a href="staffcatadd#">
                     <i className="fa fa-caret-right"></i>Add Designation
                   </a>
                 </li>
                 <li>
                   <a href="staffcatview#">
                     <i className="fa fa-caret-right"></i>View/Edit
                     Designations
                   </a>
                 </li>
               </ul>
             </li>





             <li className="nav-parent">    
               <a href="#" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                   <i className="fa fa-th-list"></i>{" "}
                   <span>Expense Management</span>
               </a>
               
               <ul className="collapse" id="collapse1" aria-labelledby="heading1" data-parent="#accordionExample">                  
               <li>
                   <a href="expadd#">
                     <i className="fa fa-caret-right"></i>Add Expenses
                   </a>
                 </li>
                 <li>
                   <a href="expview#">
                     <i className="fa fa-caret-right"></i>View/Edit Expenses
                   </a>
                 </li>
                 <li>
                   <a href="expcatadd#">
                     <i className="fa fa-caret-right"></i>Add Expense Category
                   </a>
                 </li>
                 <li>
                   <a href="expcatview#">
                     <i className="fa fa-caret-right"></i>View/Edit Expense
                     Category
                   </a>
                 </li>
               </ul>
             </li>





             <li className="nav-parent">    
               <a href="#" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse1">
                   <i className="fa fa-th-list"></i>{" "}
                   <span>Income Management</span>
               </a>
               
               <ul className="collapse" id="collapse3" aria-labelledby="heading1" data-parent="#accordionExample">                  
               <li>
                   <a href="incadd#">
                     <i className="fa fa-caret-right"></i>Add Income
                   </a>
                 </li>
                 <li>
                   <a href="incview#">
                     <i className="fa fa-caret-right"></i>View/Edit Income
                   </a>
                 </li>
                 <li>
                   <a href="inccatadd#">
                     <i className="fa fa-caret-right"></i>Add Income Category
                   </a>
                 </li>
                 <li>
                   <a href="inccatview#">
                     <i className="fa fa-caret-right"></i>View/Edit Income
                     Category
                   </a>
                 </li>
               </ul>
             </li>





             





             <li className="nav-parent">    
               <a href="#" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse1">
                   <i className="fa fa-th-list"></i>{" "}
                   <span>Measurement Settings</span>
               </a>
               
               <ul className="collapse" id="collapse4" aria-labelledby="heading1" data-parent="#accordionExample">                  
               <li>
                   <a href="typeadd#">
                     <i className="fa fa-caret-right"></i>Add Cloth Type
                   </a>
                 </li>
                 <li>
                   <a href="typeview#">
                     <i className="fa fa-caret-right"></i>View/Edit Cloth Type
                   </a>
                 </li>
                 <li>
                   <a href="partadd#">
                     <i className="fa fa-caret-right"></i>Set Mesurement Parts
                   </a>
                 </li>
                 <li>
                   <a href="partview#">
                     <i className="fa fa-caret-right"></i>View/Edit Mesurement
                     Parts
                   </a>
                 </li>

               </ul>
             </li>





             <li className="nav-parent">    
               <a href="#" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse1">
                   <i className="fa fa-th-list"></i>{" "}
                   <span> General Setting</span>
               </a>
               
               <ul className="collapse" id="collapse5" aria-labelledby="heading1" data-parent="#accordionExample">                  
               <li>
                   <a href="setgeneral#">
                     <i className="fa fa-caret-right"></i> Setting
                   </a>
                 </li>
                 <li>
                   <a href="setlogo#">
                     <i className="fa fa-caret-right"></i> LOGO
                   </a>
                 </li>
                 <li>
                   <a href="document#">
                     <i className="fa fa-caret-right"></i> Office Documents
                   </a>
                 </li>
                 <li>
                   <a href="templateadd#">
                     <i className="fa fa-caret-right"></i>Add SMS/Email
                     Template
                   </a>
                 </li>
                 <li>
                   <a href="templateview#">
                     <i className="fa fa-caret-right"></i>View SMS/Email
                     Template
                   </a>
                 </li>

               </ul>
             </li>





            </ul>
            </nav>
            
        
        </>
    );
}

export default NavBar;