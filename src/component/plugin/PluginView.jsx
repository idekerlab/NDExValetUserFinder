import React from 'react'

class TextBox extends React.Component {

  constructor(props) {
    super(props)
  }

  handleChange(event) {
    this.props.fieldActions.updateQuery(event.target.value)
  }

  render() {
    const style = {
      margin: '2%',
      marginBottom: 0,
      height: '80%',
      width: '95%',
      resize: 'none',
      border: 0,
      fontSize: 20,
      overflowY: 'auto'
    }
    return (
        <textarea
          style={style}
          placeholder="Enter your search terms here..."
          value={this.props.fields.query}
          onChange={this.handleChange.bind(this)}
        />
    )
  }

}

export default {
  icon: "circle",
  plugin: TextBox
}
