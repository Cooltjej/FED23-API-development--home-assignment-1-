// create users
import prisma from "../prisma";
import { CreateUser } from "../types/user-types";

export const registerUser = async (data: CreateUser) => {
	return await prisma.user.create({
		data,
	});
}

export const getUserbyId = async (id: number) => {
	return await prisma.user.findUnique({
		where: {
			id,
		},
	});
}

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
			where: {
				email,
			},
		});
}

