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


(lib.Path_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = getMCSymbolPrototype(lib.Path_3, null, null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjxCsIAAlXIHjAAIAAFXg");
	this.shape.setTransform(24.2,17.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,48.3,34.4), null);


(lib.CompoundPath_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("An/M1IAA5pILZAAQAAArgFBFIEkAAIADAbIABAAQAFAvgEBBQgHCCgpByQhACtiHBtQiHBsjEAkQhvB+iXA1IAUAAQATAAANANQAOAOAAATIAAAFQAAATgOANQgNAOgTAAIhsAAQgXBdAnBiQBBCnDkBWgACSlHQg6DPhhCNQEghVBlkVQAghVALhgQAIhBgDg8IjdAAQgSCqgrCWg");
	this.shape.setTransform(51.2,82.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.CompoundPath_7, new cjs.Rectangle(0,0,102.4,164.2), null);


(lib.CompoundPath_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgFFtIFKjEQgyBdhYA0IAAAAQhXAzhkAAIgFAAgAjrEXQgwgngfg2QgTghgMgkIBcg2QAJgFADgJQACgJgEgIIgwhQQgFgIgJgCQgJgBgJAFIgnAXQAHhXAuhJQAvhNBOgtQBNguBagFQBWgEBPAjIgnAXQgJAFgDAJQgDAJAFAIIAwBRIAAAAQAEAIAJACQAJACAGgGIBcg2QAZAbAUAhQBABrgQB9IgOgYQgFgJgKgCQgKgDgJAFInDEMQgIAFgDAKQgCAKAFAJIAPAZQg5gWgugngAiIAzIhlA8QgJAFgDAJQgDAJAFAHIAwBSQAEAIAKACQAJABAJgFIBlg8QAJgFADgJQADgJgFgIIgwhSQgEgHgKgCIgEAAQgHAAgHAEgAAlgyIhkA7QgJAFgDAJQgDAJAFAIIAwBRQAEAIAKACQAJABAIgFIBlg8QAJgFADgJQACgJgEgIIgwhQQgFgIgJgCIgEAAQgHAAgHAEgADWibIhlA8QgJAFgDAJQgDAJAFAIIAwBQQAEAIAKACQAJABAJgFIBlg7QAJgFADgJQADgJgFgIIgwhRQgEgIgKgCIgEAAQgHAAgHAEgAiQiiIhlA8QgJAFgCAKQgDAJAEAHIAwBRQAFAIAJACQAJABAJgFIBlg7QAJgFADgJQADgJgFgIIgwhSQgEgHgJgCIgFAAQgHAAgHADgAAgkJIhkA8QgJAFgDAJQgDAJAFAIIAwBRQAEAIAKACQAJABAIgFIBlg8QAJgFADgJQADgJgFgIIgwhRQgEgIgJgCIgEAAQgIAAgHAEg");
	this.shape.setTransform(36.3,36.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.CompoundPath_4, new cjs.Rectangle(0,0.1,72.6,73), null);


(lib.bgstar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606060").s().p("AAAJwItkIvIFNuIItnouIQzAAIFLuHIFLOHIQ0AAItmIuIFNOIg");
	this.shape.setTransform(140.7,118.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,281.3,236.7);


(lib.plantinum = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6D6D6C").s().p("ACZAGIAAhAIAbAAIAABCQAAAeAVAAQAWAAAAgeIAAhCIAaAAIAABAQAAA1gxAAQguAAgBg1gABoA7IgZgtQgOgVgGgTIgCAAIACBVIgYAAIAAh0IAfAAIAYArQAKARAJAWIABAAQgBgPgBggIAAgiIAYAAIAABzgAiHA6IgJgeIgkAAIgIAeIgbAAIAkhzIAjAAIAlBzgAiogQIgGAYIAYAAIgMguIgGAWgAmMA6IAAhyQAQgCAUAAQAZAAALAJQAMALAAAQQAAARgLAKQgNAMgZAAQgHAAgCgBIAAAqgAlxgkIAAAhQACABAHABQAKgBAHgFQAFgEAAgKQABgQgWAAgAgNA5IAAhzIAZAAIAABzgAFyA5IgBhbIgBAAIgbBZIgVAAIgXhZIgEBbIgYAAIAHhzIAjAAIALAnQAEAKAGAfIABAAIAYhQIAhAAIAGBzgAhWA5IAAhdIgfAAIAAgWIBZAAIAAAWIggAAIAABdgAkoA5IAAhzIAaAAIAABdIAuAAIAAAWg");
	this.shape.setTransform(147.4,216.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6D6D6C").s().p("AgEFtIFKjEQgzBdhXA0QhWAzhlAAIgFAAgAjrEYQgvgoggg2QgTgggMgkIBcg2QAJgFADgJQACgJgEgIIgwhRQgFgHgJgCQgJgCgJAFIgnAXQAHhWAuhKQAvhMBOguQBNguBagEQBVgFBQAjIgnAXQgJAFgDAKQgDAJAFAHIAwBSQAEAIAJABQAJACAGgFIBcg2QAZAcAUAgQBABrgQB9IgOgYQgFgJgKgDQgKgCgJAFInDELQgIAGgDAJQgCAKAFAJIAPAZQg5gVgugngAiHA0IhlA8QgJAFgDAJQgDAKAFAHIAwBSQAEAHAKACQAJACAJgFIBlg8QAJgFADgKQACgJgEgHIgwhSQgFgHgJgCIgEgBQgHAAgHAEgAAlgyIhkA7QgJAFgDAJQgDAJAFAIIAwBSQAEAHAKACQAJACAIgFIBlg8QAJgFADgKQADgJgFgHIgwhRQgEgIgKgBIgFgBQgHAAgGAEgADXibIhlA8QgJAFgDAJQgDAJAFAIIAwBRQAEAHAKACQAJACAJgFIBlg7QAJgFADgKQADgJgFgHIgwhSQgEgIgKgCIgEAAQgHAAgHAEgAiPihIhlA8QgJAFgDAJQgDAJAFAIIAwBRQAEAHAKACQAJACAJgFIBlg7QAJgFADgKQADgJgFgHIgwhSQgEgIgJgBIgEgBQgIAAgHAEgAAgkJIhkA8QgJAFgDAKQgDAJAFAHIAwBSQAEAIAKABQAJACAIgFIBlg8QAJgFADgJQADgJgFgIIgwhSQgEgHgKgCIgEgBQgHAAgHAEg");
	this.shape_1.setTransform(147.4,85.8);

	this.instance = new lib.CompoundPath_4();
	this.instance.parent = this;
	this.instance.setTransform(147.3,86.6,1,1,0,0,0,36.3,36.6);
	this.instance.alpha = 0.5;

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E5E4E2").s().p("AodCuIAAhHIQ7AAIAABHgAmmBJIAAj2INUAAIAAD2g");
	this.shape_2.setTransform(147,220.7);

	this.instance_1 = new lib.Path();
	this.instance_1.parent = this;
	this.instance_1.setTransform(171.8,217,1,1,0,0,0,24.2,17.2);
	this.instance_1.alpha = 0.102;

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BBBAB8").s().p("AnnCsIAAlXIPPAAIAAFXg");
	this.shape_3.setTransform(147.1,217);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E5E4E2").s().p("AmZAYQgKAAgHgHQgHgHAAgKQAAgJAHgHQAHgHAKAAIMzAAQAKAAAHAHQAHAHAAAJQABAKgIAHQgHAHgKAAg");
	this.shape_4.setTransform(147.4,199.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E7B89A").s().p("AA/BGIg7gfQg9gggGgLQgFgNBGArQAkAXAkAZgAAUgpQg2gJgYgDQghgDgFgLQgFgKAcAIQAkAKB7AAIAAAAIALAWIgQABQgZAAgkgFg");
	this.shape_5.setTransform(145.9,230.7);

	this.instance_2 = new lib.CompoundPath_7();
	this.instance_2.parent = this;
	this.instance_2.setTransform(198.7,116.4,1,1,0,0,0,51.1,82.1);
	this.instance_2.alpha = 0.102;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#BBBAB8").s().p("AjCIgQgSAAgOgPQgOgNAAgTIAAgFQAAgTAOgOQAOgNASAAIGDAAQAUAAANANQAOAOAAATIAAAFQAAATgOAOQgNAOgUAAgAFyDXQGIg1B8lQQAghVALhhQAIhBgCg8IluAAIAAg9IG6AAIAEAcIABBwQgICBgqByQhDC3iUBvQiUBvjZAdgAruCHQiUhvhEi1QgphzgIiBIABhxIADgcIG7AAIAAA9IluAAQgBA8AHBBQALBhAfBVQB8FQGJA1IgQA8QjZgdiUhvg");
	this.shape_6.setTransform(148.2,99.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BBBAB8").s().p("AmVM2QD5hfA2i+QAQg6gEg+IgIgyIBdgSIACAAIBcASIgIAyQgFA+ARA7QA1C9D6BfgAp8kRQg4iugVjMIgKiqIWnAAQABBEgLBnQgVDMg3CtQizIqnKAiQnLgjiyopg");
	this.shape_7.setTransform(148.1,116.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A8A7A7").s().p("ABPHEQgvgSgSgrQAygPAtASQAuATATArQgWAGgVAAQgbAAgZgKgAirHIQATgsAtgSQAugSAyAPQgTArgvASQgZAKgbAAQgVAAgVgGgADcGjQgwgMgcgnQAugXAwANQAzAMAaAnQgfAOgfAAQgQAAgRgEgAk5GZQAagnAzgMQAwgNAuAXQgcAngvAMQgRAEgRAAQgfAAgfgOgAAuEpQAjghA0gDQAAAsglAiQgkAigzADQACgvAjgggAhfFTQgjgigCgsQA0ADAkAhQAjAgABAvQgzgDgkgigAFhFvQgygFghgjQAqgcAzAFQAzAGAhAiQglAXgqAAIgPAAgAm9FYQAhgiA0gGQAzgFApAcQgiAjgxAFIgPAAQgqAAglgXgAChEPQAfgnAxgJQAHAtgdAmQgfAmgxAKQgIguAeglgAjYEyQgegmAHgtQAyAJAeAnQAeAlgHAuQgygKgegmgAENDlQAXgqAwgQQAQAqgXArQgXAqgxAQQgPgrAXgqgAlMEAQgWgpAPgsQAwAQAXAqQAYAqgQArQgwgQgYgqgAGEEOQAmgiAygBQA0gDAmAeQglAhgzACIgIAAQguAAgkgbgAncEpQgzgCglghQAmgeA0ADQAyABAmAiQgkAbguAAIgIAAgAFyCtQAQguAsgVQAXAogPAtQgPAtgtAWQgYgpAQgsgAm1C/QgNguAVgnQAtAVAQAuQAPAsgYApQgrgWgRgtgAHuDFQAggnAxgIQA0gLAqAZQghAlgwAKQgOACgOAAQgiAAgggQgApKDTQgxgKggglQAsgYAxAKQAyAIAfAnQgfAQgjAAQgNAAgOgCgAHMBoQAHguApgdQAeAlgIAtQgHAtgqAeQgdglAIgtgAoQBvQgHgtAeglQAoAdAIAuQAHAsgdAmQgpgegIgtgAJKBtQAWgoAygSQAzgQAuASQgWAogyASQgXAIgYAAQgZAAgZgKgAqpBvQgxgSgXgoQAvgTAyARQAyASAWAoQgZAKgZAAQgXAAgYgIgAIZAXQgCgtAkgiQAjAfACAuQAAAvgiAhQgkgggBgugApdAVQABgtAkggQAiAhAAAuQgBAugkAgQgighAAgvgAKYALQAQgrAtgXQArgWA0AKQgQAqguAZQgfAOggAAQgQAAgPgDgAr0AAQgugYgPgrQAxgKAuAWQAsAXAQArQgPADgQAAQggAAgfgOgAJWhCQgIgvAcglQAoAaAKAuQAIAvgcAjQgpgYgJgugAqahOQAIgsApgcQAcAlgHAvQgKAtgpAZQgcgjAJgvgALShgQAJguApgcQAmgdA1AEQgJAugoAcQgkAZgvAAIgJAAgAsrh5QgpgcgJguQAygEAqAdQApAcAJAuIgJAAQgvAAgkgZgAKDijQgQgrAVgqQAuATARAsQAQArgWAqQgsgUgSgrgArFi5QARgrAtgUQAWAqgQArQgRArgtAUQgVgpAPgsgAMbkhQAkgjA0gDQAAAugkAiQgiAhg1AFQABgvAighgAtOj4QgkghABgvQAyADAlAjQAjAjAAAtQg1gFgighgAKgkKQgMgTgDgXQgCgWAGgUQAxAOAZAoQAXAlgNAuQgygOgXgngArdkpQAXgnAzgPQAHAVgDAWQgDAWgLATQgXAngzAPQgNgtAXgngALil3QAHgzAugiQAhAqgGAzQgIAygtAjQgjgrAIgygAsvlwQgHgyAhgrQAtAhAJA0QAHAzgiAqQgugigHgzg");
	this.shape_8.setTransform(147.7,157.7);

	this.instance_3 = new lib.Path_3();
	this.instance_3.parent = this;
	this.instance_3.setTransform(149.7,126,1,1,0,0,0,149.7,126);
	this.instance_3.alpha = 0.199;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.instance_2},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.instance_1},{t:this.shape_2},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(46.6,34.2,203.3,204);


// stage content:
(lib.trophyanimationplatinum = function(mode,startPosition,loop) {
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

	// platinum
	this.instance_1 = new lib.plantinum("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(200.1,125.1,0.1,0.1,0,0,0,150,126.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:150.1,scaleX:1,scaleY:1},74).wait(131));

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