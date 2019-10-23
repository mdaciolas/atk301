var DetailsView = Backbone.View.extend(
    {
        el: $("#details"),

        initialize: function () {
            _.bindAll(this);

            this.$top = $('.top', this.$el);
            this.$synopsisText = $('.top .synopsis', this.$el);
            this.$synopsisBlurb = $('.synopsis .blurb', this.$el);
            this.$synopsisFull = $('.synopsis .full', this.$el);
            this.$group1 = $('.bottom .group1', this.$el);
            this.$group2 = $('.bottom .group2', this.$el);
            this.$group3 = $('.bottom .group3', this.$el);
            this.$group4 = $('.bottom .group4', this.$el);
            this.$seeText = $('.bottom .details_btn span.see', this.$el);
            this.$backText = $('.bottom .details_btn span.back', this.$el);
            this.isPage2 = false;

            this.$group1Ul = $('.bottom .group1 ul', this.$el);
            this.$group2Ul = $('.bottom .group2 ul', this.$el);
            this.$group3Ul = $('.bottom .group3 ul', this.$el);
            this.$group4Ul = $('.bottom .group4 ul', this.$el);
            this.SLIDE_SPEED = 300;

            this.addClickHandler($('.synopsis .blurb .more', this.$el), this.onMoreClick);
            this.addClickHandler($('.synopsis .full .close_btn', this.$el), this.onSynopsisClose);
            this.addClickHandler($('.bottom .group1 h3', this.$el), this.onGroup1Click);
            this.addClickHandler($('.bottom .group2 h3', this.$el), this.onGroup2Click);
            this.addClickHandler($('.bottom .group3 h3', this.$el), this.onGroup3Click);
            this.addClickHandler($('.bottom .group4 h3', this.$el), this.onGroup4Click);

            if(!this.$group3Ul.length) {
                $('.bottom .details_btn', this.$el).hide();
            }

            this.screenUtilsModel.on('windowUpdated', this.onWindowUpdated);
            var thisRef = this;
            setTimeout(function () {
                thisRef.onWindowUpdated(thisRef.isMobile());
            }, 100);

            this.onWindowUpdated(this.isMobile());
        },

        events: {
            'click .news_item':               'onClick',
            'click .bottom .details_btn':     'onFilmDetailsClick'
        },

        onMoreClick: function () {
            this.$synopsisText.css({ height: 'auto' });
            var prevHeight = this.$synopsisText.height();
            this.$synopsisBlurb.hide();
            this.$synopsisFull.fadeIn(300);
            var newHeight = this.$synopsisText.height();
            this.$synopsisText.css({ height: prevHeight });
            this.$synopsisText.animate({ height: newHeight }, 300);
        },

        onSynopsisClose: function() {
            this.$synopsisText.css({ height: 'auto' });
            var prevHeight = this.$synopsisText.height();
            this.$synopsisBlurb.fadeIn(300);
            this.$synopsisFull.hide();
            var newHeight = this.$synopsisText.height() + 15;
            this.$synopsisText.css({ height: prevHeight - 15 });
            var thisRef = this;
            this.$synopsisText.animate({ height: newHeight }, 200, function(e) {
                thisRef.$synopsisText.css({ height: 'auto' });
            });
        },

        onFilmDetailsClick: function () {
            if(this.isPage2) {
                this.showPage1();
            } else {
                this.showPage2();
            }
        },

        showPage2: function() {
            var thisRef = this;
            this.isPage2 = true;
            this.$group1.fadeOut(250);
            this.$group2.fadeOut(250, function (e) {
                thisRef.$group3.fadeIn();
                thisRef.$group4.fadeIn();
            });
            this.$seeText.hide();
            this.$backText.show();
        },

        showPage1: function() {
            var thisRef = this;
            this.isPage2 = false;
            this.$group3.fadeOut(250, function (e) {
                thisRef.$group1.fadeIn();
                thisRef.$group2.fadeIn();
            });
            this.$group4.fadeOut(250);
            this.$seeText.show();
            this.$backText.hide();
        },

        onGroup1Click: function(){
            if(!this.isMobile()) return;
            if(this.$group1Ul.is(':visible')) {
                this.$group1Ul.slideUp(this.SLIDE_SPEED);
            } else {
                this.$group1Ul.slideDown(this.SLIDE_SPEED);
            }
            this.$group2Ul.slideUp(this.SLIDE_SPEED);
            this.$group3Ul.slideUp(this.SLIDE_SPEED);
            this.$group4Ul.slideUp(this.SLIDE_SPEED);
        },

        onGroup2Click: function () {
            if (!this.isMobile()) return;
            this.$group1Ul.slideUp(this.SLIDE_SPEED);
            if (this.$group2Ul.is(':visible')) {
                this.$group2Ul.slideUp(this.SLIDE_SPEED);
            } else {
                this.$group2Ul.slideDown(this.SLIDE_SPEED);
            }
            this.$group3Ul.slideUp(this.SLIDE_SPEED);
            this.$group4Ul.slideUp(this.SLIDE_SPEED);
        },

        onGroup3Click: function () {
            if (!this.isMobile()) return;
            this.$group1Ul.slideUp(this.SLIDE_SPEED);
            this.$group2Ul.slideUp(this.SLIDE_SPEED);
            if (this.$group3Ul.is(':visible')) {
                this.$group3Ul.slideUp(this.SLIDE_SPEED);
            } else {
                this.$group3Ul.slideDown(this.SLIDE_SPEED);
            }
            this.$group4Ul.slideUp(this.SLIDE_SPEED);
        },

        onGroup4Click: function () {
            if (!this.isMobile()) return;
            this.$group1Ul.slideUp(this.SLIDE_SPEED);
            this.$group2Ul.slideUp(this.SLIDE_SPEED);
            this.$group3Ul.slideUp(this.SLIDE_SPEED);
            if (this.$group4Ul.is(':visible')) {
                this.$group4Ul.slideUp(this.SLIDE_SPEED);
            } else {
                this.$group4Ul.slideDown(this.SLIDE_SPEED);
            }
        },


        onWindowUpdated: function (isMobile) {
            if(isMobile) {
                this.$synopsisBlurb.hide();
                this.$synopsisFull.show();
            } else {
                this.$synopsisBlurb.hide();
                this.$synopsisFull.show();
                this.$synopsisText.css({ height: 'auto' });
            }

            if (isMobile) {
                this.$synopsisText.css({ height: 'auto' });
                this.$group1.show();
                this.$group2.show();
                this.$group3.show();
                this.$group4.show();
            } else {
                this.showPage1();
            }

            if(!isMobile) {
                this.$group1Ul.slideDown();
                this.$group2Ul.slideDown();
                this.$group3Ul.slideDown();
                this.$group4Ul.slideDown();
            }

            // "media" section appears in different places between mobile/desktop
            // move into correct DOM location
            if(isMobile) {

                if(this.options.mediaModule != undefined) {
                    $('.content', this.options.mediaModule).appendTo($('#media_mobile_holder', this.$el));
                }
                $('#posters').appendTo($('.posters_mobile', this.$el));
            } else {
                if (this.options.mediaModule != undefined) {
                    $('#media_mobile_holder .content', this.$el).appendTo(this.options.mediaModule);
                }
                $('#posters').appendTo($('.posters_desktop', this.$el));
            }

            var posterHeight = $('#posters').height() + 90;
            $('#details').css({ minHeight:posterHeight });


        }
    }
);
var ScrollView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this);

            this.$mainUl = $('.slides ul', this.$el);
            this.$mainLiList = $('.slides li', this.$el);
            this.index = 0;
            this.numSlides = this.$mainLiList.length;
            this.slideWidth = this.$el.width();
            this.CHANGE_INTERVAL = 7000;
            this.THUMB_OVER_COLOR = '#e0dfdf';
            this.THUMB_OUT_COLOR = '#fcfcfc';
            if (this.options.altColors) {
                this.THUMB_OVER_COLOR = '#7a7a7a';
                this.THUMB_OUT_COLOR = '#969696';
            }
            this.thumbIndexSet = null;

            // store starting mobile image
            $('.slides li img', this.$el).each(function (i, val) {
                $(this).attr('data-mobile', $(this).attr('src'));
            });


            if (this.options.autoPlay) {
                this.changeInt = setInterval(this.advanceSlide, this.CHANGE_INTERVAL);
            }
            var thisRef = this;

            this.iScroll = new IScroll('#' + this.$el.attr('id') + ' .slides', {
                scrollX       : true,
                scrollY       : false,
                click         : false,
                bounceTime    : 300,
                bounce        : true,
                //preventDefault: !Modernizr.touch,
                eventPassthrough: Modernizr.touch,
                snap          : 'li',
                bounceEasing  : 'quadratic',
                keyBindings   : false,
                onScrollEnd   : thisRef.onScrollEnd,
                snapSpeed     : Modernizr.touch ? 260 : 400,
                momentum      : Modernizr.touch ? false : true,
                useTransition : false
            });
            setTimeout(this.onScrollEnd, 500);


            if (this.numSlides > 1) {
                this.initThumbs();
                this.setActiveThumb();
            }


            this.addClickHandler($('.thumbs', this.$el), this.onThumbDown);
            this.addClickHandler($('.arrow_left', this.$el), this.onPrevClick);
            this.addClickHandler($('.arrow_right', this.$el), this.onNextClick);  // prev/next buttons

            this.$arrowLeft = $('.arrow_left', this.$el);
            this.$arrowRight = $('.arrow_right', this.$el);

            if (this.options.hideArrows) {
                this.$arrowLeft.remove();
                this.$arrowRight.remove();
            }

            if (cssua.ua.ie < 10) {
                setInterval(thisRef.onScrollEnd, 1000);
            }

            this.screenUtilsModel.on('windowUpdated', this.onWindowUpdated);
            setTimeout(function () {
                thisRef.onWindowUpdated(thisRef.isMobile());
            }, 100);

            this.onWindowUpdated(this.isMobile());
        },

        events: {
            // individual thumb rollovers
            'mouseenter .thumbs .bg': 'onThumbOver',
            'mouseleave .thumbs .bg': 'onThumbOut',

            // main jumbotron image click
            'click .slides img'     : 'onMainClick',

            // kills auto-change on any click
            'mousedown'             : 'onAnyClick',
            'touchstart'            : 'onAnyClick'
        },

        initThumbs: function () {
            // add thumbs wrapper from template
            var template = $('#tpl_scroll').html();
            $(this.$el).append(_.template(template));

            // add in LIs
            var $thumbsUl = $('.thumbs ul', this.$el);
            this.$mainLiList.each(function (i, val) {
                var li = '<li><div class="bg"></div></li>';
                $thumbsUl.append(li);
            });
            this.$thumbsLi = $('.thumbs ul li', this.$el);

            this.sizeThumbs();
        },

        sizeThumbs: function () {
            $('.thumbs li', this.$el).css({ width: 50 });
            // make all thumbs 50px wide. if browser becomes too small, change to percentage
            var lisWiderThanUL = ($(this.$thumbsLi).width() * this.numSlides) > $('.thumbs ul', this.$el).width() - 10;
            if (lisWiderThanUL) {
                $('.thumbs li', this.$el).css({ width: Math.floor(100 / this.numSlides) + '%'});
            } else {
                $('.thumbs li', this.$el).css({ width: 50 });
            }
        },

        onMainClick: function (e) {
            if (this.iScroll.moved) {
                e.preventDefault();
                return false;
            }
        },

        onThumbOver: function (e) {
            if ($(e.currentTarget).closest('li').index() == this.index || this.isMobile()) return;
            TweenMax.to($(e.currentTarget), 0.22, { css: { backgroundColor: this.THUMB_OVER_COLOR } });
        },

        onThumbOut: function (e) {
            if ($(e.currentTarget).closest('li').index() == this.index || this.isMobile()) return;
            TweenMax.to($(e.currentTarget), 0.22, { css: { backgroundColor: this.THUMB_OUT_COLOR } });
        },

        onThumbDown: function (e) {
            if ($(e.currentTarget).closest('li').index() == this.index) return;
            var $li = $(e.target).closest('li');
            this.index = $li.index();
            this.iScroll.goToPage(this.index, 0, 500);
            this.setActiveThumb();
        },

        advanceSlide: function (e) {
            if (this.iScroll.currentPage.pageX == this.numSlides - 1) {
                this.index = 0;
                this.iScroll.currentPage.pageX = 0;
                this.iScroll.scrollTo(-this.index * this.slideWidth, 0, 1000);
            } else {
                this.iScroll.next(600);
            }
        },

        setActiveThumb: function () {
            if (this.numSlides < 2)
                return;

            // reset all thumbs back to gray
            var thisRef = this;
            $('.bg', this.$thumbsLi).each(function (i, val) {
                TweenMax.to($(this), 0, { css: { backgroundColor: thisRef.THUMB_OUT_COLOR } });
            });

            // set current thumb's color
            var $curThumbsLi = $(this.$thumbsLi[this.index]);
            var $bg = $('.bg', $curThumbsLi);
            var $curSlideLi = $(this.$mainLiList[this.index]);
            var color = this.options.altColors && this.isMobile() ? this.options.altColorActive : $curSlideLi.data('color');
            TweenMax.to($bg, 0, { css: { backgroundColor: color } });

            this.thumbIndexSet = this.index;
        },

        onAnyClick: function (e) {
            clearInterval(this.changeInt);
        },

        onScrollEnd: function () {
            this.index = this.iScroll.currentPage.pageX;
            this.setActiveThumb();
            setTimeout(this.onScrollEnd, 500);
        },

        onPrevClick: function (e) {
            if (this.index == 0) {
                this.iScroll.goToPage(this.numSlides - 1, 0);
            } else {
                this.iScroll.prev();
            }
        },

        onNextClick: function (e) {
            if (this.index + 1 == this.numSlides) {
                this.iScroll.goToPage(0, 0);
            } else {
                this.iScroll.next();
            }
        },

        onWindowUpdated: function (isMobile) {
            // switch between mobile and desktop image size as needed
            this.$mainLiList.each(function (i, val) {
                var $img = $('img', this);
                var imgSrc = $img.data(isMobile ? 'mobile' : 'desktop');
                if (imgSrc != undefined) {
                    $img.attr('src', imgSrc);
                }
            });
            $('.slides', this.$el).show();
            
            if(this.$el.data('mobile') && this.$el.data('desktop')){
                this.$el.css({
                    'background-image': "url("+this.$el.data(isMobile? 'mobile' : 'desktop')+")"
                });
            }

            this.slideWidth = this.$el.width();
            this.$mainUl.css({ width: (this.slideWidth * this.numSlides) });

            var thisRef = this;
            this.$mainLiList.each(function (i, val) {
                $(this).css({ width: thisRef.slideWidth });
            });

            this.setActiveThumb();

            if (this.numSlides > 1) {
                this.$arrowLeft.css({ display: $(window).width() < 900 || (this.numSlides < 2) ? 'none' : 'block' });
                this.$arrowRight.css({ display: $(window).width() < 900 || (this.numSlides < 2) ? 'none' : 'block' });
                this.sizeThumbs();
                this.iScroll.refresh();
            }
        }
    });
