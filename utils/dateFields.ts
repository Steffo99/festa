export function toDatetimeLocal(date: Date | null | undefined): string | undefined {
    if (date === undefined) {
        return undefined
    }
    else if (date === null) {
        return ""
    }
    else {
        return date.toISOString().match(/(.+)[Z]$/)![1]
    }
}

export function fromDatetimeLocal(str: string): Date | null {
    if (str === "") {
        return null
    }
    else {
        return new Date(`${str}Z`)
    }
}