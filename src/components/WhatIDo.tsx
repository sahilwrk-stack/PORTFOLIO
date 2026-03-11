import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    containerRef.current.forEach((container) => {
      if (container) {
        container.classList.remove("what-noTouch");
        container.addEventListener("click", () => handleClick(container));
      }
    });
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DATA ANALYSIS</h3>
              <div className="what-details">
                <div className="what-details-inner">
                  <h4>Data-Driven Insights</h4>
                  <p>
                    Analyzing complex datasets to uncover patterns, trends, and actionable insights. Using Python, Pandas, NumPy, and visualization tools to transform raw data into meaningful analytics for smarter decision making.
                  </p>
                  <h5>Skillset & tools</h5>
                  <div className="what-content-flex">
                    <div className="what-tags">Python</div>
                    <div className="what-tags">Pandas</div>
                    <div className="what-tags">NumPy</div>
                    <div className="what-tags">Seaborn</div>
                    <div className="what-tags">Matplotlib</div>
                    <div className="what-tags">SQL</div>
                  </div>
                </div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>MACHINE LEARNING</h3>
              <div className="what-details">
                <div className="what-details-inner">
                  <h4>Predictive Modeling</h4>
                  <p>
                    Building machine learning models to predict outcomes and optimize real-world systems. Experienced with Scikit-learn, feature engineering, and predictive analytics for agriculture and business datasets.
                  </p>
                  <h5>Skillset & tools</h5>
                  <div className="what-content-flex">
                    <div className="what-tags">Scikit-learn</div>
                    <div className="what-tags">Linear Regression</div>
                    <div className="what-tags">Feature Eng</div>
                    <div className="what-tags">Predictive Models</div>
                    <div className="what-tags">Jupyter</div>
                  </div>
                </div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>AI DATA PLATFORMS</h3>
              <div className="what-details">
                <div className="what-details-inner">
                  <h4>Intelligent Systems</h4>
                  <p>
                    Developing AI-powered platforms that combine data analysis, machine learning, and visualization dashboards. Projects include crop yield prediction systems, agricultural analytics platforms, and data-driven decision tools.
                  </p>
                  <h5>Skillset & tools</h5>
                  <div className="what-content-flex">
                    <div className="what-tags">Django</div>
                    <div className="what-tags">Dashboards</div>
                    <div className="what-tags">Python</div>
                    <div className="what-tags">HTML / CSS</div>
                    <div className="what-tags">JavaScript</div>
                    <div className="what-tags">Bootstrap</div>
                  </div>
                </div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  const isOpening = !container.classList.contains("what-content-active");
  
  if (container.parentElement) {
    const allCards = Array.from(container.parentElement.children);
    allCards.forEach((card) => {
      card.classList.remove("what-content-active", "what-sibling");
    });
    
    if (isOpening) {
      container.classList.add("what-content-active");
      allCards.forEach((card) => {
        if (card !== container) {
          card.classList.add("what-sibling");
        }
      });
    }
  }
}
