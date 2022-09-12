import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '@near-wallet-selector/modal-ui/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { Buffer } from 'buffer'

window.Buffer = window.Buffer || Buffer

const container = document.getElementById('root')
// @ts-ignore
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<App />)
