import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewEmails = () => {
    const [loading, setLoading] = useState(true)
    const [emailData, setEmailData] = useState([]);
    const navigate = useNavigate()
    const user:any = JSON.parse(localStorage.getItem('user')||'');

    /*
    const deleteEmail = (id:any)=>{
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
    */
        const fetchEmails = async ()=>{
            
                const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchemails`,{
                    method:'GET',
                    headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
                })
                const data = await res.json();
                
                setEmailData(data.result);
                setLoading(false)
        }

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        fetchEmails();

    },[])
    
    console.log('Data: ',emailData)

    return (  
        <>
            <h2>View Emails</h2>
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
                  {loading ? <tr><td>Loading</td></tr> : emailData.map((email:any)=>(
                            <tr key={email._id}>
                                <td>1</td>
                                <td> 
                                    <a href=''> 
                                        {email.customerName}
                                    </a>
                                </td>
                                <td>{email.message}</td>
                                <td>{email.createdAt}</td>
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
 
export default ViewEmails;

