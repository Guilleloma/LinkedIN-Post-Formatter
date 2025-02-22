import Editor from './components/Editor'
import ActionButtons from './components/ActionButtons'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <div className="flex-grow">
        <Editor />
      </div>
      <ActionButtons />
      <Analytics />
    </div>
  )
}

export default App
