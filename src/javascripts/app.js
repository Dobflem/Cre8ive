var imgs = [];

var CRE8 = (function() {
    function addImg(src) {
        var img = document.createElement("img");
        img.src = src;
        imgs[imgs.length] = img;
    };
    
    var plugin = {
        options: function(opts) {
            addImg(opts["img-src"]);
        },
        draw: function() {
            
        }
    };
    
    return {
        Plugin: function(callback) {
            callback(plugin);
        }
    }
    
})();

window.onload = function() {
    
    function showImages(show) {
        var images = document.getElementsByTagName('img');
        for (i = 0; i < images.length;i++ ) {
            images[i].style.display = (show) ? "block" : "none";
        }
    };
    
    var btn = document.getElementById('toggle');
    btn.onclick = function(e) {
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
    };
    
    
    var plugins = document.getElementById("plugins");
    for(var i = 0; i < imgs.length; i++) {
        plugins.appendChild(imgs[i]);
    }
};