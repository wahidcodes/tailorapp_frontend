import { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {


    return (  
      <>
        <div className="login-container" style={{backgroundColor:'white',height:'100vh', justifyContent:'center'}}>
            
            <center>
              <br />
              <div>
                <h1 style={{fontFamily:'sans-serif',fontSize:'3em',fontWeight:'lighter'}}>
                  <br />
                  Sorry, the page you requested is temproarily unavailable.
                </h1>
                <div style={{fontSize:'1.5em'}}>
                  <br /><br />
                    The route you entered is not yet created. Please return back to the previous page.
                </div>
              </div>
            </center>
        </div>
      </>
    );
}
 
export default Login;