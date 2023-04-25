import { Message } from "../../../huatian-model/src/Message"
import { UserRepository } from "../repo/UserRepository"
import { ChatIDService } from "../service/ChatIDService"

export class ChatContext {
    private static inst = new ChatContext()
    private repo = UserRepository.getInstance()

    public static getInstance() {
        return ChatContext.inst
    }

    public async send(uid: number, msg: Message) {
        const sentMsg = {...msg}
        const toReceiveMsg = {...msg}
        sentMsg.id = await ChatIDService.getInstance().getId()
        toReceiveMsg.id = await ChatIDService.getInstance().getId()
        msg.from = uid
        const from = this.repo.getUser(msg.from)
        const to = this.repo.getUser(msg.to)
        const session = from.chat().createChatSession(to)
        session.chat(sentMsg, toReceiveMsg)
        return sentMsg.id
    }

    public read(uid: number, lastId: number) {
        const user = this.repo.getUser(uid)
        return user.chat().unReadMessage(lastId)
    }
}