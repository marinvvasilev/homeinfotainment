// Load data && emit events
let config;

let Event = module.exports = function(_config){
    config = _config;
}

/**
 * Called when the user interface needs to be refreshed
 */
Event.prototype.refresh = function(){
    // @todo
    // get news
    // get imap
    // get weather
}

Event.prototype.playVideo = function(){

}

Event.prototype.playAudio = function(){

}