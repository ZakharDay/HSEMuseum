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
    const { item, actions } = this.props
    const { handleDragOver } = actions
    const { handleDrop } = this

    return(
      <div className="GalleryDropZone" onDragOver={ handleDragOver } onDrop={ handleDrop }>
        <NewAnnotationButton
          item={ item }
          actions={ actions }
        />
      </div>
    )
  }
}
