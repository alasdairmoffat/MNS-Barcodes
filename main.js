// Avoiding template literals and arrow functions for IE compatibility
/* eslint-disable prefer-template */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
function showError(error) {
  const alert = document.querySelector('.alert');

  alert.textContent = error;
  alert.classList.remove('hide');
}

function hideError() {
  document.querySelector('.alert').classList.add('hide');
}

function verifyInput(input) {
  if (input.length !== 8) {
    showError('Staff ID must be 8 digits');
    return false;
  }

  if (
    !input.split('').every(function (char) {
      // ensure all characters are 0-9
      return char.charCodeAt(0) > 47 && char.charCodeAt(0) < 58;
    })
  ) {
    showError('Staff ID must only include digits from 0-9');
    return false;
  }

  return true;
}

function generateBarcodes(staffID) {
  JsBarcode('#idBarcode', staffID, { width: 4 });
  JsBarcode('#emailBarcode', staffID + '@mnscorp.net');
}

function runAnimation() {
  // prettier-ignore
  const animated = Array.prototype.slice.call(document.querySelectorAll('.animated'));

  animated.forEach(function (element) {
    return element.classList.toggle('hidden');
  });
}

function submitForm(e) {
  e.preventDefault();
  const staffID = e.target.staffID.value;
  if (verifyInput(staffID)) {
    generateBarcodes(staffID);
    runAnimation();
    hideError();
  }
}

function printBarcodes() {
  window.print();
}

document.querySelector('form').addEventListener('submit', function (e) {
  submitForm(e);
});
document.querySelector('#back-button').addEventListener('click', runAnimation);
document
  .querySelector('#print-button')
  .addEventListener('click', printBarcodes);
