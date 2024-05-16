import { useState } from "react";

const Trouser = ({type, idParam, customerName}:any) => {

    const user = JSON.parse(localStorage.getItem('user') || '');
    console.log(idParam, customerName)
    const [waist, setWaist] = useState('');
    const [hips, setHips] = useState('');
    const [thighWidth, setThighWidth] = useState('');
    const [trouserLength, setTrouserLength] = useState('');
    const [knee, setKnee] = useState('');
    const [halfHem, setHalfHem] = useState('');

    const measObj = {idParam,customerName,type,waist,hips,thighWidth,trouserLength, knee, halfHem}

    const submitTrouserMeas = () => {
        console.log(type)
        console.log(measObj)

        fetch(`${import.meta.env.VITE_API_URL}/addmeas/trouser`,{
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
                    WAIST
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="waist" style={{height:'2em'}} id="" onChange={(e)=>setWaist(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />

            <div className="row" style={{display:'flex', flexDirection:'row'}}>
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{marginTop:'0.5em'}}>
                    HIPS
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="waist" style={{height:'2em'}} id="" onChange={(e)=>setHips(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row" style={{display:'flex', flexDirection:'row'}}>
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{marginTop:'0.5em'}}>
                    THIGH WIDTH
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="waist" style={{height:'2em'}} id="" onChange={(e)=>setThighWidth(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />




            <div className="row" style={{display:'flex', flexDirection:'row'}}>
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{marginTop:'0.5em'}}>
                    TROUSER LENGTH
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="waist" style={{height:'2em'}} id="" onChange={(e)=>setTrouserLength(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row" style={{display:'flex', flexDirection:'row'}}>
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{marginTop:'0.5em'}}>
                    KNEE
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="waist" style={{height:'2em'}} id="" onChange={(e)=>setKnee(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />


            <div className="row" style={{display:'flex', flexDirection:'row'}}>
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" style={{marginTop:'0.5em'}}>
                    HALF HEM
                </div>
                <div className="col-xs-6 col-md-1">
                    <input type="text" name="waist" style={{height:'2em'}} id="" onChange={(e)=>setHalfHem(e.target.value)}/>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
            <br /><br />

            
            <div className="row">
                <div className="col-xs-12 col-md-4" />
                <div className="col-xs-12 col-md-1" />
                <div className="col-xs-12 col-md-1" >
                    <button type="submit" className="btn btn-primary" style={{width:'9em'}} onClick={()=>submitTrouserMeas()}>Add</button>
                </div>
                <div className="col-xs-12 col-md-4" />
            </div>
        </>
    );
}
 
export default Trouser;