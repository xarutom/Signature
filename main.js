const canvas = document.getElementById('assinatura');
const ctx = canvas.getContext('2d');
let desenhando = false;
let assinaturaAtiva = false;

let termo = false;

const approveTerm = document.getElementById('active'); // Isso precisa referenciar um checkbox no HTML

approveTerm.addEventListener('change', function () {
    const entry = document.getElementById('signature');
    const send = document.getElementById('send')
    let button1 = document.getElementById('btn1')
    let button2 = document.getElementById('btn2')
    if (this.checked) {
        entry.style.pointerEvents = 'auto';
        send.style.color = 'black'
        send.style.background = 'none'
        send.style.border = 'none'
        button1.style.background = '#0D6EFD'
        button2.style.background = '#0D6EFD'
    } else {
        entry.style.pointerEvents = 'none';
        send.style.color = 'gray'
        send.style.background = 'rgb(238, 238, 238)'
        button1.style.background = 'gray'
        button2.style.background = 'gray'
        button1.style.border = 'none'
        button2.style.border = 'none'
        send.style.border = '1px solid rgb(133, 133, 133)'
    }
});



const toggleAssinatura = document.getElementById('toggleAssinatura');
toggleAssinatura.addEventListener('change', function () {
    if (assinaturaAtiva = this.checked){
        const input = document.getElementById('inputDigital');
        input.disabled = true;
        limpar()
    }
    else{
        const input = document.getElementById('inputDigital');
        input.disabled = false;
    }
});

const input = document.getElementById('inputDigital');
input.addEventListener('input', desenharTexto);

// Eventos de mouse e touch
canvas.addEventListener('mousedown', iniciarDesenho);
canvas.addEventListener('mouseup', pararDesenho);
canvas.addEventListener('mousemove', desenhar);

canvas.addEventListener('touchstart', iniciarDesenho);
canvas.addEventListener('touchend', pararDesenho);
canvas.addEventListener('touchmove', desenhar);

function iniciarDesenho(e) {
    if (!assinaturaAtiva) return;
    desenhando = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    e.preventDefault();
}

function pararDesenho() {
    desenhando = false;
}

function desenhar(e) {
    if (!desenhando || !assinaturaAtiva) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    ctx.lineTo(x, y);
    ctx.stroke();

    e.preventDefault();
}

function limpar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const input = document.getElementById('inputDigital');
    input.value = '';
}

function salvar() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionar título ou cabeçalho
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Documento Assinado', 105, 20, null, null, 'center'); // Alinhado ao centro

    // Adicionar nome e data ao PDF
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const nome = "Nome Remetente";
    const data = new Date().toLocaleDateString();
    doc.text(`Nome: ${nome}`, 20, 40);  // Insere o nome
    doc.text(`Data: ${data}`, 20, 50);  // Insere a data

    // Adicionar mais informações ao PDF
    doc.text('Este documento foi assinado digitalmente.', 20, 70);

    // Adicionar a assinatura
    const dataURL = canvas.toDataURL('image/png');  // Captura a assinatura do canvas
    doc.addImage(dataURL, 'PNG', 20, 100, 150, 50);  // Ajusta a posição e o tamanho da assinatura no PDF

    // Salvar o PDF
    doc.save('documento_assinado.pdf');
}


function desenharTexto() {
    const texto = input.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = '40px "Dancing Script"';
    ctx.fillStyle = 'black';
    
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';


    const x = canvas.width / 2;
    const y = canvas.height / 2;

    ctx.fillText(texto, x, y);
}

function msgDelete() {
    const section = document.getElementsByClassName('delete')[0];
    section.style.opacity = '1'
}

function msgSus() {
    const section = document.getElementsByClassName('sus')[0];
    section.style.opacity = '1'
}

function msgClose() {
    const del = document.getElementsByClassName('delete')[0];
    del.style.opacity = '0';
    const sus = document.getElementsByClassName('sus')[0];
    sus.style.opacity = '0';
}

function getValue(){
    const name = document.getElementById('nomeCompleto')
    let valor = name.value
    alert(valor)
}