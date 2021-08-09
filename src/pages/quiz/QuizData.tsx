import { Heading, Button, Box, Stack, Flex, Center, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Loader } from "../../components/loader/Loader"
import { useQuizContext } from "../../context/QuizProvider"
import { OptionsCard } from "../../components/options/OptionsCard"
import { BsFillCaretRightFill, BsFillCaretLeftFill, } from "react-icons/bs"
import { getRequest } from "../../services/getRequest"

export const QuizData = () => {

    const [loader, setLoader] = useState(false)
    const { selectedQuiz } = useParams();
    const { state: { questionNumber, currentQuiz }, dispatch } = useQuizContext()
    const navigate = useNavigate()
    const totalQuestions = () => currentQuiz.questions.length

    useEffect(() => {
        async function getQuiz() {
            const { quiz } = await getRequest(`/quiz/${selectedQuiz}`);
            if (quiz) {
                dispatch({ type: "SET_QUIZ", payload: quiz })
                setLoader(true)
            }
        }
        getQuiz();
    }, [selectedQuiz, dispatch]);


    return (
        <>
            {!loader ?
                <Center h="35rem">
                    <Loader />
                </Center>
                :
                <Box m="auto" textAlign="center" >
                    <Heading as="h2" size="l" color="orange.500" mt="12" >
                        TOPIC: {currentQuiz.topic.toUpperCase()}
                    </Heading>

                    <Flex direction="column" alignItems="center">

                        <Box mt="6" mb="1" fontWeight="bold" fontSize="l" color="gray.500">
                            {questionNumber + 1} / {totalQuestions()}
                        </Box>

                        <Text m="2" fontWeight="bold" fontSize={["1.2rem", "xl"]}>
                            {currentQuiz.questions[questionNumber].question}
                        </Text>

                        <Box m="4" >
                            <OptionsCard currentQuiz={currentQuiz} questionNumber={questionNumber} />
                        </Box>

                        <Box mt="10" >
                            <Stack direction="row" spacing={7} >
                                {questionNumber >= 1 &&
                                    <Button colorScheme="orange" variant="solid" width="150px"
                                        leftIcon={<BsFillCaretLeftFill />}
                                        onClick={() => dispatch({ type: "PREVIOUS_QUESTION" })}
                                    >
                                        Previous
                                    </Button>
                                }
                                {questionNumber < (totalQuestions() - 1) &&
                                    <Button colorScheme="orange" variant="solid" width="150px"
                                        rightIcon={<BsFillCaretRightFill />}
                                        onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                                    >
                                        Next
                                    </Button>
                                }
                                {questionNumber === (totalQuestions() - 1) &&
                                    <Button colorScheme="orange" variant="ghost" width="150px"
                                        rightIcon={<BsFillCaretRightFill />}
                                        onClick={() => {
                                            dispatch({ type: "CHECK_RESULT" })
                                            navigate(`/result/${selectedQuiz}`)
                                            
                                        }}
                                    >
                                        Check Result
                                    </Button>
                                }
                            </Stack>
                        </Box>
                    </Flex>
                </Box>}
        </>
    )
}