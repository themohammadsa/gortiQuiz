import { Button, Image, Wrap, WrapItem, Box, Center } from "@chakra-ui/react"
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Footer } from "../../components/footer/Footer";
import { Loader } from "../../components/loader/Loader";
import { QuizType, QuizzesType } from "../../components/types/quiz.types";
import { getRequest } from "../../services/getRequest";

export const Quiz = () => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState<boolean>(false)
    const [quizzes, setQuizzes] = useState<QuizzesType>([])

    useEffect(() => {
        async function getQuiz() {
            const { quizzes } = await getRequest("/quiz");
            if (quizzes) {
                setLoader(true);
                setQuizzes(quizzes);
            }
        }
        getQuiz();
    }, []);

    return (
        <>
            <Box pb="50">
                {!loader ?
                    <Center h="35rem">
                        <Loader />
                    </Center>
                    :
                    <Wrap m="auto" p="4" pb="40" justify="center" mt="10" mb="5" align="center" spacing={["3rem", "4rem"]} width="80%">
                        {quizzes.map((quiz: QuizType) => {
                            return (
                                <>
                                        <WrapItem borderRadius="10px" width="250px" d="flex" flexDirection="column" alignItems="center" boxShadow="base" rounded="md" bg="white" cursor="pointer"
                                            onClick={() => navigate(`/quiz/${quiz.topic.toLowerCase()}`)} >
                                            <Image
                                                mt="2"
                                                boxSize="200px"
                                                objectFit="cover"
                                                src={quiz.image}
                                            />
                                            <Button colorScheme="orange" width="100%" fontWeight="bold" fontSize="1.1rem" variant="solid" borderBottomRadius="5px" borderTopRadius="0px" height="2rem" mt="3">
                                                {quiz.topic}
                                            </Button>
                                        </WrapItem>
                                </>
                            )
                        })}
                    </Wrap>}
                <Footer />
            </Box>

        </>
    )
}