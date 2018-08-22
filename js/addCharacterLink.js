// get the CharacterLinkArray from local storage
function getCharacterLinkArray() {
    let characterLinkArray = [];
    let storedCharacterLinkArray = JSON.parse(localStorage.getItem('characterLinks'));

    if(storedCharacterLinkArray){
        characterLinkArray = storedCharacterLinkArray;
    }

    return characterLinkArray;
}

// adds the character imputed by the user to the characterLinkArray.
function addCharacterLink() {
    let characterLinkArray = getCharacterLinkArray();
    let linkBoxId = 0;

    if(characterLinkArray.length > 0){
        linkBoxId = localStorage.getItem('characterLinksID');
        linkBoxId ++;
    }
    else {
        linkBoxId = 0
    }
    localStorage.setItem('characterLinksID', linkBoxId);

    let linkName = document.getElementById('charterLinkName').value;
    let url = document.getElementById('charterLinkURL').value;

    characterLinkArray.push(
        {
        id: linkBoxId,
        linkName: linkName,
        url: url
        }
    );
    localStorage.setItem('characterLinks', JSON.stringify(characterLinkArray));
    displayLinks();
    document.getElementById('charterLinkName').value = '';
    document.getElementById('charterLinkURL').value = '';
}

// makes the links and other associated html elements from the CharacterLinkArray
function displayLinks() {
    let characterLinkArray = getCharacterLinkArray();
    document.querySelector('#characterLinksBox').innerHTML = '';
    characterLinkArray.forEach((link)=>{
        let characterLinkBox = document.createElement('div');
        characterLinkBox.classList.add('characterLinkBox');
        characterLinkBox.setAttribute('id', `linkBox${link.id}`);
        document.getElementById('characterLinksBox').appendChild(characterLinkBox);


        let charterLink = document.createElement('a');
        charterLink.innerText = link.linkName;
        charterLink.setAttribute('href', link.url);
        charterLink.setAttribute('target', '_blank');
        document.getElementById(`linkBox${link.id}`).appendChild(charterLink);

        let closeCharacterLink = document.createElement('i');
        closeCharacterLink.classList.add("fas");
        closeCharacterLink.classList.add("fa-times");
        closeCharacterLink.classList.add("characterLinkCloseIcon");
        closeCharacterLink.addEventListener('click', deleteCharacter(link.id));
        document.getElementById(`linkBox${link.id}`).appendChild(closeCharacterLink);
    });

    localStorage.setItem('characterLinks', JSON.stringify(characterLinkArray));
}

window.onload = displayLinks();

// deletes a charter form the CharacterLinkArray
function deleteCharacter(id){
    let characterLinkArray = getCharacterLinkArray();
    return()=>{
        let i = 0;
        characterLinkArray.forEach((link)=>{
            if(link.id === id){
                characterLinkArray.splice(i,1)
            }
            i++
        });
        localStorage.setItem('characterLinks', JSON.stringify(characterLinkArray));
        displayLinks();
    }

}
