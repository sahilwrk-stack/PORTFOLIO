import { PropsWithChildren } from "react";

import "./styles/Landing.css";


const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro glass-card p-6" style={{ padding: "2rem", border: "1px solid rgba(57, 255, 20, 0.2)"}}>
            <h2>Hello! I'm</h2>
            <h1>
              SAHIL
              <br />
              <span>THAKUR</span>
            </h1>
            <p className="landing-subtitle" style={{marginTop:"15px", color:"#a0aec0", maxWidth:"350px"}}>
              Building intelligent AI systems, predictive models, and data-driven platforms.
            </p>
          </div>
          <div className="landing-info">
            <h3>Data Analysis &</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Data</div>
              <div className="landing-h2-2">Analyst</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Analyst</div>
              <div className="landing-h2-info-1">Data</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
