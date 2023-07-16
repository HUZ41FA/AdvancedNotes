import { useEffect, useState } from "react";

export function useLocalStorageHook<T>(key : string, initialValue : T | (() => T)){
    const [value, setValue] = useState<T>(()=>{
        
        let jsonValue = localStorage.getItem(key);
        if(jsonValue === null){
            if(typeof initialValue === "function"){
                (initialValue as () => T)();
            }else{
                return initialValue;
            }
        }else{
            return JSON.parse(jsonValue);
        }
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue];
}