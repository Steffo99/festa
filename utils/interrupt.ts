import { NextApiResponse } from "next"

/**
 * Pseudo-decorator which intercepts thrown {@link Interrupt}s and turns them into HTTP responses.
 */
export async function handleInterrupts(res: NextApiResponse, f: () => Promise<void>) {
    try {
        return await f()
    }
    catch(e) {
        if(e instanceof Interrupt) {
            return res.status(e.status).json(e.response)
        }
    }
}

/**
 * Error which interrupts the regular flow of a function to return a specific HTTP response.
 * 
 * Caught by {@link interruptHandler}.
 */
export class Interrupt<R extends {}> {
    status: number
    response: R

    constructor(status: number, response: R) {
        this.status = status
        this.response = response
    }
}