import { 
    NEXT_QUESTION, 
    PREVIOUS_QUESTION,
    SET_QUIZ,
    SAVE_ANSWER,
    CHECK_RESULT,
    SET_RESULT
} from "../constants/actionTypeConstant"
import { QuizType } from "../../components/types/quiz.types"
import { ResultType, savedOptionType } from "./initialStateType.type"

export type actionType = 
| { type: typeof NEXT_QUESTION }
| { type: typeof PREVIOUS_QUESTION }
| { type: typeof SET_QUIZ, payload: QuizType }
| { type: typeof SET_RESULT, payload: ResultType }
| { type: typeof SAVE_ANSWER, payload: savedOptionType }
| { type: typeof CHECK_RESULT }