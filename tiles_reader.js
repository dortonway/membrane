var fs = require('fs')

var tiles_path = './tiles/',
  tiles_files = fs.readdirSync(tiles_path),
  tiles_objects = []
$.each(tiles_files, function(name, val) {
  tiles_objects.push(require(tiles_path + val))

  var last_tile_n = tiles_objects.length - 1
  tiles_objects[last_tile_n].file_name = val

  localStorage[val + ':input'] && ( tiles_objects[last_tile_n]['input_last_path'] = localStorage[val + ':input'] )
  localStorage[val + ':output'] && ( tiles_objects[last_tile_n]['output_last_path'] = localStorage[val + ':output'] )
})

// remove unused paths from the localStorage
$.each(localStorage, function(key, val) {
  var there_is = false
  
  $.each(tiles_files, function(index, file) {
    if(file + ':input' == key) {
      there_is = true
      return
    }
    else if(file + ':output' == key) {
      there_is = true
      return
    }
  })

  there_is || localStorage.removeItem(key)
})