import { User } from "@prisma/client";
import { UserRepository } from "src/repository";

export const UserService = {
    getAll: async (): Promise<User[]> => {
        return await UserRepository.findAll();
    },
    getOneById: async (id: string): Promise<any> => {
        return "One user: " + id;
    }
}