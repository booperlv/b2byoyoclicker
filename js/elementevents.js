document
    .getElementById('ContainerToggleKey')
    .addEventListener('click', function () {
        let checkbox = document.getElementById('ToggleKeyMode');
        checkbox.click();
        if (checkbox.checked) {
            this.style.backgroundColor = '#6c757d';
        } else {
            this.style.backgroundColor = '#343a40'; 
        }
    });
