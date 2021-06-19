/* eslint-disable react/jsx-key */
import React, { useEffect, useState }  from "react"
import styles from '../styles/Home.module.css'
import { Accordion, Button, Card } from 'react-bootstrap';
import Devices from './devices'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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

return (
    <Accordion>      
      {objects.map((item, index) =>
      <Card>
         <Accordion.Toggle as={Card.Header} variant="link" eventKey={index.toString()}>
            SN: {item.serialNumber} - {index.toString()}
          </Accordion.Toggle>
        <Accordion.Collapse eventKey={index.toString()}>
          <Card.Body>
            <Devices serial={item.serialNumber}/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      )}
    </Accordion>    
  ) 
}

export default Gateways