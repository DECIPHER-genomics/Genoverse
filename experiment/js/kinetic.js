/**
 * KineticJS JavaScript Library v2.0.0
 * http://www.kineticjs.com/
 * Copyright 2011, Eric Rowell
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Nov 6 2011
 *
 * Copyright (C) 2011 by Eric Rowell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Kinetic = {};

/****************************************
 * Stage
 */
Kinetic.Stage = function(containerId, width, height){
    this.container = document.getElementById(containerId);
    this.width = width;
    this.height = height;
    this.regions = [];
    this.zIndexCounter = 9999;
    this.idCounter = 0;
    
    // desktop flags
    this.mousePos = null;
    this.mouseDown = false;
    this.mouseUp = false;
    
    // mobile flags
    this.touchPos = null;
    this.touchStart = false;
    this.touchEnd = false;
    
    // add stage canvas
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.id = 0;
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.position = 'absolute';
    this.container.appendChild(this.canvas);
    
    this.listen();
};

Kinetic.Stage.prototype.clear = function(){
    var context = this.getContext();
    var canvas = this.getCanvas();
    context.clearRect(0, 0, canvas.width, canvas.height);
};

Kinetic.Stage.prototype.getCanvas = function(){
    return this.canvas;
};

Kinetic.Stage.prototype.getContext = function(){
    return this.context;
};

Kinetic.Stage.prototype.add = function(region){
    region.stage = this;
    region.canvas = document.createElement('canvas');
    region.context = region.canvas.getContext('2d');
    region.id = ++this.idCounter;
    region.canvas.width = this.width;
    region.canvas.height = this.height;
    region.canvas.style.zIndex = ++this.zIndexCounter;
    region.canvas.style.position = 'absolute';
    this.container.appendChild(region.canvas);
    this.regions.push(region);
    region.draw();
};

Kinetic.Stage.prototype.handleEvent = function(evt){
    if (!evt) {
        evt = window.event;
    }
    
    this.setMousePosition(evt);
    this.setTouchPosition(evt);
    for (var n = this.regions.length - 1; n >= 0; n--) {
        var region = this.regions[n];
        var pos = this.touchPos || this.mousePos;
        var el = region.eventListeners;
        
        if (pos !== null && region.context.isPointInPath(pos.x, pos.y)) {
            // handle onmousedown	
            if (this.mouseDown) {
                this.mouseDown = false;
                if (el.onmousedown !== undefined) {
                    el.onmousedown(evt);
                }
            }
            // handle onmouseup
            else if (this.mouseUp) {
                this.mouseUp = false;
                if (el.onmouseup !== undefined) {
                    el.onmouseup(evt);
                }
            }
            
            // handle onmouseover
            else if (!region.mouseOver) {
                region.mouseOver = true;
                if (el.onmouseover !== undefined) {
                    el.onmouseover(evt);
                }
            }
            
            // handle onmousemove
            else if (el.onmousemove !== undefined) {
                el.onmousemove(evt);
            }
            
            // handle touchstart
            if (this.touchStart) {
                this.touchStart = false;
                if (el.touchstart !== undefined) {
                    el.touchstart(evt);
                }
            }
            
            // handle touchend
            if (this.touchEnd) {
                this.touchEnd = false;
                if (el.touchend !== undefined) {
                    el.touchend(evt);
                }
            }
            
            // handle touchmove
            if (!this.touchMove) {
                if (el.touchmove !== undefined) {
                    el.touchmove(evt);
                }
            }
            
        }
        // handle mouseout condition
        else if (region.mouseOver) {
            region.mouseOver = false;
            if (el.onmouseout !== undefined) {
                el.onmouseout(evt);
            }
        }
    }
};

