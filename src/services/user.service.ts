import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import getConnection from "config/database";

const handleCreateUser = async (fullName: string, email: string, address: string, phone: string, avatar: string) => {
    //logic to create user
    const user = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: "123456",
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone
        },
    })
}

const getAllUsers = async () => {
    //logic to get all users
    const users = await prisma.user.findMany();
    return users;
}

const getAllRoles = async () => {
    //logic to get all users
    const roles = await prisma.role.findMany();
    return roles;
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
            fullName: name,
            username: email,
            address: address
        }
    })
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById, getAllRoles };