"use strict"; // See "Why Strict Mode?" at https://www.w3schools.com/js/js_strict.asp

//Listen for input events on the input box
var sourceText=document.querySelector('#transactionRef');
sourceText.addEventListener('input',() => {genQR()})

//Define size and error checking of qr code
var qrParams = {
  width: 100, height: 100, 
  colorDark: '#000000',
  colorLight: '#ffffff',
  correctLevel: QRCode.CorrectLevel.H
};

//Instanciate a new QRCode in the target element.
var transactionRefQr = new QRCode(document.getElementById('qrLandingZone'), qrParams);


//So a QR gets generated at runtime
genQR(); 

function genQR(){
    transactionRefQr.clear(); //in case there's already something there
    transactionRefQr.makeCode($('#transactionRef').val());
};