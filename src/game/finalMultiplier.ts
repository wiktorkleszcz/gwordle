import type { LetterStatus } from "#/store/BoardContext"

export default function finalMultiplierCalc(statuses: (LetterStatus | null)[][], multipliers: (number | null)[][]) {
    const multiplierChecked = statuses.map((row, i) => {
        const newRow = row.map((status, j) => {

            if (multipliers[i][j] === null) {
                return 0
            }
            if (status === 'correct') {
                return multipliers[i][j]
            } 

            if (status === "present") {
                return multipliers[i][j] * 0.5
            } 
                return 0
        })

        const sum = newRow.reduce((acc, current) => acc+current, 0)
        return sum
    })

    const sum = multiplierChecked.reduce((acc, current) => acc+current, 0)
    return sum
}