import {dndGetRequest} from "./dndGetRequest.js"
import {classDescriptions} from "./classDescriptions.js"

dndGetRequest('classes/', false)
.then((dndClasses)=>{
  document.getElementById('dndClassBox').style.display = 'none'
  dndClasses.results.forEach((dndClass, index)=>{
    let classDiv = document.createElement('div');
    classDiv.classList.add('classDiv');
    classDiv.innerHTML = `<h3>${dndClass.name}</h3><img src="./assets/images/dndClasses/${dndClass.name}.png" class="dndClassImage"><p>${classDescriptions[index].description}</p>`
    classDiv.addEventListener('click', showClass(dndClass.url));
    document.getElementById('dndClassesBox').appendChild(classDiv);
  })
});

function showClass(url) {
  return ()=>{
    dndGetRequest(url, true)
    .then((dndClass)=>{
      console.log(dndClass);
      let dndClassBox = document.getElementById('dndClassBox')
      document.getElementById('dndClassesBox').style.display = 'none';
      dndClassBox.style.display = 'block';

      let spellCasting = '';
      if(dndClass.spellcasting){
        spellCasting = `Spell Casting: ${dndClass.spellcasting.class}`
      }

      let proficiencies = '';
      dndClass.proficiencies.forEach((proficiency, index)=>{
        if(dndClass.proficiencies.length - 1 === index){
          proficiencies += `${proficiency.name}`
        }
        else {
          proficiencies += `${proficiency.name}, `
        }
      });

      dndClassBox.innerHTML = `
        <div id="classCard">
          <div class="dndClassTitleBox">
            <div class="dndClassTitleBoxTop">
              <div></div>
              <div><h2 class="className">${dndClass.name}</h2></div>
              <div><i class="fas fa-times" onclick="document.getElementById('dndClassesBox').style.display = 'flex';document.getElementById('dndClassBox').style.display = 'none';"></i></div>
            </div>
              <h3 class="subclassTitle">subclass: ${dndClass.subclasses[0].name}</h3>
          </div>
          <div class="classCardBody">
            <div class="classCardBodyLeft">
              <p><b>Proficiencies:</b> ${proficiencies}</p>
            </div>
            <div class="classCardBodyRight">
              <p>Hit Die: D${dndClass.hit_die}</p>
              <p>${spellCasting}</p>
            </div>
          </div>
        </div>
      `
    })
  }
}
