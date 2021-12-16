import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import Logo from './logo';
import {AppRootStateType} from './state/store';
import {createUserTC, deleteUserTC, fetchUsersTC} from './state/userReducer';
import {DrawerExample} from './utils/drawer';
import {Button, FormControl, FormLabel, Input, useToast} from "@chakra-ui/react";
import ValidForm from "./utils/formController";

import {useForm, SubmitHandler} from "react-hook-form";




export type userType = {
    _id: string
    name: string
    secondName: string
}

function App() {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<userType>();


    const dispatch = useDispatch()
    const users = useSelector<AppRootStateType, userType[]>(state => state.users)
    const [name, setName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const addUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    };

    const addUserSecondName = (e: ChangeEvent<HTMLInputElement>) => {
        setSecondName(e.currentTarget.value)
    };
    const toast = useToast();

    const deleteUser = useCallback((id: string) => dispatch(deleteUserTC(id)), [dispatch])

    useEffect(() => {
        dispatch(fetchUsersTC())
    }, [dispatch])


    const addUser = () => {
        dispatch(createUserTC({name, secondName}));
        setName('');
        setSecondName('');
        toast({
            title: "User created.",
            description: "We've created new user.",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
    }

    return (
        <div className="App">

            <DrawerExample/>

            <header className="App-header">

                <form onSubmit={handleSubmit(addUser)}>

                    <FormControl id="first-name" isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input {...register("name")}  placeholder="First name" onChange={addUserName} value={name}/>
                    </FormControl>
                    <FormControl id="second-name" isRequired>
                        <FormLabel>Second name</FormLabel>
                        <Input {...register("secondName", {required: true, maxLength: 10})} placeholder="Second name" onChange={addUserSecondName} value={secondName}/>
                    </FormControl>
                    {errors.secondName && <p>This field is required</p>}
                    <Button colorScheme="teal"  type="submit">Add user</Button>
                    {users.map((el, i) => {
                        return <Logo name={el.name} secondName={el.secondName} deleteUser={deleteUser} id={el._id}
                                     key={i}/>
                    })}
                </form>
            </header>
        </div>
    );
}

export default App;
