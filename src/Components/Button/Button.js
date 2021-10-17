import React, { Component } from 'react';
import './Button.module.css';
class Button extends Component {
  state = {
    pageNum: 1,
  };

  handleClick = e => {
    this.setState(prev => ({ pageNum: prev.pageNum + 1 }));
    setTimeout(() => {
      this.props.onClick(this.state.pageNum);
    }, 100);

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);

    return;
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          Load More
        </button>
      </div>
    );
  }
}

export default Button;
