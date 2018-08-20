function changeDensityText() {
  let densityValue = document.getElementById('kingdomPopulationDensity').value;
  document.getElementById('populationAmountText').innerHTML = `(${densityValue} persons per sq. mile)`;
}

function updateKingdomName(){
  document.getElementById('kingdomNameText').innerHTML = `${ document.getElementById('kingdomName').value}`
}

function calculateTheKingdom() {
  let kingdomName = document.getElementById('kingdomName').value
  let kingdomArea = Number(document.getElementById('kingdomPhysicalArea').value);
  let kingdomPopulationDensity = Number(document.getElementById('kingdomPopulationDensity').value);
  let kingdomAge = Number(document.getElementById('kingdomAge').value);
  let area = calculateKingdomArea(kingdomArea, kingdomPopulationDensity);
  let population = kingdomArea * kingdomPopulationDensity;
  let setelments = calculateSetelments(population);
  let castles = calculateCastles(kingdomAge, population);

  document.getElementById('kingdomStatsPhysicalArea').innerHTML = `
    The Kingdom of ${kingdomName} covers an area of about ${area.area} square miles. Of this ${area.plow_area} square miles (${area.plow_percent}) is farmable, and ${area.wild_area} square miles (${area.wild_percent}) is wilderness
  `;
  document.getElementById('kingdomStatsPopulation').innerHTML = `
    The Kingdom of ${kingdomName} has a population of about ${large_value(population)} people
  `;
  document.getElementById('kingdomStatsSettlements').innerHTML = `
    The largest city in the Kingdom of ${kingdomName} has a population of about ${large_value(setelments.cities[0].cityPopulation)} people. The second largest city has a population of about ${large_value(setelments.cities[1].cityPopulation)}. There are ${large_value(setelments.cities.length - 2)} other cites of note. The kingdom has a total of ${large_value(setelments.towns[0].numberOfTowns)} towns spread across the land. The rest of the population lives in  villages, hamlets and smaller settlements, a small number live in isolated dwellings or are itinerant workers and wanderers
  `;
  document.getElementById('kingdomStatsCastles').innerHTML = `
    The Kingdom of ${kingdomName} has a total of ${castles.totalCastels} castles. Of these ${castles.activeCastles} are in regular use, and ${castles.ruinedCastles} lay in ruins. ${castles.castelsInSettledAreas} of all castles are in settled regions while ${castles.castelsInWildAreas} are in the wilderness, along borders, etc
  `;
}

function calculateKingdomArea(area, populationDensity) {
  populationDensity = populationDensity / 180 + Math.random() * 0.1;
  var wildernessVar = 1 - populationDensity;
  return {
    area: large_value(area),
    plow_area: large_value(populationDensity * area),
    plow_percent: Math.floor(populationDensity * 100) + "%",
    wild_area: large_value(wildernessVar * area),
    wild_percent: Math.floor(wildernessVar * 100) + "%"
  };
}

function calculateSetelments(population){
  let cityOnePop =  Math.round( ( Math.sqrt(population) ) * ( diceRoll(4,2) + 10 ) );
  let cityTwoPop = cityOnePop - Math.round( cityOnePop * ( ( diceRoll(4,2) * 10 ) / 100) );
  let setelments =
    {
      "cities": [
        {
          "cityNumber": 1,
          "cityPopulation":  cityOnePop
        },
        {
          "cityNumber": 2,
          "cityPopulation":  cityTwoPop
        }
      ],
      "towns": []
    };

  let loopContinue = true
  let index = 1
  while (loopContinue) {
    let newCity = setelments.cities[index].cityPopulation - Math.round( setelments.cities[index].cityPopulation * ( ( diceRoll(4,2) * 5 ) / 100) );
    if(newCity >= 8000){
      setelments.cities.push(
        {
          "cityNumber": index + 2,
          "cityPopulation":  newCity
        }
      );
    }
    else{
      loopContinue = false
    }
    index ++;
  }

  setelments.towns.push(
    {
      "numberOfTowns":  setelments.cities.length * diceRoll(8,2)
    }
  )
  return setelments;
}

function calculateCastles(kingdomAge, kingdomPopulation) {
  let ruinedCastles = Math.round( ( kingdomPopulation / 5E6 ) * Math.sqrt(kingdomAge) );
  let activeCastles = Math.round( kingdomPopulation / 50000 );
  let totalCastels = ruinedCastles + activeCastles;
  let castelsInSettledAreas = Math.round( totalCastels * .75 );
  let castelsInWildAreas = Math.round( totalCastels * .25 );
  return {
    ruinedCastles: ruinedCastles,
    activeCastles: activeCastles,
    castelsInSettledAreas: castelsInSettledAreas,
    castelsInWildAreas: castelsInWildAreas,
    totalCastels: totalCastels,
  }
}

