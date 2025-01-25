export function verifyDate(startDate){
    if(!startDate){
        return false
    } else {
        const todayDate = generateDate().split('/').reverse().join('-')
        const inputDate = startDate.split('/').reverse().join('-')

        const verifyInputDate = inputDate.split('-').map(Number)
        if (verifyInputDate.some(v => v <= 0)) {
            return false
        }

        return todayDate >= inputDate
    }
}