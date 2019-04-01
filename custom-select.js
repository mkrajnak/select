class CustomSelect extends HTMLElement{
  constructor(value, text, title){
      super();
      this.value = value;
      this.text = text;
      this.title = title;
  }
}

customElements.define('custom-select', CustomSelect, { extends: "ul" });
