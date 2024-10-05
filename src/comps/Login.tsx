import { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const {dispatch} = useAuthContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableState, setDisableState] = useState(false);
    const [buttonState, setButtonState] = useState("Login")
    const onSubmit = ()=>{

        console.log('Email: ',email);
        console.log('password: ',password);

        if(email=='' || password==''){
            alert('Please enter full details')
            return;
        }

        else{
          setDisableState(true)
          setButtonState("Loading...");
          fetch(`${import.meta.env.VITE_API_URL}/login`,{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password}),
          })
            .then(res=>{
                if(!res.ok){
                    alert('Please ensure correct email and password')
                    setDisableState(false);
                    setButtonState("Login");
                    throw new Error(String(res.status))
                }
                else{
                    return res.json()
                }
            })
            .then(data=>{
                console.log(data)
                dispatch({type:'LOGIN',payload:data});
                localStorage.setItem("user",JSON.stringify(data));
                navigate('/')
            })
            .catch((e:any)=>{
                console.log("Error occured: ",e)
            })

        }
    }

    return (  
        <>
      <div className="login-container" style={{backgroundColor:'white',height:'100vh', justifyContent:'center'}}>
      <div className="container mt-5">
        <br /><br /><br /><br />
        <div className="col-md-4"></div>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
                <br /><br /><br /><br />
              <h2 className="card-title text-center mb-4">Login</h2>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" className="form-control" style={{width:'100%'}} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" className="form-control" value={password} style={{width:'100%'}}  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="button" className="btn btn-primary btn-block" onClick={()=>onSubmit()} disabled={disableState}>{buttonState}</button>

              <br /><br />

              <div style={{height:'20vh', width:'30vh', border:'1px solid black', borderRadius:'10px', display:'flex', justifyContent:'center', marginLeft:'5em'}}>
                <br />
                For demo user: <br /><br />
                Email:  user@gmail.com <br /><br />
                Password: user <br />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>        
    </div>

    </>
    );
}
 
export default Login;