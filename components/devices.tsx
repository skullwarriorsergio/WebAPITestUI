/* eslint-disable react/jsx-key */
import React, { useEffect, useState }  from "react"
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import deletePic from '../public/delete.png'

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
    }).catch(err => 
    {
        setObjects([]);
        console.log(err);
    })
 },[props]);

function DeleteDevice(uid:string)
{
  fetch(`https://localhost:44343/api/Gateways/${props.serial}/Devices/${uid}`,
  {
    method: 'DELETE',headers: 
    {
      'Content-Type': 'application/json'
    }
  }).then(r =>
    {
      console.log(r);
      if (r.ok)
      {
        r.json().then(v => 
        {
          const a = objects.filter((item) => item.guid != v);         
          setObjects(a);
        });
      }
    }).catch(err => {})
}


return (
    <ul>{objects.map((item, index) =>
      <li className={styles.item} >
        <div className={styles.cardHeader}>
              <p className={styles.cardHeaderText}>UID:{item.uid} / Vendor: {item.vendor} / Status: {item.status == 1? "Off" : "On"}</p>
              <div className={styles.elementholder}
                onClick={(e) => 
                  {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    DeleteDevice(item.guid);
                  }}
              >
                <Image src={deletePic} alt="" width={20} height={20}/>
             </div>
        </div>
      </li>)}</ul>        
  ) 
}

export default Devices