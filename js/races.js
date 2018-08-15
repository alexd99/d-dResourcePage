import {dndGetRequest} from "./dndGetRequest.js"
import {raceDescriptions} from './descriptions/raceDescriptions.js'

dndGetRequest('races/', false)
.then((races)=>{
  document.getElementById('dndRaceBox').style.display = 'none'
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

      let proficiency = '';
      race.starting_proficiencies.forEach((prof, index) => {
        if(race.starting_proficiencies.length === 1){
          proficiency += `<p><b>Proficiencies:</b> ${prof.name}</p>`
        }
        else if(race.starting_proficiencies.length -1 === index){
          proficiency += `${prof.name}</p>`
        }
        else if(index === 0){
          proficiency += `<p><b>Proficiencies:</b> ${prof.name}, `
        }
        else{
          proficiency += `${prof.name}, `
        }

      });

      let proficiencyChoices = '';
      if(race.starting_proficiency_option){
        race.starting_proficiency_options.from.forEach((choice, index) => {
          if(race.starting_proficiency_options.from.length === 1){
            proficiencyChoices += `<p><b>Choose ${race.starting_proficiency_options.choose} proficiency From:</b> ${choice.name}</p>`
          }
          else if(race.starting_proficiency_options.from.length -1 === index){
            proficiency += `${choice.name}</p>`
          }
          else if(index === 0){
            proficiencyChoices += `<p><b>Choose ${race.starting_proficiency_options.choose} proficiency From:</b> ${choice.name}, `
          }
          else{
            proficiencyChoices += `${choice.name}, `
          }
        });
      }

      let statBonuses = '';
      race.ability_bonuses.forEach((stat, index) => {
        if(stat){
          switch (index) {
            case 0:
              statBonuses += `<p>Strength +${stat}</p>`
              break;
            case 1:
              statBonuses += `<p>Dexterity +${stat}</p>`
              break;
            case 2:
              statBonuses += `<p>Constitution +${stat}</p>`
              break;
            case 3:
              statBonuses += `<p>Intelligence +${stat}</p>`
              break;
            case 4:
              statBonuses += `<p>Wisdom +${stat}</p>`
              break;
            case 5:
              statBonuses += `<p>Charisma +${stat}</p>`
              break;
          }
        }
      });

      let traits = '';
      if(race.traits) {
        race.traits.forEach((trait, index) => {
          if(race.traits.length === 1){
            traits += `<p><b>Traits:</b> ${trait.name}</p>`
          }
          else if(race.traits.length -1 === index){
            traits += `${trait.name}</p>`
          }
          else if(index === 0){
            traits += `<p><b>Traits:</b> ${trait.name}, `
          }
          else{
            traits += `${trait.name}, `
          }
        });
      }

      raceBox.innerHTML = `
        <div id="dndCard">
          <div class="dndCardTitle">
            <div class="dndCardTop">
              <div></div>
              <div id="dndCardTitle">
                <h2 class="className">${race.name}</h2>
              </div>
              <div><i class="fas fa-times dndCloseCard" onclick="document.getElementById('dndImageCardBox').style.display = 'flex'; document.getElementById('dndRaceBox').style.display = 'none';"></i></div>
            </div>
          </div>
          <div class="dndCardBody">
            <div class="dndCardBodyLeft">
              <p><b>Age:</b> ${race.age}</p>
              <p><b>Alignment:</b> ${race.alignment}</p>
              <p><b>Language:</b> ${race.language_desc}</p>
              <p><b>Size:</b> ${race.size_description}</p>
              ${proficiency}
              ${proficiencyChoices}
            </div>
            <div class="dndCardBodyRight">
              ${statBonuses}
              ${traits}
            </div>
          </div>
        </div>`

        if(race.subraces.length >= 1) {
          let subraceP = document.createElement('p');
          subraceP.classList.add('subRaceP');
          subraceP.innerHTML = '<b>Subrace:</b> ';
          document.querySelector('.dndCardBodyRight').appendChild(subraceP);

          race.subraces.forEach((subrace, index) => {
            let subraceEl = document.createElement('span');
            subraceEl.classList.add('pointer');
            subraceEl.addEventListener('click', showSubrace(subrace.url))
              if(race.subraces.length -1 === index){
                subraceEl.innerHTML = `${subrace.name}`
              }
              else{
                subraceEl.innerHTML = `${subrace.name}, `
              }
              document.querySelector('.subRaceP').appendChild(subraceEl);
          });
        }
    });
  };
}

function showSubrace(url) {
  return () => {
    if(url){}
    dndGetRequest(url, true)
    .then((subrace)=>{
      if(subrace) {
        const subraceModal = new tingle.modal({
            footer: true,
            stickyFooter: false,
            closeMethods: ['overlay', 'button', 'escape'],
            closeLabel: "Close",
            cssClass: [],
            onOpen: function() {
            },
            onClose: function() {
            },
            beforeClose: function() {
                return true; // close the modal
            }
        });

        let statBonuses = '';
        subrace.ability_bonuses.forEach((stat, index) => {
          if(stat){
            switch (index) {
              case 0:
                statBonuses += `<p>Strength +${stat}</p>`
                break;
              case 1:
                statBonuses += `<p>Dexterity +${stat}</p>`
                break;
              case 2:
                statBonuses += `<p>Constitution +${stat}</p>`
                break;
              case 3:
                statBonuses += `<p>Intelligence +${stat}</p>`
                break;
              case 4:
                statBonuses += `<p>Wisdom +${stat}</p>`
                break;
              case 5:
                statBonuses += `<p>Charisma +${stat}</p>`
                break;
            }
          }
        });

        let proficiency = '';
        let starting_proficiencies = (subrace['starting_proficiencies:']);
        starting_proficiencies.forEach((prof, index) => {
          if(starting_proficiencies.length === 1){
            proficiency += `<p><b>Proficiencies:</b> ${prof.name}</p>`
          }
          else if(starting_proficiencies.length -1 === index){
            proficiency += `${prof.name}</p>`
          }
          else if(index === 0){
            proficiency += `<p><b>Proficiencies:</b> ${prof.name}, `
          }
          else{
            proficiency += `${prof.name}, `
          }
        });

        let traits = '';
        subrace.racial_traits.forEach((trait, index) => {
          if(subrace.racial_traits.length === 1){
            traits += `<p><b>Traits:</b> ${trait.name}</p>`
          }
          else if(subrace.racial_traits.length -1 === index){
            traits += `${trait.name}</p>`
          }
          else if(index === 0){
            traits += `<p><b>Traits:</b> ${trait.name}, `
          }
          else{
            traits += `${trait.name}, `
          }
        });

        subraceModal.setContent(
          `
          <h2>${subrace.name}</h2>
          <p>${subrace.desc}</p>
          ${statBonuses}
          ${proficiency}
          ${traits}
          `
        )

        subraceModal.open();
      }
    });
  };
}
