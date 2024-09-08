export type Action<T=any> = {
    type: string,
    payload?: T 
}
export type ActionCreator<T=undefined> =(...args: any[]) => Action