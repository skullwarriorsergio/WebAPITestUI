/* eslint-disable react/jsx-key */
import React, { useEffect, useState }  from "react"
import styles from '../styles/Home.module.css'

const Devices = (props: any) => { 
 const [objects, setObjects] = useState<any[]>([])
 
 useEffect(() => {
   //Creas una promesa con la petición y metes el result en el state
   fetch(`https://localhost:44343/api/Gateways/${props.serial}/Devices`,
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
    <ul>{objects.map((item, index) => <li className={styles.item} onClick={() => DeviceClick(item.uid)}>Device UID: {item.uid}</li>)}</ul>        
  ) 
}

export default Devices