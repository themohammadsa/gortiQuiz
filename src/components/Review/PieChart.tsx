import { Box, CircularProgress, CircularProgressLabel, HStack, Text } from "@chakra-ui/react"
import { statsPropType } from "../../context/types/initialStateType.type"

export const PieChart = ({ stats }: statsPropType) => {
    return (
        <>
            <HStack spacing={12} justify="center">
                <Box>
                    <CircularProgress value={stats.percentage} color="orange.400" thickness="12px" size="8rem">
                        <CircularProgressLabel fontSize="1.5rem" fontWeight="semibold">
                            {stats.percentage}%
                        </CircularProgressLabel>
                    </CircularProgress>
                    <Text fontSize="1rem" fontWeight="bold" mt="2" >
                        Percentage
                    </Text>
                </Box>

                <Box>
                    <CircularProgress value={stats.score} color="green.400" thickness="12px" size="8rem" >
                        <CircularProgressLabel fontSize="1.5rem" fontWeight="semibold">
                            {stats.score}/{stats.totalScore}
                        </CircularProgressLabel>
                    </CircularProgress>
                    <Text fontSize="1rem" fontWeight="bold" mt="2" >
                        Total Score
                    </Text>
                </Box>
            </HStack>

            <HStack m="8" p="5" justify="center">
                <Box>
                    <CircularProgress value={stats.wrongAnswer} color="red.600" thickness="12px" size="5rem">
                        <CircularProgressLabel fontWeight="semibold">
                            {stats.wrongAnswer}
                        </CircularProgressLabel>
                    </CircularProgress>
                    <Text fontSize="l" fontWeight="bold" mt="2">
                        Wrong
                    </Text>
                </Box>

                <Box pl="10" pr="10">
                    <CircularProgress value={stats.attemptedQuestions} color="green.400" thickness="10px" size="5rem" >
                        <CircularProgressLabel fontWeight="semibold">
                            {stats.attemptedQuestions}/{stats.totalQuestions}
                        </CircularProgressLabel>
                    </CircularProgress>
                    <Text fontSize="l" fontWeight="bold" mt="2">
                        Attempted
                    </Text>
                </Box>

                <Box>
                    <CircularProgress value={stats.correctAnswer} color="green.400" thickness="12px" size="5rem">
                        <CircularProgressLabel fontWeight="semibold">
                            {stats.correctAnswer}
                        </CircularProgressLabel>
                    </CircularProgress>
                    <Text fontSize="l" fontWeight="bold" mt="2">
                        Correct
                    </Text>
                </Box>
            </HStack>
        </>
    )
}