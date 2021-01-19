const storage = {
    set(key, value) {
        localStorage.getItem(key, JSON.stringify(value))
    },
    get(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    del(key) {
        localStorage.removeItem(key)
    }
}
export default storage