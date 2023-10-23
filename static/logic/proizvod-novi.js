function validate() {
    var valid = true;
    var nazivInput = document.getElementById('naziv');
  
    if (nazivInput.value.length < 3) {
      valid = false;
      nazivInput.classList.remove('success');
      nazivInput.classList.add('error');
      console.log("naziv input - outline color: ", nazivInput.style.borderColor);
    } else {
      nazivInput.classList.remove('error');
      nazivInput.classList.add('success');
    }
  
    return valid;
}
  
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    const nazivInput = document.getElementById('naziv');

    // Add an event listener for the input element to reset classes on keypress
    nazivInput.addEventListener('keypress', function () {
        this.classList.remove('success');
        this.classList.remove('error');
    });

    // Add an event listener for focus to change border color
    nazivInput.addEventListener('focus', function () {
        nazivInput.style.borderColor = 'black';
    });

});