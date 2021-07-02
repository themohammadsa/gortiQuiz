
export type OptionType = {
    id: number,
    text: string
}

export type QuestionType = {
    id: number,
    question: string,
    points: number,
    rightAnswer: number,
    options: OptionType[]
}

export type QuizType = {
    id: number,
    topic: string,
    image: string,
    questions: QuestionType[],
}

export type QuizzesType = QuizType[]

export type ServerResponseType = {
    success: boolean,
    message?: string,
    quizzes?: QuizzesType,
    quiz?: QuizType
}
