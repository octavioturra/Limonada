_.mixin(new function(){
	var global = {};
	var values = {};
	this.globals = function(){
		var args = _(arguments).toArray();
		if(args.length===0){
			return global;
		}
		if(args.length===1){
			return global[arguments[0]];
		}
		if(args.length%2===0){
			for(var i = 0; i<(args.length/2);i+=2){
				var key = args[i];
				var value = args[i+1]
				if(!!key===false){
					continue;
				}
				values[key] = value;
				Object.defineProperty(global, args[i], {					
					get : function(){
						return values[key];
					},
					set : function(){}
				});
			}
		}
	}
	this.deleteGlobals = function(){
		var args = _(arguments).toArray();
		_(args).map(function(i, n){
			var key = args[n];
			delete values[key];
			delete global[key];
		});
	}
});