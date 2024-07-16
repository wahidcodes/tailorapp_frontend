import { useEffect } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashBoard = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  //const user: string | null = localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem('user')||'null');
      
  console.log("New user ", localStorage.getItem('user'))
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')||'null');
    console.log("User analyzed")
    if (!user) {
      navigate("/login");
    }
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      console.log("Dispatched")
    }

    if(user && user.token){

      fetch(`${import.meta.env.VITE_API_URL}/fetchcustomers`,{
        method:'GET',
        headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
      })
        .then(res=>res.json())
        .then(data => {
          if(data.error=="TokenExpiredError"){
            navigate('/login')
          }
        })  
    }
  
  }, [navigate, dispatch]);

  const logout = () => {
    localStorage.setItem("user", "");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const navLinkStyles = ({ isActive }:any)=>{
    return {
      color: isActive ? 'white' : '',
      backgroundColor: isActive ? 'green' : '',
    }
  }

  console.log("User:    ",user)
  /*                                            USE CLASS FUNTION WHEN NEEDED STYLE FOR NAVLINK
  const navLinkClass = ({ isActive }:any)=>{
    return isActive ? '' : ''
  }
  */


    return (
    <>
      <section>
        <div className="leftpanel">
          <div className="logopanel">
            <h1>TAILOR SOFTWARE</h1>
          </div>

          <div className="leftpanelinner">
            <div className="visible-xs hidden-sm hidden-md hidden-lg">
              <h5 className="sidebartitle actitle">Account</h5>
              <ul className="nav nav-pills nav-stacked nav-bracket mb30">
                <li>
                  <a href="changepass#">
                    <i className="fa fa-cog"></i> <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <a href="signout#">
                    <i className="fa fa-sign-out"></i> <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </div>
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
          </div>
        </div>
        

        <div className="mainpanel">
          <div className="headerbar">

            <a className="menutoggle" onClick={()=>alert("Working")}>
              
              <i className="fa fa-bars"></i>
            </a>

            <div className="header-right">
              <ul className="headermenu">
                <li>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-usermenu pull-right">
                      <li>
                        {user && (
                          <a onClick={()=>navigate('/changepassword')}>
                              <span>
                                  <i className="fa fa-cog"></i>
                                  <span>Account Settings</span>
                              </span>
                          </a>
                        )}
                      </li>
                      <li>
                        {user && ( 
                          <a onClick={() => logout()}>
                            <span>
                                <i className="fa fa-sign-out"></i>
                                <span>Sign Out</span>
                            </span>
                          </a>
                        )}
                      </li>
                      <li>
                        {!user && (
                          <a onClick={() => navigate('/login')}>
                          <span>
                              <i className="fa fa-sign-out"></i>
                              <span>Login</span>
                          </span>
                        </a>
                        )}
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="contentpanel">
              <Outlet />
          </div>
                    
        </div>

        {/*                                              !--------FOOTER---------!                                                */}
        <div style={{width:'100%',backgroundColor:'#00000f',color:"white",height:'50px',display:'flex',justifyContent:'center'}}>
              <div style={{margin:15,fontFamily:'sans-serif'}}>
                  © Copyright 2024. Developed and maintained by <a href="linkedin.com/in/mohamed-wahid-7817bb239">Mohamed Wahid</a>
              </div>
          </div>

      </section>
    </>
  );
};

export default DashBoard;
