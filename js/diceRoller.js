function rollDice(dieName) {
    let numberOfDice = document.querySelector(`#${dieName}Number`).value;
    let modifierType = document.querySelector(`input[name="${dieName}+-Modifier"]:checked`).value;
    let modifierNumber = document.querySelector(`#${dieName}ModifierNumber`).value;
    let numberOfSides = dieName.substring(1);
    console.log(numberOfDice ,dieName, modifierType, modifierNumber, numberOfSides);

    if(numberOfDice <= 100 && numberOfDice >=1) {

        let count = 1;
        let result = 0;
        let diceHistoryBoxEl = document.createElement('div');
        diceHistoryBoxEl.classList.add('diceHistoryBoxEl');
        diceHistoryBoxEl.innerHTML += `<h4 class="diceHistoryHeader">${numberOfDice} ${dieName}</h4> <br>`;
        while (count <= numberOfDice) {
            let rolledPositiveNumber = 0;
            let rolledNegativeNumber = 0;
            switch (modifierType) {
                case '+':
                    rolledPositiveNumber = (Math.floor((Math.random() * numberOfSides) + 1));
                    let rollResultPlus = rolledPositiveNumber + Number(modifierNumber);
                    if (rollResultPlus < 1) {
                        rollResultPlus = 1;
                    }
                    result += rollResultPlus;
                    diceHistoryBoxEl.innerHTML += `<span><b>${count}.</b> ${rolledPositiveNumber} 
                                                    + ${modifierNumber} = ${rollResultPlus}</span>`;
                    break;
                case '-':
                    rolledNegativeNumber = (Math.floor((Math.random() * numberOfSides) + 1));
                    let rollResultMinus = rolledNegativeNumber - Number(modifierNumber);
                    if (rollResultMinus < 1) {
                        rollResultMinus = 1;
                    }
                    result += rollResultMinus;
                    diceHistoryBoxEl.innerHTML += `<span><b>${count}.</b> ${rolledNegativeNumber} 
                                                    - ${modifierNumber} = ${rollResultMinus}</span>`;
                    break;
            }
            if(dieName === 'd20'){
                if(rolledPositiveNumber === 20 || rolledNegativeNumber === 20){
                    toastr.success('You rolled a natural 20');
                }
                else if (rolledPositiveNumber === 1 || rolledNegativeNumber === 1) {
                    toastr.error('You rolled a natural 1');
                }
            }
            count++

        }
        diceHistoryBoxEl.innerHTML += `<hr>`;
        document.querySelector(`#${dieName}Result`).innerHTML = String(result);
        document.querySelector(`#diceHistoryResults`).appendChild(diceHistoryBoxEl);
    }
    else {
        toastr.info("Please select a number between 1 and 100");
    }
}

function clearDiceHistory() {
    let test = document.querySelector(`#diceHistoryResults`);
    document.querySelector(`#diceHistoryResults`).innerHTML = '';
}