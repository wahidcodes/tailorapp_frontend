import { useState } from "react"
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {

    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [gender, setGender] = useState('male');


//    const templateObj = {fullName:"wahid",address:"manickampalayam",phoneNo:"6380631634",city:"erode",email:"amwahid2004@gmail.com",comment:"nothing",gender:"male"}
    const orgObj = {fullName, address, phoneNo, city, email, comment, gender };
    
    const submit = ()=>{
        
        if(user){
            if(fullName=='' || address=='' || phoneNo=='' || city=='' || email=='' || comment=='' || gender=='' ){
                alert('Please enter full details')
                return;
            }
            fetch(`${import.meta.env.VITE_API_URL}/addcustomer`,{
                method:'POST',
                headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
                body: JSON.stringify(orgObj),
            })
                .then(res=>{
                    if(!res.ok){
                        alert('Some problem in submitting customer details')
                        
                    }
                    else{
                        return res.json()
                    }
                })
                .then(data=>{
                    alert("Customer successfully added")
                    navigate('/viewcustomer')
                })
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
            <h2>Add Customer</h2>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingTop:'1em'}}>
                    Full Name:
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="name" id="" onChange={(e)=>setFullName(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />




            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingTop:'1em'}}>
                    Address:
                </div>
                <div className="col-xs-6 col-md-1">
                    <textarea name="address" id="" cols={30} rows={10} onChange={(e)=>setAddress(e.target.value)}></textarea>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingBottom:'3em'}}>
                    Phone Number: 
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="number" name="phoneno" id="" onChange={(e)=>setPhoneNo(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br />




            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingTop:'1em'}}>
                    City:
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="" id="" onChange={(e)=>setCity(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />



            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingBottom:'0em'}}>
                    Email:
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="email" name="" id="" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />




            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingTop:'1em'}}>
                Comment:
                </div>
                <div className="col-xs-6 col-md-1">
                    <textarea name="comment" id="" cols={30} rows={10} onChange={(e)=>setComment(e.target.value)}></textarea>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingTop:'1em'}}>
                    Gender:
                </div>
                <div className="col-xs-6 col-md-1">
                    <select name="gender" id="" onChange={(e)=>setGender(e.target.value)}>
                        <option value={'male'}>Male</option>
                        <option value={'female'}>Female</option>
                    </select>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" />
                <div className="col-xs-12 col-md-1" >
                    <button type="submit" className="btn btn-primary" style={{width:'9em'}} onClick={()=>submit()}>Add</button>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />
        </>
    );
}
 
export default AddCustomer;