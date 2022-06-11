import { PrismaClient } from "@prisma/client";


export const database = new PrismaClient()


// Tentative typing of a Prisma model.
export type PrismaDelegate = {
    findUnique: any,
    findFirst: any,
    findMany: any,
    create: any,
    createMany: any,
    delete: any,
    update: any,
    deleteMany: any,
    updateMany: any,
    upsert: any,
    count: any,
    aggregate: any,
}
