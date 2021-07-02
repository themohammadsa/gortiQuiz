import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Text,
    Button,
    Center,
    Divider,
    useToast
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { loginUser } from "../../services/signup/signin/loginUser";
import { Loader } from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { setupTokenHeaderForAxios } from "../../services/setupTokenHeaderForAxios";

export const Login = () => {

    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false)
    const { setName, setToken, setEmail: setEmailContext } = useAuthContext()

    const navigate = useNavigate()
    const toast = useToast()

    const guestHandler = () => {
        setEmail("guest@guest.com")
        setPassword("helloguest")
    }

    const loginValidation = () => {
        !(email.length > 4) && setError('Please check the email');
        !(password.length >= 2) && setError('Please check the password');
    }

    const clickHandler = async () => {
        setError('')
        loginValidation()

        const checkInput =
            email.length > 4 && password.length >= 2;

        if (checkInput) {
            const data = await loginUser({ email, password })
            if (data.success) {
                setLoader(true)
                setTimeout(() => {
                    toast({
                        title: `Logged in Succesfully!`,
                        status: "success",
                        isClosable: true,
                    })
                    setToken(data.token)
                    setName(data.name)
                    setEmailContext(email)
                    setupTokenHeaderForAxios(data.token)
                    window.localStorage.setItem(
                        "loginStatus",
                        `${JSON.stringify({
                            isUserLoggedIn: true,
                            token: data.token,
                            name: data.name,
                            email: email,
                        })}`
                    )
                    return navigate("/");
                }, 1000)
            } else if (data.message === "409") {
                setError("Password incorrect")
            } else if (data.message === "403") {
                setError("Email not found")
            } else {
                setError("Servor Error")
            }
        }
    }

    useEffect(() => {
        async function checkUserLoginStatus() {
            const { isUserLoggedIn, token, name, email } =
                (await JSON
                    .parse(localStorage
                        .getItem("loginStatus") as string
                    )) ?? { isUserLoggedIn: false, token: "", name: "", email: "" };

            if (isUserLoggedIn) {
                setToken(() => token);
                setName(() => name);
                setEmailContext(() => email);
                setupTokenHeaderForAxios(token);
                navigate("/")
            }
        }
        checkUserLoginStatus();
    }, [navigate, setEmailContext, setName, setToken]);


    return (
        <>
            {loader ?
                <Center h="35rem">
                    <Loader />
                </Center>
                :
                <Box width={["90%", "30%"]} m="auto" mt={["10", "20"]} boxShadow="base" rounded="md" p={["6", "10"]} >
                    <Box width="100%" m="auto">

                        <FormControl id="email" mb="5">
                            <FormLabel>Email Address</FormLabel>
                            <Input type="email"
                                value={email}
                                isRequired
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </FormControl>

                        <FormControl id="password" mb="5">
                            <FormLabel>Password </FormLabel>
                            <Input type="password"
                                placeholder="More than 6 characters"
                                value={password}
                                isRequired
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </FormControl>

                        {error &&
                            <Text color="red" fontWeight="semibold" textAlign="center">
                                {error}
                            </Text>}

                        <Button colorScheme="orange" width="inherit" mb="3" mt="3"
                            onClick={clickHandler}
                        >
                            Log In
                        </Button>

                        <Box d="flex" alignItems="center">
                            <Divider />
                            <Text textAlign="center" ml="2" mr="2" >
                                or
                            </Text>
                            <Divider />
                        </Box>

                        <Button colorScheme="orange" variant="outline" width="inherit" mb="3" mt="3"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </Button>

                        <Text mt="2">
                            feel free to
                            <Button colorScheme="orange" variant="link" ml="2"
                                onClick={guestHandler}
                            >
                                Login as a guest!
                            </Button>
                        </Text>

                    </Box>
                </Box>
            }
        </>
    )
}