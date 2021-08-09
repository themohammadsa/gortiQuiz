import { Box, Button, Heading, Image, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import cover from "../../assets/home/cover.jpg"
import { Footer } from "../../components/footer/Footer";

export const Home = () => {

    const navigate = useNavigate();

    return (
        <>
            <Box m="auto" p="4" pb="40">
                <Box mb="14" mt="10"  >
                    <Image
                        m="auto"
                        boxSize={["100%", "100%", "60%"]}
                        objectFit="cover"
                        src={cover}
                        alt="Cover Photo"
                    />
                </Box>

                <Box textAlign="center" mb="7">
                    <Heading fontSize={["1.5rem", "2.5rem"]} mb="2">
                        Action-Packed Sports Quizzes
                    </Heading>
                    <Text as="i" fontSize={["1rem", "1.5rem"]} >
                        Get ready to play!
                    </Text>
                </Box>

                <Box textAlign="center" mb="7">
                    <Text mb="5" fontSize={["1rem", "1.5rem"]} >
                        Try 5 questions to test your knowledge of all your favorite sports, from football to ice-hockey.
                    </Text>
                </Box>


                <Box mt="12" mb="12" textAlign="center" >
                    <Button colorScheme="orange" pt="7" pb="7" width="300px" fontWeight="bold" fontSize={["1.5rem", "2rem"]} variant="ghost"
                        onClick={() => navigate("/quiz")}>
                        Go to Quizzes
                    </Button>
                </Box>

            </Box>

            <Footer />
        </>
    )
}