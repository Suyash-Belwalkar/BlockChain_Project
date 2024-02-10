import React from "react";
import { Button } from "antd";
import {Link} from 'react-router-dom';
import './styles.scss'
import v from './voter.jpeg'
import o from './owner5.jpeg'
import GoogleFontLoader from "react-google-font-loader";
import "@fontsource/bungee-shade"

const Option=()=>{
    return(
        
            <div className="select" style={{backgroundColor:"black",overflow:'hidden'}}>
        <GoogleFontLoader fonts={[{font:'Candal',weights:[400]}]}/>
        <h1>
            Voting Dapp
        </h1>
        <div style={{backgroundColor:'teal'}}>

        <div className="imgowner" style={{backgroundImage:`url(${o})`}}>
      <br></br>
      <GoogleFontLoader fonts={[{font:'Bungee',weights:[400]}]}/>
      <h1 className="otext">
        OWNER
        </h1>        
      </div></div>
      <Button className="pos" type="primary" shape="round"><Link to="/admin_component">     Owner     </Link></Button>
    
      <div className="imgvote" style={{backgroundImage:`url(${v})`}}>
      <br></br><br></br>
      <GoogleFontLoader fonts={[{font:'Bungee',weights:[400]}]}/>
      <h1 className="vtext">
        VOTER
        </h1>
      </div>
      <Button className="pos1" type="primary" shape="round"><Link to="/voting">Voting</Link></Button>

      <br></br><br></br><br></br><br></br><br></br><br></br>
      <br></br>      
      </div>
        
    )
}
export default Option;