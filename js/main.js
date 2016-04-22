---
---
'use strict'


class WorkItemView {

  constructor(el) {
    this.el = el;

    TweenMax.set(this.el, {scale: 0.95, rotationY: 0, rotationX: 0});

    this.el.addEventListener('mouseover', this.handle_mouseover.bind(this));
    this.el.addEventListener('mouseout', this.handle_mouseout.bind(this));
    this.el.addEventListener('mousemove', this.handle_mousemove.bind(this));
    this.el.addEventListener('click', this.handle_click.bind(this));
    //this.el.addEventListener('touchstart', this.handle_click.bind(this));

  }

  handle_click(e) {
    var link = this.el.querySelector('a');
    var url = link.getAttribute('href');
    window.location.href = url;
  }

    handle_mouseover(e) {
       TweenMax.to(this.el, 0.2, {scale: 1, ease: Back.easeOut});
    }

    handle_mousemove(e) {
      var dx = e.offsetX - (this.el.offsetWidth / 2);
      var dy = e.offsetY - (this.el.offsetHeight / 2);

      TweenMax.to(this.el, 0.2, {rotationY: dx / 10, rotationX: -dy / 10});

      //this.updateGradient(e);
    }

    handle_mouseout(e) {
      TweenMax.to(this.el, 0.2, {scale: 0.95, rotationY: 0, rotationX: 0, ease: Quad.easeOut});
      //TweenMax.to(e.target, 1, {rotationY: 0, rotationX: 0});
      //TweenMax.to(this.gradEl.node, 0.5, {opacity: 0});
    }

    createMask() {
      this.mask = this.s.rect(0, 0, this.w, this.h, 3);
      this.mask.attr({fill: 'white'});
      this.mask.toDefs();

      this.g.attr({mask: this.mask});
    }

    angvaroPoints(angle) {
    	var segment = Math.floor(angle / Math.PI * 2) + 2;
    	var diagonal =  (1/2 * segment + 1/4) * Math.PI;
    	var op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
    	var x = op * Math.cos(angle);
    	var y = op * Math.sin(angle);

    	return {
    		x1: x < 0 ? 1 : 0,
    		y1: y < 0 ? 1 : 0,
    		x2: x >= 0 ? x : x + 1,
    		y2: y >= 0 ? y : y + 1
    	};
    }

    updateGradient(e) {
      var dx = e.offsetX - (this.w / 2);
      var dy = e.offsetY - (this.h / 2);
      var angle = Math.atan2(dy, dx);
      var points = this.angvaroPoints(angle);

      var _opacity = Math.sqrt((dx * dx) + (dy * dy));

      this.grad.attr(points);
      TweenMax.to(this.gradEl.node, 0.1, {opacity: _opacity / this.h});

    }

    createGradient() {
      this.grad = this.s.gradient("l(0, 0, 1, 1)rgba(0,0,0,0.5)-rgba(0,0,0,0):75");

      this.gradEl = this.s.rect(0, 0, this.w, this.h);
      this.gradEl.attr({fill: this.grad, opacity: 0});
      this.g.append(this.grad);
    }

    getPath(a) {
      var radius = 20,
          r,
          x,
          y,
          mid,
          anim;

      a %= 360;
      r = ( a * Math.PI / 180 );
      x = Math.sin( r ) * radius;
      y = Math.cos( r ) * - radius;
      mid = ( a > 180 ) ? 1 : 0;
      anim = 'M 0 0 v -' + radius + ' A ' + radius + ' ' + radius + ' 1 '
        + mid + ' 1 '
        + x + ' '
        + y + ' z';

      return anim;
    }
}


class App {
  constructor() {
    var panels = document.getElementsByClassName('panel');

    for (var i = 0; i < panels.length; i += 1) {
      new WorkItemView(panels[i]);
    }
  }
}

setTimeout(function () {
  new App();
}, 300);
