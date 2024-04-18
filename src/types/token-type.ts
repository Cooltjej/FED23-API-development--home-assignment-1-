//the amount of types. JWT token type.

export type JwtAuthenticationData = {
    sub: number,
    first_name: string
    last_name: string,
    email: string,
};

export type JwtRefreshAuthenticationData = Pick<JwtAuthenticationData, "sub">;