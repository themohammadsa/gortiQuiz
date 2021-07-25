import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Text,
    Button,
    Center,
    useToast
} from "@chakra-ui/react"
import { useState } from "react"
import { createUser } from "../../services/signup/signin/createUser";
import { Loader } from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {

    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [throttle, setThrottle] = useState(false);
    const [loader, setLoader] = useState<boolean>(false)
    const navigate = useNavigate()
    const toast = useToast()

    const signUpValidation = () => {
        !(name.length > 2) && setError('Please check the name');
        !(email.length > 4) && setError('Please check the email');
        !(password.length >= 2) && setError('Please check the password');
    }

    const clickHandler = async () => {
        setError('')
        setThrottle(true);
        signUpValidation()

        const checkInput =
            name.length > 2 && email.length > 4 && password.length >= 2;

        if (checkInput) {
            const data = await createUser({ name, email, password })
            if (data.success) {
                setLoader(true)
                setTimeout(() => {
                    toast({
                        title: `SignUp Succesful!`,
                        status: "success",
                        isClosable: true,
                    })
                    setThrottle(false)
                    navigate("/")
                }, 1500)
            } else if (data.message === "409") {
                setError("Email ID already exists")
                setThrottle(false)
            } else {
                setError("Servor error!")
                setThrottle(false)
            }
        } else setThrottle(false)
    }

    return (
        <>
            {loader ?
                <Center h="35rem">
                    <Loader />
                </Center>
                :
                <Box width={["90%", "30%"]} m="auto" mt={["10", "20"]} boxShadow="base" rounded="md" p={["6", "10"]} >
                    <Box width="100%" m="auto">

                        <FormControl id="name" mb="5">
                            <FormLabel>Name</FormLabel>
                            <Input type="text"
                                isRequired
                                onChange={(event) => setName(event.target.value)}
                            />
                        </FormControl>


                        <FormControl id="email" mb="5">
                            <FormLabel>Email Address</FormLabel>
                            <Input type="email"
                                isRequired
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </FormControl>

                        <FormControl id="password" mb="5">
                            <FormLabel>Password </FormLabel>
                            <Input type="password"
                                placeholder="More than 6 characters"
                                isRequired
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </FormControl>

                        {error &&
                            <Text color="red" fontWeight="semibold" textAlign="center">
                                {error}
                            </Text>}

                        <Button colorScheme="orange" width="inherit" mb="3" mt="3"
                            onClick={clickHandler} disabled={!throttle ? false : true}
                        >
                            {!throttle ? ' Create Account ' : 'Loading...'}
                        </Button>

                        <Text>
                            Already have an account?
                            <Button colorScheme="orange" variant="link" ml="2"
                                onClick={() => navigate("/login")}>
                                Log in
                            </Button>
                        </Text>
                    </Box>
                </Box>}
        </>
    )
}