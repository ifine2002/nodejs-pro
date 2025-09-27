import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds);
}

const handleCreateUser = async (fullName: string, email: string, address: string, phone: string, avatar: string | null, role: string) => {
    //logic to create user
    const defaultPassword = await hashPassword("123456");
    const user = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone,
            roleId: +role
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

const updateUserById = async (id: string, fullName: string, phone: string, address: string, role: string, avatar?: string) => {
    //logic to update user
    const user = await prisma.user.update({
        where: {
            id: +id
        },
        data: {
            fullName: fullName,
            address: address,
            phone: phone,
            roleId: +role,
            ...(avatar !== undefined && { avatar: avatar })
        }
    })
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById, getAllRoles, hashPassword };