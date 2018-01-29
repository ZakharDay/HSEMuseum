class GalleryEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      galleryItems: {},
      currentItemPosition: 0,
      // dropZonePosition: 0
    }
    this.drag = this.drag.bind(this)
    this.drop = this.drop.bind(this)
    this.over = this.over.bind(this)
  }

  componentDidMount() {
    this.sortGalleryItems(0)
  }

  sortGalleryItems(dropZonePosition) {
    // const { currentItemPosition } = this.state

    const currentItemPosition = parseInt(this.state.currentItemPosition)
    dropZonePosition = parseInt(dropZonePosition)

    let galleryItems = {}
    let self = this

    if (currentItemPosition == 0 && dropZonePosition == 0) {
      JSON.parse(this.props.galleryItems).forEach(function(item, index) {
        galleryItems[item.position] = item
      })
    } else {
      Object.keys(this.state.galleryItems).forEach(function(index) {

        index = parseInt(index)
        console.log(index, dropZonePosition, currentItemPosition)
        let item = self.state.galleryItems[index]

        if (dropZonePosition < currentItemPosition) {
          if (index < dropZonePosition) {
            galleryItems[item.position] = item
          } else if (index == dropZonePosition) {
            let currentElement = self.state.galleryItems[currentItemPosition]
            currentElement.position = item.position + 1
            galleryItems[item.position] = item
            galleryItems[item.position + 1] = currentElement
          } else if (index > dropZonePosition && index < currentItemPosition) {
            item.position = item.position + 1
            galleryItems[item.position] = item
          } else if (index > dropZonePosition && index > currentItemPosition) {
            galleryItems[item.position] = item
          } else {
            console.log('Moved element', item)
          }
        } else {
          if (index < currentItemPosition) {
            galleryItems[item.position] = item
          } else if (index == currentItemPosition) {
            console.log('Empty slot')
          } else if (index > currentItemPosition && index < dropZonePosition) {
            console.log('Test')
            item.position = item.position - 1
            galleryItems[item.position] = item
          } else if (index == dropZonePosition) {
            let currentElement = self.state.galleryItems[currentItemPosition]
            currentElement.position = item.position + 1
            galleryItems[item.position] = item
            galleryItems[item.position + 1] = currentElement
          } else if (index > dropZonePosition) {
            galleryItems[item.position] = item
          } else {
            console.log('Else')
          }
        }

      })
    }

    this.setState({
      galleryItems: galleryItems
    })
  }

  drag(e) {
    // console.log('Drag', e, e.target, e.target.dataset.position, this.state)

    this.setState({
      currentItemPosition: e.target.dataset.position
    })
  }

  drop(e) {
    // console.log('Drop', e, e.target, e.target.dataset.position, this.state)

    // this.setState({
    //   dropZonePosition: e.target.dataset.position
    // })

    this.sortGalleryItems(e.target.dataset.position)
  }

  over(e) {
    e.preventDefault()
    // console.log('Enter', this.state)
  }

  renderGalleryItems() {
    let elements = []
    let self = this

    Object.keys(this.state.galleryItems).forEach(function(index) {
      let item = self.state.galleryItems[index]

      if (typeof item.artwork_id !== 'undefined') {
        elements.push(
          <div className="galleryItem galleryExhibition" key={ index } data-position={ item.position } draggable="true" onDragStart={ self.drag }>
            <div className="content">
              <div className="handle"></div>
              <h2>{ item.artwork.title }</h2>
              <p>{ item.artwork.year }</p>
              <img src={ item.artwork.image } />
            </div>
          </div>
        )

        elements.push(
          <div className="separator" key={ "s" + index } data-position={ item.position } onDragOver={ self.over } onDrop={ self.drop }></div>
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
