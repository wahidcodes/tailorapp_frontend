import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

const ChangePassword = () => {
    
    const navigate = useNavigate();
    const {user, dispatch} = useAuthContext();
    useEffect(()=>{
        if(!user){
            navigate('/login')
        }    
    },[])

    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [newAgain, setNewAgain] = useState('')
    
    
    const submit = ()=>{

        if(oldPass=='' || newPass=='' || newAgain==''){
            throw Error('Lack of details')
        }

        if(newPass != newAgain){
            throw Error('Not identical password')
        }

        fetch(`${import.meta.env.VITE_API_URL}/changepassword`,{
            method:'POST',
            headers: {'Content-Type':'application/json', 'Authorization':`Bearer ${user.token}`},
            body: JSON.stringify({oldPass, newPass, newAgain}),
        })
            .then(res=>{
                if(!res.ok){
                    alert('Old or new password is incorrect')
                    throw new Error(String(res.status))
                }
                else{
                    return res.json()
                }
            })
            .then(()=>{
                dispatch({type:'LOGOUT'})
                navigate('/login')
            })
            .catch((e:any)=>{
                console.log("Error occured: ",e)
            })
    } 

    return (  
        <>
            <h2>Change your Password</h2>
                Old password: <input type="password" name="password" id="oldpass" onChange={(e)=>setOldPass(e.target.value)}/><br /><br />
                New password: <input type="password" name="password" id="newpass" onChange={(e)=>setNewPass(e.target.value)}/><br /><br />
                New password ( again ): <input type="password" name="password" id="newpassagain" onChange={(e)=>setNewAgain(e.target.value)} /><br /><br />
            <button type="submit" onClick={()=>submit()}>Submit</button>
        </>
    );
}
 
export default ChangePassword;