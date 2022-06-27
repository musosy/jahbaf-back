import { PrismaClient, User } from "@prisma/client"
import { UserNew } from "src/interface";

const prisma = new PrismaClient();

export const UserRepository = {
    findAll: async (): Promise<User[]> => {
        return await prisma.user.findMany();
    },
    findOneById: async (id: string): Promise<any> => {
        return await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            }
        })
    },
    findOneByEmail: async (email: string): Promise<any> => {
        return await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                activated: true,
            }
        })
    },
    create: async ({ name, email, password }: UserNew): Promise<any> => {
        return await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
    },
    activateAccount: async (id: string): Promise<User> => {
        return await prisma.user.update({
            where: {
                id: id
            },
            data: {
                activated: true
            }
        })
    },
    delete: async (id: string): Promise<any> => {
        return await prisma.user.delete({
            where: {
                id
            }
        })
    },
    resetPassword: async (id: string, password: string): Promise<any> => {
        return await prisma.user.update({
            where: {
                id
            },
            data: {
                password
            }
        })
    }
}