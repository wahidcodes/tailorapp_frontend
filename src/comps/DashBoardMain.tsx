import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashBoardMain = () => {

    
    const [loading, setLoading] = useState(true)
    const [customerData, setCustomerData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [income, setIncome] = useState();
    const user = JSON.parse(localStorage.getItem('user')||'null');
    const navigate = useNavigate();

    console.log(localStorage.getItem('user'))

    const fetchCustomer = async ()=>{
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchcustomers`,{
            method:'GET',
            headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
        })
        const data = await res.json();
        
        setCustomerData(data.result);
        setLoading(false)
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

    const fetchIncome = async ()=>{
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/fetchincome`,{
            method:'POST',
            headers: {'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
        })
        const result = await res.json();
        
        setIncome(result.totalIncome);
        setLoading(false)
    }

    console.log(income, loading)
    
    useEffect(()=>{
        console.log(user);
        if(!user){
            navigate('/login');
            console.log('navigating')
        }
        fetchCustomer();
        fetchOrder();
        fetchIncome();
    },[])

    return (  
        <>
            <br />
            <h2>Dashboard Main</h2>
            <br /><br />
            <div className="row">
                <div className="col-lg-3 col-md-6">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className="fa fa-user fa-5x"></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="huge">{customerData.length}</div>
                                    <div>Total Customers!</div>
                                </div>
                            </div>
                        </div>
                        <Link to="/viewcustomer">              
                            <div className="panel-footer">
                                <span className="pull-left">View Details</span>
                                <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                <div className="clearfix"></div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className="fa fa-shopping-cart fa-5x"></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="huge">{orderData.length}</div>
                                    <div>Total Orders!</div>
                                </div>
                            </div>
                        </div>
                        <Link to="/vieworders">  
                            <div className="panel-footer">
                            	<span className="pull-left">View Details</span>
                                <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                <div className="clearfix"></div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="panel panel-warning">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-3">
                                    <i className="fa fa-money fa-5x"></i>
                                </div>
                                <div className="col-xs-9 text-right">
                                    <div className="huge">&#8377; {income}</div>
                                    <div>Total Income!</div>
                                </div>
                            </div>
                        </div>
                        <a href="incview.php">
                            <div className="panel-footer">
                                <span className="pull-left">View Details</span>
                                <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                <div className="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
        </div>

        </>
    );
}
 
export default DashBoardMain;