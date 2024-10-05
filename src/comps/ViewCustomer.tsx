import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewCustomer = () => {
    const [loading, setLoading] = useState(true)
    const [customerData, setCustomerData] = useState([]);
    const navigate = useNavigate()
    const user:any = JSON.parse(localStorage.getItem('user')||'');
    const [msg, setMsg] = useState('');
    
    const deleteCustomer = (id:any)=>{
        fetch(`${import.meta.env.VITE_API_URL}/deletecustomer`,{
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
    
    const fetchCustomer = async ()=>{
        
            const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchcustomers`,{
                method:'GET',
                headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
            })
            const data = await res.json();
            
            setCustomerData(data.result);
            setLoading(false)
    }

    useEffect(()=>{
        console.log("aaaaaa",user)
        if(!user){
            navigate('/login');
        }
        fetchCustomer();

    },[msg])
    
    console.log('Data: ',customerData)

    return (  
        <>
            <h2>View Customer</h2>
            <hr />
        
            <div className="panel panel-default">
      
              <div className="panel-body">
              
                <div className="clearfix mb30"></div>
      
                <div className="table-responsive">
                <table className="table table-striped" id="table2">
                  <thead>
                      <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th style={{display:'flex', justifyContent:'center'}}>Address</th>
                        <th>Phone Number</th>
                        <th>Gender</th>
                        <th style={{display:'flex', justifyContent:'center'}}>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                  {loading ? <tr><td>Loading</td></tr> : customerData.map((customer:any)=>(

                            <tr key={customer._id}>
                                <td>1</td>
                                <td> 
                                    <a href=''> 
                                        {customer.fullName}
                                    </a>
                                </td>
                                <td>{customer.address}</td>
                                <td>{customer.phoneNo}</td>
                                <td>{customer.gender}</td>
                                <td>
                                    <Link style={buttonStyles} className="btn btn-primary btn-xs" to={`/addorder/${customer._id}`}>New Order</Link>
                                    <Link style={buttonStyles} className="btn btn-warning btn-xs" to={`/addmeas/${customer._id}`}>Measurment</Link>
                                    <Link style={buttonStyles} to={`/email/${customer._id}`} className='btn btn-info btn-xs'>EMAIL</Link>
                                    <Link style={buttonStyles} to={``} className='btn btn-danger btn-xs' onClick={()=>deleteCustomer(customer._id)}>DELETE</Link>
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
 
export default ViewCustomer;

const buttonStyles = {
    height: '2.5em',
    fontSize: '0.8em', 
    marginLeft: '0.6em'
}