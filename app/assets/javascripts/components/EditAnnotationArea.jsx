class EditAnnotationArea extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleCancelClick  = this.handleCancelClick.bind(this)
  }

  handleSubmitClick(text, position) {
    const { handleSubmitClick } = this.props.actions
    handleSubmitClick(text, position)
  }

  handleCancelClick() {
    const { handleCancelClick } = this.props.actions
    handleCancelClick()
  }

  render() {
    const { position } = this.props

    return(
      <div className="NewAnnotationArea">
        <AnnotationForm
          position={ position }
          handleSubmitClick={ this.handleSubmitClick }
          handleCancelClick={ this.handleCancelClick }
        />
      </div>
    )
  }
}
