import React, { useState } from "react";
import { Input,  Button, Typography } from "antd";
import { Card} from "antd";
import {registerCandidates, whiteListAddress, getWinner, startVoting, stopVoting} from '../web3_functions'
import './admin.css'
import GoogleFontLoader from "react-google-font-loader";

// const errorMsg = (
//   <Alert message="Error! Check it out!" type="error" />
// );

function AdminComponent({ account, contractInstance }) {
  const [candidateName, setCandidateName] = useState("");
  const [candidateAge, setCandidateAge] = useState("");
  const [candidateAddress, setCandidateAddress] = useState("");
  const [voterAddress, setVoterAddress] = useState("");
  const [winnerAddress, setWinnerAddress] = useState("");

  async function register_candidate() {
    console.log("name:", candidateName);
    const result = await registerCandidates(
      contractInstance,
      account,
      candidateName,
      candidateAge,
      candidateAddress
    );
    console.log("result:", result);
    window.alert("Result: Candidate Register Successfully",result)
    };
  

  async function register_voter() {
    console.log("name:", candidateName);
    let result = await whiteListAddress(contractInstance, account, voterAddress);
    console.log("result:", result);
    window.alert("Result: Voter Register Successfully",result)
  }

  async function start_voting() {
    console.log("name:", candidateName);
    let result = await startVoting(contractInstance, account);
    
    window.alert("Result : Voting has started", result);
    console.log("result:", result);
  }

  async function stop_voting() {
    console.log("name:", candidateName);
    let result = await stopVoting(contractInstance, account);
    console.log("result:", result);
    window.alert("Result: Voting stoped",result)
  }

  async function get_Winner() {
    console.log("name:", candidateName);
    let { message } = await getWinner(contractInstance, account);
    console.log("result:", message);
    setWinnerAddress(message.name);
    window.alert(message.name);
  }
  const {Title}=Typography;
  return (
    
    <div style={{ padding: "18px 5%" ,backgroundColor:'#0c1a1a'}}>
            <GoogleFontLoader fonts={[{font:'Candal',weights:[400]}]}/>

      <div className="banner-area" style={{ marginBottom: 20, marginTop:10 }}>
        <h1>WELCOME TO ELECTION</h1>
      </div>
      <div>
          <Card className="uo" title={<Title lavel={1} ><u>Register Candidate</u></Title>} style={{marginLeft:30,height:500, width: 400, backgroundColor:"teal" }} > 
            <div>
              <Input
                placeholder="Candidate name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
              <br></br><br></br><br></br>
              <Input
                placeholder="Candidate Age"
                value={candidateAge}
                onChange={(e) => setCandidateAge(e.target.value)}
              />
              <br></br><br></br><br></br>

              <Input
                placeholder="Candidate Address"
                value={candidateAddress}
                onChange={(e) => setCandidateAddress(e.target.value)}
              />
            </div><br></br><br></br>
            <Button className="button2" style={{background:'black'}} type="primary" shape="round" onClick={register_candidate}>Register Candidate</Button>
          </Card>

          <Card title={<Title lavel={1}><u>Register Voter</u></Title>} style={{ marginTop: -500, marginBottom: 5,marginLeft: 600, height:500, width: 400,backgroundColor:"teal" }}>
            <Input
              placeholder="Register Voter"
              value={voterAddress}
              onChange={(e) => setVoterAddress(e.target.value)}
            /><br></br><br></br>
            <Button className="button2" style={{background:'black'}} type="primary" shape="round" onClick={register_voter}>Register Voter</Button>
          </Card>
        
          <Card title={<Title lavel={1}><u>Start Voting</u></Title>} style={{marginTop: -500, marginBottom: 5, marginLeft:1155, height:245, width: 400,backgroundColor:"teal" }}>
          <br></br><br></br>
           <Button className="button2" style={{background:'black'}} type="primary" shape="round" onClick={start_voting}>Start Voting</Button>
          </Card>

          <Card title={<Title lavel={1}><u>Stop Voting</u></Title>} style={{ marginTop: 5,marginBottom: 5,marginLeft:1155, height:245, width: 400,backgroundColor:"teal" }}>
          <br></br><br></br>
           <Button className="button2" style={{background:'black'}} type="primary" shape="round" onClick={stop_voting}>Stop Voting</Button>
          </Card>

          <Card title={<Title lavel={1}><u>Winner</u></Title>} style={{height:200, width: 800, marginLeft:390,marginTop:5,backgroundColor:"teal" }}>
            <Input disabled value={winnerAddress} />
            <br></br><br></br>
             <Button className="button1" style={{background:'black'}} type="primary" shape="round" onClick={get_Winner}>Get Winner</Button>
          </Card>
      </div>
    </div>
  );
}

export default AdminComponent;