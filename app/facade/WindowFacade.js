module.exports = function() {
	return {
		getDelegate: getDelegate,
		register: register
	}

	function getDelegate(eventName) {
		return function(callback) {
			register(eventName, callback);	
		}
	}

	function register(eventName, callback) {
		if( eventName === "WINDOW_RESIZED" )
			window.addEventListener("resize", callback);	
	}
}
