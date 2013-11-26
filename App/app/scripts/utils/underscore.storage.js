_.mixin(new function(){
	var storage;
	
	var getControls = function(a){
		var args = _(a).toArray();
		if(args.length<2){
			throw new Error('Incorrect number of arguments. You must supply [Key, Value] plus a callback context');
		}
		var callback = _(args).last();
		
		if(typeof callback !== 'function'){
			throw new Error('You must supply a callback function as last argument.');
		}
		return {
			callback : callback,
			items : _(args).initial()
		};
	}
	
	var initialize = {
		local : _.once(function(){
			storage = window.localStorage;
			if(!!storage===false){
				throw new Error('Local Storage not found!');
			}
		}),
		session : _.once(function(){
			storage = window.sessionStorage;
			if(!!storage===false){
				return this.fallback.apply(this, arguments);
			}
		}),
		fallback : _.once(function(){
			return {
				setItem : function(key, value){
					var container = JSON.parse(window.name||"{}");
					container[key] = value;
					window.name = JSON.stringify(container);
				},
				getItem : function(key){
					var container = JSON.parse(window.name||"{}");
					return container[key];
				}
			}
		})
	}
	
	this.setData = function(){
        var controls = getControls(arguments);
		for(var i=0;i<controls.items.length;i+=2){
			if(!!controls.items[i]===false){
				continue;
			}
			var key = controls.items[i];
			var value = JSON.stringify(controls.items[i+1]);
			storage.setItem(key, value);
		}
        _(controls.callback).delay(1, this);
	};
	this.getData = function(){
		var controls = getControls(arguments);
		var data = _(controls.items).map(function(key){
            var content = storage.getItem(key);
            if(!!content===false||content=='undefined'||content=='null'){
                return null;
            }
			return JSON.parse(content);
		});
        _(controls.callback).delay(1, this, data);
        return data;
	};	

	this.local = function(){
		initialize.local();
        return this;
	};
	this.session = function(){
		initialize.session();
        return this;
	};
});