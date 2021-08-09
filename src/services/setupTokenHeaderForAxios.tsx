import axios from "axios";

export const setupTokenHeaderForAxios = (token: string | null | undefined) => {
    if (token) {
        return (axios.defaults.headers.common["authorization"] = token);
    }
    delete axios.defaults.headers.common["authorization"];
}