var MediaView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this);

        this.$mainUl = $('.slides ul', this.$el);
        this.$mainLiList = $('.slides li', this.$el);
        this.$slides = $('.slides', this.$el);
        this.index = 0;
        this.numSlides = this.$mainLiList.length;
        this.slideWidth = this.$el.width();
        this.CHANGE_INTERVAL = 7000;
        this.thumbIndexSet = null;
        this.$iframes = $('iframe', this.$el);
        this.$iframesInternal = $('.yt_iframe iframe', this.$el);
        this.$mediaScroller = $('.media_scroller', this.$el);
        this.$scrollerWrap = $('.scroller_wrap', this.$el);
        this.$arrowLeft = $('.arrow_left', this.$el);
        this.$arrowRight = $('.arrow_right', this.$el);

        // store starting mobile image
        $('.slides li img', this.$el).each(function (i, val) {
            $(this).attr('data-mobile', $(this).attr('src'));
        });

        if (this.options.autoPlay) {
            this.changeInt = setInterval(this.advanceSlide, this.CHANGE_INTERVAL);
        }
        var thisRef = this;

        this.initInfiniteScroll();

        this.iScroll = new IScroll('#' + this.$el.attr('id') + ' .slides', {
            scrollX       : true,
            scrollY       : false,
            click         : false,
            bounceTime    : 300,
            bounce        : true,
            //preventDefault: !Modernizr.touch,
            eventPassthrough: Modernizr.touch,
            snap          : 'li',
            bounceEasing  : 'quadratic',
            keyBindings   : false,
            onScrollEnd   : thisRef.onScrollEnd,
            snapSpeed     : Modernizr.touch ? 260 : 400,
            momentum      : Modernizr.touch ? false : true,
            useTransition:false
        });
        setTimeout(this.onScrollEnd, 500);

        this.addClickHandler(this.$arrowLeft, this.onPrevClick);
        this.addClickHandler(this.$arrowRight, this.onNextClick);

        if (this.numSlides < 2) {
            $('.arrow_left', this.$el).remove();
            $('.arrow_right', this.$el).remove();
        }

        // add play icons for video slides
        this.$mainLiList.each(function (i, val) {
            if ($(this).hasClass('video')) {
                $(this).append('<div class="play_icon"></div>');
            }
        });

        $('li.video', this.$el).click(this.onVideoClick);

        this.screenUtilsModel.on('windowUpdated', this.onWindowUpdated);
        this.onWindowUpdated(this.isMobile());
        this.onScrollEnd();
        thisRef.iScroll.directionY = 0;

        $(window).load(function(e) {
            thisRef.onWindowUpdated(thisRef.isMobile())
        });

    },

    events: {
        // kills auto-change on any click
        'mousedown' : 'onAnyClick',
        'touchstart': 'onAnyClick'
    },

    advanceSlide: function (e) {
        this.onNextClick(null);
    },

    initInfiniteScroll: function () {
        if (this.numSlides > 1) {
            $(this.$mainLiList[0]).clone(true).appendTo(this.$mainUl);
            $(this.$mainLiList[this.$mainLiList.length - 1]).clone(true).prependTo(this.$mainUl);
            this.$mainLiList = $('.slides li', this.$el);
            this.numSlides = this.$mainLiList.length;
        }
    },

    onAnyClick: function (e) {
        clearInterval(this.changeInt);
    },

    onScrollEnd: function () {
        this.index = this.iScroll.currentPage.pageX;
        var thisRef = this;

        // dim out non-active slides
        if(!this.isMobile()) {
            this.$mainLiList.each(function (i, val) {
                $(this).stop(true).animate({ opacity: (i - 1 == thisRef.index) || thisRef.numSlides == 1 ? 1 : 0.05 }, 250);
            });
        } else {
            this.$mainLiList.each(function (i, val) {
                $(this).stop(true).css({ opacity: 1 });
            });
        }
        //this.iScroll.refresh();
        setTimeout(this.onScrollEnd, 500);
    },



    onPrevClick: function (e) {
        this.unloadVideos();
        if (this.index <= 0) {
            this.iScroll.goToPage(this.numSlides - 3, 0);
        } else {
            this.iScroll.prev();
        }
    },

    onNextClick: function (e) {
        this.unloadVideos();
        if (this.index + 3 >= this.numSlides) {
            this.iScroll.goToPage(0, 0);
        } else {
            this.iScroll.next();
        }
    },

    onVideoClick: function (e) {

        if (this.iScroll.moved) {
            e.preventDefault();
            return false;
        }

        var thisRef = this;
        var $li = $(e.currentTarget);
        var videoId = $li.data('video_id');

        function do_embed_video(){
            if (thisRef.isMobile()) {
                window.open('http://m.youtube.com/watch?v=' + videoId, '_blank');
            } else {
                var imgWidth = $('img', $li).width();
                var imgHeight = $('img', $li).height();
                $('img', $li).hide();
                $('.play_icon', $li).hide();

                var iframe = '<iframe class="yt_iframe" width="' + imgWidth + '" height="' + imgHeight + '" scrolling="no" src="http://www.youtube.com/embed/' + videoId + '?rel=0&html5=1&autoplay=1&showinfo=0&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>';
                $li.append(iframe);

                var closeBtn = '<div class="video_close">X</div>';
                //$li.append(closeBtn);
                thisRef.$scrollerWrap.append(closeBtn);
                thisRef.onWindowUpdated(thisRef.isMobile());

                $('.video_close', thisRef.$el).click(function (e) {
                    thisRef.unloadVideos();
                    e.stopPropagation();
                    $(this).remove();
                });
            }
        }

        if($li.hasClass('restricted')){
            var agegate = new AgeGateView({
                el: $li,
                success: function(agegate){
                    agegate.dismiss();
                    do_embed_video();
                }
            });
            agegate.show();
        } else {
            return do_embed_video();
        }
        /*
        if (this.iScroll.moved) {
            e.preventDefault();
            return false;
        }
        var $li = $(e.currentTarget);
        var videoId = $li.data('video_id');


        if (this.isMobile()) {
            window.open('http://m.youtube.com/watch?v=' + videoId, '_blank');

        } else {
            var imgWidth = $('img', $li).width();
            var imgHeight = $('img', $li).height();
            $('img', $li).hide();
            $('.play_icon', $li).hide();
			$('.title', $li).hide();

            var iframe = '<iframe class="yt_iframe" width="' + imgWidth + '" height="' + imgHeight + '" scrolling="no" src="http://www.youtube.com/embed/' + videoId + '?rel=0&html5=1&autoplay=1&showinfo=0&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>';
            $li.append(iframe);

            var closeBtn = '<div class="video_close">X</div>';
            //$li.append(closeBtn);
            this.$scrollerWrap.append(closeBtn);
            this.onWindowUpdated(this.isMobile());

            var thisRef = this;
            $('.video_close', this.$el).click(function (e) {
                thisRef.unloadVideos();
                e.stopPropagation();
                $(this).remove();
            });
        }
        */
    },

    unloadVideos: function () {
        $('iframe', this.$el).remove();
        $('.video_close', this.$el).remove();
        $('li img', this.$el).show();
        $('li .play_icon', this.$el).show();
		$('.title', this.$el).show();
    },

    onWindowUpdated: function (isMobile) {

        // switch between mobile and desktop image size as needed
        this.$mainLiList.each(function (i, val) {
            var $img = $('img', this);
            var imgSrc = $img.data(isMobile ? 'mobile' : 'desktop');
            if (imgSrc != undefined) {
                $img.attr('src', imgSrc);
            }
        });
        $('.slides', this.$el).show();

        if(isMobile) {
            this.slideWidth = this.$el.width() * (isMobile ? 0.89 : 1);
        } else {
            this.slideWidth = Math.min((this.$el.width() * .7) * (isMobile ? 0.89 : 1), 960);
        }


        if (this.numSlides == 1 && isMobile) {
            this.slideWidth = this.$mediaScroller.width();
        }


        var thisRef = this;
        this.$mainLiList.each(function (i, val) {
            $(this).css({ width: thisRef.slideWidth });
        });

        if (!isMobile) {
            this.iScroll.disable();
            this.$mainUl.css({ width: (this.slideWidth * this.numSlides) + 1 });
            this.$mainLiList.height($('img', this.$mainLiList).height());

        } else {
            this.iScroll.enable();
            if(this.numSlides >=3) {
                this.$mainUl.css({ width: (this.slideWidth * (this.numSlides - 2)) + 1 });
            } else {
                this.$mainUl.css({ width: (this.slideWidth * (this.numSlides - 0)) + 1 });
            }
            this.$mainLiList.height('auto');
        }
        this.iScroll.moved = false;

        // hide first and last "dummy" LIs if on mobile
        if(isMobile) {
            if(this.numSlides >= 3) {
                $(this.$mainLiList[0]).css({ display: 'none' });
                $(this.$mainLiList[this.$mainLiList.length - 1]).css({ display: 'none' });
            }
            this.$slides.css({ left: 'auto' });
        } else {
            $(this.$mainLiList[0]).css({ display: 'block' });
            $(this.$mainLiList[this.$mainLiList.length - 1]).css({ display: 'block' });

            if(thisRef.numSlides > 1) {
                thisRef.$slides.css({ left: Math.floor(((thisRef.$el.width() - thisRef.slideWidth) / 2) - thisRef.slideWidth) });
            } else {
                thisRef.$slides.css({ left: 'auto' });
            }
        }


        // position arrows
        this.$arrowLeft.css({ left: Math.round(((this.$el.width() - this.slideWidth) / 2) - this.$arrowLeft.width()) - (cssua.ua.mobile == 'ipad' ? 2 : 1) });
        this.$arrowRight.css({ right: Math.round(((this.$el.width() - this.slideWidth) / 2) - this.$arrowRight.width()) - (cssua.ua.mobile == 'ipad' ? -2 : 1) });

        // position close button
        $('.video_close', this.$el).css({ right: ((thisRef.$el.width() - thisRef.slideWidth) / 2) - (cssua.ua.mobile == 'ipad' ? 47 : 0) });

        this.onScrollEnd();
        this.iScroll.refresh();



        /* ----- resize youtube videos ---- */

        this.$iframes = $('iframe', this.$el);
        this.$iframesInternal = $('.yt_iframe', this.$el);

        // size youtube iframe
        if (isMobile) {
            this.$iframes.css({ width: '100%', height: $('img', this.$mainLiList).height() });
            this.unloadVideos();

        } else {
            var h = this.$mainLiList.height();
            this.$iframes.css({ width: Math.min($('.media_scroller', this.$el).width(), 960), height: h });
            this.$iframesInternal.css({ width: '100%', height: h });
        }
    }
});

