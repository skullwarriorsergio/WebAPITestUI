/* eslint-disable react/jsx-key */
import React, { useEffect, useState }  from "react"
import styles from '../styles/Home.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const AddDevices = (props) => { 
    const [objects, setObjects] = useState<any[]>([])
    const [startDate, setStartDate] = useState(new Date());
    const [checked, setChecked] = useState(false);

    const registerDevice = async (event) => {
      event.preventDefault()
 
      const res = await fetch(`https://localhost:44343/api/Gateways/${props.gateway}/Devices`, {
        body: JSON.stringify({
            UID: event.target.uid.valueAsNumber,
            Vendor: event.target.vendor.value,
            DateCreated: startDate,
            Status: checked ? 0: 1,
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
        props.doNotify(result);
      }else if (res.status == 400)
      {
          alert("Wrong format");
      }
      else if (res.status == 409)
      {
        alert(`A Device with the same uid on gateway: ${props.gateway} already exists`);
      }
      else
      {
        alert("API Error");
      }
    }
  
    return (
    <div>
      <p className={styles.device}>Add on gateway ({props.gateway})</p>
      <form onSubmit={e => registerDevice(e)}>
        <table className={styles.listgroup}>
            <tr>
                <th>UID:</th>
                <th>
                    <input id="uid" name="uid" type="number" autoComplete="uid" required />
                </th>
            </tr>
            <tr>
                <th>Vendor:</th>
                <th>
                    <input id="vendor" name="vendor" type="text" autoComplete="vendor" required />
                </th>                           
            </tr>
            <tr>
                <th>Date created:</th>
                <th>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </th>                           
            </tr>
            <tr>
                <th>Status (Online?):</th>
                <th>
                    <input id="status" name="status" type="checkbox" checked={checked} onChange={() => setChecked(!checked)}/>
                </th>                           
            </tr>
        </table>        
        <button className={styles.elementholder} type="submit">Add</button>
      </form>
    </div>
    )
  }
export default AddDevices
  