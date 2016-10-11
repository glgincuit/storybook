import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import style from './style';

export default class CommentForm extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = { text: '' };
  }

  onChange(e) {
    const text = e.target.value;
    this.setState({ text });
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.onSubmit();
    }
  }

  onSubmit() {
    const { addComment } = this.props;
    const text = this.state.text.trim();
    if (!text || text === '') {
      return;
    }

    const processedText = text.replace(/\r?\n/g, '<br />');
    addComment(processedText);
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    return (
      <div style={style.wrapper}>
        <Textarea
          style={style.input}
          onChange={e => this.onChange(e)}
          onKeyDown={e => this.handleKeyDown(e)}
          placeholder="Add your comment..."
          value={text}
        >
        </Textarea>
        <button
          style={style.submitButton}
          onClick={() => this.onSubmit()}
        >Submit
        </button>
      </div>
    );
  }
}
