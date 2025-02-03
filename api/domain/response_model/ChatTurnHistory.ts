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

export const parseTurn = (turn: any): ChatTurnHistory => {
    const turn_key = turn?.turn_key ?? {}
    const turnKey: TurnKey = {
        chatId: turn_key?.chat_id ?? "",
        turnId: turn_key?.turn_id ?? ""
    }
    const author = {
        authorId: turn.author?.author_id ?? "",
        isHuman: turn.author?.is_human ?? false,
        name: turn.author?.name ?? ""
    }

    const candidates = turn?.candidates?.map((item: any) => {
        const candidateData = {
            candidateId: item?.candidate_id,
            createTime: item?.create_time,
            rawContent: item?.raw_content,
            isFinal: item?.is_final
        }
        return candidateData
    }) ?? []
    return {
        turnKey: turnKey,
        createTime: turn?.create_time,
        lastUpdatedTime: turn?.last_updated_time,
        state: turn?.state,
        author: author,
        candidates: candidates,
        primaryId: turn.primary_id
    }
}