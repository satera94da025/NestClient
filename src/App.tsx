import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import Logo from './logo';
import {AppRootStateType} from './state/store';
import {deleteUserTC, fetchUsersTC} from './state/userReducer';
import DrawerExample from "./utils/drawer";




export type userType = {
    _id: string
    name: string
    secondName: string
    age: number
    email: string
    job: string
}

function App() {

    const dispatch = useDispatch();
    const users = useSelector<AppRootStateType, userType[]>(state => state.users);


    const deleteUser = useCallback((id: string) => dispatch(deleteUserTC(id)), [dispatch]);

    useEffect(() => {
        dispatch(fetchUsersTC())
    }, [dispatch]);


    return (
        <div className="App">
            <DrawerExample/>
            <header className="App-header">

                <div>{users.map((el, i) => {
                    return <Logo name={el.name} secondName={el.secondName} job={el.job} email={el.email}
                                 age={el.age} deleteUser={deleteUser} id={el._id}
                                 key={i}/>
                })}</div>
            </header>
        </div>
    );
}

export default App;
