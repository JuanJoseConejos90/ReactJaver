
export default {
    email: (string, validationMessage) => {
        return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string)
            ? Promise.resolve()
            : Promise.resolve(validationMessage ? validationMessage : 'Invalid email address')
    },
    url: (string, validationMessage) => {
        return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string)
            ? Promise.resolve()
            : Promise.resolve(validationMessage ? validationMessage : 'Invalid URL')
    }
}