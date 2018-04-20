class GalleryDropZone extends React.Component {
  constructor(props) {
    super(props)

    this.handleDrop = this.handleDrop.bind(this)
  }

  handleDrop() {
    console.log('TEST')
    const { position, actions } = this.props
    const { handleDrop } = actions

    handleDrop(position)
  }

  render() {
    const { position, actions } = this.props
    const { handleDragOver, handleNewAnnotationSubmitClick } = actions

    return(
      <div className="GalleryDropZone" onDragOver={ handleDragOver } onDrop={ this.handleDrop }>
        <NewAnnotationArea position={ position } handleSubmitClick={ handleNewAnnotationSubmitClick } />
      </div>
    )
  }
}
