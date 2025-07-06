```javascript
import React from 'react';

class StreamingService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: null,
    };
  }

  componentDidMount() {
    this.setupStream();
  }

  setupStream = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.setState({ stream });
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });
  }

  stopStream = () => {
    const { stream } = this.state;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      this.setState({ stream: null });
    }
  }

  render() {
    const { stream } = this.state;

    return (
      <div>
        {stream && <video srcObject={stream} autoPlay />}
        <button onClick={this.stopStream}>Stop Stream</button>
      </div>
    );
  }
}

export default StreamingService;
```

This is a basic implementation of a streaming service using the WebRTC technology. It uses the getUserMedia API to access the user's webcam and microphone. The stream is then displayed in a video element. There is also a button to stop the stream. Please note that this is a very basic implementation and does not include any error handling or fallbacks for browsers that do not support the getUserMedia API. It also does not include any functionality for streaming to other users. For a full-featured streaming service, you would need to implement a signaling server to handle the exchange of WebRTC offers and answers, and a STUN/TURN server to handle NAT traversal.