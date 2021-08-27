"use strict"; // See "Why Strict Mode?" at https://www.w3schools.com/js/js_strict.asp
// ################### ADD EVENT LISTENERS ####################

var eachSide = 100; //this will be length, width, and height of the generated QR code.
//In the definition of the "myQrSettings" object, note that the "text" key is initialized as row zero-length string.
var myQrSettings = {text:'', width: eachSide, height: eachSide};

//New QRCode object using above params
//var fancySquare = new QRcode($('#qrLandingZone'),myQrSettings)

var inputSelector = document.querySelector('#myInputBox');

// input.addEventListener('input', function() {
//     processAllInputs();
// });
inputSelector.addEventListener('input', () => {processAllInputs()} );

// ################### END EVENT LISTENERS ####################
// See "https://codepen.io/hchiam/pen/BeMQZe" for the working inspiration of this.
function processAllInputs() {    
    $('#qrLandingZone').empty(); //empty the element if there's already something there.
    // $('#qrcode').qrcode($('#myInputBox').val());
    $('#qrLandingZone').genQR($('#myInputBox').val());
    
};



  //Define size and error checking of qr code
  qrParams = {
    width: 100, height: 100, 
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  };

//Instanciate a new QRCode in the target element.
var transactionRefQr = new QRCode(document.getElementById('qrLandingZone'), qrParams);

function makeCode () {    
  var elText = document.getElementById('transactionRef');
  transactionRefQr.clear()
  // transactionRefQr.makeCode(elText.value);
  transactionRefQr.makeCode($('#transactionRef').val())
}

makeCode();

$('#transactionRef').
  on('blur', function () {
    makeCode();
  }).
  on('keydown', function (e) {
    if (e.keyCode == 13) {
      makeCode();
    }
  });