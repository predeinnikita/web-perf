export const timeInMsToString = (timeInMs: number) => {
    if (timeInMs >= 60 * 1000) {
        return `${(timeInMs / 60000).toFixed()}min`
    }

    if (timeInMs >= 1000) {
        return `${(timeInMs / 1000).toFixed()}s`
    }

    return `${timeInMs.toFixed()}ms`
}
