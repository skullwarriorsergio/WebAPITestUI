/* eslint-disable react/jsx-key */
import React, { useEffect, useState }  from "react"
import styles from '../styles/Home.module.css'
import Gateways from '../components/gateways'
import AddGateway from '../components/addgateways'
import AddDevice from '../components/adddevices'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const Dashboard = (props:any) => { 
    const [objects, setObjects] = useState<any>(0)
    const [selectedGateway, setSelectedGateway] = useState<string>('<<Select a gateway>>')

    function Notify(objs:any)
    {
        setObjects(objs);
    }

    function OnSelectedGateway(serialNumber:string)
    {
        setSelectedGateway(serialNumber);
    }
    
    return (
        <main className={styles.main}>
            <div className={styles.sectionBig}>
                <p className={styles.code}>Gateways list</p>
                <div className={styles.listgroup}>            
                    <Gateways update={objects} selectGateway={OnSelectedGateway}/> 
                </div>                  
            </div>  
            <div className={styles.section}>
                <p className={styles.code}>Adding Gateways</p>
                    <AddGateway doNotify={Notify} />
            </div>
            <div className={styles.section}>
                <p className={styles.code}>Adding Devices</p>
                    <AddDevice doNotify={Notify} gateway={selectedGateway} />
            </div>
        </main>
    )
  }
export default Dashboard