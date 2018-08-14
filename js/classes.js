import {dndGetRequest} from "./dndGetRequest.js"
import {classDescriptions} from "./descriptions/classDescriptions.js"

dndGetRequest('classes/', false)
.then((dndClasses)=>{
  document.getElementById('dndClassBox').style.display = 'none'
  dndClasses.results.forEach((dndClass, index)=>{
    let classDiv = document.createElement('div');
    classDiv.classList.add('dndImageCard');
    classDiv.innerHTML = `<h3>${dndClass.name}</h3><img src="./assets/images/dndClasses/${dndClass.name}.png" class="dndClassImage"><p>${classDescriptions[index].description}</p>`;
    classDiv.addEventListener('click', showClass(dndClass.url));
    document.getElementById('dndImageCardBox').appendChild(classDiv);
  })
});

function showClass(url) {
  return () => {
    dndGetRequest(url, true)
    .then((dndClass)=>{
      dndGetRequest(dndClass.starting_equipment.url, true)
      .then((equipment) => {

        let dndClassBox = document.getElementById('dndClassBox');
        document.getElementById('dndClassesBox').style.display = 'none';
        dndClassBox.style.display = 'block';

        let spellCasting = '';
        if(dndClass.spellcasting){
          spellCasting = `<b>Spell Casting:</b> ${dndClass.spellcasting.class}`;
        }

        let proficiencies = '';
        dndClass.proficiencies.forEach((proficiency, index)=>{
          if(dndClass.proficiencies.length - 1 === index){
            proficiencies += `${proficiency.name}`;
          }
          else {
            proficiencies += `${proficiency.name}, `;
          }
        });

        let proficiencyChoices = '';
        dndClass.proficiency_choices.forEach((skill, index)=>{
          proficiencyChoices += `<b>Choose ${skill.choose} Skills From:</b> `
          skill.from.forEach((choice, i) => {
            let choiceName = choice.name
            if(choiceName.includes("Skill:")){
              choiceName = choiceName.substr(7);
            }

           if(skill.from.length - 1 === i && dndClass.proficiency_choices.length - 1 !== index){
              proficiencyChoices += `${choiceName} <br> <br>`;
            }
            else if(skill.from.length - 1 === i){
              proficiencyChoices += `${choiceName}`;
            }
            else {
              proficiencyChoices += `${choiceName}, `;
            }
          });
        });

        let savingThrows = ''
        dndClass.saving_throws.forEach((save, index) => {
          let savingThrow = save.name.toLowerCase();
          savingThrow = savingThrow.charAt(0).toUpperCase() + savingThrow.slice(1);
          if(dndClass.saving_throws.length - 1 === index){
              savingThrows += `${savingThrow}`;
          }
          else {
              savingThrows += `${savingThrow}, `;
          }
        })

        let startingEquipment = ''
        equipment.starting_equipment.forEach((item, index) => {
          let name = item.item.name;
          if(item.quantity > 1){
            name += 's';
          }
          if(equipment.starting_equipment.length - 1 === index){
              startingEquipment += `${item.quantity} ${name}`;
          }
          else {
              startingEquipment += `${item.quantity} ${name}, `;
          }
        })

        dndClassBox.innerHTML = `
          <div id="dndCard">
            <div class="dndCardTitle">
              <div class="dndCardTop">
                <div></div>
                <div id="dndCardTitle">
                  <h2 class="className">${dndClass.name}</h2>
                </div>
                <div><i class="fas fa-times dndCloseCard" onclick="document.getElementById('dndClassesBox').style.display = 'flex';document.getElementById('dndClassBox').style.display = 'none';"></i></div>
              </div>
            </div>
            <div class="dndCardBody">
              <div class="dndCardBodyLeft">
                <p><b>Proficiencies:</b> ${proficiencies}</p>
                <p>${proficiencyChoices}</p>
                <p><b>Starting Equipment:</b> ${startingEquipment}</p>
              </div>
              <div class="dndCardBodyRight">
                <p><b>Hit Die:</b> D${dndClass.hit_die}</p>
                <p>${spellCasting}</p>
                <p><b>Saving Throws:</b> ${savingThrows}</p>
              </div>
            </div>
          </div>
        `

        let subclassEl = document.createElement('h3');
        subclassEl.classList.add('subclassTitle');
        subclassEl.addEventListener('click', showSubclass(dndClass.subclasses[0].url));
        subclassEl.innerHTML = `Subclass: ${dndClass.subclasses[0].name}`;

        document.getElementById('dndCardTitle').appendChild(subclassEl);
      });
    });
  }
}

function showSubclass (url) {
  return () => {
    dndGetRequest(url, true)
    .then((subclass) => {
      const subclassDescription = new tingle.modal({
          footer: true,
          stickyFooter: false,
          closeMethods: ['overlay', 'button', 'escape'],
          closeLabel: "Close",
          cssClass: ['modalTextAlignLeft'],
          onOpen: function() {
          },
          onClose: function() {
          },
          beforeClose: function() {
              return true; // close the modal
          }
      });
      subclassDescription.setContent(`<p class="modalParagraph">${subclass.desc[0]}</p>`);
      subclassDescription.open()

    });
  }
}
