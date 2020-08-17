function solveTime() {
    const now = new Date()
    let y = (now.getFullYear() + '').padStart(2, '0')
    let M = (now.getMonth() + 1 + '').padStart(2, '0')
    let d = (now.getDate() + '').padStart(2, '0')
    let h = (now.getHours() + 8 + '').padStart(2, '0')
    let m = (now.getMinutes() + '').padStart(2, '0')
    let s = (now.getSeconds() + '').padStart(2, '0')

    return `${y}-${M}-${d} ${h}:${m}:${s}`
}

module.exports = solveTime