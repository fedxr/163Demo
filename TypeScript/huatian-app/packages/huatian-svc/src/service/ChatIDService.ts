import { ChatIDSetDao } from "../dao/Dao"
import { DB } from "../dao/DB"

const STEP = 100000 //服务器一次分配的数量上限
export class ChatIDService {
    private static inst: ChatIDService = new ChatIDService()

    private id_base: number = -1
    private id_start: number = 0

    public static getInstance() : ChatIDService {
        return ChatIDService.inst
    }

    /* 
        返回一个id集合
        比如：0~999
    */
    private async requestIdSet() {
        if (this.id_base >= this.id_start && this.id_base < this.id_start + STEP) {
            return
        }

        const sequelize = DB.getSequelize()
        const transction = await sequelize.transaction()

        try {
            // 拿到最后一条记录
            const lastRecord = await ChatIDSetDao.findOne({
                order: [["id", "desc"]],
                lock: transction.LOCK.UPDATE //锁，防止并发
            })
    
            const startNumber = lastRecord ?
                lastRecord.getDataValue("start") + 10000 : 0
            
            await ChatIDSetDao.create({
                app: "test",
                start: startNumber
            })

            this.id_start = startNumber
            this.id_base = startNumber

        } catch (e) {
            console.error(e)
            transction.rollback() 
        }
    }

    public async getId() {
        await this.requestIdSet()
        return this.id_base++
    }
}