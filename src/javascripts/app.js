var CRE8 = (function() {
    var paper, btnPlugins, btnPlay, current_img;
    var imgs = [];
    var toggle = window.location.hash;
    var pausePath = "M30,0L35,0L35,21L30,21ZM40,0L45,0L45,21L40,21Z";
    var playPath = "M30,0L45,10L30,21L30,21ZM30,0L45,10L30,21L30,21Z";
    var openPath = "M2,0L20,0L20,5,L2,5ZM2,8L20,8L20,13L2,13ZM2,16L20,16L20,21,L2,21Z";
    var closePath = "M2,0L10,0L25,21L17,21ZM10,12L10,12L10,12L10,12ZM17,0L25,0,L10,21L2,21Z";
    var currentPath = (toggle === "#plugins") ? closePath : openPath;

    function showImages(show) {
        var images = document.getElementsByTagName('img');
        for (i = 0; i < images.length;i++ ) {
            images[i].style.display = (show) ? "block" : "none";
        }
    }

    function stopAnimations() {
        var bot = paper.bottom;
        while(bot) {
            bot.stop();
            bot = bot.next;
        }
    }

    function pauseAnimations() {
        var bot = paper.bottom;
        while(bot) {
            bot.pause();
            bot = bot.next;
        }
    }

    function resumeAnimations() {
        var bot = paper.bottom;
        while(bot) {
            bot.resume();
            bot = bot.next;
        }
    }

/*
    // These functions won't build with current uglify Version
    function* getNodes() {
        var bot = paper.bottom;
        while(bot) {
          yield bot;
          bot = bot.next;
        }
    }

    function stopAnimations() {
        for(var n of getNodes()) {
            n.stop();
        }
    }

    function pauseAnimations() {
        for(var n of getNodes()) {
            n.pause();
        }
    }

    function resumeAnimations() {
        for (var n of getNodes()) {
            n.resume();
        }
    }
*/

    function addImg(src) {
        var img = document.createElement("img");
        img.src = src;
        img.style.cursor = "pointer";
        imgs[imgs.length] = img;
    }

    function initPaper() {
        /* Recreate the paper */
        /*
            We could call paper.set and paper.setFinish.
            This would allow us to remove everything the user created.
            But this would mean users wouldn't be allowed to use paper.set and paper.setFinish.
         */
        if(paper !== null && paper !== undefined) {
          paper.remove();
        }
        paper = new Raphael("canvas", "100%", "100%");
    }

    function createButtonPath(path) {
        return paper.path(path).attr({
            fill: '#000',
            cursor: 'pointer'
        }).transform("...T2,2");
    }

    function createSidebarBtn() {
        if (paper === null) return;

        /* Create the Sidebar Button */
        btnPlugins = createButtonPath(currentPath);

        /* Keep track of sidebar toggle */
        btnPlugins.href = toggle;
        btnPlugins.click(function(e) {
            window.open(this.href, '_top');

            if(toggle === "#") {
                currentPath = openPath;
                toggle = "#plugins";
                this.innerHTML = "Open";
                showImages(false);
            } else {
                currentPath = closePath;
                toggle = "#";
                this.innerHTML = "Close";
                showImages(true);
            }

            this.href = toggle;

            this.animate({
                path: currentPath
            }, 200);

            return false;
        });
    }

    function createPlayPauseBtn() {
        if (paper === null) return;

        /* Create the pause/play button */
        btnPlay = createButtonPath(pausePath);

        /* Play state starts as true (playing) */
        btnPlay.state = true;
        btnPlay.click(function() {

            if(this.state) {
                pauseAnimations();
                this.animate({
                    path: playPath
                }, 200);
            } else {
                resumeAnimations();
                this.animate({
                    path: pausePath
                }, 200);
            }
            
            this.state = !this.state;
        });
    }
    
    var plugin = {
        options: function(opts) {
            addImg(opts["img-src"]);
        },
        draw: function(callback) {
            imgs[imgs.length - 1].addEventListener('click', function(e) {
                current_img = this;
                stopAnimations();
                initPaper();
                createSidebarBtn();
                createPlayPauseBtn();
                callback(plugin, paper);
            });
        },
        repeat: function() {
            current_img.click();
        }
    };
    
    window.onload = function() {
        /* Initialise the page */
        initPaper();
        createSidebarBtn();

        var plugins = document.getElementById("plugins");
        for(var i = 0; i < imgs.length; i++) {
            plugins.appendChild(imgs[i]);
        }
    };
    
    return {
        Plugin: function(callback) {
            callback(plugin);
        }
    }
    
})();
