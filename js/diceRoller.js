function rollDice(dieName) {
    let numberOfDice = document.querySelector(`#${dieName}Number`).value;
    let modifierType = document.querySelector(`input[name="${dieName}+-Modifier"]:checked`).value;
    let modifierNumber = document.querySelector(`#${dieName}ModifierNumber`).value;
    let numberOfSides = dieName.substring(1);
    console.log(numberOfDice ,dieName, modifierType, modifierNumber, numberOfSides);

    if(numberOfDice <= 100 && numberOfDice >=1) {

        let count = 1;
        let result = 0;
        while (count <= numberOfDice) {
            console.log(count);

            switch (modifierType) {
                case '+':
                    let rollResultPlus = (Math.floor((Math.random() * numberOfSides) + 1)) + Number(modifierNumber);
                    if (rollResultPlus < 1) {
                        rollResultPlus = 1;
                    }
                    result += rollResultPlus;
                    break;
                case '-':
                    let rollResultMinus = (Math.floor((Math.random() * numberOfSides) + 1)) - Number(modifierNumber);
                    if (rollResultMinus < 1) {
                        rollResultMinus = 1;
                    }
                    result += rollResultMinus;
                    break;
            }
            count++;

        }
        document.querySelector(`#${dieName}Result`).innerHTML = String(result);
    }
    else {
        toastr.info("Please select a number between 1 and 100");
    }
}