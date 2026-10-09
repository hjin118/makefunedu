import ClassifySim from "./sims/ClassifySim";
import TokenizerSim from "./sims/TokenizerSim";
import ImageBrightnessSim from "./sims/ImageBrightnessSim";
import LineFitSim from "./sims/LineFitSim";
import HypothesisSim from "./sims/HypothesisSim";

type UnitSimulationProps = {
  unitId: string;
};

export default function UnitSimulation({ unitId }: UnitSimulationProps) {
  switch (unitId) {
    case "u1":
      return <ClassifySim />;
    case "u2":
      return <TokenizerSim />;
    case "u3":
      return <ImageBrightnessSim />;
    case "u4":
      return <LineFitSim />;
    case "u5":
      return <HypothesisSim />;
    default:
      return null;
  }
}
