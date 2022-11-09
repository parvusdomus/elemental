//import {statRoll} from "./PJ_Rolls.js";
//import {skillRoll} from "./PJ_Rolls.js";
export default class elementalVehiclerSheet extends ActorSheet{
    static get defaultOptions() {
            return mergeObject(super.defaultOptions, {
                classes: ["elemental", "sheet", "actor"],
                template: "systems/elemental/templates/sheets/actors/Vehicle.html",
                width: 800,
                height: 760,
                resizable: true
                //,tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".main_page", initial: "skills" }]
            });
    }

    getData() {
        const data = super.getData();
        if (this.actor.type == 'Player') {
          //this._prepareCharacterItems(data);
          //this._calculaValores(data);
        }
        return data;
    }

    _prepareCharacterItems(sheetData) {
        const actorData = sheetData;
  
        // Inicializo arrays para meter los objetos por tipo.
         const Items = [];
         const Armors = [];
         const Skills = [];
         const Runes = [];
         // Ordena los objetos por tipo y los mete en el array correspondiente
        for (let i of sheetData.items) {
          let item = i.system;
          i.img = i.img || DEFAULT_TOKEN;
          if (i.type === 'Item') {
                if (Items.length < 10){
                    Items.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of items: 10. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }
                
            }
          else if (i.type === 'Armor') {
                if (Armors.length < 4){
                    Armors.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of armors: 4. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }
            }
           else if (i.type === "Skill") {
                if (Skills.length < 6){
                    Skills.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of skills: 7. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }   
            }
            else if (i.type === "Rune") {
                if (Runes.length < 4){
                    Runes.push(i);
                }
                else
                {
                    ui.notifications.warn("You have the maximum number of runes: 4. You can't add more until you delete some.");
                    this.actor.deleteEmbeddedDocuments("Item", [i._id])
                }
               }
        }
        //Asigno cada array al actordata
        actorData.Items = Items;
        actorData.Armors = Armors;
        actorData.Skills = Skills;
        actorData.Runes = Runes;
    }

    //CALCULO LOS VALORES DE BONUS DE LAS CARACTERÍSTICAS
    _calculaValores(actorData) {
        const sheetData = actorData;
        let Power_Bonus=0;
        let Aim_Bonus=0;
        let Wits_Bonus=0;
        let Guts_Bonus=0;
        let Speed_Bonus=0;
        let Resolve_Bonus=0;
        for (let i of sheetData.items) {
            if (i.type === "Rune"){
                if (i.system.Advance == 3){
                    Power_Bonus+=Number(i.system.Bonus.Power);
                    Aim_Bonus+=Number(i.system.Bonus.Aim);
                    Wits_Bonus+=Number(i.system.Bonus.Wits);
                    Guts_Bonus+=Number(i.system.Bonus.Guts);
                    Speed_Bonus+=Number(i.system.Bonus.Speed);
                    Resolve_Bonus+=Number(i.system.Bonus.Resolve);
                }
            } else
            if (i.type === "Item" || i.type === "Armor"){
                if (i.system.Hits.value < i.system.Hits.max){
                    Power_Bonus+=Number(i.system.Bonus.Power);
                    Aim_Bonus+=Number(i.system.Bonus.Aim);
                    Wits_Bonus+=Number(i.system.Bonus.Wits);
                    Guts_Bonus+=Number(i.system.Bonus.Guts);
                    Speed_Bonus+=Number(i.system.Bonus.Speed);
                    Resolve_Bonus+=Number(i.system.Bonus.Resolve); 
                }
            }
            else
            {
                Power_Bonus+=Number(i.system.Bonus.Power);
                Aim_Bonus+=Number(i.system.Bonus.Aim);
                Wits_Bonus+=Number(i.system.Bonus.Wits);
                Guts_Bonus+=Number(i.system.Bonus.Guts);
                Speed_Bonus+=Number(i.system.Bonus.Speed);
                Resolve_Bonus+=Number(i.system.Bonus.Resolve);
            }


            
        }
        let Power_Total= Power_Bonus + Number(this.actor.system.Power.value);
        let Aim_Total= Aim_Bonus + Number(this.actor.system.Aim.value);
        let Wits_Total= Wits_Bonus + Number(this.actor.system.Wits.value);
        let Guts_Total= Guts_Bonus + Number(this.actor.system.Guts.value);
        let Speed_Total= Speed_Bonus + Number(this.actor.system.Speed.value);
        let Resolve_Total= Resolve_Bonus + Number(this.actor.system.Resolve.value);

        this.actor.update ({ 'system.Power.bonus': Power_Bonus });
        this.actor.update ({ 'system.Aim.bonus': Aim_Bonus });
        this.actor.update ({ 'system.Wits.bonus': Wits_Bonus });
        this.actor.update ({ 'system.Guts.bonus': Guts_Bonus });
        this.actor.update ({ 'system.Speed.bonus': Speed_Bonus });
        this.actor.update ({ 'system.Resolve.bonus': Resolve_Bonus });

        this.actor.update ({ 'system.Power.total': Power_Total });
        this.actor.update ({ 'system.Aim.total': Aim_Total });
        this.actor.update ({ 'system.Wits.total': Wits_Total });
        this.actor.update ({ 'system.Guts.total': Guts_Total });
        this.actor.update ({ 'system.Speed.total': Speed_Total });
        this.actor.update ({ 'system.Resolve.total': Resolve_Total });
    }

    /*COSAS DE EVENTOS Y CLICKS VARIOS */

    activateListeners(html) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        /*Modificar Stats*/
        html.find('.mod_skill').click(ev => {
            const element = ev.currentTarget;
            const dataset = element.dataset;
            const skill=dataset.skill;
            const update = {};
            update.data = {};
            var valor_actual=Number(this.actor.system[skill].value)
            var valor_minimo=Number(this.actor.system[skill].min)
            var valor_nuevo=valor_actual+1
            if (valor_nuevo>6){valor_nuevo=valor_minimo}
            const habilidad='system.'+skill+'.value'
            update[habilidad] = valor_nuevo;
            update.id = this.actor.id;
            this.actor.update(update, {diff: true});
        });
    }
}