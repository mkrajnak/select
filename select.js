
var render = () => {
  while (true) {
    // console.log('lel');
  }
}


var showMenu = () => {
  console.log('Show Menu');
}


var loaded = () => {
  window.removeEventListener('load', loaded);
  const select = document.getElementById("custom-select");
  console.log(select.options)
  for(opt of select.options) {
    console.log(opt.title)
    opt.innerHTML += ' ' + opt.title
  }
  // select.unbind('click')
  select.addEventListener('mousedown', showMenu)
}






window.addEventListener('load', loaded)




// class Extend Evented {
//   constructor() {
//     super()
//   }
// }
