import { dndGetRequest } from "./dndGetRequest.js"

dndGetRequest('spells/', false)
  .then((spells) => {
    spells.results.forEach((spell) => {
      dndGetRequest(spell.url, true)
        .then((spellInfo) => {
          let spellClassses = []
          spellInfo.classes.forEach((className) => {
            spellClassses.push(className.name);
          })
          let spellEl = document.createElement('p');
          spellClassses.forEach((addedClass) => {
            spellEl.classList.add(addedClass);
          });
          spellEl.classList.add('spellEl');
          spellEl.innerHTML = spellInfo.name;
          spellEl.addEventListener('click', showSpell(spellInfo))
          document.getElementById('spellList').appendChild(spellEl);
        })
    })
  });

function showSpell(spell) {
  return () => {
    dndGetRequest(spell.school.url, true)
      .then((school) => {
        let atHigherLevel = '';
        if (spell.higher_level) {
          atHigherLevel = `<p><b>At Higher Level:</b> ${spell.higher_level}</p>`;
        }

        let materials = '';
        if (spell.material) {
          materials = ` <p><b>Material:</b> ${spell.material}</p>`;
        }

        let spellClasses = '';
        spell.classes.forEach((dndClass) => {
          spellClasses += `<p>${dndClass.name}</p>`
        });

        const spellModal = new tingle.modal({
          footer: true,
          stickyFooter: false,
          closeMethods: ['overlay', 'button', 'escape'],
          closeLabel: "Close",
          cssClass: ['modalTextAlignLeft'],
          onOpen: function () {
          },
          onClose: function () {
          },
          beforeClose: function () {
            return true; // close the modal
          }
        });
        spellModal.setContent(`
      <h2 class="spellModalTitle">${spell.name}</h2>
      <p>${spell.desc[0]}</p>
      ${atHigherLevel}
      
      <h3 class="spellModalTitle sectionHeader">Spell Info</h3>
      <div id="spellInfo">
        <p><b>Range:</b> ${spell.range}</p>
        ${materials}
        <p><b>Ritual:</b> ${spell.ritual}</p>
        <p><b>Concentration:</b> ${spell.concentration}</p>
        <p><b>Casting Time:</b> ${spell.casting_time}</p>
        <p><b>Duration:</b> ${spell.duration}</p>
        <p><b>Level:</b> ${spell.level}</p>
      </div>

      <h3 class="spellModalTitle sectionHeader">School: ${spell.school.name}</h3>
      <p>${school.desc}</p>

      <h3 class="spellModalTitle sectionHeader">Classes That Can Use This Spell</h3>
      <div id="spellClasses">
        <p>${spellClasses}</p>
      </div>
      `);
        spellModal.open();

      })
  };
}
