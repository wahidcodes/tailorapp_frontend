import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const EmailCustomer = () => {

    const user = JSON.parse(localStorage.getItem('user') || '');
    const navigate = useNavigate();
    const { idParam } = useParams();
 
    const [customerData, setCustomerData] = useState([]);

    const [email, setEmail] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [template, setTemplate] = useState('');
    const [message, setMessage] = useState('');
       
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
        setEmail(result.email)
    }

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        fetchCustomer();
        fetchDefaultCustomer();

    },[])


//    const templateObj = {customerName:"wahid",description:"no desc",dateReceived:"14/05/2024",amount:"200",paidAmount:"150"}
    const orgObj = {email, customerName, template, message};
    

/*                                                      COMMENTED TO PREVENT MISUSE
    const submit = ()=>{

        console.log(orgObj)

        if(user){
            if(customerName==''|| message==''){
                alert('Please enter full details')
                return;
            }
            fetch(`${import.meta.env.VITE_API_URL}/emailcustomer`,{
                method:'POST',
                headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
                body: JSON.stringify(orgObj),
            })
                .then(res=>{
                    if(!res.ok){
                        alert('Some problem in submitting order details')   
                        throw Error(String(res.status))
                    }
                    else{
                        return res.json()
                    }
                })
                .then(data=>{
                    alert("Email successfully sent")
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
*/
    return (  
        <>
            <h2>Email Customer</h2>
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
                <div className="col-xs-12 col-md-1" style={{paddingTop:'1em'}}>
                    Template:
                </div>
                <div className="col-xs-6 col-md-1">
                    <select name="template" id="template" onChange={(e)=>{
                        switch(e.target.value){
                            case 'Collect your clothes':
                                setTemplate('Collect your clothes')
                                setMessage(`Dear ${customerName}, \n \t Your Clothes are ready for collection. Thanks for your patronage`)
                                break;
                            case 'Under progress':
                                setTemplate('Under progress')
                                setMessage(`Dear ${customerName}, \n \t Your ordered colthes are being made in progesss, We'll infom you soon when it's over`)
                                break;
                            }
                    }}>
                        <option value="none">Please select template</option>
                        <option value={'Collect your clothes'}>Collect your clothes</option>
                        <option value={'Under progress'}>Under progress</option>
                    </select>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{paddingTop:'5em'}}>
                    Message:
                </div>
                <div className="col-xs-6 col-md-1">
                    <textarea name="message" id="" style={{height:150}} cols={30} rows={10} onChange={(e)=>setMessage(e.target.value)} value={message}></textarea>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />




            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" />
                <div className="col-xs-12 col-md-1" >
                    <button type="submit" className="btn btn-primary" style={{width:'9em'}} 
                     onClick={()=>{
                        //submit()
                        alert('Not available...');
                     }
                    }>
                        Send Email
                    </button>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />
        </>
    );
}
 
export default EmailCustomer;

