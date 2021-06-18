import React, { useEffect, useState }  from "react"
import styles from '../styles/Home.module.css'

const Devices = (props: any) => { 
 const [objects, setObjects] = useState<any[]>([])
 
 useEffect(() => {
   //Creas una promesa con la petición y metes el result en el state
   fetch(`https://localhost:44343/api/Gateways/${props}`,
   {
     method: 'Get',headers: 
     {
      'Content-Type': 'application/json'
     }
   }).then(r => r.json())
   .then(result => 
    {
      setObjects(result);
      console.log(result);
    }).catch(err => 
    {
        setObjects([]);
        console.log(err);
    })
 },[props]);

function DeviceClick(serial:string)
{
}


return (
    
      
    //<ul>{objects.map((item, index) => <li className={styles.item} onClick={() => DeviceClick(item.UID)}>UID: {item.UID}</li>)}</ul>    
    //<ul></ul>
    <>
    {console.log(objects.map((item, index) => <li>a</li>))}
    </>
  ) 
}

export default Devices