// start for calculating settlement stats
function updatesettlementName() {
  document.getElementById('settlementNameText').innerHTML = `${document.getElementById('settlementName').value}`
}
function calculateTheSettlement(){
  let settlementName = document.getElementById('settlementName').value;
  let population = Number( document.getElementById('settlementsPopulation').value );
  let shops = calculateShops(population);
  shops.forEach((shop) =>{
    document.getElementById('shopElContainer').appendChild(shop);
  });
  let area = Math.round(population / 38850 * 640);
  let specialOcupations =  calculateSpecialOcupations(population);

  document.getElementById('townSize').innerHTML = `<b>Size: </b>The settlement of ${settlementName} covers an area of ${area} acres, with a total of ${population} people`;
  document.getElementById('specialOcupations').innerHTML = `<b>Other: </b>The village has ${specialOcupations.nobleHouses} noble houses. The peace is kept by ${specialOcupations.guardsmen} guardsmen, and there are ${specialOcupations.lawyers} advocates to assist with legal matters. For those more concerned about their soul, there are ${specialOcupations.clergyman} clergymen and ${specialOcupations.preists} priests.`;
}

function calculateShops(population){
  let trade_sv = {
    Bakers: 800,
    Barbers: 350,
    Bathers: 1900,
    Beer_sellers: 1400,
    Blacksmiths: 1500,
    Bleachers: 2100,
    Bookbinders: 3000,
    Booksellers: 6300,
    Buckle_Makers: 1400,
    Butchers: 1200,
    Carpenters: 550,
    Chandlers: 700,
    Chicken_Butchers: 1000,
    Coopers: 700,
    Copyists: 2000,
    Cutlers: 2300,
    Doctors: 1700,
    Fishmongers: 1200,
    Furriers: 250,
    Glovemakers: 2400,
    Harness_makers: 2000,
    Hatmakers: 950,
    Hay_Merchants: 2300,
    Illuminators: 3900,
    Inns: 2000,
    Jewelers: 400,
    Locksmiths: 1900,
    Magic_Shops: 2800,
    Maidservants: 250,
    Masons: 500,
    Mercers: 700,
    Old_Clothes: 400,
    Painters: 1500,
    Pastrycooks: 500,
    Plasterers: 1400,
    Pursemakers: 1100,
    Roofers: 1800,
    Ropemakers: 1900,
    Rugmakers: 2000,
    Saddlers: 1000,
    Scabbardmakers: 850,
    Sculptors: 2000,
    Shoemakers: 150,
    Spice_Merchants: 1400,
    Tailors: 250,
    Tanners: 2000,
    Taverns: 400,
    Watercarriers: 850,
    Weavers: 600,
    Wine_sellers: 900,
    Woodcarvers: 2400,
    Woodsellers: 2400
  };
  document.getElementById('shopElContainer').innerHTML = '';
  let titleEl = document.createElement('p');
  titleEl.innerHTML = `<b>Shops: </b>`
  let shops = [titleEl];
  for (shop in trade_sv) {
    trade_sv[shop] = Math.round( population / trade_sv[shop] );
    let shopEl = document.createElement('p');
    shopEl.classList.add('shopEl')
    shopEl.innerHTML = `${shop}: ${trade_sv[shop]}`;
    shops.push(shopEl);
  }
  return shops;
}

function calculateSpecialOcupations(population) {
  return {
    nobleHouses: Math.round( population / 200 ),
    lawyers: Math.round( population / 650 ),
    clergyman: Math.round( population / 40 ),
    preists: Math.round( ( Math.round( population / 40 ) ) / 30 ),
    guardsmen: Math.round( population / 150 )
  };
}

// other function that are used throughout the page
function large_value(number) {
  return number = number > 1E10 ? Math.floor(number / 1E9) + " billion" : number > 1E9 ? Math.floor(number / 1E8) / 10 + " billion" : number > 1E7 ? Math.floor(number / 1E6) + " million" : number > 1E6 ? Math.floor(number / 1E5) / 10 + " million" : number > 1E4 ? Math.floor(number / 1E3) + " thousand" : Math.floor(number)
}

function diceRoll(numberOfSides, numberOfRolls){
  let total = 0;
  for (var i = 0; i < numberOfRolls; i++) {
    total += (Math.floor((Math.random() * numberOfSides) + 1));
  }
  return total;
}

calculateTheKingdom();
calculateTheSettlement();
