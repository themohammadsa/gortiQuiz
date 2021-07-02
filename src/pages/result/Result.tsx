import { Heading, Box, Center, Button, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { statsType } from "../../context/types/initialStateType.type"
import { Loader } from "../../components/loader/Loader"
import { PieChart } from "../../components/Review/PieChart"
import { Footer } from "../../components/footer/Footer"
import { getResult } from "../../services/quizResult"
import { errorHandler } from "../../services/errorHandler"
import { useQuizContext } from "../../context/QuizProvider"

export const Result = () => {

    const { state, dispatch } = useQuizContext()
    const navigate = useNavigate()
    const [loader, setLoader] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        async function getResultData() {
            try {
                const { stats } = await getResult()
                if (stats !== undefined && stats.length > 0) {
                    setLoader(true)
                    return dispatch({
                        type: "SET_RESULT",
                        payload: stats
                    })
                } else {
                    setError(true)
                }
            } catch (error) {
                return errorHandler(error)
            }
        }
        getResultData()
    }, [dispatch])

    return (
        <>
            <Box pb="150" >
                {!loader ?
                    <Center h="35rem">
                        {!error && <Loader />}
                        {error &&
                            <VStack spacing={10}>
                                <Heading textAlign="center" mt="12" mb="5"> You have not attempted any quizzes.</Heading>
                                <Button colorScheme="orange" m="4.5" p="7" width="300px" fontWeight="bold" fontSize="1.5rem" variant="ghost"
                                    onClick={() => navigate("/quiz")}>
                                    Go to Quizzes
                                </Button>
                            </VStack >}
                    </Center>
                    :
                    <Box m="auto" textAlign="center" pb="100">
                        <Heading as="h2" fontSize="1.75rem" fontWeight="bold" color="orange.500" mt="12" >
                            SCOREBOARD
                        </Heading>
                        {
                            state.result.map((quiz: statsType) => {
                                return (
                                    <>
                                        <Box key={quiz.quizID} pb="3">
                                            <Heading as="h2" fontSize="1.15rem" color="grey" mt="6">
                                                TOPIC: {quiz.quizTopic.toUpperCase()}
                                            </Heading>

                                            <Box mt="12" mb="12">
                                                <PieChart stats={quiz} />
                                            </Box>
                                        </Box>
                                    </>
                                )
                            })
                        }
                    </Box>
                }
                <Footer />
            </Box>
        </>
    )
}