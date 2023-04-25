export enum MessageStatus {
    SENDING = 0,
    SENT,
    RECEIVING,
    RECEIVED,
    READED,
    ERROR
}

export enum MessageType {
    SEND = 0,
    RECEIVED,
    SYSTEM,
    NOTIFY
}

export type Message = TextMessage | ImageMessage

interface MessageData {
    id: number,
    status: MessageStatus,
    type: MessageType,
    from: number,
    to: number
}

export interface TextMessage extends MessageData {
    msg: string
}

export interface ImageMessage extends MessageData {
    url: string
}