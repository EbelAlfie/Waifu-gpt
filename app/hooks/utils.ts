import { Context, useContext } from "react"

export const useDynamicContext = <T>(context: Context<any>) : T => {
    const character = useContext(context) 
    return character as T
}