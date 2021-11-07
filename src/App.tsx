import {Button, FormControl, FormLabel, Input, useToast} from '@chakra-ui/react';
import React, {ChangeEvent, useEffect, useState,useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v1} from 'uuid';
import {usersAPI} from './api/usersAPI';

import './App.css';
import Logo from './logo';
import {AppRootStateType} from './state/store';
import {deleteUserTC, fetchUsersTC} from './state/userReducer';
import {DrawerExample} from './utils/drawer';

export type userType = {
    _id: string
    name: string
    secondName: string
}

function App() {

    const dispatch = useDispatch()
    const users = useSelector<AppRootStateType, userType[]>(state => state.users)
    const [user, setUser] = useState<userType[]>([
        // {_id: v1(), name: 'Azamat', secondName: 'Bogatov'}
    ]);

    const [name, setName] = useState<string>('');
    const [secondName, setSecondName] = useState<string>('');
    const deleteUser = useCallback((id: string) => dispatch(deleteUserTC(id)),[dispatch])

    const [data, setData] = useState<any>();
    useEffect(() => {
        dispatch(fetchUsersTC())
    }, [dispatch])

    const addUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)


    };

    const addUserSecondName = (e: ChangeEvent<HTMLInputElement>) => {

        setSecondName(e.currentTarget.value)

    };

    const addUser = (name: string, secondName: string) => {
        // let newUser = {_id: v1(), name, secondName};
        // setUser([...user, newUser])
    };


    const toast = useToast();




    return (
        <div className="App">
            <DrawerExample/>
            <header className="App-header">
                <div>
                    <FormControl id="first-name" isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder="First name" onChange={addUserName} value={name}/>
                    </FormControl>
                    <FormControl id="second-name" isRequired>
                        <FormLabel>Second name</FormLabel>
                        <Input placeholder="Second name" onChange={addUserSecondName} value={secondName}/>
                    </FormControl>
                    <Button colorScheme="teal" onClick={() => {

                        addUser(name, secondName);
                        setName('');
                        setSecondName('');
                        toast({
                            title: "User created.",
                            description: "We've created new user.",
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                        })

                    }}>Add user</Button>
                </div>


                {users.map(el => {
                    return <Logo name={el.name} secondName={el.secondName} deleteUser={deleteUser} id={el._id}
                                 key={el._id}/>
                })}


            </header>
        </div>
    );
}

export default App;
