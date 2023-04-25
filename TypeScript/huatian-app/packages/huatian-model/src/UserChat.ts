import { ChatSession } from "./ChatSession";
import { Message, MessageStatus, MessageType } from "./Message";
import { User } from "./User";

export class UserChat {
    private user: User
    private msgs: Array<Message> = []
    private sessions: Record<number, ChatSession> = {}

    constructor(user: User) {
        this.user = user
    }

    public createChatSession(to: User) {
        if (this.sessions[to.getId()]) {
            return this.sessions[to.getId()]
        }
        const session = new ChatSession(this.user, to)
        this.sessions[to.getId()] = session
        return session
    }

    public send(msg: Message) {
        this.msgs.push(msg)
        msg.status = MessageStatus.SENT
        msg.type = MessageType.SEND
    }

    public receive(msg: Message) {
        this.msgs.push(msg)
        msg.status = MessageStatus.RECEIVING
        msg.type = MessageType.RECEIVED
    }

    /**
     * 读消息
     */
    public readTo(lastId: number) {
        const unreads = this.msgs.filter(x => x.id <= lastId && x.status === MessageStatus.RECEIVED)
        unreads.forEach(msg => {
            msg.status = MessageStatus.READED
        })
    }

    /**
     * unReadMessage
     * 未读消息
     */
    public unReadMessage(lastId: number) {
        // 最后一条消息
        return this.msgs.filter(x => x.id > lastId)
    }
}