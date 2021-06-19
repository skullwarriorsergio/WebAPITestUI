/* eslint-disable react/jsx-key */
import React, { useEffect, useState }  from "react"
import styles from '../styles/Home.module.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const AddGateways = (props) => { 
    const [objects, setObjects] = useState<any[]>([])

    const registerUser = async (event) => {
      event.preventDefault()

      console.log(event.target);
  
      const res = await fetch('https://localhost:44343/api/Gateways', {
        body: JSON.stringify({
            SerialNumber: event.target.serialnumber.value,
            Name: event.target.name.value,
            IP: event.target.ip.value,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      console.log(res);  
      if (res.status == 201)
      {
        const result = await res.json();
      }else if (res.status == 400)
      {
          alert("Wrong IP");
      }
      else if (res.status == 409)
      {
        alert("A Gateway with the specified SN already exist");
      }
      else
      {
        alert("API Error");
      }
    }
  
    return (
    <>
      <form onSubmit={e => registerUser(e)}>
        <table className={styles.listgroup}>
            <tr>
                <th>Serial Number:</th>
                <th>
                    <input id="serialnumber" name="serialnumber" type="text" autoComplete="serialnumber" required />
                </th>
            </tr>
            <tr>
                <th>Name:</th>
                <th>
                    <input id="name" name="name" type="text" autoComplete="name" required />
                </th>                           
            </tr>
            <tr>
                <th>IP address:</th>
                <th>
                    <input id="ip" name="ip" type="text" autoComplete="ip" required />
                </th>                           
            </tr>
        </table>        
        <button className={styles.elementholder} type="submit">Add</button>
      </form>
    </>
    )
  }

  export default AddGateways
  