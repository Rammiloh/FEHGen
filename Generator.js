


async function getJSON(jsonFile) {
return fetch(jsonFile)
	.then((response)=>response.json())
	.then((responseJson)=>{return responseJson});
}
async function caller(jsonFile) {
  var json = await this.getJSON();  // command waits until completion
  console.log(json[0].Filename);            // hello is now available
  return json;
}

var charactersJSON = caller("./Characters.json");
var skillsJSON = caller("./Skills.json");
var statsJSON = caller("./Classes.json");
var conditionsJSON = caller("./WeaponConditions.json");
var effectsJSON = caller("./WeaponEffects.json");

document.getElementById("generatedUnit").innerHTML = `  <div id="charImage"> <img src="./CharacterIcons/${json[0].Filename}" /> </div>`;
