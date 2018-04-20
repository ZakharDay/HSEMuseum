class AnnotationForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }

    this.handleTextChange  = this.handleTextChange.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
  }

  componentDidMount() {
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  handleSubmitClick() {
    const { position, handleSubmitClick } = this.props
    const { text } = this.state

    if (text.length != 0) {
      handleSubmitClick(text, position)
    }
  }

  handleCancelClick() {
    const { handleCancelClick } = this.props
    handleCancelClick()
  }

  render() {
    const { position } = this.props
    const { text } = this.state
    let classes = "submitButton"

    if (text.length == 0) {
      classes += " disabled"
    }

    return(
      <div className="AnnotationForm">
        <textarea placeholder="Annonation" onChange={ this.handleTextChange } />

        <div className="action">
          <div className={ classes } onClick={ this.handleSubmitClick }>Create</div>
          <div className="cancelLink" onClick={ this.handleCancelClick }>Cancel</div>
        </div>
      </div>
    )
  }
}