var ShowtimesDvdView = Backbone.View.extend(
    {
        el: $("#showtimes_dvd"),

        initialize: function () {
            _.bindAll(this);
            this.screenUtilsModel.on('windowUpdated', this.onWindowUpdated);
            this.initInputFields();
            
            $('#showtimes_dvd .dvd a').click(function(){
                ga('send', 'event', 'button', 'click', 'Buy on '+$(this).data('retailer'));
            });
            
            this.onWindowUpdated(this.isMobile());
        },

        events: {
            'click .showtimes .input img': 'onClick'
        },

        onClick: function (e) {
            var zip = $('input', this.el).val();
            var link = $('input', this.el).data('link') + zip;
            ga('send', 'event', 'button', 'click', 'Tickets & Showtimes');
            window.open(link, '_blank')
        },

        initInputFields: function () {
            var $inputList = $('input', this.$el);

            if (Modernizr.input.placeholder) {
                // strip out input value since placeholder will be used
                $inputList.each(function (i, val) {
                    $(this).val('');
                });

            } else {
                // (only used for IE9)
                // remember initial value
                $inputList.each(function (i, val) {
                    $(this).attr('data-value', $(this).val());
                });
                $inputList.on('focus', function (e) {
                    if ($(this).val() == $(this).data('value')) {
                        $(this).val('');
                    }
                });
                $inputList.on('blur', function (e) {
                    if ($(this).val() == '') {
                        $(this).val($(this).data('value'));
                    }
                });
            }
        },

        onWindowUpdated: function (isMobile) {

        }

    });
var ScreeningsView = Backbone.View.extend(
    {
        el: $("#screenings"),

        initialize: function () {
            _.bindAll(this);
            this.screenUtilsModel.on('windowUpdated', this.onWindowUpdated);
            
            $('.screenings .collapse').click(function(){
                $(this).closest('.screenings').find('.collapsible').slideUp();
				$(this).hide();
				$(this).siblings('.expand').show();
            });
			
            $('.screenings .expand').click(function(){
                $(this).closest('.screenings').find('.collapsible').slideDown();
				$(this).hide();
				$(this).siblings('.collapse').show();
            });
            
            this.onWindowUpdated(this.isMobile());
        },
        onWindowUpdated: function (isMobile) {

        }

    });
