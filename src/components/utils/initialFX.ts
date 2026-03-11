import SplitType from "split-type";
import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitType(
    ".landing-info h3, .landing-intro h2, .landing-intro h1",
    {
      types: "chars,lines",
      lineClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 0.8,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.015,
      delay: 0.2,
    }
  );

  let TextProps: any = { types: "chars,lines", lineClass: "split-h2" };

  var landingText2 = new SplitType(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 0.8,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.015,
      delay: 0.2,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 0.8,
      ease: "power1.inOut",
      y: 0,
      delay: 0.5,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  var landingText3 = new SplitType(".landing-h2-info-1", TextProps);
  var landingText4 = new SplitType(".landing-h2-1", TextProps);
  var landingText5 = new SplitType(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: SplitType, Text2: SplitType) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
  const delay = 3;
  const delay2 = delay * 2 + 0.8;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 0.8,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.05,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 0.8,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.05,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.05,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.05,
        delay: delay2,
      },
      1
    );
}
