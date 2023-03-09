"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const p1 = document.querySelector('#p1').value;
    const p2 = document.querySelector('#p2').value;
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);
        let formData = new FormData(form);
		if (error === 0) {
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
			} else {
				alert("Ошибка");
			}
		} 

	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.classList.contains('_pass')){
                if(passwordTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(p1 === p2) {
                formAddError(input);
                error++;
            } 
            else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
        if (input.dataset.error) {
			input.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${input.dataset.error}</div>`);
		}
        if (input.dataset.pass) {
			input.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${input.dataset.pass}</div>`);
		}
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
        if (input.parentElement.querySelector('.form__error')) {
			input.parentElement.removeChild(input.parentElement.querySelector('.form__error'));
		}
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
    //Функция теста пароля
    function passwordTest(input){
        return !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(input.value);
    }

});
/*

*/
