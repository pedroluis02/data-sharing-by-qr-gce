import { Component, ChangeEvent, createRef } from 'react'
import QrCode from 'qrcode'

import './App.css'

class App extends Component {
  state = { text: 'Helllo!' }
  canvasRef = createRef<HTMLCanvasElement>()

  componentDidMount() {
    this.generate()
  }

  setText(text: string) {
    this.setState({ text: text })
  }

  onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    this.setText(event.target.value)
  }

  setTextFromCurrentTabUrl = async () => {
    const tab = await this.getCurrentTab()
    if (tab.url) {
      console.log(`current-url: ${tab.url}`)
      this.setText(tab.url)

    }
  }

  getCurrentTab = async () => {
    const options = { active: true, currentWindow: true }
    const [currentTab] = await chrome.tabs.query(options)
    return currentTab
  }

  generate = () => {
    const canvas = this.canvasRef.current
    if (!canvas) {
      console.error('error loading canvas')
      return
    }

    if (this.state.text.trim().length == 0) {
      return
    }

    const options =  {
      width: 200,
      color: { dark: '#0000ffff' }
    }

    QrCode.toCanvas(canvas, this.state.text, options, (error) => {
      if (error) {
        console.error(error)
      } else {
        console.log('sucess!')
      }
    })
  }

  render() {
    return (
      <>
        <h1>Data sharing by QR Code</h1>
        <div className="card">
        <a href="#" onClick={this.setTextFromCurrentTabUrl}>Current Tab URL</a>
        <p />
          <input placeholder="Input text..." 
            value={this.state.text} 
            onChange={this.onChangeText} />
          <p />
          <button onClick={this.generate}>Genearte</button>
          <p>{this.state.text}</p>
          <canvas ref={this.canvasRef} />
        </div>
        <div className="read-the-docs">
          Scan this QR code!
        </div>
      </>
    )
  }
}

export default App
