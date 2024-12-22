import { api, handleError, handleResponse, ENDPOINTS } from "../../config/apiConfig";

export default class APIService_Payment {
    static async makePayment(paymentData) {
        try {
        const response = await api.post(ENDPOINTS.PAYMENT, paymentData);
        return handleResponse(response);
        } catch (error) {
        handleError(error);
        }
    }
}