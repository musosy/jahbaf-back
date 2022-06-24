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
                name: true,
                email: true,
            }
        })
    },
    findOneByEmail: async (email: string): Promise<any> => {
        return await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                email: true,
                password: true,
            }
        })
    },
    create: async ({name, email, password}: UserNew): Promise<any> => {
        return await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
    }
}