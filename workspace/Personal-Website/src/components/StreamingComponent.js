```javascript
import React, { Component } from 'react';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; // import css

class StreamingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', // sample video source
    };
  }

  render() {
    return (
      <div>
        <Player
          playsInline
          poster="/assets/poster.png"
          src={this.state.source}
        />
      </div>
    );
  }
}

export default StreamingComponent;
```

This is a simple implementation of a streaming component using the video-react library. The video source is currently set to a sample video, but you can replace it with your own streaming source. The Player component from the video-react library is used to display the video. The playsInline prop is set to true to allow the video to be played inline in the browser. The poster prop is set to a sample poster image, but you can replace it with your own image.