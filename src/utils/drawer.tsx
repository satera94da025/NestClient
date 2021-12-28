import {
    Drawer,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button, FormControl, FormLabel, Input, useToast,
} from "@chakra-ui/react"
import React, {useRef} from "react"
import {createUserTC} from "../state/userReducer";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

type FormValues = {
    name: string,
    secondName: string,
    email: string,
    age: string,
    job: string
};


const DrawerExample = () => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = useRef<any>()
    const dispatch = useDispatch();
    const toast = useToast();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FormValues>({
        mode: "onChange",
        defaultValues: {
            name: "",
            secondName: "",
            email: "",
            age: "",
            job: ""
        }
    });


    const toastMessage = (title: string, description: string) => {
        toast({
            title,
            description,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };

    const clearFields = () => reset();
    const addUser = (user: FormValues) => {
        dispatch(createUserTC(user));
        toastMessage("User created.", "We've created new user.");
        onClose();
        clearFields()
    };

    return (
        <>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                Menu
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Create your account</DrawerHeader>
                    <form onSubmit={handleSubmit(addUser)}>
                        <FormControl id="first-name" isRequired>
                            <FormLabel>First name</FormLabel>
                            <Input {...register("name")} placeholder="First name"/>
                        </FormControl>
                        <FormControl id="second-name" isRequired>
                            <FormLabel>Second name</FormLabel>
                            <Input {...register("secondName", {required: true, maxLength: 10})}
                                   placeholder="Second name"
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input {...register("email")} placeholder="email"/>
                        </FormControl>
                        <FormControl id="age" isRequired>
                            <FormLabel>Age</FormLabel>
                            <Input {...register("age")} placeholder="age" type={"number"}
                            />
                        </FormControl>
                        <FormControl id="job">
                            <FormLabel>Job</FormLabel>
                            <Input {...register("job")} placeholder="job"/>
                        </FormControl>
                        {errors.secondName && <p>This field is required</p>}
                        <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" type="submit">Save</Button>
                            <Button colorScheme="blue" onClick={clearFields}>Clear</Button>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </>
    )
};
export default React.memo(DrawerExample);