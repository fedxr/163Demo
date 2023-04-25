import crypto from 'crypto'

type TokenObject = {
    uid: number,
    token: string,
    expires: number
}

export class Token {
    static inst: Token = new Token()

    static getInstance() {
        return Token.inst
    }

    private cache: Record<string, TokenObject> = {}

    private create(uid: number) {
        const token = Math.random() + '-' + new Date().getTime()
        const expires = new Date().getTime() + 3600 * 24

        const sha = crypto.createHash('sha1') //哈希
        sha.update(token)
        const hash = sha.digest('hex') //16进制

        const tokenObject = {
            uid,
            token: hash,
            expires
        }
        this.catchSet(tokenObject.token, tokenObject)
        return tokenObject
    }

    private catchSet(hash: string, token: TokenObject) {
        this.cache[hash] = token
    }

    private catchGet(hash: string) {
        return this.cache[hash] || null
    }

    public getToken(hash: string) {
        const token = this.catchGet(hash)

        if (!token) {
            return null
        }

        if (token.expires > new Date().getTime()) {
            return token
        }

        return null
    }

    public refreshToken(uid: number) {
        return this.create(uid)
    }

}