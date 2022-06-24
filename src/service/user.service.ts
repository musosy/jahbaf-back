import { User } from '@prisma/client';
import { UserRepository } from 'src/repository';
import { UserNew } from 'src/interface';
export const UserService = {
    getAll: async (): Promise<User[]> => {
        return await UserRepository.findAll();
    },
    getOneById: async (id: string): Promise<any> => {
        return "One user: " + id;
    },
    insert: async (newUser: UserNew): Promise<any> => {
        return await UserRepository.create(newUser);
    },
    getOneByEmail: async (email: string): Promise<any> => {
        return await UserRepository.findOneByEmail(email);
    }
}