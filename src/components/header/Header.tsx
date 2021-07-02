import {
    Box, Button, Flex, Spacer, Icon, Image, Drawer, DrawerHeader, DrawerContent, useDisclosure, DrawerCloseButton, Menu, MenuButton, MenuList, MenuItem, useToast, MenuGroup, MenuDivider
} from "@chakra-ui/react"
import "./header.css"
import logotext from "./logotext.png"
import { AiFillHome } from "react-icons/ai";
import { IoRocketSharp } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { SearchBar } from "../searchBar/SearchBar";
import { useAuthContext } from "../../context/AuthProvider";
import { setupTokenHeaderForAxios } from "../../services/setupTokenHeaderForAxios";

export const Header = () => {

    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const { setToken, name, token } = useAuthContext()

    const logOutHandler = () => {
        localStorage.removeItem("loginStatus");
        setToken(null)
        setupTokenHeaderForAxios(null);
        toast({
            title: `Logged out Succesfully!`,
            status: "warning",
            isClosable: true,
        })
        navigate("/login")
    }

    return (
        <>
            <Box borderTopColor="orange.600" borderTopWidth="3px">
                <Flex mt="1"  >

                    <Button colorScheme="orange" variant="ghost" borderRadius="50%" p="1" pt="2" mt={["0", "0.5"]} mr={["0", "4"]} ml={["0", "1"]} onClick={onOpen}>
                        <Icon as={AiOutlineMenu} w={6} h={6} />
                    </Button>

                    <Box mt="2" >
                        <Image size="md" src={logotext} height={["1.75rem", "2rem"]} objectFit="cover" alt="logo" cursor="pointer"
                            onClick={() => navigate("/")} />
                    </Box>
                    <Spacer />


                    <Box mt="1.5" width="40%" className="desktop">
                        <SearchBar />
                    </Box>

                    <Spacer />
                    <Menu>
                        <MenuButton >
                            <Button colorScheme="orange" variant="ghost" mr={["0", "4"]} borderRadius="50%" p="1">
                                <Icon as={FaUserAlt} w={["4", "5"]} h={["4", "5"]} />
                            </Button>
                        </MenuButton>
                        {token && <MenuList color="orange.600">
                            <MenuGroup title={`Hi ${name}!`} fontWeight="bold">
                                <MenuDivider />
                                <MenuItem fontWeight="semibold"
                                    onClick={logOutHandler}
                                >
                                    Log out
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>}
                    </Menu>

                    <Drawer onClose={onClose} isOpen={isOpen} size="xs" placement="left" >
                        <DrawerContent>
                            <Box borderTopColor="orange.600" borderTopWidth="3px">
                                <Box ml="3" mt="6">
                                    <DrawerCloseButton color="orange.600" size="l" mt="6" mr="3" />
                                    <Box d="flex" mt="2" ml="2" mb="8" onClick={() => navigate("/")} >
                                        <Image height="1.75rem" src={logotext} objectFit="cover" alt="logo" />
                                    </Box>

                                    <DrawerHeader borderBottomWidth="1px" mb="3" >
                                        <Button color="orange.600" variant="link" fontWeight="semibold" fontSize="1.2rem" ml={2} onClick={() => {
                                            navigate("/")
                                            onClose()
                                        }}>
                                            <Icon as={AiFillHome} w={6} h={6} mr={5} />
                                            HOME
                                        </Button>
                                    </DrawerHeader>

                                    <DrawerHeader borderBottomWidth="1px" mb="3">
                                        <Button color="orange.600" variant="link" fontWeight="semibold" fontSize="1.2rem" ml={2} onClick={() => {
                                            navigate("/quiz")
                                            onClose()
                                        }}>
                                            <Icon as={IoRocketSharp} w={6} h={6} mr={5} />
                                            QUIZ
                                        </Button>
                                    </DrawerHeader>

                                    <DrawerHeader borderBottomWidth="1px" mb="3">
                                        <Button color="orange.600" variant="link" fontWeight="semibold" fontSize="1.2rem" ml={2} onClick={() => {
                                            navigate("/result")
                                            onClose()
                                        }}>
                                            <Icon as={FaChartPie} w={6} h={6} mr={5} />
                                            RESULTS
                                        </Button>
                                    </DrawerHeader>

                                </Box>
                            </Box>
                        </DrawerContent>

                    </Drawer>

                </Flex>
                <Box m="2.5" className="mobile">
                    <SearchBar />
                </Box>
            </Box>
        </>
    )
}