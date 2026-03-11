import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const categories = [
  {
    name: "Programming Languages",
    color: "#39ff14", // Neon Green
    skills: ["Python", "C++", "SQL"],
  },
  {
    name: "Data Analysis",
    color: "#22d3ee", // Cyan
    skills: ["Pandas", "NumPy", "Seaborn", "Matplotlib"],
  },
  {
    name: "Machine Learning",
    color: "#a855f7", // Purple
    skills: ["Scikit-learn", "Linear Regression", "Feature Engineering", "Model Evaluation", "Predictive Modeling"],
  },
  {
    name: "Web Development",
    color: "#f59e0b", // Orange
    skills: ["Django", "HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    name: "Data Visualization",
    color: "#ec4899", // Pink
    skills: ["Matplotlib", "Seaborn", "Chart.js"],
  },
  {
    name: "Tools & Platforms",
    color: "#3b82f6", // Blue
    skills: ["Jupyter Notebook", "VS Code", "PyCharm", "Git", "GitHub"],
  },
];
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [1.2, 1.5, 1.3, 1.5, 1.5][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    const allSkills: {text: string, color: string}[] = [];
    categories.forEach(cat => {
      cat.skills.forEach(skill => {
        allSkills.push({ text: skill, color: cat.color });
      });
    });

    return allSkills.map((skill) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#0f002c"; // matches dark theme background
        ctx.fillRect(0, 0, 512, 512);

        // Circular border in category color
        ctx.strokeStyle = skill.color;
        ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.arc(256, 256, 240, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = skill.color;
        ctx.font = "bold 80px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const words = skill.text.split(" ");
        if (words.length > 1 && skill.text.length > 8) {
          ctx.fillText(words[0], 256, 256 - 45);
          ctx.fillText(words.slice(1).join(" "), 256, 256 + 45);
        } else {
          ctx.fillText(skill.text, 256, 256);
        }
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: skill.color,
        emissiveMap: texture,
        emissiveIntensity: 0.1,
        metalness: 0.7,
        roughness: 0.8,
        clearcoat: 0.2,
      });
    });
  }, []);

  return (
    <div className="techstack">
      <h2> My Skills</h2>

      <div className="skills-overlay">
        {categories.map((cat, i) => (
          <div key={i} className="skill-cat-card glass-card">
            <h4 style={{ color: cat.color, margin: "0 0 15px 0", fontSize: "18px", fontWeight: 500 }}>
              {cat.name}
            </h4>
            <div className="skill-cat-tags" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {cat.skills.map((skill, j) => (
                <span 
                  key={j} 
                  className="what-tags" 
                  style={{ 
                    borderColor: `${cat.color}50`, 
                    color: "#fff",
                    background: `${cat.color}15`,
                    fontSize: "15px",
                    padding: "6px 14px"
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
