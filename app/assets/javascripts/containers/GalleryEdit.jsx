class GalleryEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      galleryItems: [],
      currentItemPosition: 0,
      newAnnotationAreaView: 'button',
      error: ''
    }

    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleNewAnnotationSubmitClick = this.handleNewAnnotationSubmitClick.bind(this)
    this.handleEditAnnotationSubmitClick = this.handleEditAnnotationSubmitClick.bind(this)
    this.handleEditAnnotationCancelClick = this.handleEditAnnotationCancelClick.bind(this)
  }

  componentDidMount() {
    const galleryItems = this.getGalleryItemsFromProps()

    this.setState({
      galleryItems: galleryItems
    })
  }

  getGalleryItemsFromProps() {
    let { galleryItems } = this.props
    galleryItems = JSON.parse(galleryItems)

    galleryItems.sort(function(a, b) {
      return a.position - b.position
    })

    return galleryItems
  }

  getGalleryItemsFromResponse(data) {
    // galleryItems = JSON.parse(data)

    data.sort(function(a, b) {
      return a.position - b.position
    })

    return data
  }

  addGalleryItem(dropZonePosition, item) {
    const { currentItemPosition, galleryItems } = this.state
    let nextGalleryItems = galleryItems

    nextGalleryItems.splice(dropZonePosition, 0, item)
    nextGalleryItems = this.setPositionOnGalleryItems(nextGalleryItems)

    return nextGalleryItems
  }

  moveGalleryItem(dropZonePosition) {
    const { currentItemPosition, galleryItems } = this.state
    const movingElement = galleryItems[currentItemPosition - 1]
    let nextGalleryItems = galleryItems

    if (dropZonePosition > currentItemPosition) {
      dropZonePosition = dropZonePosition - 1
    }

    nextGalleryItems.splice(currentItemPosition - 1, 1)
    nextGalleryItems.splice(dropZonePosition, 0, movingElement)
    nextGalleryItems = this.setPositionOnGalleryItems(nextGalleryItems)

    return nextGalleryItems
  }

  setPositionOnGalleryItems(items) {
    items.forEach(
      function(item, index) {
        index += 1
        item.position = index
      }
    )

    return items
  }

  ajaxPost(url, data) {
    const { getGalleryItemsFromResponse } = this
    const self = this
    let response = []

    $.ajax({
      dataType: "json",
      method: "POST",
      url: url,
      data: data
    }).done(function(data, textStatus, jqXHR) {
      console.log("done", data, textStatus, jqXHR)

      self.setState({
        currentItemPosition: 0,
        galleryItems: data,
        error: ''
      })
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log("error", jqXHR, textStatus, errorThrown)

      self.setState({
        error: errorThrown
      })
    }).always(function() {
      console.log("complete")
    })
  }

  handleDragStart(position) {
    this.setState({
      currentItemPosition: position
    })
  }

  handleDrop(position) {
    const { sortGalleryItemsURL } = this.props.urls
    const galleryItems = this.moveGalleryItem(position)

    this.setState({
      currentItemPosition: 0,
      galleryItems: galleryItems
    })

    this.ajaxPost(sortGalleryItemsURL, {
      gallery: {
        gallery_items: JSON.stringify(galleryItems)
      }
    })
  }

  handleDragOver(e) {
    e.preventDefault()
  }

  handleNewAnnotationSubmitClick(text, position) {
    // const { createAnnotationURL } = this.props.urls
    const { sortGalleryItemsURL } = this.props.urls
    // const virtualId = this.generateVirtualId()
    const galleryItems = this.addGalleryItem(position, { body: text, id: 0 })

    this.setState({
      currentItemPosition: 0,
      galleryItems: galleryItems
    })

    this.ajaxPost(sortGalleryItemsURL, {
      gallery: {
        gallery_items: JSON.stringify(galleryItems)
      }
    })
  }

  handleEditAnnotationSubmitClick(text, position) {
    // const { createAnnotationURL } = this.props.urls
    const { sortGalleryItemsURL } = this.props.urls
    // const virtualId = this.generateVirtualId()
    // const galleryItems = this.addGalleryItem(position, { body: text, id: 0 })

    galleryItems.forEach(function(item, index) {
      if (item.position == position) {
        item.body = text
      }
    })

    this.setState({
      currentItemPosition: 0,
      galleryItems: galleryItems
    })

    this.ajaxPost(sortGalleryItemsURL, {
      gallery: {
        gallery_items: JSON.stringify(galleryItems)
      }
    })
  }

  // generateVirtualId() {
  //   return Math.random().toString(36).substr(2, 16)
  // }

  renderGalleryItems() {
    const {
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleNewAnnotationSubmitClick
    } = this

    const actions = {
      handleDragStart: handleDragStart,
      handleDragOver: handleDragOver,
      handleDrop: handleDrop,
      handleNewAnnotationSubmitClick: handleNewAnnotationSubmitClick,
      handleEditAnnotationSubmitClick: handleEditAnnotationSubmitClick,
      handleEditAnnotationCancelClick: handleEditAnnotationCancelClick
    }

    const { galleryItems } = this.state
    let elements = []

    elements.push(
      <GalleryDropZone
        position={ 0 }
        actions={ actions }
        key="firstDropZone"
      />
    )

    galleryItems.forEach(function(item, index) {
      if (typeof item.artwork_id !== 'undefined') {
        elements.push(
          <GalleryArtwork
            key={ index }
            item={ item }
            actions={ actions }
          />
        )
      } else {
        elements.push(
          <GalleryAnnotation
            key={ index }
            item={ item }
            actions={ actions }
          />
        )
      }

      elements.push(
        <GalleryDropZone
          position={ item.position }
          actions={ actions }
          key={ "s" + index }
        />
      )
    })

    return elements
  }

  renderError() {
    const { error } = this.state

    return (
      <section className="Error">
        <div>{ error }</div>
      </section>
    )
  }

  render() {
    const { error } = this.state

    let styles = {
      backgroundColor: '#' + this.props.background
    }

    return (
      <section className="GalleryEdit" style={ styles }>
        { error != '' ? this.renderError() : '' }

        <header>
          <h1>
            { this.props.title }
          </h1>
        </header>

        <section className="galleryContainer">
          { this.renderGalleryItems() }
        </section>
      </section>
    )
  }
}
