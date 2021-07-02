import { Box, Button } from "@chakra-ui/react";
import { questionCardType } from "../types/questionCardType";
import { optionsCardType } from "../types/optionsCardType.type";
import { useState } from "react"
import { useQuizContext } from "../../context/QuizProvider";
import { useEffect } from "react";

export const ReviewOptions = ({ currentQuiz, questionNumber }: questionCardType) => {
    const [selectedOption, setSelectedOption] = useState(0)
    const { state } = useQuizContext()

    const checkAnswer = (id: number) => {
        if (selectedOption === id) return "solid"
        else return "outline"
    }

    const colorOption = (id: number) => {
        if (currentQuiz.questions[questionNumber].rightAnswer === id) return "green"
    }

    const fontOption = (id: number) => {
        if (currentQuiz.questions[questionNumber].rightAnswer === id) return "bold"
    }

    useEffect(() => {
        const updatedOption = state.savedOption.find((option) => option.questionNumber === questionNumber)
        if (updatedOption) {
            setSelectedOption(updatedOption.id)
        } else {
            setSelectedOption(0)
        }
    }, [questionNumber, state.savedOption])

    return (
        <>
            <Box key={questionNumber}>
                {currentQuiz.questions[questionNumber].options.map((option: optionsCardType) => {
                    const { id, text } = option
                    return (
                        <>
                            <Box key={id}>
                                <Button m="2.5" width={["250px", "300px"]} fontWeight={fontOption(id)} fontSize={["l", "xl"]}
                                    colorScheme={colorOption(id)} variant={checkAnswer(id)} cursor="text">
                                    {text}
                                </Button>
                            </Box>
                        </>
                    )
                })}
            </Box>
        </>
    )
}

