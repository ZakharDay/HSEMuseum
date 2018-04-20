class GalleryAnnotation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      view: 'show'
    }

    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  handleDragStart() {
    const { item, actions } = this.props
    const { handleDragStart } = actions

    handleDragStart(item.position)
  }

  handleEditClick() {
    this.setState({
      view: 'edit'
    })
  }

  renderAnnotation() {
    const { body } = this.props.item

    return (
      <div className="content">
        <p>{ body }</p>
      </div>
    )
  }

  renderForm() {
    const { position, actions } = this.props
    const { handleNewAnnotationSubmitClick } = actions

    return (
      <EditAnnotationArea
        position={ position }
        handleSubmitClick={ handleEditAnnotationSubmitClick }
        handleCancelClick={ handleEditAnnotationCancelClick }
      />
    )
  }

  render() {
    const { view } = this.state

    return(
      <div
        className="GalleryAnnotation"
        draggable="true"
        onDragStart={ this.handleDragStart }
        onClick={ this.handleEditClick }>

        { view == 'show' ? this.renderAnnotation() : this.renderForm() }

      </div>
    )
  }
}
