import { createRoot } from 'react-dom/client'
import Main from './App.tsx'
import '@radix-ui/themes/styles.css'
import './assets/stylesheets/main.css'

createRoot(document.getElementById('root')!).render( <Main />,);