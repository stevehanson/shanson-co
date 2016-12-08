// used to fade elements in and out
// http://stackoverflow.com/questions/30206054/vanilla-javascript-fadein-fadeout-without-jquery

// adding a _ method on which we can attach utility functions
function _(el) {
  if (!(this instanceof _)) {
    return new _(el);
  }

  this.el = typeof el === 'string' ? document.querySelectorAll(el) : el;
}

_.prototype._applyFunc = function(func) {
  var slicedArgs = Array.prototype.slice.call(arguments, 1); // all arguments except the function name

  if(typeof this.el.forEach === 'function') { // el is an array
    this.el.forEach(function(el) {
      this['_' + func].apply(this, [el].concat(slicedArgs));
    }.bind(this));
  } else { // el is a single item
    this['_' + func].apply(this, [this.el].concat(slicedArgs));
  }
};

_.prototype.fade = function(type, ms) {
  this._applyFunc('fade', type, ms);
};

_.prototype._fade = function(el, type, ms) {
  var isIn = type === 'in',
    opacity = isIn ? 0 : 1,
    interval = 10,
    duration = ms,
    gap = interval / duration,
    self = this;

  if(isIn) { // fading in
    if(el.style.display === 'none')
      el.style.display = '';
    el.style.opacity = opacity;
  }

  function func() {
    opacity = isIn ? opacity + gap : opacity - gap;
    el.style.opacity = opacity;

    if(opacity <= 0) {
      el.style.display = 'none';
      el.style.opacity = 1;
    }

    if(opacity <= 0 || opacity >= 1) {
      window.clearInterval(fading);
    }
  }

  var fading = window.setInterval(func, interval);
};