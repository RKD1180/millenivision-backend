export function setLocalStorageWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getDate() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}
export function getLocalStorage(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getDate() > item.expiry) {
        localStorage.removeItem(key)
        return null
    }
    return item.value
}
