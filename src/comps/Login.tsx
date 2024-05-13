import { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const {dispatch} = useAuthContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = ()=>{

        console.log('Email: ',email);
        console.log('password: ',password);

        if(email=='' || password==''){
            alert('Please enter full details')
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/login`,{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password}),
        })
            .then(res=>{
                if(!res.ok){
                    alert('Please ensure correct email and password')
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
                navigate('/dashboard')
            })
            .catch((e:any)=>{
                console.log("Error occured: ",e)
            })

    
    }

    return (  
        <>
            <h2>Login</h2>
            Email: <input type="text" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}/><br/><br />
            Password: <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/><br/><br />
            <button type="submit" onClick={()=>onSubmit()}>Submit</button>
        </>
    );
}
 
export default Login;