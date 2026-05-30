import type { LetterStatus } from "#/store/BoardContext"

export default function finalMultiplierCalc(statuses: (LetterStatus | null)[][], multipliers: (number | null)[][]) {
    const multiplierChecked = statuses.map((row, i) => {
        const newRow = row.map((status, j) => {
            console.log(status, multipliers[i][j])
            if (status === 'correct') {
                return multipliers[i][j] === null ? 0 : multipliers[i][j]
            } else if (status === "present") {
                return multipliers[i][j] === null ? 0 : multipliers[i][j] * 0.5
            } else {
                return 0
            }
        })

        console.log(newRow)

        const sum = newRow.reduce((acc, current) => acc+current, 0)
        return sum
    })

    const sum = multiplierChecked.reduce((acc, current) => acc+current, 0)
    return sum
}