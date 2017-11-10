$(function() {
  $('.galleryContainer').sortable({
    axis: 'x',
    update: function() {
      $.post(
        $(this).data('update-url'),
        $(this).sortable('serialize')
      )
    }
  })

  $('.galleryContainer').disableSelection()
})
