import { PrismaClient, User } from "@prisma/client"

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
    }
}