import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {

    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();

    const navigateToSearch = () => {
        navigate(`/search/search?results=${encodeURI(search)}`);
    };

    return (
        <>
            <InputGroup size="md">
                <InputLeftElement children={<BiSearchAlt2 color="#c05621" />} fontSize="1.2rem" />
                <Input
                    pr="4.5rem"
                    type="text"
                    focusBorderColor="#c05621"
                    placeholder="Search the quizzes"
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                    onKeyUp={navigateToSearch}
                />
            </InputGroup>
        </>
    )
}




