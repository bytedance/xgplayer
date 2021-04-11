let definition = function () {
  let player = this

  function onDestroy () {
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

export default {
  name: 'definition',
  method: definition
}