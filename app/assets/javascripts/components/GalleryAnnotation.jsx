class GalleryAnnotation extends React.Component {
  constructor(props) {
    super(props)

    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  handleDragStart() {
    const { item, actions } = this.props
    const { handleDragStart } = actions

    handleDragStart(item.position)
  }

  handleEditClick() {
    const { item, actions } = this.props
    const { handleAnnotationEditClick } = actions

    handleAnnotationEditClick(item)
  }

  render() {
    const { body } = this.props.item

    return(
      <div
        className="GalleryAnnotation"
        draggable="true"
        onDragStart={ this.handleDragStart }>

        <div className="content">
          <p>{ body }</p>
        </div>

        <div className="action">
          <div className="editLink" onClick={ this.handleEditClick }>Edit</div>
        </div>

      </div>
    )
  }
}
