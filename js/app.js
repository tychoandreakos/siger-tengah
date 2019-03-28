
  $(document).ready(function() {
  
      // menu slider
    var slideStart;
  
    function startSlide() {
      slideStart = setInterval(slideShow, 20000);
    };
    function slideShow() {
  
      var slideCurrent = $(".slide-active");
      var slideNext = slideCurrent.next();
      var dotCurrent = $("li.active");
      var dotNext = dotCurrent.next();
  
      if (slideNext.length == 0) {
        slideNext = $(".slide").first();
        dotNext = $(".slide-indicator li").first();
      }
  
      var slideIndex = slideNext.index();
  
      $('.slide').css({
        'transform': 'translate(-' + (slideIndex) * 100 + '%)'
      });
  
      $('.slide').removeClass('slide-active');
      slideNext.addClass('slide-active');
  
      var captionNext = slideNext.find(".caption");
  
      $('.slide-indicator li').removeClass('active');
      dotNext.addClass('active');
      
      
  
    };
    function parallaxX() {
      var scrollTop = window.pageYOffset
  
      $(window).on("scroll resize", function() {
        scrollTop = window.pageYOffset;
      });
  
      $(".slide").each(function() {
        var parallaxImage = $(this);
        var parallaxOffset = parallaxImage.offset().top;
        var yPos;
        var coords;
  
        $(window).on("scroll resize", function() {
          yPos = -(parallaxOffset - scrollTop) / 2;
          coords = '50% ' + yPos + 'px';
  
          parallaxImage.css({
            backgroundPosition: coords
          });
        });
      });
    };
    function siteNav() {
  
      $(".nav-menu").on("click", function() {
        $("body").animate({
          'right': '320'
        });
        $(".nav-container").animate({
          'right': '0'
        });
        $("<div class=\"nav-wrapper\"></div>").appendTo("body");
      });
      
      $(".close-button").on("click", buttonClose);
      $("body").on("click", '.nav-wrapper', buttonClose);
      
      function buttonClose() {
        $(".nav-wrapper").remove();
        $(".caret").removeClass("open");
        $(".dropdown-nav").slideUp();
        $("body").animate({
          'right': '0'
        });
        $(".nav-container").animate({
          'right': '-100%'
        });
      }
      
      $(".dropdown-container a").on("click", function(){
        $(this).children(".caret").toggleClass("open");
        $(this).next(".dropdown-nav").slideToggle(300);
      });
      
    };
  
    $('.slide-indicator li').on("click", function() {
  
      clearInterval(slideStart);
      var goToSlide = $(this).index();
  
      $('.slide-indicator li').removeClass('active');
      $('.slide').removeClass('slide-active');
      $('.slide').eq(goToSlide).addClass('slide-active');
      $(this).addClass('active');
  
      $('.slide').css({
        'transform': 'translate(-' + (goToSlide) * 100 + '%)'
      });
      startSlide();
    });
  
    startSlide();
    parallaxX();
    siteNav();

    
  });

  $(function() {
    $( ".love-button i" ).click(function() {
      var $this = $(this);
      $this.find( ".love-button i,span" );
      $this.toggleClass( "press", 1000 );
    });
  });


  // owl carousel
  $('.owl-carousel').owlCarousel({
    loop: true,
      margin: 10,
      nav    : true,
      smartSpeed :900,
      // center: true,
    //  autoWidth:true,
     navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  })


  // menu more
  class Dropdown {
    constructor() {
      this.btn = document.querySelector('.dropdown-btn');
      this.list = document.querySelector('.list');
      this.items = [].slice.call(document.querySelectorAll('.list-item'));
      this.reversedItems = [...this.items].reverse();
      this.focusedEls = [this.btn, ...[].slice.call(document.querySelectorAll('.list-item__link'))];
      this.arrow = document.querySelectorAll('.svg__arrow');
      this.cross = document.querySelector('.svg__cross');
      this.tlSvg = new TimelineLite({paused: true});
      this.tlList = new TimelineLite({paused: true, onReverseComplete: () => {
        TweenMax.set(this.list, {autoAlpha: 0});
      }});
      this.keys = {
        space: 32,
        enter: 13,
        up: 38,
        down: 40,
        esc: 27,
        tab: 9
      };
      this.showMenu = this.showMenu.bind(this);
      this.hideMenu = this.hideMenu.bind(this);
      this.clickOutside = this.clickOutside.bind(this);
      this.setTweens();
      this.addEvents();
    }
    
    addEvents() {
      this.btn.addEventListener('click', e => {
        this.btn.classList.contains('opened') ? this.hideMenu() : this.showMenu(e);
      });
      
      this.btn.addEventListener('mousedown', e => {
        e.preventDefault();
      });
      
      this.btn.addEventListener('keydown', e => {
        let which = e.which || e.keyCode;
        if (which === this.keys.space || which === this.keys.enter) {
          this.btn.classList.contains('opened') ? this.hideMenu : this.showMenu;
        };
      });
      
      this.focusedEls.forEach(el => {
        el.addEventListener('keydown', e => {
          let which = e.which || e.keyCode;
          let ind = this.focusedEls.indexOf(el);
          if (which === this.keys.esc) this.hideMenu();
          if (which === this.keys.tab) {
            if ((ind === this.focusedEls.length - 1 && e.shiftKey === false) || (ind === 0 && e.shiftKey === true)) 
              this.hideMenu();
          }
          if (which === this.keys.down) {
            if (ind === this.focusedEls.length - 1) {
              this.focusedEls[0].focus();
            } else {
              this.focusedEls[ind+1].focus();
            }
          };
          if (which === this.keys.up) {
            if (ind === 0) {
              this.focusedEls[this.focusedEls.length - 1].focus();
            } else {
              this.focusedEls[ind-1].focus();
            }
          };
        });
      });
    }
    
    showMenu(e) {
      TweenMax.set(this.list, {autoAlpha: 1});
      this.tlSvg.play().timeScale(1);
      this.tlList.play().timeScale(1);
      this.btn.classList.add('opened');
      this.btn.setAttribute('aria-expanded', true);
      this.list.setAttribute('aria-hidden', false);
      setTimeout(() => {
        document.addEventListener('click', this.clickOutside);
      });
    }
    
    hideMenu() {
      this.tlSvg.reverse().timeScale(1.85);
      this.tlList.reverse().timeScale(1.3);
      this.btn.classList.remove('opened');
      this.btn.setAttribute('aria-expanded', false);
      this.list.setAttribute('aria-hidden', true);
      document.removeEventListener('click', this.clickOutside);
    }
    
    clickOutside(e) {
      let path = e.path || this.clickPath(e.target);
      if (path.indexOf(this.list) === -1 && path.indexOf(this.btn) === -1) this.hideMenu(e);
    }
    
    setTweens() {
      this.items.forEach(el => {
        let offset = el.offsetTop + el.offsetHeight;
        TweenMax.set(el, {y: -offset});
      });
      TweenMax.set([this.cross, this.arrow], {transformOrigin: '50% 50%'});
      this.tlSvg.to(this.arrow, .3, {y: 9.7,  ease: Sine.easeInOut}, 'start')
      .set(this.arrow, {className: '+=thin-stroke'}, 'start')
      .to(this.cross, .5, {y: 10.5, ease: Power2.easeOut}, 'start+=.07')
      .to(this.cross, .23, {scaleX: .5}, 'start')
      .to(this.cross, .25, {scaleX: 1, scaleY: .8, ease: Sine.easeOut}, 'start+=.28')
      .to(this.cross, .2, {scaleY: 1, ease: Sine.easeIn}, 'start+=.57');
      this.tlList.staggerTo(this.items, .4, {y: 0, ease: Sine.easeOut}, .12, 'start+=.18')
      .staggerTo(this.items, 0, {className: '+=is-visible', immediateRender: false}, .15, 'start+=.48');
    }
    
    clickPath(el) {
      let path = [];
      while(el != document.documentElement) {
         path.push(el);
         el = el.parentElement;
      }
      return path;
    }
  }
  
  new Dropdown();





  