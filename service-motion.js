// Framer Motion bridge for static service pages.
(function() {
  var real = null;
  var cache = {};
  var skip = {
    initial: 1, animate: 1, exit: 1, transition: 1, whileHover: 1, whileTap: 1,
    whileInView: 1, viewport: 1, variants: 1, layout: 1, layoutId: 1,
    custom: 1, onAnimationStart: 1, onAnimationComplete: 1
  };

  window.motion = new Proxy({}, {
    get: function(_, tag) {
      if (real) return real[tag];
      if (!cache[tag]) {
        cache[tag] = function MotionFallback(props) {
          var p = {};
          for (var k in props) if (!skip[k]) p[k] = props[k];
          return React.createElement(tag, p);
        };
      }
      return cache[tag];
    }
  });

  window.AnimatePresence = function(props) { return props.children || null; };
  window.__serviceFmSetReal = function(fm) {
    real = fm.motion;
    if (fm.AnimatePresence) window.AnimatePresence = fm.AnimatePresence;
    window.dispatchEvent(new CustomEvent("service-fm-ready"));
  };
})();
