import { Box } from "@chakra-ui/react";
import { useQuizContext } from "../../context/QuizProvider"
import { ReviewOptions } from "../Review/ReviewOptions"
import { QuestionType } from "../types/quiz.types";

export const Review = () => {
    const { state: { currentQuiz } } = useQuizContext()
    const totalQuestions = () => currentQuiz.questions.length

    return (
        <>
            {currentQuiz.questions.map((mappedQuestion: QuestionType) => {
                return (
                    <>
                        <Box mt="12" mb="12" >
                            <Box mt="5" fontWeight="bold" fontSize="l" color="gray.500">
                                {mappedQuestion.id} / {totalQuestions()}
                            </Box>
                            <Box mb="7" m="2" fontWeight="bold" fontSize={["1.2rem", "xl"]}>
                                {mappedQuestion.question}
                            </Box>
                            <ReviewOptions
                                currentQuiz={currentQuiz}
                                questionNumber={mappedQuestion.id - 1}
                            />
                        </Box>
                    </>
                )
            })}


        </>
    )
}