import { prisma } from "config/client";
import getConnection from "config/database";

const handleCreateUser = async (name: string, email: string, address: string) => {
    //logic to create user
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            address: address
        },
    })
}

const getAllUsers = async () => {
    //logic to get all users
    const users = await prisma.user.findMany();
    return users;
}

const handleDeleteUser = async (id: string) => {
    //logic to delete user
    const user = await prisma.user.delete({
        where: {
            id: +id
        }
    })
}

const getUserById = async (id: string) => {
    //logic to delete user
    const user = await prisma.user.findUnique({
        where: {
            id: +id
        }
    })
    return user;
}

const updateUserById = async (id: string, name: string, email: string, address: string) => {
    //logic to update user
    const user = await prisma.user.update({
        where: {
            id: +id
        },
        data: {
            name: name,
            email: email,
            address: address
        }
    })
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById };