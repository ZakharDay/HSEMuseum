class NewAnnotationArea extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newAnnotationAreaView: 'button'
    }

    this.handleNewFormClick = this.handleNewFormClick.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleCancelClick  = this.handleCancelClick.bind(this)
  }

  componentDidMount() {
  }

  handleSubmitClick(text, position) {
    this.props.handleSubmitClick(text, position)

    this.setState({
      newAnnotationAreaView: 'button'
    })
  }

  handleNewFormClick() {
    this.setState({
      newAnnotationAreaView: 'form'
    })
  }

  handleCancelClick() {
    this.setState({
      newAnnotationAreaView: 'button'
    })
  }

  renderNewAnnotationButton() {
    return(
      <NewAnnotationButton handleClick={ this.handleNewFormClick } />
    )
  }

  renderAnnotationForm() {
    const { position } = this.props
    return(
      <AnnotationForm
        position={ position }
        handleSubmitClick={ this.handleSubmitClick }
        handleCancelClick={ this.handleCancelClick }
      />
    )
  }

  renderLoader() {
    return(
      <div>Loading...</div>
    )
  }

  render() {
    const { newAnnotationAreaView } = this.state

    return(
      <div className="NewAnnotationArea">
        { newAnnotationAreaView == 'button' ? this.renderNewAnnotationButton() : '' }
        { newAnnotationAreaView == 'form'   ? this.renderAnnotationForm()      : '' }
        { newAnnotationAreaView == 'loader' ? this.renderLoader()              : ''}
      </div>
    )
  }
}
