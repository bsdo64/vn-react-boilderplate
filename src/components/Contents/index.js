import React, { Component } from 'react';
import { LazilyLoadFactory } from '../LazilyLoad';

class Contents extends Component {

  static defaultProps = { message: '' };
  static propTypes = {
    message: React.PropTypes.string.isRequired,
    displayMessage: React.PropTypes.func.isRequired
  };

  sayHello = () => this.props.displayMessage(words[Math.floor(Math.random() * words.length)]);

  render() {
    return (
      <div key="1">
        <h1 onClick={this.sayHello}>Hello</h1>
        <p className="world">{this.props.message}</p>
      </div>
    );
  }
}

const words = [
  "Hommie",
  "Dude",
  "Super Dev",
  "Dev",
  "Reduxer",
  "YOLO",
  "BYE",
  "Crazy",
  "Superman",
  "Github",
  "React",
  "Redux",
  "Facebook",
  "Duck",
  "SHIELD",
  "Captain",
  "World",
  "Mars",
  "Webpack",
  "You",
  "Hello",
  "Japanese people",
  "Gaeron!",
];

export default LazilyLoadFactory(Contents, {});
