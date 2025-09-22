import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();


    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền",
                },
                {
                    name: "USER",
                    description: "User thông thường",
                }
            ]
        })
    }

    if (countUser === 0) {
        const defaultPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst({
            where: {
                name: "ADMIN"
            }
        });
        const userRole = await prisma.role.findFirst({
            where: {
                name: "USER"
            }
        });

        if (adminRole && userRole)
            await prisma.user.createMany({
                data: [
                    {
                        fullName: "Ifine",
                        username: "ifine@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: userRole.id
                    },
                    {
                        fullName: "Admin",
                        username: "admin@gmail.com",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    }
                ]
            })
    }

    if (countUser !== 0 && countRole !== 0) {
        console.log(">>> ALREADY INIT DATA...");
    }
}

export default initDatabase;