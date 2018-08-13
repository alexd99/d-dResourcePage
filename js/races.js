import {dndGetRequest} from "./dndGetRequest.js"
import {raceDescriptions} from './descriptions/raceDescriptions.js'

dndGetRequest('races/', false)
.then((races)=>{
  console.log(races);
  races.results.forEach((race, index)=>{
    let raceDiv = document.createElement('div');
    raceDiv.classList.add('raceDiv');
    raceDiv.innerHTML = `<h3>${race.name}</h3><img src="./assets/images/dndRaces/${race.name}.png" class="raceImage"><p>${raceDescriptions[index].description}</p>`;
    raceDiv.addEventListener('click', showRace(race.url));
    document.getElementById('dndRacesBox').appendChild(raceDiv);
  })
});

function showRace(url) {
  return () => {
    dndGetRequest(url, true)
    .then((race) => {
      console.log(race);
    });
  }
}
