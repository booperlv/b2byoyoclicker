document
    .getElementById('ContainerToggleKey')
    .addEventListener('click', function () {
        let checkbox = document.getElementById('ToggleKeyMode');
        checkbox.click();
        if (checkbox.checked) {
            this.style.backgroundColor = '#fed136';
        } else {
            this.style.backgroundColor = '#343a40';
        }
    });

document
    .getElementById('ContainerToggleVisibility')
    .addEventListener('click', function () {
        const displaychangeallelements = (displaynew) => {
            let allelements = document.querySelectorAll(
                '#ConfigureMenu > *:not(#BottomMenu)'
            );
            allelements.forEach((element) => {
                element.style.display = displaynew;
            });
        };

        let checkbox = document.getElementById('ToggleMenu');
        checkbox.click();
        if (checkbox.checked) {
            this.style.backgroundColor = '#fed136';
            displaychangeallelements('none');
        } else {
            this.style.backgroundColor = '#343a40';
            displaychangeallelements('flex');
        }
    });
