export interface GeneralError extends Error {
    code: string | undefined,
    message: string
}