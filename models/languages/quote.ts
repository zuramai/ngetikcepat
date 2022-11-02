export interface Quotes {
    language: string
    groups: Array<[number, number]>
    quotes: Quote[]
}
export interface Quote {
    id: number
    text: string 
    source: string 
    length: number 
}