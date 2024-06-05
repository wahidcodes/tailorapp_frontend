import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const UpdateOrder = () => {

    const user = JSON.parse(localStorage.getItem('user') || '');
    const navigate = useNavigate();
    const {idParam} = useParams();
 
    const [customerData, setCustomerData] = useState([]);

    const [description, setDescription] = useState('');
    const [dateReceived, setDateReceived] = useState('');
    const [amount, setAmount] = useState('');
    const [paidAmount, setPaidAmount] = useState('');
    const [customerName, setCustomerName] = useState('');

    const [orderDate, setOrderDate] = useState('');

    const fetchCustomer = async ()=>{
            
        const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchorders`,{
            method:'GET',
            headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
        })
        const data = await res.json();
        
        setCustomerData(data.result);
    }

    const fetchDefaultCustomer = async()=>{

        const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchorder`,{
            method:'POST',
            headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
               body: JSON.stringify({idParam})
        })
        const {result} = await res.json();
        console.log(result)
        setCustomerName(result.customerName);
        setDescription(result.description);
        setOrderDate(result.dateReceived.slice(0,10))
        setAmount(result.amount);
        setPaidAmount(result.paidAmount);
    }

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        fetchCustomer();
        idParam && fetchDefaultCustomer();
    },[])


//    const templateObj = {customerName:"wahid",description:"no desc",dateReceived:"14/05/2024",amount:"200",paidAmount:"150"}
    const orgObj = {idParam, customerName, description, dateReceived, amount, paidAmount};
    

    const submit = ()=>{
        console.log(orgObj)

        if(user){
            if(customerName=='' || description=='' || dateReceived=='' ||  amount=='' || paidAmount==''){
                alert('Please enter full details')
                return;
            }
            fetch(`${import.meta.env.VITE_API_URL}/updateorder`,{
                method:'POST',
                headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
                body: JSON.stringify(orgObj),
            })
                .then(res=>{
                    if(!res.ok){
                        alert('Some problem in submitting order details')
                        
                    }
                    else{
                        return res.json()
                    }
                })
                .then(data=>{
                    alert(data.msg)
                    console.log(data.msg)
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
            <h2>Update Order</h2>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingBottom:'1em'}}>
                    Select Customer
                </div>
                <div className="col-xs-6 col-md-1">
                    <select name="customerName" value={customerName} id="customerName" onChange={(e)=>setCustomerName(e.target.value)}>
                        {customerData && customerData.map((customer:any)=>(
                            <option value={customer.customerName} key={customer._id}>
                                {customer.customerName}
                            </option>
                        ))}
                        
                    </select>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />




            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingTop:'1em'}}>
                    Description:
                </div>
                <div className="col-xs-6 col-md-1">
                    <textarea name="description" id="" cols={30} rows={10} defaultValue={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingBottom:'3em'}}>
                    Date Received:
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="date" name="datereceived" id="" defaultValue={orderDate} onChange={(e)=>setDateReceived(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br />




            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingTop:'1em'}}>
                    Amount:
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="number" name="" id="" defaultValue={amount} onChange={(e)=>setAmount(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />



            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingBottom:'0em'}}>
                    Paid:
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="number" name="" id="" defaultValue={paidAmount} onChange={(e)=>setPaidAmount(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" />
                <div className="col-xs-12 col-md-1" >
                    <button type="submit" className="btn btn-primary" style={{width:'9em'}} onClick={()=>submit()}>Update Order</button>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />
        </>
    );
}
 
export default UpdateOrder;