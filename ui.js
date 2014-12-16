var hidden = false,
  log_el = $('.log'),
  tiles_el = $('.tiles'),
  tiles_width = tiles_el.css('width'),
  log_left = log_el.css('left'),
  hide_tiles_el = $('.hide_tiles')
  
hide_tiles_el.on('click', function() {
  hidden = hidden ? false : true

  if(hidden) {
    log_el.animate({'left': '0px'}, 200)
    tiles_el.animate({'width': 0, 'opacity': 0}, 200)

    hide_tiles_el.text('показать плитки')
  } else {
    log_el.animate({'left': log_left}, 200)
    tiles_el.animate({'width': tiles_width, 'opacity': 1}, 200)

    hide_tiles_el.text('скрыть плитки')
  }
})


$('.clean_log').on('click', function() {
  var log_el = $('.log')
  log_el.animate({'opacity': 0}, 300, function() {
    log_el.text('')
    log_el.css('opacity', 1)
  })
})


var homepage = require('./package.json').homepage,
    source_el = $('.source')

source_el.attr('title', 'Home page of the project: ' + homepage)
source_el.on('click', function() {
  require('open')(homepage)
})