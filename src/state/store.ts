// import {tasksReducer} from '../features/TodoListsLists/tasks-reducer';
// import {todoListsReducer} from '../features/TodoListsLists/todolists-reducer';
// import {applyMiddleware, combineReducers, createStore} from 'redux';
// import thunk from "redux-thunk";
// import {appReducer} from "./app-reducer";
// import {authReducer} from "../features/Login/auth-reducer";
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import {appReducer} from './appReducer';
import {usersReducer} from './userReducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    // tasks: tasksReducer,
    // todoLists: todoListsReducer,
    app: appReducer,
    users: usersReducer
    // auth: authReducer
})


// непосредственно создаём store
export const store = configureStore(
    {
        reducer: rootReducer,
        middleware: [thunk] as const,
    })
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

