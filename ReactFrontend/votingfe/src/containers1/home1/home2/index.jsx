import { useEffect, useMemo, useState } from "react";
import { Particles ,initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 
import './styles.scss'
import { Button } from "antd";
import {Link} from 'react-router-dom';

const Home = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value:"036c5f",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
        <><Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      
      <div className="intro">
        <h1>
            Voting Dapp
        </h1>
        <br></br>
        <h3>
            Change is in your hand!!
        </h3>
        <br></br><br></br><br></br><br></br><br></br>
        </div>
        <Link to="/Option"> <Button className="button" type="primary" shape="round" >Get Started</Button></Link>
             
      </>
    );
  }

  return(
    <div>
        Home Page
    </div>
);
};
export default Home;