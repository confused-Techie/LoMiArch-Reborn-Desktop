console.log(global.maybe());



(async function() {
  let val = await global.lomiarch("friend");
  console.log(val);
})();

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  global.context();
});
