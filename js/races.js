import {dndGetRequest} from "./dndGetRequest.js"
import {raceDescriptions} from './descriptions/raceDescriptions.js'

dndGetRequest('races/', false)
.then((races)=>{
  document.getElementById('dndRaceBox').style.display = 'none'
  console.log(races);
  races.results.forEach((race, index)=>{
    let raceDiv = document.createElement('div');
    raceDiv.classList.add('dndImageCard');
    raceDiv.innerHTML = `<h3>${race.name}</h3><img src="./assets/images/dndRaces/${race.name}.png" class="raceImage"><p>${raceDescriptions[index].description}</p>`;
    raceDiv.addEventListener('click', showRace(race.url));
    document.getElementById('dndImageCardBox').appendChild(raceDiv);
  })
});

function showRace(url) {
  return () => {
    dndGetRequest(url, true)
    .then((race) => {
      document.getElementById('dndImageCardBox').style.display = 'none'
      let raceBox = document.getElementById('dndRaceBox');
      raceBox.style.display = 'block'
      raceBox.innerHTML = `<h1>Test</h1>`
      console.log(race);
    });
  }
}
