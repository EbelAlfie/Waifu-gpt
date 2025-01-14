import { AuthorModel } from "@/domain/model/ChatTurnHistory"

export type ChatListModel = {
    message: string,
    author: AuthorModel,
    createTime: string
}