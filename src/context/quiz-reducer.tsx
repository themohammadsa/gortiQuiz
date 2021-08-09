import { initialStateType, statsType } from "./types/initialStateType.type";
import { actionType } from "./types/actionType.type";
import { QuestionType, QuizType } from "../components/types/quiz.types";
import { postResult } from "../services/quizResult";
import { ResultType } from "./types/initialStateType.type";

export const initialState: initialStateType = {
    quizzes: [],
    currentQuiz: {} as QuizType,
    savedOption: [],
    stats: {} as statsType,
    questionNumber: 0,
    result: [] as ResultType
}

export const reducerFn = (state: initialStateType, action: actionType): initialStateType => {
    switch (action.type) {
        case "NEXT_QUESTION":
            return {
                ...state,
                questionNumber: state.questionNumber + 1
            };

        case "PREVIOUS_QUESTION":
            return {
                ...state,
                questionNumber: state.questionNumber - 1
            }

        case "SET_QUIZ":
            return {
                ...state,
                currentQuiz: action.payload,
                savedOption: [{ questionNumber: 0, id: 0 }]
            }
        case "SET_RESULT":
            return {
                ...state,
                result: action.payload
            }
        case "SAVE_ANSWER":
            const { questionNumber, id } = action.payload
            const updatedOptionIndex = state.savedOption.findIndex((option) => option.questionNumber === questionNumber)

            if (updatedOptionIndex !== -1) {
                state.savedOption[updatedOptionIndex] = { questionNumber, id }
                return {
                    ...state,
                    savedOption: [...state.savedOption]
                }
            } else {
                return {
                    ...state,
                    savedOption: [...state.savedOption, action.payload]
                }
            }

        case "CHECK_RESULT":
            let totalQuestions = state.currentQuiz.questions.length
            let attemptedQuestions = state.savedOption.length
            let totalScore = 2 * totalQuestions

            let correctAnswer = 0
            let wrongAnswer = 0
            let newScore = 0

            state.currentQuiz.questions.map((question: QuestionType) => {
                return state.savedOption.map((option) => {
                    if (question.id === option.questionNumber + 1) {
                        if (question.rightAnswer === option.id) {
                            newScore += 2
                            correctAnswer++
                        }
                        else wrongAnswer++

                    }
                    return option
                })
            });

            const result: statsType = {
                quizID: state.currentQuiz.id,
                quizTopic: state.currentQuiz.topic,
                totalQuestions: totalQuestions,
                attemptedQuestions: attemptedQuestions,
                correctAnswer: correctAnswer,
                wrongAnswer: wrongAnswer,
                score: newScore,
                totalScore: totalScore,
                percentage: (newScore / totalScore) * 100
            }

            postResult(result)

            return {
                ...state,
                questionNumber: 0,
                stats: { ...result }
            }

        default:
            return state
    }
}