var NewsView = Backbone.View.extend({
    el: $("#news"),

    initialize: function () {
        _.bindAll(this);
        this.screenUtilsModel.on('windowUpdated', this.onWindowUpdated);

        this.$newsWrapper = $('.news_wrap', this.$el);
        this.$ul = $('ul.gpu', this.$el);
        this.$liList = $('ul li.news_item', this.$el);
        this.numItems = this.$liList.length;
        this.$firstNewsItem = $($('.news_item', this.$el)[0]);
        this.windowLoaded = false;
        this.numThumbsAcross = 1;
        this.myScroll = null;
        var thisRef = this;

        // wait until load so thumbs have width
        $(window).load(function (e) {
            thisRef.windowLoaded = true;
            thisRef.sizeUl();
            thisRef.myScroll = new IScroll('.news_scroller', {
                scrollX         : true,
                scrollY         : false,
                click           : false,
                bounceTime      : Modernizr.touch ? 1100 : 800,
                bounce          : true,
                eventPassthrough: Modernizr.touch,
                snap            : '.news_item',
                useTransition   : false
            });
            thisRef.onWindowUpdated(thisRef.isMobile());

        });

        this.addClickHandler($('.arrow_right', this.$el), this.onRightArrowClick);
        this.addClickHandler($('.arrow_left', this.$el), this.onLeftArrowClick);

        this.onWindowUpdated(this.isMobile());

    },

    events: {
        'click .news_item': 'onClick'
    },

    sizeUl: function () {
        var padding = this.numItems * parseInt(this.$firstNewsItem.css('margin-right'));
        var itemWidths = this.$firstNewsItem.width() * this.numItems;
        
        var tallest = 0;
        this.$liList.each(function(i, val) {
              if($(this).outerHeight() > tallest) {
                  tallest = $(this).outerHeight();
              }
        });
        this.$ul.css({ width: itemWidths + padding, height: tallest+2 });
    },

    sizeLi: function () {
        var wrapperWidth = this.$newsWrapper.width() - (parseInt(this.$firstNewsItem.css('margin-right')) * (this.numThumbsAcross - 1));
        this.$liList.css({ width: wrapperWidth / this.numThumbsAcross });
    },

    getItemWidth: function () {
        return this.$firstNewsItem.width() + parseInt(this.$firstNewsItem.css('margin-right'));
    },

    onRightArrowClick: function (e) {
        if (this.myScroll.currentPage.pageX + (this.numThumbsAcross) == this.numItems) {
            this.myScroll.goToPage(0, 0);
        } else {
            this.myScroll.next();
        }
    },

    onLeftArrowClick: function (e) {
        if (this.myScroll.currentPage.pageX == 0) {
            this.myScroll.goToPage(this.numItems - (this.numThumbsAcross), 0);
        } else {
            this.myScroll.prev();
        }
    },

    onClick: function (e) {
        if (this.myScroll.moved) {
            e.preventDefault();
            return false;
        }
    },

    onWindowUpdated: function (isMobile) {
        var width = $(window).width();
        if (width > 650)this.numThumbsAcross = 1;
        if (width > 750)this.numThumbsAcross = 2;
        if (width > 1050)this.numThumbsAcross = 3;

        if (isMobile) {
            this.$ul.css({ width: 'auto', height: 'auto' });
            this.$liList.css({ width: 'auto' });
        } else {
            this.sizeLi();
            this.sizeUl();
        }
        if(this.myScroll) {
            this.myScroll.refresh();
        }
    }
});
var ShareView = Backbone.View.extend(
{
    el: $('body'),

    initialize: function () {
        _.bindAll(this);
        this.screenUtilsModel.on('windowUpdated', this.onWindowUpdated);
        var thisRef = this;
        this.par = null;

        // add share icons from template
        $('.share_icons').each(function (i, val) {
            var template = $('#tpl_share_icons').html();
            var shareLink = $(this).attr('data-share-link');
            $(this).html(_.template(template, {url: encodeURIComponent(shareLink)}));
            $(this).click(thisRef.toggleIcons);
        });

        // close open menus when clicking anywhere on document (if not share button or share icon)
        $(document).mousedown(function (e) {
            if (!$(e.target).hasClass('share_button') && !$(e.target).hasClass('share_img') && !$(e.target).hasClass('share_icon_img')) {
                if (thisRef.isMobile()) {
                    $('.icons', thisRef.par).fadeOut(300, function () {
                        $('.share_button', thisRef.par).fadeIn(300)
                    });
                } else {
                    $('#sharer .icons', thisRef.par).removeClass('open');
                }
                thisRef.par = null;
            }
        });

        this.onWindowUpdated(this.isMobile());
    },

	loadMore: function () {
		var thisRef = this;
        $('.share_icons').each(function (i, val) {
            var template = $('#tpl_share_icons').html();
            var shareLink = $(this).attr('data-share-link');
            $(this).html(_.template(template, {url: encodeURIComponent(shareLink)}));
            $(this).click(thisRef.toggleIcons);
        });
	},

    toggleIcons: function (e) {

        // exit out of clicking on share icon
        if ($(e.target).hasClass('share_icon_img')) {
            return;
        }
        var thisRef = this;
        // first time through, open menu
        if (this.par == null) {
            if (this.isMobile()) {
                this.par = $(e.currentTarget);
                $('.share_button', this.par).fadeOut(300, function () {
                    $('.icons', thisRef.par).fadeIn(300);
                });
            } else {
                this.par = $(e.currentTarget);
                $('.icons', this.par).addClass('open');
            }

            // not first time through
        } else {

            var isSameButton = this.par.is($(e.currentTarget));

            if (this.isMobile()) {
                if (!isSameButton) {
                    $('.icons', this.par).fadeOut(300, function () {
                        $('.share_button', thisRef.par).fadeIn(300)
                    });
                    this.par = $(e.currentTarget);
                    $('.share_button', this.par).fadeOut(300, function () {
                        $('.icons', thisRef.par).fadeIn(300)
                    });
                } else {
                    $('.icons', this.par).fadeOut(300, function () {
                        $('.share_button', thisRef.par).fadeIn(300)
                    });
                }
            } else {
                if (!isSameButton) {
                    $('.icons', this.par).removeClass('open');
                    this.par = $(e.currentTarget);
                    $('.icons', this.par).addClass('open');
                } else {
                    $('.icons', this.par).removeClass('open');
                    this.par = null;
                }
            }

        }
    },

    onWindowUpdated: function (isMobile) {
        if (this.isMobile()) {
            $('.icons', this.par).removeClass('open');
            $('#sharer .icons', this.par).hide();
            $('#sharer .share_button', this.par).show();
            this.par = null;
        }
        if(!this.isMobile()){
            $('#sharer .icons', this.par).removeClass('open');
            $('#sharer .icons', this.par).show();
            $('#sharer .share_button', this.par).show();
            this.par = null;
        }

    }
});
;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2014 Rico Sta. Cruz
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */

/* jshint expr: true */

