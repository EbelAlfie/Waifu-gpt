export interface TurnResponse { 
    turns: ChatTurnHistory[]
}

export type ChatTurnHistory = {
    turnKey: TurnKey,
    createTime: string,
    lastUpdatedTime: string,
    state: string,
    author: AuthorModel,
    candidates: CandidatesModel[],
    primaryId: string
}

export type TurnKey = {
    chatId: string,
    turnId: string
}

export type AuthorModel = {
    authorId: string, //Either char id, me or another
    isHuman: Boolean,
    name: string
}

export type CandidatesModel = {
    candidateId: string,
    createTime: string,
    rawContent: string,
    isFinal: Boolean
}