import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './styles/index.css'

// Add Google Fonts and Material Symbols
const fontLink = document.createElement('link')
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Poppins:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
fontLink.rel = 'stylesheet'
document.head.appendChild(fontLink)

const iconLink = document.createElement('link')
iconLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
iconLink.rel = 'stylesheet'
document.head.appendChild(iconLink)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#333',
                            color: '#fff',
                            borderRadius: '12px',
                        },
                        success: {
                            style: {
                                background: '#28A745',
                            },
                        },
                        error: {
                            style: {
                                background: '#dc3545',
                            },
                        },
                    }}
                />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
