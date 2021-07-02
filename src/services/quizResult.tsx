import { statsType } from "../context/types/initialStateType.type"
import axios from "axios";
import { errorHandler } from "./errorHandler";
import { ResultType } from "../context/types/auth.type";

const API_URL = "https://gortiQuiz.themohammadsa.repl.co/user";

async function postResult(stats: statsType): Promise<ResultType> {
    try {
        const response = await axios.post<ResultType>(
            `${API_URL}/result`,
            { ...stats }
        );
        return response.data
    } catch (error) {
        return errorHandler(error);
    }
}

async function getResult(): Promise<ResultType> {
    try {
        const response = await axios.get<ResultType>(
            `${API_URL}/result`
        );
        console.log("response data", response.data);
        return response.data
    } catch (error) {
        return errorHandler(error);
    }
}

export { postResult, getResult };