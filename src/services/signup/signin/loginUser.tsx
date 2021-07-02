import axios from "axios";
import { errorHandler } from "../../errorHandler";
import { AuthResponseType } from "../../../context/types/auth.type"

const API_URL = "https://gortiQuiz.themohammadsa.repl.co/user";

export type loginUserType = {
    email: string,
    password: string
}

async function loginUser({ email, password }: loginUserType): Promise<AuthResponseType> {
    try {
        const response = await axios.post<AuthResponseType>(
            `${API_URL}/login`,
            {
                email,
                password,
            }
        );
        return response.data;
    } catch (error) {
        return errorHandler(error);
    }
}

export { loginUser }