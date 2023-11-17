function waitForElm(selector) {
	const elm = document
		.querySelector(
			'body > div.reset.ng-scope:nth-child(3) > div.ng-scope:nth-child(4) > #container:nth-child(1)'
		)
		?.contentDocument?.querySelector(selector);

	// if elm is not found wait 150 ms and try again
	if (!elm) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(waitForElm(selector));
			}, 150);
		});
	} else {
		return elm;
	}
}

const script = () => {
	const deptQuery =
		'#single_content > form > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(3) > select';
	waitForElm(deptQuery).then((elm) => {
		if (localStorage.getItem('selectedDept')) {
			elm.value = localStorage.getItem('selectedDept');
		}
		elm.addEventListener('change', function (e) {
			localStorage.setItem('selectedDept', e.target.value);
		});
		return;
	});

	const semesterQuery =
		'#single_content > form > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(3) > select';

	waitForElm(semesterQuery).then((elm) => {
		if (localStorage.getItem('selectedSemester')) {
			elm.value = localStorage.getItem('selectedSemester');
		}
		elm.addEventListener('change', function (e) {
			localStorage.setItem('selectedSemester', e.target.value);
		});
		return;
	});

	const submitButtonQuery =
		'#single_content > form > table:nth-child(6) > tbody > tr > td > input[type=submit]';
	waitForElm(submitButtonQuery).then((submitButtonElm) => {
		submitButtonElm.addEventListener('click', async function (e) {
			backButtonQuery =
				'#single_content > form > table:nth-child(4) > tbody > tr > td:nth-child(4) > input[type=submit]';
			backButtonElement = waitForElm(backButtonQuery).then(() => {
				script();
			});
		});
	});
};

script();
