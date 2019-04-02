var changeState = (elem) => {
  for (opt of elem.getElementsByTagName('opt')) {
    opt.style.display = opt.style.display === 'none' ? 'block' : 'none';
  }
}


var closeAll = () => {
  nodes = Array.from(document.getElementsByTagName("customselect"));
  nodes.forEach((select) => {
    for (opt of select.getElementsByTagName('opt')) {
      opt.style.display = 'none';
    }
  });
}


var filterItems = (e, label) => {
  nodes = Array.from(document.getElementsByTagName("customselect"));
  nodes.forEach((select) => {
    for (opt of select.getElementsByTagName('opt')) {
      if (!opt.getElementsByTagName('value')[0].innerHTML.includes(label.value)) {
        opt.style.display = 'none';
      }
    }
  });
}


var showMenu = (e, elem) => {
  if (!elem) {
    closeAll()
    document.removeEventListener('mousedown', showMenu);
    return;
  }
  changeState(elem);
  if (elem.getElementsByTagName('opt')[0].style.display === 'block' ) {
    // console.log(elem.getElementsByTagName('opt')[0].style.display)
    // document.addEventListener('mousedown', (e) => showMenu(e));
  } else {
    // console.log('Removing listener')
  }
}


var changeValue = (e, opt) => {
  let select = opt.parentNode.parentNode
  let changed = opt.getElementsByTagName('value')[0].innerHTML;
  select.getElementsByTagName('xlabel')[0].innerHTML = changed;
  showMenu(e);
}


var createOption = (opt) => {
  let customOpt = document.createElement("opt");
  let value = document.createElement("value");
  let description = document.createElement("description");
  //  Create text fields for titles and text
  value.appendChild(document.createTextNode(opt.text))
  description.appendChild(document.createTextNode(opt.title))
  // Add them to main opt tag, set style to now show
  customOpt.appendChild(value);
  customOpt.appendChild(description);
  // Initial hide
  customOpt.style.display='none';
  customOpt.addEventListener('click', (e) => changeValue(e, customOpt))
  return customOpt;
}


var createCustomSelectElement = (select) => {
  console.log(select)
  // Get rid of the old select
  const options = select.options
  select.parentNode.removeChild(select)
  // Add new select
  var customSelect = document.createElement("customselect");
  var customOptions = document.createElement("options");

  console.log(select.getAttribute('mode'))

  if (select.getAttribute('mode') === '1') {
    var customLabel = document.createElement("xlabel");
    console.log("asdasdasdasd")
   } else {
     var customLabel = document.createElement("input");
   }

  var id = document.createAttribute("id");
  id.value = select.id
  customSelect.setAttributeNode(id);
  // Create options and add first value
  for (opt of options) {
    if (!customLabel.innerHTML && select.getAttribute('mode') === '1') {
      customLabel.innerHTML = opt.text ;
    }
    customOptions.appendChild(createOption(opt));
  }
  var div = document.createElement("div");
  var arrow = document.createElement("options");
  customSelect.appendChild(customLabel);
  customSelect.appendChild(customOptions);
  document.body.append(customSelect)
  // Register events
  customLabel.addEventListener('click', (e) => showMenu(e, customSelect))
  if (select.getAttribute('mode') === '2') {
    customLabel.addEventListener('keypress', (e) => filterItems(e, customLabel))
  }
  console.log('end')
}


var loaded = () => {
  window.removeEventListener('load', loaded);
  nodes = Array.from(document.getElementsByClassName("custom-select"));
  nodes.forEach((s) => createCustomSelectElement(s));
}

window.addEventListener('load', loaded)
