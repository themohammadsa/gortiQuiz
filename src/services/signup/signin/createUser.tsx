import axios from "axios";
import { errorHandler } from "../../errorHandler";
import { AuthResponseType } from "../../../context/types/auth.type";

const API_URL = "https://gortiQuiz.themohammadsa.repl.co/user";

export type createUserType = {
    name: string,
    email: string,
    password: string
}

async function createUser({ name, email, password }: createUserType): Promise<AuthResponseType> {
    try {
        const response = await axios.post<AuthResponseType>(
            `${API_URL}/signup`,
            {
                name,
                email,
                password,
            }
        );
        return response.data;
    } catch (error) {
        return errorHandler(error);
    }
}

export { createUser }