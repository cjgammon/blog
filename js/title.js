
function start() {
    let s = new Snap("#title");
    var letterSpeed = 10; //higher = faster
    var colorSpeed = 2; //higher = faster
    let colors = ["#00a4ae", "#efad42", "#e9435a", "#4aadad", "#83cead"];
    let letters = s.selectAll(".letter");

    let tl = new TimelineMax();
    s.node.style.opacity = '1';

    s.click(function () {
        window.location = 'http://www.cjgammon.com';
    });

    for (var i = 0; i < letters.length; i += 1) {
      var letter = letters[i];
      letter.attr({
        opacity: 0
      });

      let g = s.g();
      g.attr({
        class: "holder"
      });
      g.mouseover(handle_MOUSEOVER);

      for (var j = 0; j < colors.length; j += 1) {
        var l = letter.clone();
        g.prepend(l);

        let fill = l.select(".fill");
        fill.attr({
          fill: colors[j]
        });

        var masks = l.selectAll(".mask");
        let maskContainer = s.mask();
        l.append(maskContainer);

        l.attr({
          opacity: 1,
          mask: maskContainer
        });

        for (var k = 0; k < masks.length; k += 1) {
          var mask = masks[k];
          maskContainer.append(mask);
          var delay = 0.1 + i / letterSpeed + (colors.length - j / colorSpeed) / 10;
          var tw = TweenMax.fromTo(
            mask.node,
            1,
            {
              drawSVG: "0%"
            },
            {
              drawSVG: "100%",
              ease: Power2.easeInOut
            }
          );
          tl.add(tw, delay);
        }
      }
    }

    function handle_MOUSEOVER(e) {
      let el = Snap(e.target.parentNode.parentNode);
      var masks = el.selectAll(".mask");

      if (TweenMax.isTweening(masks[0].node)) {
        return;
      }

      for (var k = 0; k < masks.length; k += 1) {
        var mask = masks[k];
        var delay = ((masks.length - k / colorSpeed) / 10) - 0.75;
        var delay2 = 0.1 + (k - masks.length/ colorSpeed) / 10;
        TweenMax.fromTo(
          mask.node,
          1,
          {
            drawSVG: "100%"
          },
          {
            drawSVG: "0%",
            delay: delay,
            ease: Power2.easeInOut
          }
        );
        TweenMax.to(
          mask.node,
          1,
          {
            drawSVG: "100%",
            delay: delay + 1 + delay2,
            ease: Power2.easeInOut
          }
        );
      }
    }

}

setTimeout(start, 1000);
