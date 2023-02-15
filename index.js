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
            params.onGround = false
        }
        return originalFunction.apply(this, [...arguments])
    }

    // Replace the original function with the new function
    bot._client.write = newFunction;
}