;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    factory(root.jQuery);
  }

}(this, function($) {

  $.transit = {
    version: "0.9.12",

    // Map of $.css() keys to values for 'transitionProperty'.
    // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
    propertyMap: {
      marginLeft    : 'margin',
      marginRight   : 'margin',
      marginBottom  : 'margin',
      marginTop     : 'margin',
      paddingLeft   : 'padding',
      paddingRight  : 'padding',
      paddingBottom : 'padding',
      paddingTop    : 'padding'
    },

    // Will simply transition "instantly" if false
    enabled: true,

    // Set this to false if you don't want to use the transition end property.
    useTransitionEnd: false
  };

  var div = document.createElement('div');
  var support = {};

  // Helper function to get the proper vendor property name.
  // (`transition` => `WebkitTransition`)
  function getVendorPropertyName(prop) {
    // Handle unprefixed versions (FF16+, for example)
    if (prop in div.style) return prop;

    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }

  // Helper function to check if transform3D is supported.
  // Should return true for Webkits and Firefox 10+.
  function checkTransform3dSupport() {
    div.style[support.transform] = '';
    div.style[support.transform] = 'rotateY(90deg)';
    return div.style[support.transform] !== '';
  }

  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

  // Check for the browser's transitions support.
  support.transition      = getVendorPropertyName('transition');
  support.transitionDelay = getVendorPropertyName('transitionDelay');
  support.transform       = getVendorPropertyName('transform');
  support.transformOrigin = getVendorPropertyName('transformOrigin');
  support.filter          = getVendorPropertyName('Filter');
  support.transform3d     = checkTransform3dSupport();

  var eventNames = {
    'transition':       'transitionend',
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  // Detect the 'transitionend' event needed.
  var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

  // Populate jQuery's `$.support` with the vendor prefixes we know.
  // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
  // we set $.support.transition to a string of the actual property name used.
  for (var key in support) {
    if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
      $.support[key] = support[key];
    }
  }

  // Avoid memory leak in IE.
  div = null;

  // ## $.cssEase
  // List of easing aliases that you can use with `$.fn.transition`.
  $.cssEase = {
    '_default':       'ease',
    'in':             'ease-in',
    'out':            'ease-out',
    'in-out':         'ease-in-out',
    'snap':           'cubic-bezier(0,1,.5,1)',
    // Penner equations
    'easeInCubic':    'cubic-bezier(.550,.055,.675,.190)',
    'easeOutCubic':   'cubic-bezier(.215,.61,.355,1)',
    'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
    'easeInCirc':     'cubic-bezier(.6,.04,.98,.335)',
    'easeOutCirc':    'cubic-bezier(.075,.82,.165,1)',
    'easeInOutCirc':  'cubic-bezier(.785,.135,.15,.86)',
    'easeInExpo':     'cubic-bezier(.95,.05,.795,.035)',
    'easeOutExpo':    'cubic-bezier(.19,1,.22,1)',
    'easeInOutExpo':  'cubic-bezier(1,0,0,1)',
    'easeInQuad':     'cubic-bezier(.55,.085,.68,.53)',
    'easeOutQuad':    'cubic-bezier(.25,.46,.45,.94)',
    'easeInOutQuad':  'cubic-bezier(.455,.03,.515,.955)',
    'easeInQuart':    'cubic-bezier(.895,.03,.685,.22)',
    'easeOutQuart':   'cubic-bezier(.165,.84,.44,1)',
    'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
    'easeInQuint':    'cubic-bezier(.755,.05,.855,.06)',
    'easeOutQuint':   'cubic-bezier(.23,1,.32,1)',
    'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
    'easeInSine':     'cubic-bezier(.47,0,.745,.715)',
    'easeOutSine':    'cubic-bezier(.39,.575,.565,1)',
    'easeInOutSine':  'cubic-bezier(.445,.05,.55,.95)',
    'easeInBack':     'cubic-bezier(.6,-.28,.735,.045)',
    'easeOutBack':    'cubic-bezier(.175, .885,.32,1.275)',
    'easeInOutBack':  'cubic-bezier(.68,-.55,.265,1.55)'
  };

  // ## 'transform' CSS hook
  // Allows you to use the `transform` property in CSS.
  //
  //     $("#hello").css({ transform: "rotate(90deg)" });
  //
  //     $("#hello").css('transform');
  //     //=> { rotate: '90deg' }
  //
  $.cssHooks['transit:transform'] = {
    // The getter returns a `Transform` object.
    get: function(elem) {
      return $(elem).data('transform') || new Transform();
    },

    // The setter accepts a `Transform` object or a string.
    set: function(elem, v) {
      var value = v;

      if (!(value instanceof Transform)) {
        value = new Transform(value);
      }

      // We've seen the 3D version of Scale() not work in Chrome when the
      // element being scaled extends outside of the viewport.  Thus, we're
      // forcing Chrome to not use the 3d transforms as well.  Not sure if
      // translate is affectede, but not risking it.  Detection code from
      // http://davidwalsh.name/detecting-google-chrome-javascript
      if (support.transform === 'WebkitTransform' && !isChrome) {
        elem.style[support.transform] = value.toString(true);
      } else {
        elem.style[support.transform] = value.toString();
      }

      $(elem).data('transform', value);
    }
  };

  // Add a CSS hook for `.css({ transform: '...' })`.
  // In jQuery 1.8+, this will intentionally override the default `transform`
  // CSS hook so it'll play well with Transit. (see issue #62)
  $.cssHooks.transform = {
    set: $.cssHooks['transit:transform'].set
  };

  // ## 'filter' CSS hook
  // Allows you to use the `filter` property in CSS.
  //
  //     $("#hello").css({ filter: 'blur(10px)' });
  //
  $.cssHooks.filter = {
    get: function(elem) {
      return elem.style[support.filter];
    },
    set: function(elem, value) {
      elem.style[support.filter] = value;
    }
  };

  // jQuery 1.8+ supports prefix-free transitions, so these polyfills will not
  // be necessary.
  if ($.fn.jquery < "1.8") {
    // ## 'transformOrigin' CSS hook
    // Allows the use for `transformOrigin` to define where scaling and rotation
    // is pivoted.
    //
    //     $("#hello").css({ transformOrigin: '0 0' });
    //
    $.cssHooks.transformOrigin = {
      get: function(elem) {
        return elem.style[support.transformOrigin];
      },
      set: function(elem, value) {
        elem.style[support.transformOrigin] = value;
      }
    };

    // ## 'transition' CSS hook
    // Allows you to use the `transition` property in CSS.
    //
    //     $("#hello").css({ transition: 'all 0 ease 0' });
    //
    $.cssHooks.transition = {
      get: function(elem) {
        return elem.style[support.transition];
      },
      set: function(elem, value) {
        elem.style[support.transition] = value;
      }
    };
  }

  // ## Other CSS hooks
  // Allows you to rotate, scale and translate.
  registerCssHook('scale');
  registerCssHook('scaleX');
  registerCssHook('scaleY');
  registerCssHook('translate');
  registerCssHook('rotate');
  registerCssHook('rotateX');
  registerCssHook('rotateY');
  registerCssHook('rotate3d');
  registerCssHook('perspective');
  registerCssHook('skewX');
  registerCssHook('skewY');
  registerCssHook('x', true);
  registerCssHook('y', true);

  // ## Transform class
  // This is the main class of a transformation property that powers
  // `$.fn.css({ transform: '...' })`.
  //
  // This is, in essence, a dictionary object with key/values as `-transform`
  // properties.
  //
  //     var t = new Transform("rotate(90) scale(4)");
  //
  //     t.rotate             //=> "90deg"
  //     t.scale              //=> "4,4"
  //
  // Setters are accounted for.
  //
  //     t.set('rotate', 4)
  //     t.rotate             //=> "4deg"
  //
  // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
  // functions.
  //
  //     t.toString()         //=> "rotate(90deg) scale(4,4)"
  //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
  //
  function Transform(str) {
    if (typeof str === 'string') { this.parse(str); }
    return this;
  }

  Transform.prototype = {
    // ### setFromString()
    // Sets a property from a string.
    //
    //     t.setFromString('scale', '2,4');
    //     // Same as set('scale', '2', '4');
    //
    setFromString: function(prop, val) {
      var args =
        (typeof val === 'string')  ? val.split(',') :
        (val.constructor === Array) ? val :
        [ val ];

      args.unshift(prop);

      Transform.prototype.set.apply(this, args);
    },

    // ### set()
    // Sets a property.
    //
    //     t.set('scale', 2, 4);
    //
    set: function(prop) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      if (this.setter[prop]) {
        this.setter[prop].apply(this, args);
      } else {
        this[prop] = args.join(',');
      }
    },

    get: function(prop) {
      if (this.getter[prop]) {
        return this.getter[prop].apply(this);
      } else {
        return this[prop] || 0;
      }
    },

    setter: {
      // ### rotate
      //
      //     .css({ rotate: 30 })
      //     .css({ rotate: "30" })
      //     .css({ rotate: "30deg" })
      //     .css({ rotate: "30deg" })
      //
      rotate: function(theta) {
        this.rotate = unit(theta, 'deg');
      },

      rotateX: function(theta) {
        this.rotateX = unit(theta, 'deg');
      },

      rotateY: function(theta) {
        this.rotateY = unit(theta, 'deg');
      },

      // ### scale
      //
      //     .css({ scale: 9 })      //=> "scale(9,9)"
      //     .css({ scale: '3,2' })  //=> "scale(3,2)"
      //
      scale: function(x, y) {
        if (y === undefined) { y = x; }
        this.scale = x + "," + y;
      },

      // ### skewX + skewY
      skewX: function(x) {
        this.skewX = unit(x, 'deg');
      },

      skewY: function(y) {
        this.skewY = unit(y, 'deg');
      },

      // ### perspectvie
      perspective: function(dist) {
        this.perspective = unit(dist, 'px');
      },

      // ### x / y
      // Translations. Notice how this keeps the other value.
      //
      //     .css({ x: 4 })       //=> "translate(4px, 0)"
      //     .css({ y: 10 })      //=> "translate(4px, 10px)"
      //
      x: function(x) {
        this.set('translate', x, null);
      },

      y: function(y) {
        this.set('translate', null, y);
      },

      // ### translate
      // Notice how this keeps the other value.
      //
      //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
      //
      translate: function(x, y) {
        if (this._translateX === undefined) { this._translateX = 0; }
        if (this._translateY === undefined) { this._translateY = 0; }

        if (x !== null && x !== undefined) { this._translateX = unit(x, 'px'); }
        if (y !== null && y !== undefined) { this._translateY = unit(y, 'px'); }

        this.translate = this._translateX + "," + this._translateY;
      }
    },

    getter: {
      x: function() {
        return this._translateX || 0;
      },

      y: function() {
        return this._translateY || 0;
      },

      scale: function() {
        var s = (this.scale || "1,1").split(',');
        if (s[0]) { s[0] = parseFloat(s[0]); }
        if (s[1]) { s[1] = parseFloat(s[1]); }

        // "2.5,2.5" => 2.5
        // "2.5,1" => [2.5,1]
        return (s[0] === s[1]) ? s[0] : s;
      },

      rotate3d: function() {
        var s = (this.rotate3d || "0,0,0,0deg").split(',');
        for (var i=0; i<=3; ++i) {
          if (s[i]) { s[i] = parseFloat(s[i]); }
        }
        if (s[3]) { s[3] = unit(s[3], 'deg'); }

        return s;
      }
    },

    // ### parse()
    // Parses from a string. Called on constructor.
    parse: function(str) {
      var self = this;
      str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
        self.setFromString(prop, val);
      });
    },

    // ### toString()
    // Converts to a `transition` CSS property string. If `use3d` is given,
    // it converts to a `-webkit-transition` CSS property string instead.
    toString: function(use3d) {
      var re = [];

      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          // Don't use 3D transformations if the browser can't support it.
          if ((!support.transform3d) && (
            (i === 'rotateX') ||
            (i === 'rotateY') ||
            (i === 'perspective') ||
            (i === 'transformOrigin'))) { continue; }

          if (i[0] !== '_') {
            if (use3d && (i === 'scale')) {
              re.push(i + "3d(" + this[i] + ",1)");
            } else if (use3d && (i === 'translate')) {
              re.push(i + "3d(" + this[i] + ",0)");
            } else {
              re.push(i + "(" + this[i] + ")");
            }
          }
        }
      }

      return re.join(" ");
    }
  };

  function callOrQueue(self, queue, fn) {
    if (queue === true) {
      self.queue(fn);
    } else if (queue) {
      self.queue(queue, fn);
    } else {
      self.each(function () {
                fn.call(this);
            });
    }
  }

  // ### getProperties(dict)
  // Returns properties (for `transition-property`) for dictionary `props`. The
  // value of `props` is what you would expect in `$.css(...)`.
  function getProperties(props) {
    var re = [];

    $.each(props, function(key) {
      key = $.camelCase(key); // Convert "text-align" => "textAlign"
      key = $.transit.propertyMap[key] || $.cssProps[key] || key;
      key = uncamel(key); // Convert back to dasherized

      // Get vendor specify propertie
      if (support[key])
        key = uncamel(support[key]);

      if ($.inArray(key, re) === -1) { re.push(key); }
    });

    return re;
  }

  // ### getTransition()
  // Returns the transition string to be used for the `transition` CSS property.
  //
  // Example:
  //
  //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
  //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
  //
  function getTransition(properties, duration, easing, delay) {
    // Get the CSS properties needed.
    var props = getProperties(properties);

    // Account for aliases (`in` => `ease-in`).
    if ($.cssEase[easing]) { easing = $.cssEase[easing]; }

    // Build the duration/easing/delay attributes for it.
    var attribs = '' + toMS(duration) + ' ' + easing;
    if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

    // For more properties, add them this way:
    // "margin 200ms ease, padding 200ms ease, ..."
    var transitions = [];
    $.each(props, function(i, name) {
      transitions.push(name + ' ' + attribs);
    });

    return transitions.join(', ');
  }

  // ## $.fn.transition
  // Works like $.fn.animate(), but uses CSS transitions.
  //
  //     $("...").transition({ opacity: 0.1, scale: 0.3 });
  //
  //     // Specific duration
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
  //
  //     // With duration and easing
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
  //
  //     // With callback
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
  //
  //     // With everything
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
  //
  //     // Alternate syntax
  //     $("...").transition({
  //       opacity: 0.1,
  //       duration: 200,
  //       delay: 40,
  //       easing: 'in',
  //       complete: function() { /* ... */ }
  //      });
  //
  $.fn.transition = $.fn.transit = function(properties, duration, easing, callback) {
    var self  = this;
    var delay = 0;
    var queue = true;

    var theseProperties = $.extend(true, {}, properties);

    // Account for `.transition(properties, callback)`.
    if (typeof duration === 'function') {
      callback = duration;
      duration = undefined;
    }

    // Account for `.transition(properties, options)`.
    if (typeof duration === 'object') {
      easing = duration.easing;
      delay = duration.delay || 0;
      queue = typeof duration.queue === "undefined" ? true : duration.queue;
      callback = duration.complete;
      duration = duration.duration;
    }

    // Account for `.transition(properties, duration, callback)`.
    if (typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }

    // Alternate syntax.
    if (typeof theseProperties.easing !== 'undefined') {
      easing = theseProperties.easing;
      delete theseProperties.easing;
    }

    if (typeof theseProperties.duration !== 'undefined') {
      duration = theseProperties.duration;
      delete theseProperties.duration;
    }

    if (typeof theseProperties.complete !== 'undefined') {
      callback = theseProperties.complete;
      delete theseProperties.complete;
    }

    if (typeof theseProperties.queue !== 'undefined') {
      queue = theseProperties.queue;
      delete theseProperties.queue;
    }

    if (typeof theseProperties.delay !== 'undefined') {
      delay = theseProperties.delay;
      delete theseProperties.delay;
    }

    // Set defaults. (`400` duration, `ease` easing)
    if (typeof duration === 'undefined') { duration = $.fx.speeds._default; }
    if (typeof easing === 'undefined')   { easing = $.cssEase._default; }

    duration = toMS(duration);

    // Build the `transition` property.
    var transitionValue = getTransition(theseProperties, duration, easing, delay);

    // Compute delay until callback.
    // If this becomes 0, don't bother setting the transition property.
    var work = $.transit.enabled && support.transition;
    var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

    // If there's nothing to do...
    if (i === 0) {
      var fn = function(next) {
        self.css(theseProperties);
        if (callback) { callback.apply(self); }
        if (next) { next(); }
      };

      callOrQueue(self, queue, fn);
      return self;
    }

    // Save the old transitions of each element so we can restore it later.
    var oldTransitions = {};

    var run = function(nextCall) {
      var bound = false;

      // Prepare the callback.
      var cb = function() {
        if (bound) { self.unbind(transitionEnd, cb); }

        if (i > 0) {
          self.each(function() {
            this.style[support.transition] = (oldTransitions[this] || null);
          });
        }

        if (typeof callback === 'function') { callback.apply(self); }
        if (typeof nextCall === 'function') { nextCall(); }
      };

      if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
        // Use the 'transitionend' event if it's available.
        bound = true;
        self.bind(transitionEnd, cb);
      } else {
        // Fallback to timers if the 'transitionend' event isn't supported.
        window.setTimeout(cb, i);
      }

      // Apply transitions.
      self.each(function() {
        if (i > 0) {
          this.style[support.transition] = transitionValue;
        }
        $(this).css(theseProperties);
      });
    };

    // Defer running. This allows the browser to paint any pending CSS it hasn't
    // painted yet before doing the transitions.
    var deferredRun = function(next) {
        this.offsetWidth; // force a repaint
        run(next);
    };

    // Use jQuery's fx queue.
    callOrQueue(self, queue, deferredRun);

    // Chainability.
    return this;
  };

  function registerCssHook(prop, isPixels) {
    // For certain properties, the 'px' should not be implied.
    if (!isPixels) { $.cssNumber[prop] = true; }

    $.transit.propertyMap[prop] = support.transform;

    $.cssHooks[prop] = {
      get: function(elem) {
        var t = $(elem).css('transit:transform');
        return t.get(prop);
      },

      set: function(elem, value) {
        var t = $(elem).css('transit:transform');
        t.setFromString(prop, value);

        $(elem).css({ 'transit:transform': t });
      }
    };

  }

  // ### uncamel(str)
  // Converts a camelcase string to a dasherized string.
  // (`marginLeft` => `margin-left`)
  function uncamel(str) {
    return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
  }

  // ### unit(number, unit)
  // Ensures that number `number` has a unit. If no unit is found, assume the
  // default is `unit`.
  //
  //     unit(2, 'px')          //=> "2px"
  //     unit("30deg", 'rad')   //=> "30deg"
  //
  function unit(i, units) {
    if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
      return i;
    } else {
      return "" + i + units;
    }
  }

  // ### toMS(duration)
  // Converts given `duration` to a millisecond string.
  //
  // toMS('fast') => $.fx.speeds[i] => "200ms"
  // toMS('normal') //=> $.fx.speeds._default => "400ms"
  // toMS(10) //=> '10ms'
  // toMS('100ms') //=> '100ms'  
  //
  function toMS(duration) {
    var i = duration;

    // Allow string durations like 'fast' and 'slow', without overriding numeric values.
    if (typeof i === 'string' && (!i.match(/^[\-0-9\.]+/))) { i = $.fx.speeds[i] || $.fx.speeds._default; }

    return unit(i, 'ms');
  }

  // Export some functions for testable-ness.
  $.transit.getTransitionValue = getTransition;

  return $;
}));

