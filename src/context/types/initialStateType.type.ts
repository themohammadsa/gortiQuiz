import { QuizType, QuizzesType } from "../../components/types/quiz.types"

export type savedOptionType = {
    questionNumber: number,
    id: number
}

export type statsPropType = {
    stats: statsType
}

export type statsType = {
    quizID: number,
    quizTopic: string,
    totalQuestions: number,
    attemptedQuestions: number,
    correctAnswer: number,
    wrongAnswer: number,
    score: number,
    totalScore: number,
    percentage: number
}

export type initialStateType = {
    quizzes: QuizzesType,
    currentQuiz: QuizType,
    savedOption: savedOptionType[],
    stats: statsType,
    questionNumber: number,
    result: ResultType
}

export type ResultType = statsType[]