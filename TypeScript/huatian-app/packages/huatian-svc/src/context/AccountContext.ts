import { UserRepository } from "../repo/UserRepository"

export class AccountContext {

    private static inst: AccountContext
    private repo: UserRepository = UserRepository.getInstance()

    public static getInstance() {
        if (!AccountContext.inst) {
            AccountContext.inst = new AccountContext()
        }
        return AccountContext.inst
    }

    public async verify(uname: string, passwd: string) {
        const user = this.repo.getUser(uname, passwd)
        return user
    }
}