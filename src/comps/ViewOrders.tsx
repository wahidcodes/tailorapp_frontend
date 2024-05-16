import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewOrders = () => {
    const [loading, setLoading] = useState(true)
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate()
    const user:any = JSON.parse(localStorage.getItem('user')||'');
    const [msg, setMsg] = useState('');
    
    const deleteOrder = (id:any)=>{
        fetch(`${import.meta.env.VITE_API_URL}/deleteorder`,{
            method:'DELETE',
            headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
            body:JSON.stringify({id})            
        })
            .then(res=>res.json())
            .then(data=>{
                setMsg(data.msg)
                alert(data.msg);
            })


    }
    
    const fetchOrder = async ()=>{
        
            const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchorders`,{
                method:'GET',
                headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
            })
            const data = await res.json();
            
            setOrderData(data.result);
            setLoading(false)
    }

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        fetchOrder();

    },[msg])
    
    console.log('Data: ',orderData)

    return (  
        <>
            <h2>View Orders</h2>
            <hr />

        


        
            <div className="panel panel-default">
      
              <div className="panel-body">
              
                <div className="clearfix mb30"></div>
      
                <div className="table-responsive">
                <table className="table table-striped" id="table2">
                  <thead>
                      <tr>
                      <th>Order #</th>
                        <th>Customer</th>
                        <th>Description</th>
                        <th>Date Received</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                  {loading ? <tr><td>Loading</td></tr> : orderData.map((order:any)=>(

                            <tr key={order._id}>
                                <td>1</td>
                                <td> 
                                    <a href=''> 
                                        {order.customerName}
                                    </a>
                                </td>
                                <td>{order.description}</td>
                                <td>{order.dateReceived}</td>
                                <td>{order.amount}</td>
                                <td>{order.amount-order.paidAmount}</td>
                                <td>
                                    <Link style={buttonStyles} className="btn btn-primary btn-xs" to={`/addpayment/`}>Add Payment</Link>
                                    <Link style={buttonStyles} to={`/printinvoice/${order._id}`} className='btn btn-info btn-xs'>Receipt</Link>
                                    <Link style={buttonStyles} to={`/updateorder/${order._id}`} className='btn btn-info btn-xs'>Update</Link>
                                    <Link style={buttonStyles} to={``} className='btn btn-danger btn-xs' onClick={()=>deleteOrder(order._id)}>DELETE</Link>
                                </td>
                                
                            </tr>
                  ))  }


                  </tbody>
              </table>
          </div>
		  
        </div>
      </div>
                  
      
    </>
    );
}
 
export default ViewOrders;


const buttonStyles = {
    height: '2.5em',
    fontSize: '0.8em', 
    marginLeft: '0.6em'
}