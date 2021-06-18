import React, { useEffect, useState }  from "react"
import styles from '../styles/Home.module.css'

const Gateways = (props) => { 
 const [objects, setObjects] = useState<any[]>([])
 
 useEffect(() => {
   //Creas una promesa con la petición y metes el result en el state
   fetch('https://localhost:44343/api/Gateways',
   {
     method: 'Get',headers: 
     {
      'Content-Type': 'application/json'
     }
   }).then(r => r.json())
   .then(result => 
    {
      setObjects(result);
    }).catch(err => {})
 },[]);

function GatewayClick(serial:string)
{
}


return (
    // eslint-disable-next-line react/jsx-key
    <ul>{objects.map((item, index) => <li className={styles.item} onClick={() => GatewayClick(item.serialNumber)}>Serial Number: {item.serialNumber}</li>)}</ul>    
  ) 
}

export default Gateways