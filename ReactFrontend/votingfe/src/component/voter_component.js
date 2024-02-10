import React, { useState, useEffect } from 'react';
import personImage from '../person.png';
import { Card, Button } from 'antd';
import { getAllCandidate, putVote, votingStarted } from '../web3_functions';
import '../App.css'

const { Meta } = Card;

function VoterComponent({ account, contractInstance }) {
  const [totalCandidate, setTotalCandidate] = useState([]);
  const [votingStatus, setVotingStatus] = useState(false);

  useEffect(() => {
    async function connect() {
      const status = await votingStarted(contractInstance, account);
      if (status.message) {
        const arr = await getAllCandidate(contractInstance, account);
        setTotalCandidate(arr.message);
        setVotingStatus(true);
      }
    }
    setTimeout(connect, 1500);
  }, [account, contractInstance]);

  async function vote(candidate) {
    let result = await putVote(contractInstance, account, candidate.candidateAddress);
    console.log("result:", result);
  }

  return (
    <div style={{backgroundColor:'#0c1a1a'}}>
    <div style={{ padding: "18px 5%" }}>
    <div className="banner-area" style={{ marginBottom: 20, marginTop:10, }}>
      <h1>WELCOME TO ELECTION</h1>
    </div>
      <div className='textc'> 
        {votingStatus === false ? (
          <>
            <h2>Voting not started yet !!</h2>
          </>
        ) : (
          // Array.isArray(totalCandidate) ? (
          totalCandidate.map((candidate) => (
            <Card 
              key={candidate.candidateAddress}  // Added a key for each Card
              style={{ maxWidth: 380, float: "left", marginLeft: 8, marginBottom: 8, backgroundColor:'teal' }}
              cover={<img alt="person" src={personImage} style={{ paddingTop: 20 }} />}
              actions={[                
              <Button className="button3" style={{background:'black'}} type="primary" onClick={(e) => vote(candidate)}>Vote</Button>                 
              ]}
            >
              <Meta
                title={candidate.name}
                description={`${candidate.age}\n${candidate.address}`}
              />
            </Card>
          ))
        )}
      </div>
    </div></div>
  );
}

export default VoterComponent;