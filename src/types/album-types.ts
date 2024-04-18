//album types. create, update, albumId

import { Album } from "@prisma/client";

export type CreateAlbum = Omit<Album, "id">;
export type UpdateAlbum = Partial<CreateAlbum>;
export type AlbumId = Pick<Album, "id">;