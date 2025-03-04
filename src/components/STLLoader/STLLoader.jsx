import { useEffect, useState } from "react";
import { STLLoader as ThreeSTLLoader } from "three/examples/jsm/loaders/STLLoader";
import LZString from "lz-string";

const STLLoader = (model_path) => {
    const [geometry, setGeometry] = useState(null);

    useEffect(() => {
        if (!model_path) return;

        const decompressedString = LZString.decompressFromBase64(model_path);
        if (!decompressedString) return;

        const bytes = new Uint8Array(decompressedString.length);
        for (let i = 0; i < decompressedString.length; i++) {
            bytes[i] = decompressedString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: "model/stl" });
        const url = URL.createObjectURL(blob);

        const loader = new ThreeSTLLoader();
        loader.load(url, setGeometry);

        return () => URL.revokeObjectURL(url);
    }, [model_path]);

    return geometry;
};

export default STLLoader;
