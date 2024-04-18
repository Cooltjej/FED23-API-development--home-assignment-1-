import prisma from "../prisma";
import { CreateAlbum, UpdateAlbum } from "../types/album-types";
import { PhotoId } from "../types/photo-types";

export const getAlbums = async (userId: number) => {
	return await prisma.album.findMany({
		where: {
			userId,
		}
	});
}

export const getAlbumById = async (albumId: number, userId: number, ) => {
	return await prisma.album.findUniqueOrThrow({
		where: {
			id: albumId,
			userId
		},
		include: {
			photos: true,
		},
	});
}

export const createAlbum = async (userId: number, data: CreateAlbum) => {
	console.log(userId, data)
	return await prisma.album.create({
		data: {
			...data,
			userId
		}
	});
}

export const updateAlbum = async (albumId: number, userId: number, data: UpdateAlbum) => {
	return await prisma.album.update({
		where: {
			id: albumId,
			userId,
		},
		data,
	});
}

export const addPhotosToAlbum = async (photoId: PhotoId | PhotoId[], albumId: number, userId: number) => {
	return await prisma.album.update({
		where: {
			id: albumId,
			userId
		},
		data: {
			photos: {
				connect: photoId,
			},
		},
		include: {
			photos: true,
		}
	});
}

export const deletePhotofromAlbum = async (photoId: number, albumId: number, userId: number) => {
	return await prisma.photo.update({
		where: {
			id: photoId,
			userId
		},
		data: {
			album: {
				disconnect: {
					id: albumId,
				},
			},
		},
		include: {
			album: true,
		}
	});
}

export const deleteAlbum = async (albumId: number, userId: number) => {
	return await prisma.album.delete({
		where: {
			id: albumId,
			userId
		},
	});
}
