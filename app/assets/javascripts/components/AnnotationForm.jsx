class AnnotationForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleTextChange  = this.handleTextChange.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
  }

  componentDidMount() {
  }

  handleTextChange(e) {
    let { item } = this.props
    const { id, type, body, nextBody, position } = item
    const { actions } = this.props
    const { handleAnnotationTextChange } = actions

    item = {
      id:       id,
      type:     type,
      body:     body,
      nextBody: e.target.value,
      position: position
    }

    handleAnnotationTextChange(item)
  }

  handleSubmitClick() {
    const { item, actions } = this.props
    const { handleAnnotationSubmitClick } = actions

    handleAnnotationSubmitClick(item)
  }

  handleCancelClick() {
    const { item, actions } = this.props
    const { handleAnnotationCancelClick } = actions

    handleAnnotationCancelClick(item)
  }

  render() {
    const { type, position, body, nextBody } = this.props.item
    let classes = "submitButton"
    let buttonText = type == "newAnnotation" ? "Create" : "Update"

    if (nextBody.length == 0 || body == nextBody) {
      classes += " disabled"
    }

    return(
      <div className="AnnotationForm">
        <textarea value={ nextBody } placeholder="Annonation" onChange={ this.handleTextChange } />

        <div className="action">
          <div className={ classes } onClick={ this.handleSubmitClick }>{ buttonText }</div>
          <div className="cancelLink" onClick={ this.handleCancelClick }>Cancel</div>
        </div>
      </div>
    )
  }
}
