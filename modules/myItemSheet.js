export default class elementalItemSheet extends ItemSheet{
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["Ysystem", "sheet", "item"],
      width: 320,
      height: 370,
      resizable: false
    });
  }
  get template(){
          return `systems/elemental/templates/sheets/items/${this.item.type}.html`;
      }
}
