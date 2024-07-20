
let nId = 0;

document.getElementById('fileInput').addEventListener('change', function (event) {
    var arquivo = event.target.files[0];
    if (arquivo) {
        var leitor = new FileReader();
        leitor.onload = function (e) {
            var imagem = document.createElement('img');
            imagem.className = `draggable main-image img-${nId++}`;
            imagem.id = `imagem-${nId++}`;
            imagem.src = e.target.result;
            imagem.style.width = '300px';
            imagem.addEventListener("mousedown", onMouseDown);
            document.getElementById('canvas').appendChild(imagem);
        };
        leitor.readAsDataURL(arquivo);
        limparInput();
    }
});

document.getElementById('btn-girar-horario').addEventListener('click', () => {
    girar(10);
});

document.getElementById('btn-girar-antihorario').addEventListener('click', () => {
    girar(-10);
});

document.getElementById('btn-aumentar').addEventListener('click', () => {
    redimensionar(10);
});

document.getElementById('btn-diminuir').addEventListener('click', () => {
    redimensionar(-10);
});

document.getElementById('btn-inverter').addEventListener('click', () => {
    inverter();
});

let offsetX = 0;
let offsetY = 0;

let activeElement = null;

let passouEsquerda = false;
let passouDireita = false;
let passouCima = false;
let passouBaixo = false;

const canvas = document.getElementById('canvas');

canvas.addEventListener('click', (event) => {
    if (document.querySelector('.selected') && !event.target.classList.contains('selected')) {
        console.log("Descelecionando")
        document.querySelector('.selected').classList.remove('selected');
    }
})

function onMouseDown(event) {
    activeElement = event.target;
    // console.log(activeElement.style)
    if (document.querySelector('.selected') != null && document.querySelector('.selected').id != activeElement.id) {
        document.querySelector('.selected').classList.remove('selected');
    }


    activeElement.classList.add('selected');
    offsetX = event.clientX - activeElement.offsetLeft;
    offsetY = event.clientY - activeElement.offsetTop;
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(event) {
    if (activeElement) {
        activeElement.style.left = `${event.clientX - offsetX}px`;
        activeElement.style.top = `${event.clientY - offsetY}px`;

    }
}

function clearImages() {
    let elements = document.querySelectorAll(`.mask-${event.target.id}`);
    if (elements.length > 0) {
        for (let child of elements) {
            canvas.removeChild(child);
        }
    }
}
function createImage(event, leftPosition, topPosition) {
    if (event.target.id != '') {
        var imagem = document.createElement('img');
        imagem.className = `draggable mask-${event.target.id}`;
        imagem.src = event.target.src;
        // imagem.style = event.target.style;
        imagem.style.top = topPosition;
        imagem.style.left = leftPosition;
        imagem.style.transform = event.target.style.transform;
        imagem.style.width = event.target.style.width;
        canvas.appendChild(imagem);
    }
}

function onMouseUp(event) {

    let topCorner = '';
    let leftCorner = '';
    if (event.target.id != '') {

        passouDireita = (event.clientX - offsetX) + activeElement.offsetWidth > 600;
        passouEsquerda = (event.clientX - offsetX) < 0;
        passouCima = (event.clientY - offsetY) < 0;
        passouBaixo = (event.clientY - offsetY) + activeElement.offsetHeight > 600;

        // console.log(event.clientY, offsetY, (event.clientY - offsetY));

        clearImages();

        if (passouDireita || passouEsquerda) {
            if (passouDireita) {
                // console.log('passou direita');
                createImage(event, `${event.clientX - offsetX - 600}px`, `${event.clientY - offsetY}px`);
                leftCorner = `${event.clientX - offsetX - 600}px`;
            } else {
                // console.log('passou esquerda');
                createImage(event, `${event.clientX - offsetX + 600}px`, `${event.clientY - offsetY}px`);
                leftCorner = `${event.clientX - offsetX + 600}px`;
            }
        }

        if (passouCima || passouBaixo) {
            if (passouCima) {
                // console.log('passou em cima');
                createImage(event, `${event.clientX - offsetX}px`, `${event.clientY - offsetY + 600}px`);
                topCorner = `${event.clientY - offsetY + 600}px`;
            } else {
                // console.log('passou embaixo');
                createImage(event, `${event.clientX - offsetX}px`, `${event.clientY - offsetY - 600}px`);
                topCorner = `${event.clientY - offsetY - 600}px`;
            }

        }

        if ((passouCima && passouDireita) || (passouCima && passouEsquerda) || (passouBaixo && passouDireita) || (passouBaixo && passouEsquerda)) {
            createImage(event, leftCorner, topCorner);
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        activeElement = null;
    }
}

function limparInput() {
    document.getElementById('fileInput').value = '';
}

function girar(angleValue) {
    let image = document.querySelector('.selected');

    if (image != null) {

        let options = image.style.transform.split(' ');
        if (image.style.transform.includes('rotate')) {
            for (let i in options) {
                if (options[i].startsWith('rotate')) {

                    let angulo = parseInt(options[i].match(/-?\d+/)[0], 10);
                    options[i] = `rotate(${angulo + angleValue}deg)`;
                    break;
                }
            }
        } else {
            options[0] += `rotate(${angleValue}deg)`;
        }
        image.style.transform = options.join(" ");

        // let texto = image.style.transform;
        // if (texto == '') {
        //     texto = `rotate(${0}deg)`;
        // }
        // let angulo = parseInt(texto.match(/-?\d+/)[0], 10);
        // image.style.transform = `rotate(${angulo + angleValue}deg)`;
    }
}

function redimensionar(size) {
    let image = document.querySelector('.selected');
    if (image != null) {

        let texto = image.style.width;
        if (texto == '') {
            texto = `300px`;
        }
        let width = parseInt(texto.match(/(\d+)px/)[0], 10);

        if (width - size > 0) {
            image.style.width = `${width + size}px`;
        }
    }
}

function inverter() {
    let image = document.querySelector('.selected');

    if (image != null) {
        let options = image.style.transform.split(' ');
        if (image.style.transform.includes('scaleX')) {
            for (let i in options) {
                if (options[i].startsWith('scaleX')) {
                    if (options[i] == 'scaleX(-1)') {
                        options[i] = 'scaleX(1)';
                    } else {
                        options[i] = 'scaleX(-1)';
                    }
                    break;
                }
            }
        } else {
            options[0] += " scaleX(-1)";
        }
        image.style.transform = options.join(" ");
        // console.log(options);
    }
}