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
    const currentItemPosition = parseInt(this.state.currentItemPosition)
    dropZonePosition = parseInt(dropZonePosition)

    let galleryItems = {}
    let self = this

    if (currentItemPosition == 0 && dropZonePosition == 0) {
      JSON.parse(this.props.galleryItems).forEach(function(item, index) {
        galleryItems[item.position] = item
      })
    } else {
      let galleryItemsKeys = Object.keys(this.state.galleryItems)
      let galleryItemsArray = []

      if (dropZonePosition > currentItemPosition) {
        dropZonePosition = dropZonePosition - 1
      }

      galleryItemsKeys.splice(currentItemPosition - 1, 1)
      galleryItemsKeys.splice(dropZonePosition, 0, currentItemPosition)

      galleryItemsKeys.forEach(function(key, index) {
        let item = self.state.galleryItems[key]
        index = parseInt(index) + 1
        item.position = index
        galleryItems[index] = item
      })

      Object.keys(galleryItems).forEach(function(key) {
        galleryItemsArray.push(galleryItems[key])
      })

      this.ajaxPost(this.props.url, {
        gallery_items: galleryItemsArray
      })
    }

    this.setState({
      galleryItems: galleryItems
    })
  }

  ajaxPost(url, data) {
    $.ajax({
      dataType: "json",
      method: "POST",
      url: url,
      data: data
    }).done(function(data, textStatus, jqXHR) {
      console.log("done", data, textStatus, jqXHR)
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log("error", jqXHR, textStatus, errorThrown)
    }).always(function() {
      console.log("complete")
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

    elements.push(
      <div className="separator" key="firstDropZone" data-position={ 0 } onDragOver={ self.over } onDrop={ self.drop }></div>
    )

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
      } else {
        elements.push(
          <div className="galleryItem galleryAnnotation" key={ index }  data-position={ item.position } draggable="true" onDragStart={ self.drag }>
            <div className="content">
              <div className="handle"></div>
              <p>{ item.body }</p>
            </div>
          </div>
        )
      }

      elements.push(
        <div className="separator" key={ "s" + index } data-position={ item.position } onDragOver={ self.over } onDrop={ self.drop }></div>
      )
    })

    return elements
  }

  render() {
    let styles = {
      backgroundColor: '#' + this.props.background
    }

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
