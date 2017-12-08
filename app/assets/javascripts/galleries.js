function updateGalleryItemsPosition() {
  var galleryItemsData = []
  var galleryItems = $('.galleryItem')
  var artworkMock = $('.galleryContainer .mock')

  if (artworkMock.length) {
    var elementClass = artworkMock.attr('class')
    var elementId = artworkMock.attr('id')
    var findARID = /\d+/g
    var elementARID = elementId.match(findARID)[0]

    $.post(
      $('.galleryContainer').data('create-exhibition-url'),
      { artwork_id: elementARID }
    )
  } else {
    galleryItems.each(function(index) {
      var elementClass = $(this).attr('class')
      var elementId = $(this).attr('id')
      var findARID = /\d+/g
      var elementARID = elementId.match(findARID)[0]

      if (elementClass == 'galleryItem galleryAnnotation') {
        galleryItemsData.push(['annotation', elementARID])
      } else if (elementClass == 'galleryItem galleryArtwork') {
        galleryItemsData.push(['exhibition', elementARID])
      } else {
        console.error('Element with unknown class')
      }
    })

    $.post(
      $('.galleryContainer').data('update-url'),
      { gallery_items: galleryItemsData }
    )
  }
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

$(function() {
  $('.galleryContainer').sortable({
    axis: 'x',
    handle: '.handle',
    update: function() {
      updateGalleryItemsPosition()
    }
  })

  $('.artworksContainer .galleryItem').draggable({
    connectToSortable: '.galleryContainer'
  })

  $('.galleryContainer').disableSelection()
  addNewAnnotationLinkClick()
})
