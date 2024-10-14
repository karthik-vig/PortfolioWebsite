import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import './assets/stylesheets/main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme
      accentColor="blue"
      grayColor="slate"
      appearance="dark"
      radius="large"
      scaling="100%"
      panelBackground="translucent"
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
      className="\
      bg-gradient-to-r from-sky-500 to-purple-500 \
      "
    >
      <App />
    </Theme>    
  </StrictMode>,
)
