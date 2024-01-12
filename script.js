/** @format */

// select initial items
const signUpForm = document.getElementById("signup-form");
const inputsFieldSet = signUpForm.querySelector(".fieldset-wrapper");
const userDetailsInputs = signUpForm.querySelectorAll(".user-details-input");
const warningIcons = signUpForm.querySelectorAll(".error-alert-container i");
const hideMailIconBox = signUpForm.querySelector(".hide-mail-icon");

// add event listener for form submit
signUpForm.addEventListener("submit", handleFormSubmit);

// submit event handler
function handleFormSubmit(event) {
	// prevent form from submitting if invalid
	if (!signUpForm.checkValidity()) {
		event.preventDefault();
		// loop through all input elements and show error messages
		userDetailsInputs.forEach((input, index) => {
			if (!input.validity.valid) {
				showFormError(input);
				// center the warning icons and hidemailiconbox  vertically
				centerElementVertically(input, warningIcons[index]);
				centerElementVertically(input, hideMailIconBox);
				// add the input event to validate as user types
				input.addEventListener("input", (event) => {
					if (event.currentTarget.validity.valid) {
						removeFormError([event.currentTarget]);
					} else {
						showFormError(event.currentTarget);
						// center the warning icons and hidemailiconbox  vertically
						centerElementVertically(input, warningIcons[index]);
						centerElementVertically(input, hideMailIconBox);
					}
				});
			}
		});
	} else {
		removeFormError(userDetailsInputs);
	}
}

function showFormError(input) {
	// get the container to display the error
	const errorMessage =
		input.nextElementSibling.querySelector("span:first-child");
	// check cause of error
	if (input.validity.valueMissing) {
		// display appropriate error message for each error input
		switch (input.name) {
			case "firstname": {
				errorMessage.textContent = "First Name cannot be empty";
				break;
			}

			case "lastname": {
				errorMessage.textContent = "Last Name cannot be empty";
				break;
			}

			case "email": {
				input.setAttribute("placeholder", "email@example/com");
				break;
			}

			case "password": {
				errorMessage.textContent = "Password cannot be empty";
				break;
			}

			default:
				break;
		}
	} else if (input.validity.tooShort || input.validity.tooLong) {
		// display appropraite error message for each input element
		switch (input.name) {
			case "firstname": {
				errorMessage.textContent = `name should be ${input.minLength} - ${input.maxLength} characters long`;
				break;
			}

			case "lastname": {
				errorMessage.textContent = `name should be ${input.minLength} - ${input.maxLength} characters long`;
				break;
			}

			case "email": {
				input.setAttribute("placeholder", "email@example/com");
				errorMessage.textContent = `email address should be at least ${input.minLength} characters long`;
				break;
			}

			case "password": {
				errorMessage.textContent = `password should be at least ${input.minLength} characters long`;
				break;
			}

			default:
				break;
		}
	} else if (input.validity.typeMismatch && input.type === "email") {
		errorMessage.textContent = "Looks like this is not an email";
		input.setAttribute("placeholder", "email@example/com");
	} else if (input.validity.patternMismatch && input.type === "password") {
		errorMessage.textContent =
			"password must contain must contain a capital and a small letter, a number, and any special characters";
	}

	// add classes to display errors
	input.classList.add("required");
	errorMessage.parentElement.classList.add("active");
}

function removeFormError(inputList) {
	for (let i = 0; i < inputList.length; i++) {
		if (inputList[i].classList.contains("required")) {
			// remove error classes
			inputList[i].classList.remove("required");
			inputList[i].nextElementSibling.classList.remove("active");
		} else {
			continue;
		}
	}
}

/*dynamically center any element vertically with respect to the userDetailsInput element */

// functions
function centerElementVertically(inputElement, centerElement) {
	// get the border-box dimensions of the userDetailsInput
	// whereas they are all the same size, get the size of one
	const getElementDimensions = (element) => {
		const dimensions = element.getBoundingClientRect();
		return {
			width: dimensions.width,
			height: dimensions.height,
		};
	};

	const inputHeight = getElementDimensions(inputElement).height;
	const centerElementHeight = getElementDimensions(centerElement).height;

	const centeredPosition = (inputHeight - centerElementHeight) / 2;

	// set the position top to calculated value
	if (centerElement.classList.contains("ri-error-warning-fill")) {
		warningIcons.forEach((icon) => {
			icon.style.top = `${centeredPosition}px`;
		});
	} else {
		centerElement.style.top = `${centeredPosition}px`;
	}

	/* // add an observer to run the function again any the dimensions change
	const resizeDetector = new ResizeObserver(() => {
		let counter = 0;
		throttleFunction(
			centerElementVertically(
				userDetailsInputs[0],
				warningIcons[0],
				counter
			)
		);
		throttleFunction(
			centerElementVertically(
				userDetailsInputs[0],
				hideMailIconBox,
				counter
			)
		);
	});
	resizeDetector.observe(inputElement);
	resizeDetector.observe(centerElement); */
}

/* function throttleFunction(funcToDelay, counter) {
	console.log("throttling");
	// don't set a new timeout if there are two pending ones
	if (counter <= 2) {
		setTimeout(funcToDelay, 500);
	} else if (counter > 2) {
		counter = 2;
	}
} */

const mystring = "2a6C!!()";
const myRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
console.log(myRegex.test(mystring));
