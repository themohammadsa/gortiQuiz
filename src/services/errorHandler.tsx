import axios, { AxiosError } from "axios";
import { ServerResponseType } from "../components/types/quiz.types";

function errorHandler(error: any) {
    if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerResponseType>;
        if (serverError && serverError.response) {
            return serverError.response.data;
        }
    }
    return {
        success: false,
        message: "There is something wrong with the server.."
    };
}
export { errorHandler };