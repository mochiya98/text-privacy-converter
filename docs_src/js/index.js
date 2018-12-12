const elReplLineInput = document.getElementById("repl-line-input");
const elReplLineOutput = document.getElementById("repl-line-output");
const elReplAreaInput = document.getElementById("repl-area-input");
const elReplAreaConvertBtn = document.getElementById("repl-area_convert-btn");
function convertLineREPL() {
  elReplLineOutput.textContent = privacyConvertJa(elReplLineInput.value);
}
function selectReplLineInput() {
  this.select();
}
function selectReplLineOutput() {
  var range = document.createRange();
  range.selectNodeContents(this);
  window.getSelection().addRange(range);
}
function convertAreaREPL() {
  elReplAreaInput.value = privacyConvertJa(elReplAreaInput.value);
}
elReplLineInput.addEventListener("input", convertLineREPL);
elReplLineInput.addEventListener("click", selectReplLineInput);
elReplLineOutput.addEventListener("click", selectReplLineOutput);
elReplAreaConvertBtn.addEventListener("click", convertAreaREPL);
convertLineREPL();
