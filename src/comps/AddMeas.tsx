import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Trouser from "./measurment/Trouser";
import Tshirt from "./measurment/Tshirt";

const AddMeas = () => {

    const user = JSON.parse(localStorage.getItem('user') || '');
    const navigate = useNavigate();
    const {idParam} = useParams();
 
    const [customerData, setCustomerData] = useState([]);

    const [customerName, setCustomerName] = useState('');
    const [dressType, setDressType] = useState('Tshirt')

    const renderDressType = (dressType:any)=>{

        // Add Materials COmponent here

        switch (dressType) {
            case 'Tshirt':
                return <Tshirt type={dressType} idParam={idParam} customerName={customerName} />;
            case 'Trouser':
                return <Trouser type={dressType} idParam={idParam} customerName={customerName} />;
            default:
                return null;
        }
    
    }

    const fetchCustomer = async ()=>{
            
        const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchcustomers`,{
            method:'GET',
            headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
        })
        const data = await res.json();
        
        setCustomerData(data.result);
    }
    
    const fetchDefaultCustomer = async()=>{

        const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchid`,{
            method:'POST',
            headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
            body: JSON.stringify({idParam})
        })
        const {result} = await res.json();
        setCustomerName(result.fullName)
    }

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        fetchCustomer();
        idParam && fetchDefaultCustomer();

    },[])

    return (  
        <>
            <h2>Add Measurment</h2>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingBottom:'1em'}}>
                    Select Customer
                </div>
                <div className="col-xs-6 col-md-1">
                    <select name="customerName" value={customerName} id="customerName" onChange={(e)=>setCustomerName(e.target.value)}>
                        {customerData && customerData.map((customer:any)=>(
                            <option value={customer.fullName} key={customer._id}>
                                {customer.fullName}
                            </option>
                        ))}
                        
                    </select>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingTop:'0.2em'}}>
                    Dress Type:
                </div>
                <div className="col-xs-6 col-md-1">
                    <select name="dressType" id="" onChange={(e)=>setDressType(e.target.value)}>
                        <option value="Tshirt">Tshirt</option>
                        <option value="Trouser">Trouser</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                    </select>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />
            {
                renderDressType(dressType)
            }
            
            
            <br /><br />
        </>
    );
}
 
export default AddMeas;