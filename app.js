angular.module('app', [])

.controller('Tiles', function($scope) {
  $scope.model = {
    tiles: tiles_objects
  }

  function replace(str, list) {
    var begin, end, name
    while(str.indexOf('{') > -1) {
      begin = str.indexOf('{') + 1
      end = str.indexOf('}', begin)
      if(end < 0)
        throw 'There isn\'t "}"'
      name = str.substring(begin, end)

      $.each(list, function(index, value) {
        if(index == name)
          str = str.substring(0, begin - 1) + value + str.substring(end + 1)
      })
    }

    return str
  }

  function log(data) {
    return $('.log').append(data).scrollTop($('.log')[0].scrollHeight)
  }

  function zero(num) {
    return num < 10 ? '0' + num : num
  }

  function tile_object(file_name) {
    var object
    $.each(tiles_objects, function(index, val) {
      if(tiles_objects[index].file_name == file_name) {
        object = tiles_objects[index]
        return
      }
    })

    return object
  }


  $scope.path = {
    input_file: function(el) {
      localStorage[$(el.parentElement).closest('.tile').attr('data-file_name') + ':input'] = el.value
      $('.input_box', el.parentElement).text(el.value)
    },
    output_file: function(el) {
      localStorage[$(el.parentElement).closest('.tile').attr('data-file_name') + ':output'] = el.value
      $('.input_box', el.parentElement).text(el.value)
    }
  }

  $scope.input_click = function() {
    $(event.target).closest('.input_box')[0].previousElementSibling.click()
  }

  $scope.run = function() {
    var tile_el = $(event.target).closest('.tile'),
      path = require('path'),
      tile = tile_object(tile_el.attr('data-file_name')),
      input_file = localStorage[tile.file_name + ':input'],
      output_file

    if(tile.output) {
      var file = ''
      var file_extension = '.' + (tile.output.file_extension || 'mrn')
      var file_without_extension = path.basename(input_file, path.extname(input_file))
      localStorage[tile.file_name + ':output'] && ( file = file_without_extension + file_extension )
      output_file = localStorage[tile.file_name + ':output'] + '/' + (!!tile.output.file ? file : '')
    }

    var to_exec = replace(tile.command, {
      input: '"' + input_file + '"',
      output: '"' + output_file + '"'
    }),

    exec = require('child_process').exec, child
    child = exec(to_exec, function(error, stdout, stderr) {
      var date = new Date()
      log('<span class = "time">' + zero(date.getHours()) + ':' + zero(date.getMinutes()) + ':' + zero(date.getSeconds())
        + ': </span><span class = "to_exec">' + to_exec + '</span><br>')
      
      stdout && log('<span class = "stdout">stdout: ' + stdout.replace(/\n/g, '<br>') + '</span>')
      stderr && log('<span class = "stderr">stderr: ' + stderr.replace(/\n/g, '<br>') + '</span>')
      log('<br>')
    })
  }

})