import axios from "axios";
import { errorHandler } from "./errorHandler";
import { ServerResponseType } from "../components/types/quiz.types";

const API_URL = "https://gortiQuiz.themohammadsa.repl.co";

async function getRequest(url: string): Promise<ServerResponseType> {
    try {
        const response = await axios.get(`${API_URL}${url}`);
        return response.data;
    }
    catch (error) {
        return errorHandler(error)
    }
};

export { getRequest }