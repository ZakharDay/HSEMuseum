class GalleryEdit extends React.Component {
  drag() {
    console.log('Drag')
  }

  drop() {
    console.log('Drop')
  }

  enter(e) {
    e.preventDefault()
    console.log('Enter')
  }

  renderGalleryItems() {
    let elements = []
    let galleryItems = JSON.parse(this.props.galleryItems)
    let self = this

    galleryItems.forEach(function(item, index) {
      if (typeof item.artwork_id !== 'undefined') {
        elements.push(
          <div className="galleryItem galleryExhibition" key={ index } draggable="true" onDragStart={ self.drag } onDrop={ self.drop }>
            <div className="content">
              <div className="handle"></div>
              <h2>{ item.artwork.title }</h2>
              <p>{ item.artwork.year }</p>
              <img src={ item.artwork.image } />
            </div>
          </div>
        )

        elements.push(
          <div className="separator" onDragOver={ self.enter } key={ "s" + index }></div>
        )
      } else {
        elements.push(
          <div className="galleryItem galleryAnnotation" key={ index }>
            <div className="content">
              <div className="handle"></div>
              <p>{ item.body }</p>
            </div>
          </div>
        )
      }
    })

    return elements
  }

  // renderGalleryItem(item) {
  //   return(
  //     <div>
  //       { item }
  //     </div>
  //   )
  // }

  render() {
    let styles = {
      backgroundColor: '#' + this.props.background
    }

    let test = ['a', 'b', 'c']

    return (
      <section className="galleryWrapper" style={ styles }>
        <header>
          <h1>
            { this.props.title }
          </h1>
        </header>

        <section className="galleryContainer">
          <div className="galleryZeroAnnotation">
            <div className="separator"></div>
          </div>

          { this.renderGalleryItems() }
        </section>
      </section>
    )
  }
}
