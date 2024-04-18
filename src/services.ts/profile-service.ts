import prisma from "../prisma";
import { UpdateUser } from "../types/user-types";



export const updateUserProfile = async (userId: number, data: UpdateUser) => {
	return await prisma.user.update({
		where: {
			id: userId
		},
		data,
	});
}
