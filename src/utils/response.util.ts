// src/utils/response.util.ts

export const successResponse = (
    message: string,
    data: any,
    statusCode = 200,
) => ({
    statusCode,
    success: true,
    message,
    data,
});

export const errorResponse = (
    message: string,
    errorCode: string,
    statusCode = 400,
) => ({
    statusCode,
    success: false,
    errorCode,
    message,
});
