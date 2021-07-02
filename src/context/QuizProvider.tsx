import { useContext, createContext, useReducer } from "react"
import { reducerFn, initialState } from "./quiz-reducer"
import { contextType } from "./types/contextType.type"

const QuizContext = createContext<contextType>({} as contextType)

export const QuizProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(reducerFn, initialState)

    return (
        <>
            <QuizContext.Provider value={{ state, dispatch }}>
                {children}
            </QuizContext.Provider>
        </>
    )
}

export const useQuizContext = () => {
    return useContext(QuizContext)
}