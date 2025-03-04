import { useState } from "react";
import LZString from "lz-string";

const STLUploader = () => {
  const [compressedData, setCompressedData] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copiar");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    supports: false,
    project_id: "",
    time: "",
    weight: ""
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      const compressed = LZString.compressToBase64(reader.result);
      setCompressedData(compressed);
    };
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!compressedData) return alert("Primero sube un archivo STL.");

    const modelData = {
      ...formData,
      price: parseInt(formData.price, 10),
      time: formData.time ? parseInt(formData.time, 10) : null,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      model_path: compressedData,
      position: [0, 0, 0]
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/models`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(modelData)
      });
      if (response.ok) {
        alert("Modelo guardado correctamente!");
      } else {
        alert("Error al guardar el modelo.");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-2">Subir archivo STL</h2>
      <input
        type="file"
        accept=".stl"
        onChange={handleFileUpload}
        className="mb-3 w-full border rounded p-2"
      />
      {compressedData && (
        <>
          <textarea
            className="w-full h-40 border rounded p-2 text-sm"
            value={compressedData}
            readOnly
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(compressedData);
              setCopyStatus("Copiado!");
              setTimeout(() => setCopyStatus("Copiar"), 2000);
            }}
            className="mt-2 p-2 bg-blue-500 text-white rounded w-full"
          >
            {copyStatus}
          </button>
        </>
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border rounded p-2 mb-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full border rounded p-2 mb-2"
          required
        />
        <input
          type="number"
          name="project_id"
          placeholder="ID del proyecto"
          value={formData.project_id}
          onChange={handleInputChange}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="number"
          name="time"
          placeholder="Tiempo (minutos)"
          value={formData.time}
          onChange={handleInputChange}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="number"
          name="weight"
          placeholder="Peso (gramos)"
          value={formData.weight}
          onChange={handleInputChange}
          className="w-full border rounded p-2 mb-2"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="supports"
            checked={formData.supports}
            onChange={handleInputChange}
          />
          <span>Soportes</span>
        </label>
        <button
          type="submit"
          className="mt-3 p-2 bg-green-500 text-white rounded w-full"
        >
          Guardar modelo
        </button>
      </form>
    </div>
  );
};

export default STLUploader;
