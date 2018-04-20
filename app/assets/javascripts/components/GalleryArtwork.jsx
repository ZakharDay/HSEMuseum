class GalleryArtwork extends React.Component {
  constructor(props) {
    super(props)

    this.handleDragStart = this.handleDragStart.bind(this)
  }

  handleDragStart() {
    const { item, actions } = this.props
    const { handleDragStart } = actions
    
    handleDragStart(item.position)
  }

  render() {
    const { title, year, image } = this.props.item.artwork

    return(
      <div className="GalleryArtwork" draggable="true" onDragStart={ this.handleDragStart }>
        <div className="content">
          <h2>{ title }</h2>
          <p>{ year }</p>
          <img src={ image } />
        </div>
      </div>
    )
  }
}
