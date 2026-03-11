import { useRef, useEffect } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in and slide up for the main contact card
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered animation for social icons
      gsap.fromTo(
        iconsRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const setIconRef = (el: HTMLAnchorElement | null, index: number) => {
    if (el) iconsRef.current[index] = el;
  };

  return (
    <div className="contact-section section-container" id="contact" ref={containerRef}>
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-card glass-card" ref={cardRef}>
          <div className="contact-flex">
            <div className="contact-box">
              <h4>Profile</h4>
              <p className="contact-name">Sahil Thakur</p>
              <p className="contact-role">Data Analysis | Data Analyst</p>
              
              <h4 style={{marginTop: "20px"}}>Email</h4>
              <p>
                <a href="mailto:Sahilwrk18101@gmail.com" data-cursor="disable" className="contact-email">
                  Sahilwrk18101@gmail.com
                </a>
              </p>
            </div>
            <div className="contact-box">
              <h4>Social</h4>
              <a
                href="https://www.linkedin.com/in/sahil-thakur-463111369"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
                ref={(el) => setIconRef(el, 0)}
              >
                LinkedIn <MdArrowOutward />
              </a>
              <a
                href="https://github.com/sahilwrk-stack"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
                ref={(el) => setIconRef(el, 1)}
              >
                GitHub <MdArrowOutward />
              </a>
              <a
                href="https://medium.com/@sahilwrk18101"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social"
                ref={(el) => setIconRef(el, 2)}
              >
                Medium <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>
        <div className="contact-footer">
          <h2>
            Designed and Developed <br /> by <span>Sahil Thakur</span>
          </h2>
          <h5>
            <MdCopyright /> 2025
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;
