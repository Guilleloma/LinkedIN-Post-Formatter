import Editor from './components/Editor'
import BuyMeCoffee from './components/BuyMeCoffee'
import './App.css'

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <div className="flex-grow">
        <Editor />
      </div>
      <BuyMeCoffee />
    </div>
  )
}

export default App
