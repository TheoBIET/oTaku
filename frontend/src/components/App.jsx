import {Component} from 'react';

import Navbar from './Navbar';
import Navigation from './Navigation';


class App extends Component {
  render() {
    return (
      <div id="App">
        <Navbar />
        <Navigation />
      </div>
    );
  }
}

export default App;