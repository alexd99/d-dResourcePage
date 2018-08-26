import {dndGetRequest} from "./dndGetRequest.js"

dndGetRequest('spells/', false)
.then((spells) =>{
  spells.results.forEach((spell) => {
    dndGetRequest(spell.url, true)
    .then((spellInfo) =>{
      let spellClassses = []
      spellInfo.classes.forEach((className) => {
        spellClassses.push(className.name);
      })
      let spellEl = document.createElement('p');
      spellClassses.forEach((addedClass) =>{
        spellEl.classList.add(addedClass);
      });
      spellEl.classList.add('spellEl');
      spellEl.innerHTML = spellInfo.name;
      spellEl.addEventListener('click',showSpell(spellInfo) )
      document.getElementById('spellList').appendChild(spellEl);
    })
  })
});

function showSpell(spell){
  return () =>{
    const spellModal = new tingle.modal({
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
    spellModal.setContent(`
      <h2 class="spellModalTitle">${spell.name}</h2>
      <p>${spell.desc[0]}</p>
      `);
    spellModal.open();
  };
}