Kinetic.Stage.prototype.listen = function(){
    var that = this;
    
    // desktop events
    this.container.addEventListener("mousedown", function(evt){
        that.mouseDown = true;
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("mousemove", function(evt){
        that.mouseUp = false;
        that.mouseDown = false;
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("mouseup", function(evt){
        that.mouseUp = true;
        that.mouseDown = false;
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("mouseover", function(evt){
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("mouseout", function(evt){
        that.mousePos = null;
    }, false);
    
    // mobile events
    this.container.addEventListener("touchstart", function(evt){
        evt.preventDefault();
        that.touchStart = true;
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("touchmove", function(evt){
        evt.preventDefault();
        that.handleEvent(evt);
    }, false);
    
    this.container.addEventListener("touchend", function(evt){
        evt.preventDefault();
        that.touchEnd = true;
        that.handleEvent(evt);
    }, false);
};

Kinetic.Stage.prototype.getMousePos = function(evt){
    return this.mousePos;
};

Kinetic.Stage.prototype.getTouchPos = function(evt){
    return this.touchPos;
};

Kinetic.Stage.prototype.setMousePosition = function(evt){
    var mouseX = evt.clientX - this.getContainerPos().left + window.pageXOffset;
    var mouseY = evt.clientY - this.getContainerPos().top + window.pageYOffset;
    this.mousePos = {
        x: mouseX,
        y: mouseY
    };
};

Kinetic.Stage.prototype.setTouchPosition = function(evt){
    if (evt.touches !== undefined && evt.touches.length == 1) { // Only deal with
        // one finger
        var touch = evt.touches[0];
        // Get the information for finger #1
        var touchX = touch.pageX - this.getContainerPos().left + window.pageXOffset;
        var touchY = touch.pageY - this.getContainerPos().top + window.pageYOffset;
        
        this.touchPos = {
            x: touchX,
            y: touchY
        };
    }
};

Kinetic.Stage.prototype.getContainerPos = function(){
    var obj = this.container;
    var top = 0;
    var left = 0;
    while (obj.tagName != "BODY") {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return {
        top: top,
        left: left
    };
};

Kinetic.Stage.prototype.getContainer = function(){
    return this.container;
};

/****************************************
 * Region
 */
Kinetic.Region = function(draw){
    this.draw = draw;
    this.position = {
        x: 0,
        y: 0
    };
    this.scale = {
        x: 1,
        y: 1
    };
    this.rotation = 0; // radians
    this.eventListeners = {};
    this.mouseOver = false;
};

Kinetic.Region.prototype._draw = function(){
    var context = this.getContext();
    context.save();
    
    if (this.position.x !== 0 || this.position.y !== 0) {
        context.translate(this.position.x, this.position.y);
    }
    if (this.rotation !== 0) {
        context.rotate(this.rotation);
    }
    if (this.scale.x != 1 || this.scale.y != 1) {
        context.scale(this.scale.x, this.scale.y);
    }
    
    this.draw();
    context.restore();
};

Kinetic.Region.prototype.getCanvas = function(){
    return this.canvas;
};

Kinetic.Region.prototype.getContext = function(){
    return this.context;
};

Kinetic.Region.prototype.setPosition = function(x, y){
    this.position.x = x;
    this.position.y = y;
    this.clear();
    this._draw();
};

Kinetic.Region.prototype.setRotation = function(rotation){
    this.rotation = rotation;
    this.clear();
    this._draw();
};

Kinetic.Region.prototype.setScale = function(x, y){
    this.scale.x = x;
    this.scale.y = y;
    this.clear();
    this._draw();
};

Kinetic.Region.prototype.clear = function(){
    var context = this.getContext();
    var canvas = this.getCanvas();
    context.clearRect(0, 0, canvas.width, canvas.height);
};

Kinetic.Region.prototype.addEventListener = function(type, func){
    var event = (type.indexOf('touch') == -1) ? 'on' + type : type;
    this.eventListeners[event] = func;
};

Kinetic.Region.prototype.moveToTop = function(){
    var stage = this.stage;
    // remove region from regions
    for (var n = 0; n < stage.regions.length; n++) {
        var reg = stage.regions[n];
        if (reg.id == this.id) {
            stage.regions.splice(n, 1);
            stage.regions.push(this);
            break;
        }
    }
    
    // reorder canvases
    for (var n = 0; n < stage.regions.length; n++) {
        var reg = stage.regions[n];
        reg.getCanvas().style.zIndex = ++stage.zIndexCounter;
    }
};

/****************************************
 * drawImage util
 * This util function draws a rectangular region
 * over a canvas image to provide a detectable path
 */
Kinetic.drawImage = function(imageObj, x, y, width, height){
    if (!width) {
        width = imageObj.width;
    }
    if (!height) {
        height = imageObj.height;
    }
    return function(){
        var context = this.getContext();
        context.drawImage(imageObj, x, y, width, height);
        context.beginPath();
        context.rect(x, y, width, height);
        context.closePath();
    };
};






