---
---
'use strict'


class WorkItemView {

  constructor(el) {
    this.el = el;

    TweenMax.set(this.el, {scale: 0.95, rotationY: 0, rotationX: 0});

    console.log('hi');
    

    console.log(this.el);
    this.el.addEventListener('mouseover', this.handle_mouseover.bind(this));
    this.el.addEventListener('mouseout', this.handle_mouseout.bind(this));
    this.el.addEventListener('mousemove', this.handle_mousemove.bind(this));
    this.el.addEventListener('click', this.handle_click.bind(this));
    this.el.addEventListener('touchstart', this.handle_click.bind(this));

  }

  handle_click(e) {
    console.log('a');
    let link = this.el.querySelector('a');
    console.log('b', link);

    let url = link.getAttribute('href');
    console.log('c', url);

    window.location.href = url;
    console.log('d');

  }

    handle_mouseover(e) {
       TweenMax.to(this.el, 0.2, {scale: 1, ease: Back.easeOut});
    }

    handle_mousemove(e) {
      let dx = e.offsetX - (this.el.offsetWidth / 2);
      let dy = e.offsetY - (this.el.offsetHeight / 2);

      console.log(dx, dy);
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

    angleToPoints(angle) {
    	let segment = Math.floor(angle / Math.PI * 2) + 2;
    	let diagonal =  (1/2 * segment + 1/4) * Math.PI;
    	let op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
    	let x = op * Math.cos(angle);
    	let y = op * Math.sin(angle);

    	return {
    		x1: x < 0 ? 1 : 0,
    		y1: y < 0 ? 1 : 0,
    		x2: x >= 0 ? x : x + 1,
    		y2: y >= 0 ? y : y + 1
    	};
    }

    updateGradient(e) {
      let dx = e.offsetX - (this.w / 2);
      let dy = e.offsetY - (this.h / 2);
      let angle = Math.atan2(dy, dx);
      let points = this.angleToPoints(angle);

      let _opacity = Math.sqrt((dx * dx) + (dy * dy));

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
      let radius = 20,
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
    let panels = document.getElementsByClassName('panel');

    for (let i = 0; i < panels.length; i += 1) {
      new WorkItemView(panels[i]);
    }
  }
}

new App();
