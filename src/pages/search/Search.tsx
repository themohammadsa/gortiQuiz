import { Button, Image, Wrap, WrapItem, Center, Heading } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { QuizType, QuizzesType } from "../../components/types/quiz.types";
import { getRequest } from "../../services/getRequest";
import { Loader } from "../../components/loader/Loader";
import { errorHandler } from "../../services/errorHandler";

export const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const URL = new URLSearchParams(location.search);
    const URLSearchValue: any = URL.get("results");

    const [filteredData, setFilteredData] = useState<QuizzesType>([] as QuizzesType)
    const [quizzes, setQuizzes] = useState<QuizzesType>([])
    const [loader, setLoader] = useState<boolean>(false)

    useEffect(() => {
        async function getQuiz() {
            try {
                const { quizzes } = await getRequest("/quiz");
                if (quizzes) {
                    setQuizzes(quizzes);
                    setLoader(true);
                }
            } catch (error) {
                return errorHandler(error)
            }
        }
        getQuiz();
    }, [])

    useEffect(() => {
        const results = quizzes.filter((quiz) => quiz.topic.toUpperCase().includes(URLSearchValue.toUpperCase()))
        setFilteredData(results)
    }, [URLSearchValue, quizzes])

    return (
        <>
            {!loader ?
                <Center h="35rem">
                    <Loader />
                </Center>
                :
                <Wrap m="auto" p="10" d="flex" flexWrap="wrap" justify="center" mt="10" mb="5" alignItems="center" spacing={["3rem", "5rem"]}>
                    {filteredData.map((quiz: QuizType) => {
                        return (
                            <>
                                <WrapItem borderRadius="10px" width="250px" d="flex" flexDirection="column" alignItems="center" m="5" boxShadow="base" rounded="md" bg="white" cursor="pointer" key={quiz.id}
                                    onClick={() => navigate(`/quiz/${quiz.topic}`)} >
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
                </Wrap>
            }
            {filteredData.length === 0 && <Center h="20rem">
                <Heading>
                    No search results found!
                </Heading>
            </Center>}
        </>
    )
}