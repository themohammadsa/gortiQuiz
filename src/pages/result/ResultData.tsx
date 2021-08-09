import { Heading, Box, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useQuizContext } from "../../context/QuizProvider"
import { Review } from "../../components/Review/Review"
import { PieChart } from "../../components/Review/PieChart"
import { Footer } from "../../components/footer/Footer"

export const ResultData = () => {

    const { state } = useQuizContext()
    const navigate = useNavigate()

    return (
        <>
            <Box pb="150" >

                <Box m="auto" textAlign="center">
                    <Heading as="h2" fontSize="1.75rem" fontWeight="bold" color="orange.500" mt="12" >
                        SCOREBOARD
                    </Heading>

                    <Heading as="h2" fontSize="1.15rem" color="grey" mt="6">
                        TOPIC: {state.stats.quizTopic.toUpperCase()}
                    </Heading>

                    <Box mt="12" mb="12">
                        <PieChart stats={state.stats} />
                    </Box>

                    <Box mt="12" mb="12" >
                        <Review />
                    </Box>

                    <Box mt="12" mb="12" >
                        <Button colorScheme="orange" m="4.5" p="7" width="300px" fontWeight="bold" fontSize="1.5rem" variant="ghost"
                            onClick={() => navigate("/quiz")}>
                            Go to Quizzes
                        </Button>
                    </Box>
                </Box>

                <Footer />
            </Box>
        </>
    )
}