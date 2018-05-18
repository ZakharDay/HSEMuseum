class GalleryEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      galleryItems: [],
      error: ''
    }

    this.handleDragStart             = this.handleDragStart.bind(this)
    this.handleDragOver              = this.handleDragOver.bind(this)
    this.handleDrop                  = this.handleDrop.bind(this)
    this.handleAnnotationNewClick    = this.handleAnnotationNewClick.bind(this)
    this.handleAnnotationEditClick   = this.handleAnnotationEditClick.bind(this)
    this.handleAnnotationTextChange  = this.handleAnnotationTextChange.bind(this)
    this.handleAnnotationSubmitClick = this.handleAnnotationSubmitClick.bind(this)
    this.handleAnnotationCancelClick = this.handleAnnotationCancelClick.bind(this)
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

  newGalleryItem(item) {
    let { galleryItems } = this.state
    const { position } = item

    const updatedItem = {
      id:       '',
      type:     'newAnnotation',
      body:     '',
      nextBody: ''
    }

    galleryItems.splice(position, 0, updatedItem)
    galleryItems = this.setPositionOnGalleryItems(galleryItems)

    return galleryItems
  }

  editGalleryItem(item) {
    let { galleryItems } = this.state
    const { id, body, position } = item

    const updatedItem = {
      id:       id,
      type:     'editAnnotation',
      body:     body,
      nextBody: body,
      position: position
    }

    galleryItems.splice(position - 1, 1, updatedItem)

    return galleryItems
  }

  changeTextGalleryItem(item) {
    let { galleryItems } = this.state
    galleryItems.splice(item.position - 1, 1, item)

    return galleryItems
  }

  cancelGalleryItem(item) {
    let { galleryItems } = this.state
    const { id, type, body, position } = item

    if (type == 'editAnnotation') {
      const updatedItem = {
        id:       id,
        type:     'annotation',
        body:     body,
        nextBody: '',
        position: position
      }

      galleryItems.splice(position - 1, 1, updatedItem)
    } else {
      galleryItems.splice(position - 1, 1)
      galleryItems = this.setPositionOnGalleryItems(galleryItems)
    }

    return galleryItems
  }

  createOrUpdateGalleryItem(item) {
    let { galleryItems } = this.state
    const { id, nextBody, position } = item

    const updatedItem = {
      id:       id,
      type:     'annotation',
      body:     nextBody,
      nextBody: '',
      position: position
    }

    galleryItems.splice(position - 1, 1, updatedItem)

    return galleryItems
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
    const { updateGalleryItemsURL } = this.props.urls
    const galleryItems = this.moveGalleryItem(position)

    this.setState({
      currentItemPosition: 0,
      galleryItems: galleryItems
    })

    this.ajaxPost(updateGalleryItemsURL, {
      gallery: {
        gallery_items: JSON.stringify(galleryItems)
      }
    })
  }

  handleDragOver(e) {
    e.preventDefault()
  }

  handleAnnotationNewClick(item) {
    const galleryItems = this.newGalleryItem(item)

    this.setState({
      galleryItems: galleryItems
    })
  }

  handleAnnotationEditClick(item) {
    const galleryItems = this.editGalleryItem(item)

    this.setState({
      galleryItems: galleryItems
    })
  }

  handleAnnotationTextChange(item) {
    const galleryItems = this.changeTextGalleryItem(item)

    this.setState({
      galleryItems: galleryItems
    })
  }

  handleAnnotationSubmitClick(item) {
    const galleryItems = this.createOrUpdateGalleryItem(item)
    const { updateGalleryItemsURL } = this.props.urls

    this.setState({
      galleryItems: galleryItems
    })

    this.ajaxPost(updateGalleryItemsURL, {
      gallery: {
        gallery_items: JSON.stringify(galleryItems)
      }
    })
  }

  handleAnnotationCancelClick(item) {
    const galleryItems = this.cancelGalleryItem(item)

    this.setState({
      galleryItems: galleryItems
    })
  }

  renderGalleryItems() {
    const actions = {
      handleDragStart:             this.handleDragStart,
      handleDragOver:              this.handleDragOver,
      handleDrop:                  this.handleDrop,
      handleAnnotationNewClick:    this.handleAnnotationNewClick,
      handleAnnotationEditClick:   this.handleAnnotationEditClick,
      handleAnnotationTextChange:  this.handleAnnotationTextChange,
      handleAnnotationSubmitClick: this.handleAnnotationSubmitClick,
      handleAnnotationCancelClick: this.handleAnnotationCancelClick
    }

    const { galleryItems } = this.state
    const firstDropZoneItem = { position: 0 }
    let elements = []

    elements.push(
      <GalleryDropZone
        key="firstDropZone"
        item={ firstDropZoneItem }
        actions={ actions }
      />
    )

    galleryItems.forEach(function(item, index) {
      if (item.type == 'artwork') {
        elements.push(
          <GalleryArtwork
            key={ index }
            item={ item }
            actions={ actions }
          />
        )
      }

      if (item.type == 'annotation') {
        elements.push(
          <GalleryAnnotation
            key={ index }
            item={ item }
            actions={ actions }
          />
        )
      }

      if (item.type == 'newAnnotation' || item.type == 'editAnnotation') {
        elements.push(
          <AnnotationForm
            key={ index }
            item={ item }
            actions={ actions }
          />
        )
      }

      elements.push(
        <GalleryDropZone
          key={ "dz" + index }
          item={ item }
          actions={ actions }
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
