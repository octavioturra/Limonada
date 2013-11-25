_.mixin(new function(){
	this.publish = PubSub.publish;
	this.publishOnce = PubSub.publishOnce;
	this.publishSync = PubSub.publishSync;
	this.subscribe = PubSub.subscribe;
	this.unsubscribe = PubSub.unsubscribe;
});