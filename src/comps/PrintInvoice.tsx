import { useEffect, useRef, useState } from 'react';
import Logo from '../img/logo.png'
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const PrintInvoice = () => {
    
    interface singleOrder{
        dateReceived: String,
        description: String,
        amount: Number,
        paidAmount: Number,
    }

    const componentRef = useRef<HTMLDivElement>(null)

    const user = JSON.parse(localStorage.getItem('user') || '');
    const navigate = useNavigate();
    const {idParam} = useParams();
 
    const [customerName, setCustomerName] = useState('');

    const [singleOrder, setSingleOrder] = useState<any>([]);
    const [singleCustomer, setSingleCustomer] = useState<any>([]);

    const [orderDate, setOrderDate] = useState('');

    const handlePrint = useReactToPrint({
        content : () => componentRef.current,
    })

    const fetchDefaultOrder = async()=>{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchorder`,{
            method:'POST',
            headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
            body: JSON.stringify({idParam})
        })
        const {result} = await res.json();
        console.log(result)
        setCustomerName(result.customerName)
        setSingleOrder(result)
        setOrderDate(singleOrder.dateReceived?.slice(0,10))
    }

    const fetchDefaultCustomer = async()=>{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchcustomerbyname`,{
            method:'POST',
            headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
            body: JSON.stringify({customerName})
        })
        const {result} = await res.json();
        //console.log("SingleCustomer:",result[0])
        setSingleCustomer(result[0])
    }

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        idParam && fetchDefaultOrder();
        customerName && fetchDefaultCustomer();
    },[customerName])


    return (  
        <>
            <h2>Print Receipt</h2>
            <div style={{display:'flex',justifyContent:'end'}}>
                <button className="btn btn-warning" style={{width:'5em'}} onClick={()=>handlePrint()}>Print</button>
            </div>
            <div className="printContent" ref={componentRef}>
                <div style={{display:'flex',justifyContent:'center'}}>
                    {/* 
                                    USE LOGO IF NEEDED
                        <img src={Logo} alt="" width={100} height={100} />  
                    */}
                </div>
                <br /><br />
                <div>
                    Name: {customerName} <br /><br />
                    Address: {singleCustomer && singleCustomer.address} <br /><br />
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                        <div>Phone:  {singleCustomer && singleCustomer.phoneNo} </div><br /><br />
                        <div>Date: {singleOrder && orderDate}</div>
                    </div>
                </div>
                <br /><br />
                <div>
                    <table className='table' style={{fontFamily:'sans-serif'}}>
                        <thead style={{backgroundColor:'#355E3B', color:'white'}}>
                            <tr>
                                <th scope="col" style={{backgroundColor:'#355E3B', color:'white', fontFamily:'sans-serif'}}>Description</th>
                                <th scope="col" style={{backgroundColor:'#355E3B', color:'white', fontFamily:'sans-serif'}}>Amount</th>
                                <th scope="col" style={{backgroundColor:'#355E3B', color:'white', fontFamily:'sans-serif'}}>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{singleOrder.description}</td>
                                <td>{singleOrder.amount}</td>
                                <td>{singleOrder.amount - singleOrder.paidAmount }</td>
                            </tr>
                        </tbody>
                    </table>
                </div><br /><br /><br /><br />
                <div style={{display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
                    <div>
                        Staff Sign
                    </div>
                    <div>
                        Customer Sign
                    </div>
                </div>
            </div>

        </>
    );
}
 
export default PrintInvoice;