
function ChooseRandom(list) //Get a random item from the list
{
	return list[Math.floor(Math.random() * list.length)];
}
function GetRandom(min, max) //Get random integer between min and max, inclusive
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getJSON(jsonFile) {
return fetch(jsonFile)
	.then((response)=>response.json())
	.then((responseJson)=>{return responseJson});
}
async function caller(jsonFile) {
	var json = await this.getJSON();
	console.log(json[0].Filename);
	return json;
}

var charactersJSON = caller("./Characters.json");
var themesJSON = caller("./SeasonalThemes.json");
var skillsJSON = caller("./Skills.json");
var statsJSON = caller("./Classes.json");
var conditionsJSON = caller("./WeaponConditions.json");
var effectsJSON = caller("./WeaponEffects.json");

document.getElementById("generatedUnit").innerHTML = `  <div id="charImage"> <img src="./CharacterIcons/${json[0].Filename}" /> </div>`;


function GenerateCharacter(season,game)
{
	hero = ChooseRandom(charactersJSON);
	//
	if(game != "") //If a game is given as a parameter, we only want characters from said game
	{
		//This is bad and should be rewritten
		while(game != hero.Game)
			hero = ChooseRandom(heroes);
	}
	
	//The character's name and subtitle get separated here, so we can manipulate the title without affecting the name
	heroName = hero.Hero.substring(0,hero.Hero.indexOf(":"));
	heroTitle = hero.Hero.substring(hero.Hero.indexOf(":")+2).split(" ");
	
	if(Math.random() > 0.5) //Choose either to use a prefix for a suffix for the seasonal title
	{
		if(heroTitle.length > 1)
		{
			var suffix = ChooseRandom(theme.Suffixes);
			//Check if the second word in the base subtitle is a two letter word, usually "of"
			//If it is, we don't want to use a subtitle that has a space in it since those are usually formatted as "of <PLACE/TIME>"
			//We don't want something like "Hero of of Beach"
			while(heroTitle[heroTitle.length-2].length == 2 && suffix.includes(" ")) 
				suffix = ChooseRandom(theme.Suffixes);
			//Create the new title
			heroTitle.splice(heroTitle.length-1,1,suffix);
		}
		else //If the subtitle is only a single word long, we can just attach the suffix with no issue
			heroTitle.splice(heroTitle.length-1,0,ChooseRandom(theme.Suffixes));
	}
	else
	{
		if(heroTitle.length > 1)
		{
			//Check if the second word in the base subtitle is a two letter word, usually "of"
			//If it is, we choose to put a suffix at the start of the subtitle instead of a prefix so it can make grammatical sense
			if(heroTitle[1].length == 2)
				heroTitle.splice(0,1,ChooseRandom(theme.Suffixes));
			else
				heroTitle.splice(0,1,ChooseRandom(theme.Prefixes));
		}
		else //If the subtitle is only a single word long, we can just attach the prefix with no issue
			heroTitle.splice(0,0,ChooseRandom(theme.Prefixes));
	}

	console.log(heroName + ": " + heroTitle.join(" "));
}

var theme = ChooseRandom(themesJSON);
console.log("~" + theme.Event + "~");
var game = ChooseRandom(["FE1","FE2","FE4","FE5","FE6","FE7","FE8","FE9","FE10","FE13","FE14","FE16","FE0","FEE"]);
GetHero(game,theme);
