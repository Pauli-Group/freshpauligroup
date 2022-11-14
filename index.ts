export function unzipN<Type>(arr: Type[][]): Type[][] {
    // const arr = cpylck(_arr) as Type[][]

    if (arr.length === 0)
        return []

    // if all subarrays are not same length ... make them so
    const longest_length: number = Math.max(...(arr.map((row) => row.length)))
    const arr2 = arr.map((row) => {
        if (row.length < longest_length) {
            const diff = longest_length - row.length
            return [...row, ...Array.from({ length: diff }, () => '')]
        }
        return row
    })

    return Array.from({ length: arr2[0].length })
        .map((_, i) => Array.from({ length: arr2.length })
            .map((_, k) => arr2[k][i])) as Type[][]
}
