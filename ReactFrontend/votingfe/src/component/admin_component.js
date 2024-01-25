import React, { useState } from "react";
import { Input,  Button } from "antd";
import { Card } from "antd";
import {registerCandidates, whiteListAddress, getWinner, startVoting, stopVoting} from '../web3_functions'


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
  }

  async function register_voter() {
    console.log("name:", candidateName);
    let result = await whiteListAddress(contractInstance, account, voterAddress);
    console.log("result:", result);
  }

  async function start_voting() {
    console.log("name:", candidateName);
    let result = await startVoting(contractInstance, account);
    console.log("result:", result);
  }

  async function stop_voting() {
    console.log("name:", candidateName);
    let result = await stopVoting(contractInstance, account);
    console.log("result:", result);
  }

  async function get_Winner() {
    console.log("name:", candidateName);
    let { message } = await getWinner(contractInstance, account);
    console.log("result:", message);
    setWinnerAddress(message.name);
  }

  return (
    <div style={{ padding: "18px 5%" }}>
      <div className="banner-area" style={{ marginBottom: 20 }}>
        <h1>WELCOME TO ELECTION</h1>
      </div>
      <div>
        {/* <div style={{ float: "left", marginRight: 100 }}> */}
          <Card title="Register Candidate">
            <div>
              <Input
                placeholder="Candidate name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
              <Input
                placeholder="Candidate Age"
                value={candidateAge}
                onChange={(e) => setCandidateAge(e.target.value)}
              />
              <Input
                placeholder="Candidate Address"
                value={candidateAddress}
                onChange={(e) => setCandidateAddress(e.target.value)}
              />
            </div>
            <Button onClick={register_candidate}>Register Candidate</Button>
          </Card>

          <Card title="Register Voter" style={{ marginTop: 5, marginBottom: 5 }}>
            <Input
              placeholder="Register Voter"
              value={voterAddress}
              onChange={(e) => setVoterAddress(e.target.value)}
            />
            <Button onClick={register_voter}>Register Voter</Button>
          </Card>
        {/* </div> */}
        <div>
          <Card title="Start Voting">
            <Button onClick={start_voting}>Start Voting</Button>
          </Card>

          <Card title="Stop Voting" style={{ marginTop: 5 }}>
            <Button onClick={stop_voting}>Stop Voting</Button>
          </Card>

          <Card title="Winner">
            <Input disabled value={winnerAddress} />
            <Button onClick={get_Winner}>Get Winner</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminComponent;
