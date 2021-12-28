import {Avatar, Box, Button, Text, useToast, Wrap, WrapItem} from '@chakra-ui/react';
import React, {useCallback} from 'react';
import AboutUserModal from './utils/aboutUserModal';

type propsTypes = {
    age: number
    email: string
    job: string
    name: string
    secondName: string
    deleteUser: (id: string) => void
    id: string
}

const Logo = (props: propsTypes) => {


    const toast = useToast();

    const deleteUser = useCallback(() => {
        props.deleteUser(props.id);
        toast({
            title: "User deleted.",
            description: "We've deleted user.",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    }, [props, toast]);

    return (

        <div>

            <Box bg="#f1d4c2" p={4} color="white">
                <Wrap>
                    <WrapItem>
                        <Avatar size="xl" name="Christian Nwamba" src="https://bit.ly/code-beast"/>{" "}
                    </WrapItem>
                </Wrap>
                <Text fontSize="6xl" color="#8f659a" as="samp"
                      isTruncated>{props.name} {props.secondName} {props.age} {props.email} {props.job}</Text>
                <Button onClick={deleteUser} colorScheme="red" variant="solid">Delete user</Button>
                <AboutUserModal/>
            </Box>
        </div>
    );
};

export default React.memo(Logo);