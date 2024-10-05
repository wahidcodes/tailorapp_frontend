import { useEffect, useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import NavBar from './NavBar';

import jwt_decode from 'jwt-decode';

const DashBoard = () => {

  const isTokenExpired = (token : any) => {
    try {
      const decodedToken : any = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
  
      if (decodedToken.exp < currentTime) {
        // Token has expired
        return true;
      }
  
      // Token is still valid
      return false;
    } catch (error) {
      // Handle error (invalid token, etc.)
      console.error("Error decoding token:", error);
      return true; // Return expired in case of an error
    }
  };

  const [leftPanelState, setLeftPanelState] = useState('leftpanelinner');
  const [contentPanelState, setContentPanelState] = useState('contentpanel');
  

  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  //const user: string | null = localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem('user')||'null');
      
  console.log("New user ", localStorage.getItem('user'))
  
  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user')||'null');
    const token = user.token;
    const verify = isTokenExpired(token);

    if (!user || user=='null' || verify) {
      navigate("/login");
    }
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      console.log("Dispatched")
      fetchDataforJWTTokenValidation()
    }

    if(screen.width < 700){
      setLeftPanelState('nodisplay')
      setContentPanelState('contentpanel1')
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

  console.log("User:    ",user)
  /*                                            USE CLASS FUNTION WHEN NEEDED STYLE FOR NAVLINK
  const navLinkClass = ({ isActive }:any)=>{
    return isActive ? '' : ''
  }
  */
  const fetchDataforJWTTokenValidation = () => {
    fetch(`${import.meta.env.VITE_API_URL}/fetchcustomers`,{
      method:'GET',
      headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
    })
      .then(res=>res.json())
      .then(data => {
        console.log(data);
        if(data.error=="TokenExpiredError" || data.error=="Cannot be authorized"){
          alert("Your token has expired")
          navigate('/login')
        }
      })  
  }
  
    return (
    <>
      <section>
        
        <div>
          <div className="headerbar">
            
            <button type="button" className="btn btn-danger" onClick={()=>{
              if(leftPanelState=='leftpanelinner'){
                setLeftPanelState('nodisplay')
                setContentPanelState('contentpanel1')
              }
              else if(leftPanelState=='nodisplay'){
                setLeftPanelState('leftpanelinner')
              }
            }}>
              <i className="fa fa-bars"></i>
            </button>

            

            <div className="header-right">
              <ul className="headermenu">
                <li>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle"
                      data-toggle="dropdown"
                      style={{backgroundColor:'black',color:'white'}}
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
                            {/*           ---------     MAIN CONTENT    ------------ */}
          <div style={{display:'flex',flexDirection:'row'}}>
            <div className={leftPanelState}>
              <NavBar />
            </div>
            <div className={contentPanelState}>
                <Outlet />
            </div>
          </div>
                    
        </div>

        {/*                                              !--------FOOTER---------!                                                */}
        <div style={{width:'100%',backgroundColor:'#00000f',color:"white",height:'8vh',display:'flex',justifyContent:'center'}}>
              <div style={{margin:15,fontFamily:'sans-serif'}}>
                  © Copyright 2024. Developed and maintained by <a href="https://linkedin.com/in/mohamed-wahid-7817bb239">Mohamed Wahid</a>
              </div>
          </div>

      </section>
    </>
  );
};

export default DashBoard;
