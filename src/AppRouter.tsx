import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { GlobalProvider } from './context/GlobalContext'
export function AppRouter() {
    return (
        <BrowserRouter>
            <GlobalProvider>
                <App />
            </GlobalProvider>
        </BrowserRouter>
    )
}
