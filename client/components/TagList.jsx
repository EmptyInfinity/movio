import React from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

class TagList extends React.Component {
  state = {
    text: '',
  };

  addTag = () => {
    const { onChange, value } = this.props;
    const { text } = this.state;
    if (!text.trim()) return;

    onChange([...value, text]);
  };

  removeTag = (index) => {
    let { onChange, value } = this.props;
    value = [...value];
    value.splice(index, 1);
    onChange(value);
  };

  handleKeyDown = (e) => {
    const { value } = this.props;
    const { text } = this.state;
    const { code } = e;

    if (code === 'Enter' && text) {
      this.addTag();
      this.setState({ text: '' });
    }

    if (code === 'Backspace' && !text) {
      const index = value.length - 1;
      const item = value[index];
      this.removeTag(index);
      this.setState({ text: item });
      e.preventDefault();
    }
  };

  handleBlur = (e) => {
    const { text } = this.state;

    if (text) {
      this.addTag();
      this.setState({ text: '' });
    }
  };

  render() {
    const { value = [], className, onChange, disabled, ...rest } = this.props;
    const { text } = this.state;

    return (
      <div className="tag-list">
        {value.map((item, index) => (
          <Badge pill variant="secondary" key={index}>
            {item}
            <span className="remove" onClick={() => this.removeTag(index)}>
              x
            </span>
          </Badge>
        ))}
        <Form.Control
          type="text"
          placeholder="Type & press enter"
          value={text}
          onChange={(e) => this.setState({ text: e.currentTarget.value })}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default TagList;
