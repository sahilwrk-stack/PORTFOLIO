import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathon Winner</h4>
                <h5>Achievements</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Winner – India Hackathon (Twice), awarded by Arun Dhumal (Chairman IPL). 2nd Place – University Hackathon as Team Leader. Anchored multiple college tech events.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Leadership &amp; Volunteering</h4>
                <h5>NCC, NSS</h5>
              </div>
              <h3>Past</h3>
            </div>
            <p>
              Event Coordinator, Class Representative &amp; School House Captain. Volunteer in NCC and NSS.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Computer Applications</h4>
                <h5>Education</h5>
              </div>
              <h3>Past</h3>
            </div>
            <p>
              Built a strong foundation in programming, databases, and software development. Developed interest in data analytics, AI, and real-world problem solving through tech.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science &amp; Data Analytics Training</h4>
                <h5>Imarticus Learning</h5>
              </div>
              <h3>Now</h3>
            </div>
            <p>
              Hands-on training at Imarticus Learning in Data Science &amp; Analytics. Working with Python, SQL, Pandas, NumPy, Matplotlib, Seaborn, Power BI, and Tableau. Focused on Data Cleaning, EDA, Visualization, and Machine Learning Fundamentals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
