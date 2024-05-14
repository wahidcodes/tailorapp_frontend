import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        if(!user){
            navigate('/');
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
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Gender</th>
                        <th>Action</th>
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
                                <a href='' className='btn btn-success btn-xs'>New Order</a>

                                <a href='' className='btn btn-info btn-xs'>SMS</a>
                                <a href='' className='btn btn-info btn-xs'>EMAIL</a>
                                <button type='button' className='btn btn-danger btn-xs' onClick={()=>deleteCustomer(customer._id)}>DELETE</button>
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