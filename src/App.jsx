import Editor from './components/Editor'
import ActionButtons from './components/ActionButtons'
import './App.css'

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <div className="flex-grow">
        <Editor />
      </div>
      <ActionButtons />
    </div>
  )
}

export default App
