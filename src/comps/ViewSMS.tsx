import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewSMS = () => {
    const [loading, setLoading] = useState(true)
    const [smsData, setSmsData] = useState([]);
    const navigate = useNavigate()
    const user:any = JSON.parse(localStorage.getItem('user')||'');
    const [msg, setMsg] = useState('');
    
    const deleteSms = (id:any)=>{
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
        const fetchSms = async ()=>{
            
                const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchsms`,{
                    method:'GET',
                    headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
                })
                const data = await res.json();
                
                setSmsData(data.result);
                setLoading(false)
        }

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        //fetchSms();

    },[msg])
    

    return (  
        <>
            <h2>View Sms</h2>
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
                        <th>Message</th>
                        <th>Date</th>
                      </tr>
                  </thead>
                  <tbody>
                  {loading ? <tr><td>Loading</td></tr> : smsData.map((sms:any)=>(
                            <tr key={sms._id}>
                                <td>1</td>
                                <td> 
                                    <a href=''> 
                                        {sms.customerName}
                                    </a>
                                </td>
                                <td>{sms.message}</td>
                                <td>{sms.createdAt}</td>
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
 
export default ViewSMS;

