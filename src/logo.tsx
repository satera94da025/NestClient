import {AspectRatio, Button, Image, useToast, Wrap, WrapItem } from '@chakra-ui/react';
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import React from 'react';
import logo from './logo.svg';
import AboutUserModal from './utils/aboutUserModal';

type propsType = {
    name: string
    secondName: string
    deleteUser: (id: string) => void
    id: string
}

const Logo = (props: propsType) => {
    const toast =  useToast()

    return (
        <div>
                  <Box bg="#f1d4c2"  p={4} color="white">
                      <Wrap>

                          <WrapItem>
                              <Avatar size="xl" name="Christian Nwamba" src="https://bit.ly/code-beast" />{" "}
                          </WrapItem>

                      </Wrap>

                      <Text fontSize="6xl" color="#8f659a" as="samp" isTruncated>{props.name} {props.secondName}</Text>
                      <Button onClick={() => {
                          props.deleteUser(props.id)
                          toast({
                              title: "User deleted.",
                              description: "We've deleted user.",
                              status: "success",
                              duration: 2000,
                              isClosable: true,
                          })
                      }} colorScheme="red" variant="solid">Delete user</Button>
                      <AboutUserModal/>


                  </Box>





        </div>

    );
};

export default Logo;