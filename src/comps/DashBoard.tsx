import { useEffect } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashBoard = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const user: string | null = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
  }, []);

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
                  <a href="changepass.php">
                    <i className="fa fa-cog"></i> <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <a href="signout.php">
                    <i className="fa fa-sign-out"></i> <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </div>
<nav>
            <h5 className="sidebartitle">Navigation</h5>
            <ul className="nav nav-pills nav-stacked nav-bracket navbar">
              <li>
                <NavLink to="/dashboard" style={navLinkStyles}>
                  <i className="fa fa-home"></i> <span>Dashboard</span>
                </NavLink>
                

              </li>
              <li>
                <a href="calendar/">
                  <i className="fa fa-calendar"></i> <span>Calendar</span>
                </a>
              </li>

              <li>
                <a href="orderadd.php">
                  <i className="fa fa-shopping-cart"></i>
                  <span>Add Order</span>
                </a>
              </li>
              <li>
                <a href="orderlist.php">
                  <i className="fa fa-shopping-cart"></i>
                  <span>View/Edit Orders</span>
                </a>
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
                <a href="smslist.php">
                  <i className="fa fa-envelope-o"></i>
                  <span>SENT MESSAGES</span>
                </a>
              </li>
              <li>
                <a href="emaillist.php">
                  <i className="fa fa-envelope"></i>
                  <span>SENT EMAILS</span>
                </a>
              </li>




              <li className="nav-parent">    
                <a href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <i className="fa fa-th-list"></i>{" "}
                    <span>Staff Management</span>
                </a>
                
                <ul id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">                  
                  <li>
                    <a href="staffadd.php">
                      <i className="fa fa-caret-right"></i>Add Staff
                    </a>
                  </li>
                  <li>
                    <a href="staffview.php">
                      <i className="fa fa-caret-right"></i>View/Edit Staff
                    </a>
                  </li>
                  <li>
                    <a href="paysalary.php">
                      <i className="fa fa-caret-right"></i> Pay Salary
                    </a>
                  </li>
                  <li>
                    <a href="staffcatadd.php">
                      <i className="fa fa-caret-right"></i>Add Designation
                    </a>
                  </li>
                  <li>
                    <a href="staffcatview.php">
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
                    <a href="expadd.php">
                      <i className="fa fa-caret-right"></i>Add Expenses
                    </a>
                  </li>
                  <li>
                    <a href="expview.php">
                      <i className="fa fa-caret-right"></i>View/Edit Expenses
                    </a>
                  </li>
                  <li>
                    <a href="expcatadd.php">
                      <i className="fa fa-caret-right"></i>Add Expense Category
                    </a>
                  </li>
                  <li>
                    <a href="expcatview.php">
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
                    <a href="incadd.php">
                      <i className="fa fa-caret-right"></i>Add Income
                    </a>
                  </li>
                  <li>
                    <a href="incview.php">
                      <i className="fa fa-caret-right"></i>View/Edit Income
                    </a>
                  </li>
                  <li>
                    <a href="inccatadd.php">
                      <i className="fa fa-caret-right"></i>Add Income Category
                    </a>
                  </li>
                  <li>
                    <a href="inccatview.php">
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
                    <a href="typeadd.php">
                      <i className="fa fa-caret-right"></i>Add Cloth Type
                    </a>
                  </li>
                  <li>
                    <a href="typeview.php">
                      <i className="fa fa-caret-right"></i>View/Edit Cloth Type
                    </a>
                  </li>
                  <li>
                    <a href="partadd.php">
                      <i className="fa fa-caret-right"></i>Set Mesurement Parts
                    </a>
                  </li>
                  <li>
                    <a href="partview.php">
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
                    <a href="setgeneral.php">
                      <i className="fa fa-caret-right"></i> Setting
                    </a>
                  </li>
                  <li>
                    <a href="setlogo.php">
                      <i className="fa fa-caret-right"></i> LOGO
                    </a>
                  </li>
                  <li>
                    <a href="document.php">
                      <i className="fa fa-caret-right"></i> Office Documents
                    </a>
                  </li>
                  <li>
                    <a href="templateadd.php">
                      <i className="fa fa-caret-right"></i>Add SMS/Email
                      Template
                    </a>
                  </li>
                  <li>
                    <a href="templateview.php">
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
            <a className="menutoggle">
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
      </section>
    </>
  );
};

export default DashBoard;
