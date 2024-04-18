Photo API with Postman

You are to create a REST API with authentication that will serve as the backend for a future photo application.

------------------------------------------------------------

Requirements Specification:

Note: A user should only be able to view their own albums and photos, and only be able to add their own photos to their own albums.

USERS:  

Register a new account.  

View user information.  

VG: Log in to receive a JWT access token.  

VG: Obtain a JWT access token from a JWT refresh token.  

VG: Update user information (including changing password).  


PHOTOS:  

List their photos.  

Create a new photo.  

Update a photo.  

VG: Delete a photo (also deletes any connections between the photo and albums it belongs to).  

  
ALBUMS:  

List their albums.  

Create new albums.  

Update an album.  

VG: Delete an album (also deletes any connections between the album and the photos it contains).  

  
ALBUM > PHOTOS:  

List photos in an album.  

Add a photo to an album.  

VG: Add multiple photos to an album simultaneously.  

VG: Remove a photo from an album.  

Requirements Specification - Distinction  

Use JWT (including Refresh Tokens) instead of HTTP Basic Auth.  

Use services for all database logic.  

Able to update user profile (including password).  

Able to delete a photo (also removes any links between the photo and albums).  

Able to delete an album (also removes any links between the album and photos).  

Able to add multiple photos simultaneously to an album.  

Able to remove a photo from an album.  

------------------------------------------------------------  

Hygiene Requirements  

The following hygiene requirements must be met regardless of the grade level.  

All source code must be written by yourself (although it's okay to use the Prisma boilerplate provided when accepting the assignment in GitHub Classroom).  

Utilize Express and Prisma.  

Be written in TypeScript.  

Follow REST, CRUD, and Resource Controller patterns.  

All responses adhere to the JSend specification.  

Authentication via HTTP Basic/JWT with password hashing/salting using bcrypt.  

Validation of all incoming data.  

Adhere to specified endpoint specifications (including HTTP method, path, request, and response).  

Error handling (e.g., if the user attempts to access another user's albums or photos, or if the user tries to add a photo that does not belong to them to an album, or add a photo to a non-existent album). Utilize correct HTTP status codes. At least one migration.  

Ensure all source code is correctly indented (of course!). Published on [TBD].  

------------------------------------------------------------  

Version Control  

All development must be version controlled using GitHub Classroom. Regular commits with descriptive commit messages (in English).
