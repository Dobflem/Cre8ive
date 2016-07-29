var CRE8 = (function() {
    var current_img;
    var imgs = [];
    var paper;

    function showImages(show) {
        var images = document.getElementsByTagName('img');
        for (i = 0; i < images.length;i++ ) {
            images[i].style.display = (show) ? "block" : "none";
        }
    };
    
    function stopAnimations() {
        var bot = paper.bottom;
        while (bot) {
            bot.stop();
            bot = bot.next;
        }
    }
    
    function pauseAnimations() {
        var bot = paper.bottom;
        while (bot) {
            bot.pause();
            bot = bot.next;
        }
    }
    
    function resumeAnimations() {
        var bot = paper.bottom;
        while (bot) {
            bot.resume();
            bot = bot.next;
        }
    }

    function initPaper() {
        if(paper != null) {
            paper.remove();
        }

        paper = new Raphael("canvas", "100%", "100%");

        var btn = paper.rect(0, 0, 20, 20).attr({
            fill: '#fff',
            cursor: 'pointer'
        });

        btn.href = "#plugins";

        btn.click(function(e) {
            window.open(this.href, '_top');

            if(this.href.indexOf("#plugins") === -1) {
                this.href = "#plugins";
                this.innerHTML = "Open";
                showImages(false);
            } else {
                this.href = "#";
                this.innerHTML = "Close";
                showImages(true);
            }

            return false;
        });
        
        var play = paper.rect(20, 0, 20, 20).attr({
            fill: '#fff',
            cursor: 'pointer'
        });
        
        play.state = true;
        play.click(function() {
            
            if(this.state) {
                pauseAnimations();
            } else {
                resumeAnimations();
            }
            
            this.state = !this.state;
        });
    }
    
    function addImg(src) {
        var img = document.createElement("img");
        img.src = src;
        img.style.cursor = "pointer";
        imgs[imgs.length] = img;
    };
    
    var plugin = {
        options: function(opts) {
            addImg(opts["img-src"]);
        },
        draw: function(callback) {
            imgs[imgs.length - 1].addEventListener('click', function(e) {
                stopAnimations();
                current_img = this;
                initPaper();
                callback(plugin, paper);
            });
        },
        repeat: function() {
            current_img.click();
        }
    };
    
    window.onload = function() {
        initPaper();

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