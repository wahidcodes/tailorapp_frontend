import { useState } from "react";

const Tshirt = ({type}:any) => {

    const user = JSON.parse(localStorage.getItem('user') || '');
    const [collar, setCollar] = useState('');
    const [chest, setChest] = useState('');
    const [height, setHeight] = useState('');
    const [sleeve, setSleeve] = useState('');

    const measObj = {type,collar,chest,height,sleeve}
    const submitTshirtMeas = () => {
        console.log(type)
        console.log(measObj)

        fetch(`${import.meta.env.VITE_API_URL}/addmeas`,{
            method:'POST',
            headers:{'Content-Type':'application/json','Authorization':`Bearer ${user.token}`},
            body:JSON.stringify(measObj)
        })
            .then(res=>res.json())
            .then(data=>console.log(data))

    }

    return (  
        <>

            <div className="row" style={{display:'flex', flexDirection:'row'}}>
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{marginTop:'0.5em'}}>
                    COLLAR
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="waist" style={{height:'2em'}} id="" onChange={(e)=>setCollar(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />

            <div className="row" style={{display:'flex', flexDirection:'row'}}>
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{marginTop:'0.5em'}}>
                    CHEST
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="waist" style={{height:'2em'}} id="" onChange={(e)=>setChest(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row" style={{display:'flex', flexDirection:'row'}}>
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{marginTop:'0.5em'}}>
                    HEIGHT
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="waist" style={{height:'2em'}} id="" onChange={(e)=>setHeight(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />




            <div className="row" style={{display:'flex', flexDirection:'row'}}>
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{marginTop:'0.5em'}}>
                    SLEEVE
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="waist" style={{height:'2em'}} id="" onChange={(e)=>setSleeve(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" />
                <div className="col-xs-12 col-md-1" >
                    <button type="submit" className="btn btn-primary" style={{width:'9em'}} onClick={()=>submitTshirtMeas()}>Add</button>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>

        </>
    );
}
 
export default Tshirt;