var changeState = (select) => {
  for (opt of select.getElementsByTagName('opt')) {
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


var changeValue = (opt) => {
  let select = opt.parentNode.parentNode
  let changed = opt.getElementsByTagName('value')[0].innerHTML;
  select.getElementsByTagName('xlabel')[0].innerHTML = changed;
  changeState(select);
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
  return customOpt;
}

var clickHandler = (target) => {
  if (target.tagName === 'XLABEL') {
    changeState(target.parentNode);
  } else if (target.tagName === 'OPT') {
    changeValue(target)
  } else if (target.tagName === 'VALUE' || target.tagName === 'DESCRIPTION') {
    changeValue(target.parentNode)
  } else {
    closeAll()
  }
}


var createCustomSelectElement = (select) => {
  console.log(select)
  // Get rid of the old select
  const options = select.options
  select.parentNode.removeChild(select)
  // Add new select
  var customSelect = document.createElement("customselect");
  var customOptions = document.createElement("options");


  if (select.getAttribute('mode') === '1') {
    var customLabel = document.createElement("xlabel");
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
  if (select.getAttribute('mode') === '2') {
    customLabel.addEventListener('keypress', (e) => filterItems(e, customLabel))
  }
}


var loaded = () => {
  window.removeEventListener('load', loaded);
  nodes = Array.from(document.getElementsByClassName("custom-select"));
  nodes.forEach((s) => createCustomSelectElement(s));
}

window.addEventListener('load', loaded)
window.addEventListener('click', (e) => clickHandler(e.target))
