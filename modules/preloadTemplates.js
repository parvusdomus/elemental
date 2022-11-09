export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
      //"/systems/vds/templates/sheets/actors/parts/skills.html",
      //"/systems/vds/templates/sheets/actors/parts/equipment.html",
      //"/systems/vds/templates/sheets/actors/parts/bio.html",
    ];
        return loadTemplates(templatePaths);
};