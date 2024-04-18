import prisma from "../prisma";
import { CreatePhoto, UpdatePhoto } from "../types/photo-types";

export const getPhotos = async (userId: number) => {			//KNAST
	return await prisma.photo.findMany({
		where: {
			userId
		}
	});
}

export const getPhotoById = async (photoId: number, userId: number) => {
	return await prisma.photo.findUniqueOrThrow({
		where: {
			id: photoId,
			userId
		},
	});
}


export const createPhoto = async (userId: number, data: CreatePhoto) => {
    return await prisma.photo.create({
        data: {
            ...data,
            userId 
        },
    });
}


export const updatePhoto = async (photoId: number, userId: number, data: UpdatePhoto) => {
	return await prisma.photo.update({
		where: {
			id: photoId,
			userId,
		},
		data,
	});
}

export const deletePhoto = async (photoId: number, userId: number) => {
	return await prisma.photo.delete({
		where: {
			id: photoId,
			userId
		},
	});
}