import { createContext } from "react";

type context ={
    value: string | boolean | number;
    setValue: (newValue: string) => void;
    isAuth: boolean;
    setIsAuth:(newValue: boolean) => void
}

export const contextProvider = createContext<context >({
    value: '',
    setValue: () => {},
    isAuth:false,
    setIsAuth:()=>{}
    
  })