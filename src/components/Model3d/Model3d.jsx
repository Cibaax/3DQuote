import { useRef } from "react";
import STLLoader from "../STLLoader/STLLoader";

const Model3D = ({ model_path, name, price, time, weight, supports, position, mirrored, scale, setSelectedModel, selectedModel }) => {
    const geometry = STLLoader(model_path);
    const meshRef = useRef();
    const isSelected = selectedModel?.name === name;

    if (!geometry) return null;

    // Recalcular normales para mejorar iluminación
    geometry.computeVertexNormals(); 

    const computedScale = mirrored ? [-scale[0], scale[1], scale[2]] : scale;

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                geometry={geometry}
                scale={computedScale}
                rotation={[Math.PI / -2, 0, 0]}
                onClick={() => setSelectedModel({ name, price, time, weight, supports })}
            >
                <meshStandardMaterial color={"#CCDDF3"} flatShading />
            </mesh>

            {isSelected && (
                <mesh
                    geometry={geometry}
                    scale={computedScale}
                    rotation={[Math.PI / -2, 0, 0]}
                >
                    <meshStandardMaterial color={"#30b8fb"} wireframe />
                </mesh>
            )}
        </group>
    );
};

export default Model3D;
