function updateGalleryItemsPosition() {
  var galleryItemsData = []
  var galleryItems = $('.galleryItem')
  var artwork = $('.galleryContainer .galleryArtwork')

  if (artwork.length) {
    var elementARID = getGalleryItemId(artwork)
    createExhibition(elementARID)
  } else {
    galleryItems.each(function(index) {
      var elementARID = getGalleryItemId($(this))

      if ($(this).hasClass('galleryAnnotation')) {
        galleryItemsData.push(['annotation', elementARID])
      } else if ($(this).hasClass('galleryExhibition')) {
        galleryItemsData.push(['exhibition', elementARID])
      } else {
        console.error('Element with unknown class')
      }
    })

    sortGalleryItems(galleryItemsData)
  }
}

function getGalleryItemId(element) {
  var elementId = element.attr('id')
  var findARID = /\d+/g
  var elementARID = elementId.match(findARID)[0]

  return elementARID
}

function createExhibition(artworkId) {
  $.post(
    $('.galleryContainer').data('create-exhibition-url'),
    { artwork_id: artworkId }
  )
}

function sortGalleryItems(data) {
  $.post(
    $('.galleryContainer').data('update-url'),
    { gallery_items: data }
  )
}

function addNewAnnotationLinkClick() {
  $('.newAnnotationLink').on('click', function() {
    var galleryItem = $(this).parent().parent()
    var annotationNewForm = $('#galleryAnnotation_new')

    $('.handle').fadeOut()
    $('.separator').fadeOut()

    galleryItem.after(annotationNewForm)
    addRemoveFormLinkClick()
  })

  $('.separator').on('mouseenter', function() {
    $(this).parent().addClass('newElementHover')
  })

  $('.separator').on('mouseleave', function() {
    $(this).parent().removeClass('newElementHover')
  })
}

function addRemoveFormLinkClick() {
  $('.removeForm').on('click', function() {
    var formContainer = $('#galleryAnnotation_new')
    var galleryContainer = $('.galleryContainer')

    $('.handle').fadeIn()
    $('.separator').fadeIn()

    galleryContainer.before(formContainer)
  })
}

function makeArtworksDraggable() {
  $('.artworksContainer .galleryItem').draggable({
    connectToSortable: '.galleryContainer',
    revert: 'invalid'
    // stack: '.artworksContainer .galleryItem'
  }).disableSelection()
}

$(function() {
  $('.galleryContainer').sortable({
    axis: 'x',
    handle: '.handle',
    update: function() {
      updateGalleryItemsPosition()
    }
  }).disableSelection()

  makeArtworksDraggable()
  addNewAnnotationLinkClick()
})
