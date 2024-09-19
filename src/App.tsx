import { Component, ChangeEvent, createRef } from 'react'
import QrCode from 'qrcode'

import './App.css'

class App extends Component {
  state = { text: 'Helllo!' }
  canvasRef = createRef<HTMLCanvasElement>()

  componentDidMount() {
    this.generate();
  }

  changeText = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      text: event.target.value
    })
  }

  generate = () => {
    const canvas = this.canvasRef.current
    if (!canvas) {
      console.error('error loading canvas')
      return
    }

    if (this.state.text.trim().length == 0) {
      return;
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
          <input placeholder="Input text..." 
            value={this.state.text} 
            onChange={this.changeText} />
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
