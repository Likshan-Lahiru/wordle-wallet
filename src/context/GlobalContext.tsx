import React, {useState, createContext, useContext, ReactNode} from 'react'
interface GlobalContextType {
    transactionId: string | null
    setTransactionId: (id: string) => void
}
const GlobalContext = createContext<GlobalContextType>({
    transactionId: null,
    setTransactionId: () => {},
})
export const useGlobalContext = () => useContext(GlobalContext)
interface GlobalProviderProps {
    children: ReactNode
}
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [transactionId, setTransactionId] = useState<string | null>(null)
    const value = {
        transactionId,
        setTransactionId,
    }
    return (
        <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    )
}
