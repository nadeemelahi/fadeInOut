"use strict";
var T =new function(){ 
   var items = [], len;
   this.add=function(item){
      items.push(item);
      len=items.length;
   };
   var rmIdx;
   this.rm=function(item){
      rmIdx=items.indexOf(item);
      items.splice(rmIdx,1);
      len=items.length;
   };
   var dt,ct,lt=Date.now();
   var raf = window.requestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(cb){setTimeout(cb,30);};
   var i,t=0;
   function ticker(){
      ct=Date.now();
      dt=ct-lt;
      t += dt;
      if(t>30){
	 for(i=0;i<len;i++){
	    items[i].tick(t);
	 }
	 t=0;
      } 
      lt=ct;
      raf(ticker);
   } 
   ticker();
};

var Fader = function(node){
   this.$node = node;
   this.elapsed; this.duration = 500;
   this.tick = this.dummy;
   this.cb = null;
   T.add(this);
};
Fader.prototype.in = function(cb){
   this.cb = null;
   if(cb) this.cb = cb;
   this.tick = this.dummy;
   this.elapsed = 0;
   this.$node.style.opacity = 0;
   this.tick = this.showing;
};
Fader.prototype.out = function(cb){
   this.cb = null;
   if(cb) this.cb = cb;
   this.tick = this.dummy;
   this.elapsed = 0;
   this.$node.style.opacity = 1;
   this.tick = this.hiding;
};
Fader.prototype.showing = function(dt){
   this.elapsed += dt;
   if(this.elapsed > this.duration){
      this.$node.style.opacity = 1;
      this.tick = this.dummy;
      if(this.cb !== null) this.cb();
   } else {
      this.$node.style.opacity = this.elapsed/this.duration;
   }
};
Fader.prototype.hiding = function(dt){
   this.elapsed += dt;
   if(this.elapsed > this.duration){
      this.$node.style.opacity = 0;
      this.tick = this.dummy;
      if(this.cb !== null) this.cb();
   } else {
      this.$node.style.opacity = 1 - this.elapsed/this.duration;
   }
};
Fader.prototype.dummy = function(){};
Fader.prototype.tick = null; 

