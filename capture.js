function doCapture() {
    html2canvas(document.getElementById('canvas')).then(function(canvas) {
        var a = document.createElement('a');
        a.id = 'elementA'
        a.href = canvas.toDataURL("image/png");
        a.download = "background-repeat.png";
        a.click();
    })
}


function doCaptureTeste() {
    let elementSelected = document.querySelector('.selected');
    if (elementSelected != null) elementSelected.classList.remove('selected'); 
    html2canvas(document.getElementById('canvas')).then(function(canvas) {
        var a = document.createElement('a');
        a.id = 'elementA'
        a.href = canvas.toDataURL("image/png");
        var img = document.createElement('img');
        img.src = canvas.toDataURL("image/png");

        document.querySelector('body').style.backgroundImage = `url("${img.src}")`;
    })
}