import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001/',




})


export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}


export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TodoTaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type MeParamsType = {
    id: number
    email: string
    login: string

}

export const usersAPI = {
    fetchUsers() {
        return instance.get<any>('users')
    },
    getUserById(id: string) {
        return instance.get<any>(`users/${id}`)
    },
    createUser(data: any) {
        return instance.post<any>('users', data)
    },
    deleteUser(id: string){
        return instance.delete(`users/${id}`)
    }
    // updateUser(id: string, data: UsersType) {
    //     return
    // }
}