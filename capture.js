function doCapture() {
    let canvas = document.getElementById('canvas'); 
    if (document.getElementById('check-background').checked) {
        console.log("está ckecado")
        canvas.style.backgroundColor = 'transparent';
    } else {
        canvas.style.backgroundColor = document.getElementById('input-color').value;
    }
    html2canvas(document.getElementById('canvas'), {backgroundColor: null}).then(function(canvas) {
        var a = document.createElement('a');
        a.id = 'elementA'
        a.href = canvas.toDataURL("image/png");
        a.download = "background-repeat.png";
        a.click();
    })

    canvas.style.backgroundColor = document.getElementById('input-color').value;
    // document.getElementById('canvas').style.backgroundColor = '#d4dee3';
}

document.getElementById('test-btn').addEventListener('click', doCaptureTeste);
document.getElementById('export-btn').addEventListener('click', doCapture);


function doCaptureTeste() {
    let elementSelected = document.querySelector('.selected');
    if (elementSelected != null) elementSelected.classList.remove('selected'); 

    let canvas = document.getElementById('canvas');
    html2canvas(document.getElementById('canvas')).then(function(canvas) {
        var a = document.createElement('a');
        a.id = 'elementA'
        a.href = canvas.toDataURL("image/png");
        var img = document.createElement('img');
        img.src = canvas.toDataURL("image/png");

        document.querySelector('body').style.backgroundImage = `url("${img.src}")`;
    })
}