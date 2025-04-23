export type BaseResponse<type> = {
    retcode: number,
    message: string,
    data: type
}