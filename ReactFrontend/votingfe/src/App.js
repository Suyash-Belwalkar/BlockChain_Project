import React, {useState, useEffect} from 'react';
import './App.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Home from './containers1/home1/home2';
import Option from './containers1/home1/option1';
import VoterComponent from './component/voter_component';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminComponent from './component/admin_component';
import {connectWeb3Metamask} from './web3_functions'
import detectEthereumProvider from '@metamask/detect-provider';
function App() {

  const [contractInstance, setContract] = useState(null)
  const [accounts, setAccounts] = useState()
  const headleInit =async(main)=>{
    await loadFull(main)
  }
  useEffect(()=>{ 
    async function connect(){
      const provider = await detectEthereumProvider();
      try {
        if (provider) {
          console.log("Metamask found");
          let {accounts, instance} = await connectWeb3Metamask(provider);
          setAccounts(accounts);
          setContract(instance);
        } else {
          alert(
            (`Metamask not found. Install metamask!!`)
          )
        }
      } catch (error) {
        // -32002 error code means metamask is trying to take permission
        if(error.code !== -32002){
          alert(
            (`Failed to load web3, accounts, or contract. Check console for details.,`)
          );
        }
        console.log(error);
      }
    }
    setTimeout(connect, 1500);
  },[])
 
  return (
    
    <div className="App">
       { contractInstance == null ? 
        <>
          <h2 style={{textAlign: "center"}}> Loading Application </h2>
        </> :
        <>
       
        <Particles id="Particles" init={headleInit}/>
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<Home />}/>
              <Route path="/Option" element={<Option  contractInstance={contractInstance} account={accounts[0]} />} />
              <Route path='/admin_component' element={<AdminComponent contractInstance={contractInstance} account={accounts[0]} />}/>
              <Route path="/voting" element={<VoterComponent  contractInstance={contractInstance} account={accounts[0]} />} />

            </Routes>
          </BrowserRouter>
        </>}
      
    </div>
  );
}

export default App;

