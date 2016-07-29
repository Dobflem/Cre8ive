window.onload = function() {
    
    var btn = document.getElementById('toggle');
    btn.onclick = function(e) {
        window.open(this.href, '_top');
        
        if(this.href.indexOf("#plugins") === -1) {
            this.href = "#plugins";
            this.innerHTML = "Open";
        } else {
            this.href = "#";
            this.innerHTML = "Close";
        }
        
        return false;
    };
    
};