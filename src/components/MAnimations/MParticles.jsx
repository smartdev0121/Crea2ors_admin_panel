import ReactParticles from "react-particles-js";
import Simple from "./ParticleConfig";
const MParticles = ({ children }) => {
  return (
    <div style={{ position: "relative" }}>
      {/* <ReactParticles
        params={Simple}
        style={{
          position: "absolute",
          zIndex: 1,
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
      />
      {children && <div style={{ position: "relative" }}>{children}</div>} */}
    </div>
  );
};

export default MParticles;
