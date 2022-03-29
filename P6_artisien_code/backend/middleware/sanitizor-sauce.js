module.exports = (req, res, next) => {
  if (JSON.parse(req.body.sauce !== undefined)) {
    let sauce = JSON.parse(req.body.sauce);

    let { name, manufacturer, description, mainPepper } = sauce;
    let trimedTab = [];

    function toTrim(...string) {
      trimedTab = string.map((elt) => elt.trim());
    }
    toTrim(name, manufacturer, description, mainPepper);

    for (let reqAttr of trimedTab) {
      console.log(reqAttr);
      if (
        reqAttr.includes("SELECT") ||
        reqAttr.includes("INSERT") ||
        reqAttr.includes("DELETE") ||
        reqAttr.includes("UPDATE") ||
        reqAttr.includes("CREATE") ||
        reqAttr.includes("DROP") ||
        reqAttr.includes("ALTER") ||
        reqAttr.includes("<script>")
      ) {
        throw new Error("Tentative d'attaque !");
      }
    }
    next();
  } else {
    const sauce = req.body;
    let { name, manufacturer, description, mainPepper } = sauce;
    let trimedTab = [];

    function toTrim(...string) {
      trimedTab = string.map((elt) => elt.trim());
    }
    toTrim(name, manufacturer, description, mainPepper);

    for (let reqAttr of trimedTab) {
      if (
        reqAttr.includes("SELECT") ||
        reqAttr.includes("INSERT") ||
        reqAttr.includes("DELETE") ||
        reqAttr.includes("UPDATE") ||
        reqAttr.includes("CREATE") ||
        reqAttr.includes("DROP") ||
        reqAttr.includes("ALTER") ||
        reqAttr.includes("<script>")
      ) {
        throw new Error("Tentative d'attaque !");
      }
    }
    next();
  }
};
