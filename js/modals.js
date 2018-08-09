const characterLinkHelp = new tingle.modal({
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

characterLinkHelp.setContent(`<p>This tool allows you to save links to character sheets you have on other websites (like dnd beyond).
Simply put in the character's name and the URL the sheet is located at, then press the add button,
and you will have a link to your character. <br>
<b>*NOTE:</b> the URL must include the https:// or http://</p>`);

function openCharacterLinkHelp() {
    characterLinkHelp.open();
}
