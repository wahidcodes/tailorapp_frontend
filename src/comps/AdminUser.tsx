import { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";

const AdminUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const {user} = useAuthContext();
        
    const onSubmit = ()=>{
        
        if(user){

            fetch(`${import.meta.env.VITE_API_URL}/signup`,{
                method:'POST',
                headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
                body: JSON.stringify({email, password, role}),
            })
                .then(res=>res.json())
                .then(data=>console.log(data))
                .catch((e:any)=>{
                    console.log("Error occured: ",e)
                })
        }
        else{
            alert('Please login')
        }

    }

    return (  
        <>
            <h2>Admin Page</h2>
                <h2>Sign Up</h2>
                Email: <input type="text" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}/><br/><br />
                Password: <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/><br/><br />
                Role: <input type="text" name="role" id="role" onChange={(e)=>setRole(e.target.value)}/><br/><br />
                <button type="submit" onClick={()=>onSubmit()}>Submit</button>
        </>
    );}
 
export default AdminUser;