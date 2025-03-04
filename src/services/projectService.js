const apiUrl = import.meta.env.VITE_API_URL;

// Obtener todos los proyectos
export const fetchProjects = async () => {
  try {
    const response = await fetch(`${apiUrl}/projects`);
    if (!response.ok) throw new Error("Error al obtener proyectos");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

//obtener preview del modelo 
export const fetchAllModelsPreview = async () => {
  try {
    const response = await fetch(`${apiUrl}/models-preview`);
    if (!response.ok) throw new Error("Error al obtener las previews de los modelos");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Obtener el resumen de un proyecto específico
export const fetchProjectSummary = async (projectId) => {
  try {
    const response = await fetch(`${apiUrl}/project-summary/${projectId}`);
    if (!response.ok) throw new Error("Error al obtener resumen del proyecto");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Obtener los modelos de un proyecto específico
export const fetchModelsByProject = async (projectId) => {
  try {
    const response = await fetch(`${apiUrl}/models/project/${projectId}`);
    if (!response.ok) throw new Error("Error al obtener modelos");
    return await response.json();
  } catch (error) {
    console.error("Error en fetchModelsByProject:", error);
    return [];
  }
};

export const fetchModelsPreview = async () => {
  try {
    const response = await fetch(`${apiUrl}/models-preview`);
    if (!response.ok) throw new Error("Error al obtener modelos");
    return await response.json();
  } catch (error) {
    console.error("Error en fetchModelsByProject:", error);
    return [];
  }
};

