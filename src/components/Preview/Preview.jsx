import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import LZString from "lz-string";
import { fetchModelsPreview } from "../../services/projectService";

const Preview = () => {
  const [models, setModels] = useState([]);
  const [geometry, setGeometry] = useState(null);
  const meshRef = useRef();

  useEffect(() => {
    const getModels = async () => {
      const data = await fetchModelsPreview();
      if (data.length > 0) {
        loadModel(data[0].model_path);
      }
    };
    getModels();
  }, []);

  const loadModel = (model_path) => {
    if (!model_path) return;

    const decompressedString = LZString.decompressFromBase64(model_path);
    if (!decompressedString) return;

    const bytes = new Uint8Array(decompressedString.length);
    for (let i = 0; i < decompressedString.length; i++) {
      bytes[i] = decompressedString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "model/stl" });
    const url = URL.createObjectURL(blob);

    const loader = new STLLoader();
    loader.load(url, (loadedGeometry) => {
      setGeometry(loadedGeometry);
    });

    return () => URL.revokeObjectURL(url);
  };

  if (!geometry) return null;

  return (
    <Canvas camera={{ position: [-5, 7, 5], fov: 70 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh ref={meshRef} geometry={geometry} scale={[0.5, 0.5, 0.5]} rotation={[Math.PI / -2, 0, 0]}>
        <meshStandardMaterial color="#CCDDF3" />
      </mesh>
    </Canvas>
  );
};

export default Preview;
