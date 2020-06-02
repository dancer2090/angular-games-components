(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != null && cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != null && cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != null && cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.whitestars = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhpL1QgIgHgfgGQAfgDAIgIQAJgIADggQADAgAHAHQAJAKAgACQgfACgIAJQgJAIgDAgQgDgegJgIgAEMBsQgIgIgfgGQAfgDAIgHQAJgJADgfQACAgAIAIQAJAIAgACQgfADgIAIQgJAJgDAgQgDgegJgIgAIRo3QgNgOg2gIQA3gFANgNQAQgOADg4QAFA2ANAOQAOAQA3AEQg2AEgOANQgPAOgEA4QgEgzgQgOgApBq8QgMgLgugIQAugEAMgLQANgNAEgvQAEAuALAMQAMANAwAEQgvAEgLALQgOAMgDAwQgEgsgNgMg");
	this.shape.setTransform(63.6,79.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,127.3,159);


(lib.star4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FECD4A").s().p("AgYAcQgTgRhFgLQBFgEASgRQAVgUAEhHQAGBGAQASQATAUBIAEQhFAFgSARQgVATgFBIQgEhBgUgUg");
	this.shape.setTransform(11.3,11.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,22.7,22.7);


(lib.star1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FECD4A").s().p("AgwA2QgiggiDgWQCDgKAiggQAngkAJiHQALCFAgAhQAkAmCHAKQiDALgiAfQgnAkgKCHQgJh8gngkg");
	this.shape.setTransform(21.4,21.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,42.9,42.8);


(lib.Path_8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = getMCSymbolPrototype(lib.Path_8, null, null);


(lib.Path_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ap1DeIAAm7ITrAAIAAG7g");
	this.shape.setTransform(63,22.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,126,44.4), null);


(lib.Group_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3E92D7").s().p("AhdA4IC8hvQgcA1gzAdQgwAdg4AAIgFAAg");
	this.shape.setTransform(29.8,36.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3E92D7").s().p("AiyBxQgLgTgHgUIAzgfQAGgDABgFQACgFgCgFIgcguQgDgEgFgBQgGgBgFADIgXANQAEgxAagrQAbgrAtgaQArgZAygDQAygDAuAUIgYANQgLAHAFALIAcAvIAAAAQAGAJAOgEIA0gfQASASAIAQQAlA/gKBFIgIgOQgDgFgFgBQgFgCgGADIkBCYQgFADgBAGQgBAFACAFIAIAOQhCgZglg/gAhQAlIg6AiQgFADgBAFQgCAFACAFIAcAvQADAEAFABQAFABAFgDIA6giQALgHgFgLIgcgvQgCgEgFgBIgDAAQgEAAgEACgAASgVIg5AhQgLAHAFALIAcAvQADAEAFABQAFABAEgDIA6giQAMgHgGgLIgcguQgCgEgFgBIgDAAQgEAAgEACgAB4hQIg6AiQgFADgBAFQgCAFACAFIAcAuQADAEAFABQAFABAFgDIA6ghQAMgHgGgLIgcgvQgCgFgFgBIgCAAQgFAAgEADgAhThUIg6AiQgFADgBAFQgCAFACAFIAcAuQADAEAFABQAFABAFgDIA6ghQAGgDABgFQACgFgCgFIgdgvQgCgEgFgBIgDAAQgEAAgEACgAASiQIg6AiQgLAHAFALIAcAvQADAEAFABQAGABAEgDIA6giQALgHgFgLIgcgvQgDgEgFgBIgCAAQgEAAgEACg");
	this.shape_1.setTransform(20.9,20.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Group_3, new cjs.Rectangle(0,0,41.7,41.7), null);


(lib.Group_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjXicIFfAAIlfM6gApficIGGAAIAAM6gACIicIgGoBIHeIBgACIicg");
	this.shape.setTransform(109.4,67);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAUkAIFfAAIAAIAgAlykAIGGABImGH/g");
	this.shape_1.setTransform(85.8,25.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Am2EAIHmoAIGHAAIAAIAg");
	this.shape_2.setTransform(43.9,25.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AtSicINtAAIAAM6gAAbicIAAoAIFagBIHeIBgAAbicg");
	this.shape_3.setTransform(85.1,67);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AmdmdIM3AAIAEADIs7M4g");
	this.shape_4.setTransform(129.2,92.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,170.6,134), null);


(lib.CompoundPath_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Anmq6ICRBtIEOQYIgCHGgABID1IENwZICShsImdZJg");
	this.shape.setTransform(48.7,91.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.CompoundPath_4, new cjs.Rectangle(0,0,97.4,182.5), null);


(lib.bgstar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(62,146,215,0.149)").s().p("AAAJwItkIvIFNuIItnouIQzAAIFLuHIFLOHIQ0AAItmIuIFNOIg");
	this.shape.setTransform(140.7,118.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,281.3,236.7);


(lib.diamond = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AG3GOQgGgGgYgFQAZgCAFgGQAIgGABgZQADAYAGAGQAGAIAaABQgaAEgGAEQgIAIgBAZQgCgYgHgGgAiWEpQgGgFgXgFQAYgCAFgFQAHgHADgYQACAYAFAFQAHAIAYABQgYADgFAFQgIAHgBAYQgDgWgHgHgAqJAqQgHgFgYgFQAZgCAGgGQAIgGABgZQADAYAFAHQAHAGAZACQgZADgGAFQgHAHgCAZQgCgXgHgHgAJTh1QgLgKgrgHQArgDALgKQAMgMAEgqQAEApALALQALAMAsADQgrAFgLAKQgMALgEArQgEgogMgMgAj+lhQgJgJglgGQAlgCAJgKQALgJADglQADAkAKAJQAKAKAlADQglAEgJAJQgLAJgDAmQgDgjgLgKg");
	this.shape.setTransform(140.4,44.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2E3192").s().p("AjCmdIGFABIAAM6g");
	this.shape_1.setTransform(130.2,92.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0071BD").s().p("AmbidIFgAAIlgM7gAg7idIAAAAIgGoAIHdIAgAg7idg");
	this.shape_2.setTransform(191.1,67);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2E3192").s().p("AATj/IFgAAIAAH/gAlyj/IGFAAImFH/g");
	this.shape_3.setTransform(147.9,25.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0071BD").s().p("Am2EAIHmn/IGGAAIABH/g");
	this.shape_4.setTransform(106,25.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2AABE4").s().p("AtSidINsAAIAAoAIFbAAIHeIAIs4AAIAAM7g");
	this.shape_5.setTransform(147.2,67);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2AABE4").s().p("AmdmdIM3AAIAEAEIs7M3g");
	this.shape_6.setTransform(191.3,92.6);

	this.instance = new lib.Group_1();
	this.instance.parent = this;
	this.instance.setTransform(147.4,69.2,1,1,0,0,0,85.3,67);
	this.instance.alpha = 0.102;

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3E92D7").s().p("ABBA5QgTgWAAgiQAAgiAUgWQAVgXAhAAQAiABAVAXQASAWAAAgQAAAkgUAWQgVAVgiAAQghAAgUgWgABdgjQgKAOAAAWQAAAXAKAOQAKAOARAAQARAAAKgOQAKgPAAgWQAAgVgJgOQgLgQgRAAQgRAAgKAPgAF1BMIAAiVIAAAAQATgDAbAAQArAAATAQQAaAUABAlQAAAlgaAYQgZAUgtAAQgXAAgQgCgAGXgwIAABiIABAAIALABQAYAAAOgNQAOgOAAgZQAAgYgNgMQgMgMgXAAIgQABgAn6BMIgBiVQAUgDAbAAQAqAAAUAQQAaAUAAAlQAAAmgZAXQgZAUgtAAQgXAAgQgCgAnYgwIAABiIAMABQAYAAANgNQAPgOAAgZQAAgYgMgMQgNgMgXAAIgQABgADYhLIAoAAIAgA4QANAXAMAcIABAAQgDgnAAgXIAAgtIAgAAIAACXIgkAAIghg6QgRgegJgXIgBAAIABBuIggABgAiMBMIAKiXIAtAAIAcBpIABAAIAfhqIAsAAIAHCXIggAAIgDh3IgBAAIgkB1IgbAAIgeh0IgGB3gAjDBMIgMgnIgrAAIgLAnIgkAAIAviXIAtAAIAvCXgAj1AMIAiAAIgKgfIgIgdgAleBMIAAiXIAjAAIAACXg");
	this.shape_7.setTransform(150.5,224.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#34AD07").s().p("AhdA4IC8hvQgcA1gzAdQgwAdg4AAIgFAAg");
	this.shape_8.setTransform(157.8,190.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#34AD07").s().p("AiyBxQgLgTgHgUIAzgfQAGgDABgFQACgFgCgFIgcguQgDgEgFgBQgGgBgFADIgXANQAEgxAagrQAbgrAtgaQArgZAygDQAygDAuAUIgYANQgLAHAFALIAcAvIAAAAQAGAJAOgEIA0gfQASASAIAQQAlA/gKBFIgIgOQgDgFgFgBQgFgCgGADIkBCYQgFADgBAGQgBAFACAFIAIAOQhCgZglg/gAhQAlIg6AiQgFADgBAFQgCAFACAFIAcAvQADAEAFABQAFABAFgDIA6giQALgHgFgLIgcgvQgCgEgFgBIgDAAQgEAAgEACgAASgVIg5AhQgLAHAFALIAcAvQADAEAFABQAFABAEgDIA6giQAMgHgGgLIgcguQgCgEgFgBIgDAAQgEAAgEACgAB4hQIg6AiQgFADgBAFQgCAFACAFIAcAuQADAEAFABQAFABAFgDIA6ghQAFgDACgFQACgFgDgFIgcgvQgCgFgFgBIgCAAQgFAAgEADgAhThUIg6AiQgFADgBAFQgCAFACAFIAcAuQADAEAFABQAFABAFgDIA6ghQAGgDABgFQACgFgCgFIgdgvQgCgEgFgBIgDAAQgEAAgEACgAASiQIg6AiQgLAHAFALIAcAvQADAEAFABQAGABAEgDIA6giQALgHgFgLIgcgvQgDgEgFgBIgCAAQgEAAgEACg");
	this.shape_9.setTransform(148.9,174.8);

	this.instance_1 = new lib.Group_3();
	this.instance_1.parent = this;
	this.instance_1.setTransform(149.5,176.5,1,1,0,0,0,20.9,20.8);
	this.instance_1.alpha = 0.5;

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#A5A5A5").ss(1,0,0,4).p("AAAj2QBmAABIBJQBJBIAABlQAABmhJBJQhIBIhmAAQhmAAhIhIQhIhJAAhmQAAhlBIhIQBIhJBmAAg");
	this.shape_10.setTransform(148.8,176.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E5E4E2").s().p("AitCvQhJhJAAhmQAAhmBJhHQBHhJBmAAQBmAABJBJQBIBHAABmQAABmhIBJQhJBIhmAAQhmAAhHhIg");
	this.shape_11.setTransform(148.8,176.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E5E4E2").s().p("AolCfIAAk9IRLAAIAAE9g");
	this.shape_12.setTransform(150,224.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#A5A5A5").p("Aq6guIV1AAIAABdI11AAg");
	this.shape_13.setTransform(149.7,249.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E5E4E2").s().p("Aq6AvIAAhdIV1AAIAABdg");
	this.shape_14.setTransform(149.7,249.2);

	this.instance_2 = new lib.Path_2();
	this.instance_2.parent = this;
	this.instance_2.setTransform(149.8,226.4,1,1,0,0,0,63,22.2);
	this.instance_2.alpha = 0.102;

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#BBBAB8").s().p("Ap1DeIAAm7ITrAAIAAG7g");
	this.shape_15.setTransform(149.7,226.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#A5A5A5").p("AIRAgIwhAAQgNAAgKgJQgJgJAAgOQAAgMAJgKQAJgJAOAAIQhAAQANAAAKAJQAJAKAAAMQAAANgKAKQgJAJgNAAg");
	this.shape_16.setTransform(150.1,203.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#E5E4E2").s().p("AoQAgQgNAAgKgJQgJgKAAgNQAAgMAJgKQAJgJAOAAIQhAAQANAAAKAJQAJAKAAAMQAAANgKAJQgJAKgNAAg");
	this.shape_17.setTransform(150.1,203.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#E7B89A").s().p("AAaARQhGgMgegDQgrgDgGgNQgHgOAlALQAuAMCfAAIAOAbIgYABQgfAAgtgGg");
	this.shape_18.setTransform(149.9,250.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#BBBAB8").s().p("AmLClIEKlKIEjADIDrFHg");
	this.shape_19.setTransform(149.9,187.4);

	this.instance_3 = new lib.CompoundPath_4();
	this.instance_3.parent = this;
	this.instance_3.setTransform(152.7,148.6,1,1,0,0,0,48.7,91.3);
	this.instance_3.alpha = 0.102;

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#B3B7B5").s().p("AAXnrIGjk2ImcZLgAm5soIGiE1IgFUUg");
	this.shape_20.setTransform(149.5,166.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgMANQgIgHghgGQAigCAHgIQAKgJACgiQADAiAIAJQAIAJAjACQgiADgHAHQgKAJgDAiQgCgfgKgKg");
	this.shape_21.setTransform(88.4,54.7);

	this.instance_4 = new lib.Path_8();
	this.instance_4.parent = this;
	this.instance_4.setTransform(149.7,127.4,1,1,0,0,0,149.7,126);
	this.instance_4.alpha = 0.148;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.shape_21},{t:this.shape_20},{t:this.instance_3},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.instance_2},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.instance_1},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.instance},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62.1,0,170.6,254.8);


// stage content:
(lib.trophyanimationdiamond = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_204 = function() {
		this.stop()
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(204).call(this.frame_204).wait(1));

	// Layer 1
	this.instance = new lib.whitestars("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(201.3,127.3,1,1,0,0,0,63.6,79.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(76).to({_off:false},0).to({alpha:0.5},13).to({alpha:1},11).to({alpha:0.5},10).to({alpha:1},11).to({alpha:0.5},9).to({alpha:1},9).wait(1).to({startPosition:0},0).to({alpha:0.5},13).to({alpha:1},11).to({alpha:0.5},10).to({alpha:1},11).to({alpha:0.5},9).to({alpha:1},10).wait(1));

	// Layer 1
	this.instance_1 = new lib.diamond("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(200,125.3,0.1,0.1,0,0,0,150,126.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:150.1,scaleX:1,scaleY:1,x:200.1},74).wait(131));

	// Layer 5 copy 3
	this.instance_2 = new lib.star4("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(377,122.1,1,1,0,0,0,11.3,11.3);
	this.instance_2.alpha = 0.141;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(75).to({_off:false},0).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},12).to({alpha:0.699},12).wait(1).to({alpha:0.141},0).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},12).to({alpha:0.699},12).wait(1));

	// Layer 5 copy 2
	this.instance_3 = new lib.star4("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(29.6,85.1,1,1,0,0,0,11.3,11.3);
	this.instance_3.alpha = 0.141;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(75).to({_off:false},0).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},12).to({alpha:0.699},12).wait(1).to({alpha:0.141},0).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},12).to({alpha:0.699},12).wait(1));

	// Layer 5 copy
	this.instance_4 = new lib.star4("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(98.6,160.6,1,1,0,0,0,11.3,11.3);
	this.instance_4.alpha = 0.141;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(75).to({_off:false},0).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},12).to({alpha:0.699},12).wait(1).to({alpha:0.141},0).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},12).to({alpha:0.699},12).wait(1));

	// Layer 5
	this.instance_5 = new lib.star4("synched",0);
	this.instance_5.parent = this;
	this.instance_5.setTransform(326.5,49.6,1,1,0,0,0,11.3,11.3);
	this.instance_5.alpha = 0.141;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(75).to({_off:false},0).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},12).to({alpha:0.699},12).wait(1).to({alpha:0.141},0).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},12).to({alpha:0.699},12).wait(1));

	// Layer 4 copy 3
	this.instance_6 = new lib.star1("synched",0);
	this.instance_6.parent = this;
	this.instance_6.setTransform(378.6,21.4,1,1,0,0,0,21.4,21.4);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(75).to({_off:false},0).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},12).to({alpha:1},12).to({startPosition:0},1).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},12).to({alpha:1},12).wait(1));

	// Layer 4 copy 2
	this.instance_7 = new lib.star1("synched",0);
	this.instance_7.parent = this;
	this.instance_7.setTransform(28.9,220.1,1,1,0,0,0,21.4,21.4);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(75).to({_off:false},0).to({alpha:0.141},10).to({alpha:1},10).to({x:28.6,alpha:0.141},10).to({x:28.9,alpha:1},10).to({x:28.6,alpha:0.141},12).to({x:28.9,alpha:1},12).to({startPosition:0},1).to({alpha:0.141},10).to({alpha:1},10).to({x:28.6,alpha:0.141},10).to({x:28.9,alpha:1},10).to({x:28.6,alpha:0.141},12).to({x:28.9,alpha:1},12).wait(1));

	// Layer 4 copy
	this.instance_8 = new lib.star1("synched",0);
	this.instance_8.parent = this;
	this.instance_8.setTransform(348.8,197.6,1,1,0,0,0,21.4,21.4);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(75).to({_off:false},0).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},12).to({alpha:1},12).to({startPosition:0},1).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},12).to({alpha:1},12).wait(1));

	// Layer 4
	this.instance_9 = new lib.star1("synched",0);
	this.instance_9.parent = this;
	this.instance_9.setTransform(84.4,36.1,1,1,0,0,0,21.4,25.9);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(75).to({_off:false},0).to({alpha:0.141},9).to({regY:21.4,y:31.6},1).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},12).to({alpha:1},12).to({regY:25.9,y:36.1},1).to({alpha:0.141},9).to({regY:21.4,y:31.6},1).to({alpha:1},10).to({alpha:0.141},10).to({alpha:1},10).to({alpha:0.141},12).to({alpha:1},12).wait(1));

	// Layer 2
	this.instance_10 = new lib.bgstar("synched",0);
	this.instance_10.parent = this;
	this.instance_10.setTransform(200.6,125.5,1,1,0,0,0,140.7,118.3);
	this.instance_10.alpha = 0.148;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(205));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(259.9,132.2,281.3,236.7);
// library properties:
lib.properties = {
	id: '442826647E04534EBD22745D683C6E93',
	width: 400,
	height: 250,
	fps: 24,
	color: "#FFFFFF",
	opacity: 0.00,
	webfonts: {},
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['442826647E04534EBD22745D683C6E93'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;