/*

 JS Signals <http://millermedeiros.github.com/js-signals/>
 Released under the MIT license
 Author: Miller Medeiros
 Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
*/
(function(i){function h(a,b,c,d,e){this._listener=b;this._isOnce=c;this.context=d;this._signal=a;this._priority=e||0}function g(a,b){if(typeof a!=="function")throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}",b));}function e(){this._bindings=[];this._prevParams=null;var a=this;this.dispatch=function(){e.prototype.dispatch.apply(a,arguments)}}h.prototype={active:!0,params:null,execute:function(a){var b;this.active&&this._listener&&(a=this.params?this.params.concat(a):
a,b=this._listener.apply(this.context,a),this._isOnce&&this.detach());return b},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null},isBound:function(){return!!this._signal&&!!this._listener},isOnce:function(){return this._isOnce},getListener:function(){return this._listener},getSignal:function(){return this._signal},_destroy:function(){delete this._signal;delete this._listener;delete this.context},toString:function(){return"[SignalBinding isOnce:"+this._isOnce+
", isBound:"+this.isBound()+", active:"+this.active+"]"}};e.prototype={VERSION:"1.0.0",memorize:!1,_shouldPropagate:!0,active:!0,_registerListener:function(a,b,c,d){var e=this._indexOfListener(a,c);if(e!==-1){if(a=this._bindings[e],a.isOnce()!==b)throw Error("You cannot add"+(b?"":"Once")+"() then add"+(!b?"":"Once")+"() the same listener without removing the relationship first.");}else a=new h(this,a,b,c,d),this._addBinding(a);this.memorize&&this._prevParams&&a.execute(this._prevParams);return a},
_addBinding:function(a){var b=this._bindings.length;do--b;while(this._bindings[b]&&a._priority<=this._bindings[b]._priority);this._bindings.splice(b+1,0,a)},_indexOfListener:function(a,b){for(var c=this._bindings.length,d;c--;)if(d=this._bindings[c],d._listener===a&&d.context===b)return c;return-1},has:function(a,b){return this._indexOfListener(a,b)!==-1},add:function(a,b,c){g(a,"add");return this._registerListener(a,!1,b,c)},addOnce:function(a,b,c){g(a,"addOnce");return this._registerListener(a,
!0,b,c)},remove:function(a,b){g(a,"remove");var c=this._indexOfListener(a,b);c!==-1&&(this._bindings[c]._destroy(),this._bindings.splice(c,1));return a},removeAll:function(){for(var a=this._bindings.length;a--;)this._bindings[a]._destroy();this._bindings.length=0},getNumListeners:function(){return this._bindings.length},halt:function(){this._shouldPropagate=!1},dispatch:function(a){if(this.active){var b=Array.prototype.slice.call(arguments),c=this._bindings.length,d;if(this.memorize)this._prevParams=
b;if(c){d=this._bindings.slice();this._shouldPropagate=!0;do c--;while(d[c]&&this._shouldPropagate&&d[c].execute(b)!==!1)}}},forget:function(){this._prevParams=null},dispose:function(){this.removeAll();delete this._bindings;delete this._prevParams},toString:function(){return"[Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"}};var f=e;f.Signal=e;typeof define==="function"&&define.amd?define(function(){return f}):typeof module!=="undefined"&&module.exports?module.exports=f:i.signals=
f})(this);
/*!
 * enquire.js v2.1.2 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){d(b)&&(b={match:b}),h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function(){"use strict";function t(n){if(!n)throw new Error("No options passed to Waypoint constructor");if(!n.element)throw new Error("No element option passed to Waypoint constructor");if(!n.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,n),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=n.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var n in i)e.push(i[n]);for(var o=0,r=e.length;r>o;o++)e[o][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,n={},o=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete n[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,o.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||o.isTouch)&&(e.didScroll=!0,o.requestAnimationFrame(t))})},e.prototype.handleResize=function(){o.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var n=e[i],o=n.newScroll>n.oldScroll,r=o?n.forward:n.backward;for(var s in this.waypoints[i]){var l=this.waypoints[i][s],a=n.oldScroll<l.triggerPoint,h=n.newScroll>=l.triggerPoint,p=a&&h,u=!a&&!h;(p||u)&&(l.queueTrigger(r),t[l.group.id]=l.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?o.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?o.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var n=0,o=t.length;o>n;n++)t[n].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),n={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var l in this.waypoints[r]){var a,h,p,u,c,f=this.waypoints[r][l],d=f.options.offset,y=f.triggerPoint,g=0,w=null==y;f.element!==f.element.window&&(g=f.adapter.offset()[s.offsetProp]),"function"==typeof d?d=d.apply(f):"string"==typeof d&&(d=parseFloat(d),f.options.offset.indexOf("%")>-1&&(d=Math.ceil(s.contextDimension*d/100))),a=s.contextScroll-s.contextOffset,f.triggerPoint=g+a-d,h=y<s.oldScroll,p=f.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!w&&u?(f.queueTrigger(s.backward),n[f.group.id]=f.group):!w&&c?(f.queueTrigger(s.forward),n[f.group.id]=f.group):w&&s.oldScroll>=f.triggerPoint&&(f.queueTrigger(s.forward),n[f.group.id]=f.group)}}return o.requestAnimationFrame(function(){for(var t in n)n[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in n)n[t].refresh()},e.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},o.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},o.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}var n={vertical:{},horizontal:{}},o=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var n=this.triggerQueues[i],o="up"===i||"left"===i;n.sort(o?e:t);for(var r=0,s=n.length;s>r;r+=1){var l=n[r];(l.options.continuous||r===n.length-1)&&l.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints),n=i===this.waypoints.length-1;return n?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return n[t.axis][t.name]||new i(t)},o.Group=i}(),function(){"use strict";function t(t){return t===t.window}function e(e){return t(e)?e:e.defaultView}function i(t){this.element=t,this.handlers={}}var n=window.Waypoint;i.prototype.innerHeight=function(){var e=t(this.element);return e?this.element.innerHeight:this.element.clientHeight},i.prototype.innerWidth=function(){var e=t(this.element);return e?this.element.innerWidth:this.element.clientWidth},i.prototype.off=function(t,e){function i(t,e,i){for(var n=0,o=e.length-1;o>n;n++){var r=e[n];i&&i!==r||t.removeEventListener(r)}}var n=t.split("."),o=n[0],r=n[1],s=this.element;if(r&&this.handlers[r]&&o)i(s,this.handlers[r][o],e),this.handlers[r][o]=[];else if(o)for(var l in this.handlers)i(s,this.handlers[l][o]||[],e),this.handlers[l][o]=[];else if(r&&this.handlers[r]){for(var a in this.handlers[r])i(s,this.handlers[r][a],e);this.handlers[r]={}}},i.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,i=e(this.element.ownerDocument),n={top:0,left:0};return this.element.getBoundingClientRect&&(n=this.element.getBoundingClientRect()),{top:n.top+i.pageYOffset-t.clientTop,left:n.left+i.pageXOffset-t.clientLeft}},i.prototype.on=function(t,e){var i=t.split("."),n=i[0],o=i[1]||"__default",r=this.handlers[o]=this.handlers[o]||{},s=r[n]=r[n]||[];s.push(e),this.element.addEventListener(n,e)},i.prototype.outerHeight=function(e){var i,n=this.innerHeight();return e&&!t(this.element)&&(i=window.getComputedStyle(this.element),n+=parseInt(i.marginTop,10),n+=parseInt(i.marginBottom,10)),n},i.prototype.outerWidth=function(e){var i,n=this.innerWidth();return e&&!t(this.element)&&(i=window.getComputedStyle(this.element),n+=parseInt(i.marginLeft,10),n+=parseInt(i.marginRight,10)),n},i.prototype.scrollLeft=function(){var t=e(this.element);return t?t.pageXOffset:this.element.scrollLeft},i.prototype.scrollTop=function(){var t=e(this.element);return t?t.pageYOffset:this.element.scrollTop},i.extend=function(){function t(t,e){if("object"==typeof t&&"object"==typeof e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t}for(var e=Array.prototype.slice.call(arguments),i=1,n=e.length;n>i;i++)t(e[0],e[i]);return e[0]},i.inArray=function(t,e,i){return null==e?-1:e.indexOf(t,i)},i.isEmptyObject=function(t){for(var e in t)return!1;return!0},n.adapters.push({name:"noframework",Adapter:i}),n.Adapter=i}();
/*!
wookmark plugin
@name wookmark.js
@author Christoph Ono (chri@sto.ph or @gbks)
@author Sebastian Helzle (sebastian@helzle.net or @sebobo)
@version 2.1.2
@date 05/05/2016
@category jQuery plugin
@copyright (c) 2009-2016 Christoph Ono (www.wookmark.com)
@license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
!function(a){!function(a){"function"==typeof define&&define.amd?define(a):a()}(function(){function c(a,b){return function(){return a.apply(b,arguments)}}function e(a,b){var c;for(c in b)b.hasOwnProperty(c)&&(a.style[c]=b[c])}function f(a,b){d(function(){var c,f;for(c=0;c<a.length;c++)f=a[c],e(f.el,f.css);"function"==typeof b&&d(b)})}function g(a){return a.replace(/^\s+|\s+$/g,"").toLowerCase()}function h(b,c,d){window.jQuery?a(b).off(c,d):b.removeEventListener?b.removeEventListener(c,d):b.detachEvent("on"+c,d)}function i(b,c,d){h(b,c,d),window.jQuery?a(b).on(c,d):b.addEventListener?b.addEventListener(c,d):b.attachEvent("on"+c,function(){d.call(b)})}function j(a){return null===a.offsetParent}function k(a){return a.offsetHeight}function l(a){return a.offsetWidth}function m(a,b){return a.classList?a.classList.contains(b):new RegExp("(^| )"+b+"( |$)","gi").test(a.className)}function n(a,b){a.classList?a.classList.add(b):a.className+=" "+b}function o(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(^|\\b)"+b.split(" ").join("|")+"(\\b|$)","gi")," ")}function p(a,b,c,d){void 0===d&&(d="wookmark-");var e=a.getAttribute("data-"+d+b);return c===!0?parseInt(e,10):e}function q(a,b,c,d){void 0===d&&(d="wookmark-"),a.setAttribute("data-"+d+b,c)}function r(a){for(var d,b={},c=[],e=a.length;e--;)d=p(a[e],"id",!0),b.hasOwnProperty(d)||(b[d]=1,c.push(a[e]));return c}function s(a,b){return void 0!==window.getComputedStyle?window.getComputedStyle(a,null).getPropertyValue(b):a.currentStyle[b]}function t(a,b){var d,c=a.length;for(d=0;d<c;d++)if(a[d]===b)return d;return-1}function u(a,b){b=b||{},"string"==typeof a&&(a=document.querySelector(a)),this.container=a,this.columns=this.resizeTimer=null,this.activeItemCount=0,this.placeholders=[],this.itemHeightsInitialized=!1,this.itemHeightsDirty=!1,this.elementTag="div",this.initItems=c(this.initItems,this),this.updateOptions=c(this.updateOptions,this),this.onResize=c(this.onResize,this),this.onRefresh=c(this.onRefresh,this),this.getItemWidth=c(this.getItemWidth,this),this.layout=c(this.layout,this),this.layoutFull=c(this.layoutFull,this),this.layoutColumns=c(this.layoutColumns,this),this.filter=c(this.filter,this),this.clear=c(this.clear,this),this.getActiveItems=c(this.getActiveItems,this),this.refreshPlaceholders=c(this.refreshPlaceholders,this),this.sortElements=c(this.sortElements,this),this.updateFilterClasses=c(this.updateFilterClasses,this),this.initItems(),this.container.style.display="block",this.updateOptions(b),this.updateFilterClasses(),this.autoResize&&i(window,"resize",this.onResize),i(this.container,"refreshWookmark",this.onRefresh)}var b={align:"center",autoResize:!0,comparator:null,direction:void 0,ignoreInactiveItems:!0,inactiveClass:"wookmark-inactive",itemSelector:void 0,itemWidth:0,fillEmptySpace:!1,flexibleWidth:0,offset:5,outerOffset:0,onLayoutChanged:void 0,placeholderClass:"wookmark-placeholder",possibleFilters:[],resizeDelay:50,verticalOffset:void 0},d=window.requestAnimationFrame||function(a){a()};return u.prototype.initItems=function(){if(void 0===this.itemSelector){for(var b,a=[],c=this.container.children,d=c.length;d--;)b=c[d],8!==b.nodeType&&(b.style.display="",q(b,"id",d),a.unshift(b));this.items=a}else this.items=this.container.querySelectorAll(this.itemSelector);this.items.length&&(this.elementTag=this.items[0].tagName),this.itemHeightsDirty=!0},u.prototype.updateFilterClasses=function(){for(var b,d,e,f,j,a=this.items.length,c={},h=this.possibleFilters,i=h.length;a--;)if(e=this.items[a],d=JSON.parse(p(e,"filter-class",!1,"")),d&&"object"==typeof d)for(b=d.length;b--;)f=g(d[b]),c.hasOwnProperty(f)||(c[f]=[]),c[f].push(e);for(;i--;)j=g(h[i]),c.hasOwnProperty(j)||(c[j]=[]);this.filterClasses=c},u.prototype.updateOptions=function(a){var c;this.itemHeightsDirty=!0,a=a||{};for(c in b)b.hasOwnProperty(c)&&(a.hasOwnProperty(c)?this[c]=a[c]:this.hasOwnProperty(c)||(this[c]=b[c]));this.verticalOffset=this.verticalOffset||this.offset,this.layout(!0)},u.prototype.onResize=function(){clearTimeout(this.resizeTimer),this.itemHeightsDirty=0!==this.flexibleWidth,this.resizeTimer=setTimeout(this.layout,this.resizeDelay)},u.prototype.onRefresh=function(){this.itemHeightsDirty=!0,this.layout()},u.prototype.filter=function(a,b,c){var e,h,i,j,k,d=[],f=[];if(a=a||[],b=b||"or",c=c||!1,a.length){for(h=0;h<a.length;h++)k=g(a[h]),this.filterClasses.hasOwnProperty(k)&&d.push(this.filterClasses[k]);if(h=e=d.length,"or"===b||1===e)for(;h--;)f=f.concat(d[h]);else if("and"===b){for(var p,q,s,l=d[0],m=!0;h--;)d[h].length<l.length&&(l=d[h]);for(l=l||[],h=l.length;h--;){for(q=l[h],i=e,m=!0;i--&&m;)if(s=d[i],l!==s){for(p=!1,j=s.length;j--&&!p;)p=s[j]===q;m&=p}m&&(f=f.concat(l[h]))}}if(e>1&&(f=r(f)),!c)for(h=this.items.length;h--;)t(f,this.items[h])===-1&&n(this.items[h],this.inactiveClass)}else f=this.items;if(!c){for(h=f.length;h--;)o(f[h],this.inactiveClass);this.columns=null,this.layout()}return f},u.prototype.refreshPlaceholders=function(a,b){var c,g,h,i,j,m,n,d=k(this.container),f=this.columns.length,l="";if(this.placeholders.length<f){for(c=0;c<f-this.placeholders.length;c++)l+="<"+this.elementTag+' class="'+this.placeholderClass+'"/>';this.container.insertAdjacentHTML("beforeend",l),this.placeholders=this.container.querySelectorAll("."+this.placeholderClass)}for(i=this.offset+2*parseInt(s(this.placeholders[0],"border-left-width"),10)||0,i+=2*parseInt(s(this.placeholders[0],"padding-left"),10)||0,c=0;c<this.placeholders.length;c++)m=this.placeholders[c],g=this.columns[c],c>=f||0===g.length?m.style.display="none":(j=g[g.length-1],n=p(j,"top",!0)+p(j,"height",!0)+this.verticalOffset,h=Math.max(0,d-n-i),e(m,{position:"absolute",display:h>0?"block":"none",left:c*a+b+"px",top:n+"px",width:a-i+"px",height:h+"px"}))},u.prototype.getActiveItems=function(){var b,d,a=this.inactiveClass,c=[],e=this.items;if(!this.ignoreInactiveItems)return e;for(b=0;b<e.length;b++)d=e[b],m(d,a)||c.push(d);return c},u.prototype.getItemWidth=function(){var a=this.itemWidth,b=l(this.container)-2*this.outerOffset,c=this.flexibleWidth;if("function"==typeof a&&(a=this.itemWidth()),this.items.length>0&&(void 0===a||0===a&&!this.flexibleWidth)?a=l(this.items[0]):"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a)/100*b),c){"function"==typeof c&&(c=c()),"string"==typeof c&&c.indexOf("%")>=0&&(c=parseFloat(c)/100*b);var d=b+this.offset,e=Math.floor(.5+d/(c+this.offset)),f=Math.floor(d/(a+this.offset)),g=Math.max(e,f),h=Math.min(c,Math.floor((b-(g-1)*this.offset)/g));a=Math.max(a,h)}return a},u.prototype.layout=function(a,b){if(a||!j(this.container)){var h,n,c=this.getItemWidth(),d=c+this.offset,e=l(this.container),f=e-2*this.outerOffset,g=Math.floor((f+this.offset)/d),i=0,k=this.getActiveItems(),m=k.length;if(a||this.itemHeightsDirty||!this.itemHeightsInitialized){for(var o=0;o<m;o++)n=k[o],this.flexibleWidth&&(n.style.width=c+"px"),q(n,"height",n.offsetHeight);this.itemHeightsDirty=!1,this.itemHeightsInitialized=!0}g=Math.max(1,Math.min(g,m)),h=this.outerOffset,"center"===this.align&&(h+=Math.floor(.5+(f-(g*d-this.offset))>>1)),this.direction=this.direction||("right"===this.align?"right":"left"),i=a||null===this.columns||this.columns.length!==g||this.activeItemCount!==m?this.layoutFull(d,g,h):this.layoutColumns(d,h),this.activeItemCount=m,this.container.style.height=i+"px",this.fillEmptySpace&&this.refreshPlaceholders(d,h),void 0!==this.onLayoutChanged&&"function"==typeof this.onLayoutChanged&&this.onLayoutChanged(),"function"==typeof b&&b()}},u.prototype.sortElements=function(a){return"function"==typeof this.comparator?a.sort(this.comparator):a},u.prototype.layoutFull=function(a,b,c){var d,h,i,l,e=0,g=0,j=null,k=null,o=[],r=[],s="left"===this.align,t=this;for(this.columns=[],h=this.sortElements(this.getActiveItems()),i=h.length;o.length<b;)o.push(this.outerOffset),this.columns.push([]);for(;g<i;){for(d=h[g],j=o[0],k=0,e=0;e<b;e++)o[e]<j&&(j=o[e],k=e);q(d,"top",j),l=c,(k>0||!s)&&(l+=k*a),r[g]={el:d,css:{position:"absolute",top:j+"px"}},r[g].css[this.direction]=l+"px",o[k]+=p(d,"height",!0)+this.verticalOffset,this.columns[k].push(d),g++}return f(r,function(){m(t.container,"wookmark-initialised")||n(t.container,"wookmark-initialised")}),Math.max.apply(Math,o)},u.prototype.layoutColumns=function(a,b){for(var i,j,k,l,c=[],d=[],e=0,g=0,h=this.columns.length;h--;){for(i=this.outerOffset,c.push(i),j=this.columns[h],l=h*a+b,e=0;e<j.length;e++,g++)k=j[e],q(k,"top",i),d[g]={el:k,css:{top:i+"px"}},d[g].css[this.direction]=l+"px",i+=p(k,"height",!0)+this.verticalOffset;c[h]=i}return f(d),Math.max.apply(Math,c)},u.prototype.clear=function(){clearTimeout(this.resizeTimer);for(var a=this.placeholders.length;a--;)this.container.removeChild(this.placeholders[a]);h(window,"resize",this.onResize),h(this.container,"refreshWookmark",this.onRefresh)},void 0!==window.jQuery&&(jQuery.fn.wookmark=function(b){var c=this.length;if(void 0!==b&&b.container instanceof jQuery&&(b.container=b.container[0]),c>1)for(;c--;)a(this).eq(c).wookmark(b);else 1===c&&(this.wookmarkInstance?this.wookmarkInstance.updateOptions(b||{}):this.wookmarkInstance=new u(this[0],b||{}));return this}),window.Wookmark=u,u})}(jQuery);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].e;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			e: {},
/******/ 			i: moduleId,
/******/ 			l: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.e, module, module.e, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.e;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	/// <reference path="tsd/typings.d.ts" />
	var BaseClass = __webpack_require__(3);
	var Helpers = __webpack_require__(1);
	var Twitter = (function (_super) {
	    __extends(Twitter, _super);
	    function Twitter() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Twitter.prototype.init = function () {
	        Helpers.init();
	        this.setSelectors();
	        this.initEvents();
	        this.infiniteScroll = this.$gridUl.data('infinite-scroll');
	        if (this.infiniteScroll) {
	            this.showNextGroupOfItems();
	        }
	        else {
	            this.$gridLis.css({ height: 'auto' }).addClass('padding');
	        }
	        this.initWookmarkGrid();
	        this.initSelectBox();
	    };
	    Twitter.prototype.setSelectors = function () {
	        this.page = 0;
	        this.ITEMS_PER_PAGE = 5;
	        this.$window = $(window);
	        this.$gridUl = $('.twitter-grid-pack');
	        this.$gridLis = this.$gridUl.find('li');
	    };
	    Twitter.prototype.initEvents = function () {
	        var _this = this;
	        this.$window.on('resize', function () { return _this.onResize(); });
	        this.$window.on('load', function () { return _this.onWindowLoad(); });
	        $('.link').on('click', function (e) { return _this.onLinkClick(e); });
	        $('#twitter').find('.thumb').find('img').on('load', function (e) { return _this.onImageLoaded(e); });
	    };
	    Twitter.prototype.initWookmarkGrid = function () {
	        this.$gridUl.wookmark({
	            autoResize: false,
	            fillEmptySpace: true,
	            offset: 0,
	            resizeDelay: 150
	        });
	    };
	    Twitter.prototype.onResize = function () {
	        this.initWookmarkGrid();
	    };
	    Twitter.prototype.onWindowLoad = function () {
	        this.initWookmarkGrid();
	        this.initWaypoints();
	    };
	    Twitter.prototype.initWaypoints = function () {
	        var _this = this;
	        if (!this.infiniteScroll)
	            return;
	        var offset = this.$window.innerHeight() * 0.15;
	        this.waypoint = new Waypoint({
	            element: this.$gridUl[0],
	            handler: function (direction) {
	                if (direction == 'down') {
	                    _this.showNextGroupOfItems();
	                    _this.initWookmarkGrid();
	                    _this.waypoint.destroy();
	                    _this.initWaypoints();
	                }
	            },
	            triggerOnce: false,
	            //offset: 'bottom-in-view',
	            offset: function () {
	                return this.context.innerHeight() - this.adapter.outerHeight() + offset;
	            }
	        });
	    };
	    Twitter.prototype.showNextGroupOfItems = function () {
	        var startIndex = this.page * this.ITEMS_PER_PAGE;
	        for (var i = startIndex; i < startIndex + this.ITEMS_PER_PAGE; i++) {
	            var curItem = $(this.$gridLis.get(i));
	            curItem.css({ height: 'auto', opacity: 0, y: 60, position: 'absolute !important' }).stop(true);
	            // curItem.delay((i - startIndex) * 80).transition({y: 0, opacity: 1}, 500);
	            TweenMax.killTweensOf(curItem);
	            TweenMax.to(curItem, 0.5, { y: 0, opacity: 1, force3D: true, delay: ((i - startIndex) * 80) / 1000 });
	            curItem.addClass('padding');
	            curItem.find('.video').css({ visibility: 'visible' });
	        }
	        this.page++;
	    };
	    Twitter.prototype.initSelectBox = function () {
	        var _this = this;
	        $("#film_browser").selectbox({ onChange: function (value) { return _this.onDropdownSelect(value); } });
	        $('.sbHolder').delay(200).transition({ opacity: 1 }, 600);
	    };
	    Twitter.prototype.onDropdownSelect = function (value) {
	        window.location.href = value;
	    };
	    Twitter.prototype.onLinkClick = function (e) {
	        e.preventDefault();
	        window.open($(e.currentTarget).attr('href'), '_blank');
	    };
	    Twitter.prototype.onImageLoaded = function (e) {
	        this.initWookmarkGrid();
	        // this.initWaypoints();
	    };
	    return Twitter;
	}(BaseClass));
	new Twitter();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Helpers = (function () {
	    function Helpers() {
	    }
	    Helpers.init = function () {
	        // ResponsiveImages.init();
	        // Breakpoints.init();
	        // SizingHelper.init();
	        // ScrollTo.init();
	        // ButtonHelper.init();
	        FastClick.attach(document.body);
	    };
	    return Helpers;
	}());
	module.e = Helpers;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Application = (function () {
	    function Application() {
	        this.models = [];
	        this.views = [];
	        this.controllers = [];
	        if (Application._instance) {
	            throw new Error("Error: Instantiation failed: Use application.getInstance() instead of new.");
	        }
	        Application._instance = this;
	    }
	    Application.getInstance = function () {
	        if (Application._instance === null) {
	            Application._instance = new Application();
	        }
	        return Application._instance;
	    };
	    Application.prototype.createModel = function (model) {
	        if (this.getModel(model))
	            throw new Error("Attempted to add duplicate model:" + model);
	        var modelInstance = new model();
	        this.models.push(modelInstance);
	        modelInstance.instantiate();
	        return modelInstance;
	    };
	    Application.prototype.createView = function (view) {
	        if (this.getView(view))
	            throw new Error("Attempted to add duplicate view:" + view);
	        var viewInstance = new view();
	        this.views.push(viewInstance);
	        viewInstance.instantiate();
	        return viewInstance;
	    };
	    Application.prototype.createController = function (controller) {
	        if (this.getController(controller))
	            throw new Error("Attempted to add duplicate controller:" + controller);
	        var controllerInstance = new controller();
	        this.controllers.push(controllerInstance);
	        controllerInstance.instantiate();
	        return controllerInstance;
	    };
	    Application.prototype.removeModel = function (model) {
	        for (var i = 0; i < this.models.length; i++) {
	            if (this.models[i] instanceof model) {
	                this.models.splice(i, 1);
	                return true;
	            }
	        }
	        return false;
	    };
	    Application.prototype.removeView = function (view) {
	        for (var i = 0; i < this.views.length; i++) {
	            if (this.views[i] instanceof view) {
	                this.views.splice(i, 1);
	                return true;
	            }
	        }
	        return false;
	    };
	    Application.prototype.removeController = function (controller) {
	        for (var i = 0; i < this.controllers.length; i++) {
	            if (this.controllers[i] instanceof controller) {
	                this.controllers.splice(i, 1);
	                return true;
	            }
	        }
	        return false;
	    };
	    Application.prototype.getModel = function (model) {
	        // console.log(this.models, model);
	        for (var i = 0; i < this.models.length; i++) {
	            if (this.models[i] instanceof model)
	                return this.models[i];
	        }
	        return null;
	    };
	    Application.prototype.getView = function (view) {
	        //console.log(view);
	        for (var i = 0; i < this.views.length; i++) {
	            //console.log(this.views[i]);
	            if (this.views[i] instanceof view)
	                return this.views[i];
	        }
	    };
	    Application.prototype.getController = function (controller) {
	        //console.log(this.controllers);
	        for (var i = 0; i < this.controllers.length; i++) {
	            if (this.controllers[i] instanceof controller)
	                return this.controllers[i];
	        }
	        return null;
	    };
	    return Application;
	}());
	Application._instance = null;
	module.e = Application;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Application = __webpack_require__(2);
	var BaseClass = (function () {
	    function BaseClass() {
	        this.app = Application.getInstance();
	        this['init']();
	    }
	    return BaseClass;
	}());
	module.e = BaseClass;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.e = __webpack_require__(0);


/***/ }
/******/ ]);