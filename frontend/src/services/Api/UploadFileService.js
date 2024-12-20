import { api, handleError, handleResponse, ENDPOINTS } from "../../config/apiConfig";

const APIService_UploadFile = async (file, type) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await api.post(ENDPOINTS.UPLOAD.replace(":type", type), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return handleResponse(response);
    }
    catch (error) {
        handleError(error);
        }
}

export default APIService_UploadFile;