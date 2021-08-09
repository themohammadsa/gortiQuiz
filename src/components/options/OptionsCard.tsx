import { Box, Button } from "@chakra-ui/react";
import { questionCardType } from "../types/questionCardType";
import { optionsCardType } from "../types/optionsCardType.type";
import { useState } from "react"
import { useQuizContext } from "../../context/QuizProvider";
import { useEffect } from "react";

export const OptionsCard = ({ currentQuiz, questionNumber }: questionCardType) => {
    const [selectedOption, setSelectedOption] = useState(0)
    const { state, dispatch } = useQuizContext()

    const clickHandler = (id: number) => {
        dispatch({ type: "SAVE_ANSWER", payload: { questionNumber, id } })
    }

    const highlightOption = (id: number) => {
        if (selectedOption === id) return "solid"
        else return "outline"
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
                                <Button colorScheme="orange" m="2.5" width={["250px", "300px"]} fontWeight="semibold" fontSize={["1.2rem", "xl"]}
                                    variant={highlightOption(id)}
                                    onClick={() => clickHandler(id)}
                                >
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

