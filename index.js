exports.plugin = (bot) => {
  var originalFunction = bot._client.write;

  // Create a new function that wraps the original function
  var newFunction = function (name, params) {
    if (name === "entity_action") {
      if (params.actionId === 3 || params.actionId === 4) {
        // cancel sprint start and sprint stop packets
        return;
      }
    }
    if (params.onGround !== undefined) {
      if (bot.targetDigBlock === null && yDistanceFallen <= 0.0) {
        params.onGround = false
      }
      else
        params.onGround = true
    }
    return originalFunction.apply(this, [...arguments])
  }

  // Replace the original function with the new function
  bot._client.write = newFunction;

  let startingFallingPosition = null
  let yDistanceFallen = 0.0
  bot.on('move', () => {
    //we are falling (or going up)
    if (bot.entity.onGround === false) {
      //console.log("not on ground!")
      if (startingFallingPosition === null) {
        startingFallingPosition = bot.entity.position.clone()
        //console.log("just started falling, so setting starting position: " + startingFallingPosition)
      }

      yDistanceFallen = Math.abs(startingFallingPosition.y - bot.entity.position.y)
      //console.log("Y distance fallen:" + yDistanceFallen + " -- curr pos: " + bot.entity.position)
    }
    else if (bot.entity.onGround === true) {
      startingFallingPosition = null;
      yDistanceFallen = 0.0
    }
  })
}
