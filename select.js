// Open/Close menu
var changeState = (select) => {
  for (opt of select.getElementsByTagName('opt')) {
    opt.style.display = opt.style.display === 'none' ? 'block' : 'none';
  }
}

// Click outside => close all customselect elements
var closeAll = () => {
  nodes = Array.from(document.getElementsByTagName("customselect"));
  nodes.forEach((select) => {
    for (opt of select.getElementsByTagName('opt')) {
      opt.style.display = 'none';
    }
  });
}


var filterSelect = (select, filter) => {
  for (opt of select.getElementsByTagName('opt')) {
    if (!opt.getElementsByTagName('value')[0].innerHTML.includes(filter)) {
      opt.style.display = 'none';
    }
  }
}

var filterEvent = (e, label) => {
  closeAll();
  changeState(label.parentNode);
  filterSelect(label.parentNode, label.value)
}

// clicked option => value in label is changed + menu is closed
var changeValue = (opt) => {
  let select = opt.parentNode.parentNode
  let changed = opt.getElementsByTagName('value')[0].innerHTML;
  if (select.mode === '1') {
    select.getElementsByTagName('xlabel')[0].innerHTML = changed;
  } else {
    select.getElementsByTagName('input')[0].value = changed;
  }
  closeAll();
}

// Generate option tags
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

// Handle all click events in window
var clickHandler = (target) => {
  if (target.tagName === 'XLABEL') {
    changeState(target.parentNode);
  } else if (target.tagName === 'INPUT') {
    changeState(target.parentNode);
    filterSelect(target.parentNode, target.value);
  } else if (target.tagName === 'OPT') {
    changeValue(target)
  } else if (target.tagName === 'VALUE' || target.tagName === 'DESCRIPTION') {
    changeValue(target.parentNode)
    closeAll()
  } else {
    closeAll()
  }
}


var getCustomLabel = (mode) => {
  if (mode === '1') {
    return document.createElement("xlabel");
  } else {
    let lbl = document.createElement("input");
    lbl.placeholder = 'Type to search';
    return lbl;
  }
}


var addStyle = () => {
  var style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "select.css";
  document.getElementsByTagName("head")[0].appendChild(style);
}

var createCustomSelectElement = (select) => {
  // Read all options, get rid of the old select
  const options = select.options;
  select.parentNode.removeChild(select);
  // Add new select, set mode, new options
  var customSelect = document.createElement("customselect");
  customSelect.mode = select.getAttribute('mode');
  var customOptions = document.createElement("options");
  var customLabel = getCustomLabel(customSelect.mode);

  var id = document.createAttribute("id");
  id.value = select.id;
  customSelect.setAttributeNode(id);
  // Create options and add first value
  for (opt of options) {
    if (!customLabel.innerHTML && customSelect.mode === '1') {
      customLabel.innerHTML = opt.text;
    }
    customOptions.appendChild(createOption(opt));
  }
  var div = document.createElement("div");
  var arrow = document.createElement("options");
  customSelect.appendChild(customLabel);
  customSelect.appendChild(customOptions);
  document.body.append(customSelect);
  // Register events
  if (customSelect.mode === '2') {
    customLabel.addEventListener('input', (e) => filterEvent(e, customLabel));
  }
}

// Kick off once the document is loaded
var loaded = () => {
  window.removeEventListener('load', loaded);
  nodes = Array.from(document.getElementsByClassName("custom-select"));
  nodes.forEach((s) => createCustomSelectElement(s));
  addStyle()
}

window.addEventListener('load', loaded)
window.addEventListener('click', (e) => clickHandler(e.target))
