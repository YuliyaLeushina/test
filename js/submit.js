"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const p1 = document.querySelector('#p1');
    const p2 = document.querySelector('#p2');
	const form = document.getElementById('form');
	const email = document.querySelector('._show-animate_six');
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
                formSent(form);
			} else {
				alert("Ошибка");
			}
		} 
        function formSent(form) {
            // Создаем событие отправки формы
            document.dispatchEvent(new CustomEvent("formSent", {
                detail: {
                    form: form
                }
            }));
            // Показываем попап, если подключен модуль попапов 
            // и для формы указана настройка
            setTimeout(() => {
                const messageForm = document.querySelector('.form__message');
                messageForm.classList.add('visable');
            }, 0);
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
				} else if(!emailTest(input)){
					email.classList.add('_show-victori');
				}
			} else if (input.classList.contains('_pass')){
                if(passwordTest(input)){
                    formAddError(input);
                    error++;
                }
            } else if(input.classList.contains('_two-pass')){
				if(p1.value !== p2.value){
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
        document.querySelector('.form__button').classList.add('_error-btn')
        if (input.dataset.error) {
			input.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${input.dataset.error}</div>`);
		};
		if  (input.dataset.pass) {
			input.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${input.dataset.pass}</div>`);
		}
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
		document.querySelector('.form__button').classList.remove('_error-btn');
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
