import {dndGetRequest} from "./dndGetRequest.js"
import {classDescriptions} from "./classDescriptions.js"

dndGetRequest('classes/')
.then((dndClasses)=>{
    dndClasses.results.forEach((dndClass, index)=>{
      console.log(dndClass);
      console.log(index);
      let classDiv = document.createElement('div');
      classDiv.classList.add('classDiv');
      classDiv.innerHTML = `<h3>${dndClass.name}</h3><img src="./assets/images/dndClasses/${dndClass.name}.png" class="dndClassImage" {
        constructor() {

        }
      }><p>${classDescriptions[index].description}</p>`
      document.getElementById('dndClassesBox').appendChild(classDiv);
    })
});
