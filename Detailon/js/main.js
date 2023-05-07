const signup = document.querySelector(".btn");
const form = document.querySelector(".modal");
const showNotification = () => {
  form.classList.add("open");
};
const saveData = () => {
    const err = document.querySelector(".error");
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;
    var confirm = document.getElementById("confirm").value;
    const userData = JSON.parse(localStorage.getItem("users"));
    var user = [];
    user = userData ? userData : [];
    const checkEmail = user.find((el) => el.email === email);
    const checkUsername = user.find((el) => el.name === name);
    if (name == "" || email == "" || psw == "" || confirm == "") {
        err.innerHTML = "Vui lòng nhập hết tất cả các trường";
        return false;
    }
    if (checkEmail || checkUsername) {
        err.innerHTML = "Tên đăng nhập hoặc email đã tồn tại";
    } else {
        user.push({
            name: name,
            email: email,
            password: psw,
            confirm: confirm,
        });
        localStorage.setItem("users", JSON.stringify(user));
        document.getElementById("form-signUp").reset();
        signup.addEventListener("click", showNotification());
        setTimeout(() => {
            window.location.href = "signin.html";
        }, 2000);
    }
};

//contructor Validator
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};
    //validate
    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = getParent(
            inputElement,
            options.formGroupSelector
        ).querySelector(options.errorSelector);
        //get rule of selector
        var rules = selectorRules[rule.selector];
        //loop rule and check
        // if error stop
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case "radio":
                case "checkbox":
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ":checked")
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add(
                "invalid"
            );
        } else {
            errorElement.innerText = " ";
            getParent(inputElement, options.formGroupSelector).classList.remove(
                "invalid"
            );
        }

        return !errorMessage;
    }
    // get element of form validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;

            //loop rules and validate
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                if (typeof options.onSubmit === "function") {
                    var enableInput = formElement.querySelectorAll("[name]");
                    var formValues = Array.from(enableInput).reduce(function(
                        values,
                        input
                    ) {
                        switch (input.type) {
                            case "radio":
                                values[input.name] = formElement.querySelector(
                                    'input[name="' + input.name + '"]:checked'
                                ).value;
                                break;
                            case "checkbox":
                                if (input.matches(":checked")) {
                                    if (!Array.isArray(values[input.name])) {
                                        values[input.name] = [];
                                    }
                                    values[input.name].push(input.value);
                                } else if (!values[input.name]) {
                                    values[input.name] = "";
                                }
                                break;
                            case "file":
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});
                    options.onSubmit(formValues);
                } else {
                    formElement.submit();
                }
            }
        };
        options.rules.forEach(function(rule) {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function(inputElement) {
                //blur out tag input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                };

                // user input
                inputElement.oninput = function() {
                    var errorElement = getParent(
                        inputElement,
                        options.formGroupSelector
                    ).querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    getParent(inputElement, options.formGroupSelector).classList.remove(
                        "invalid"
                    );
                };
            });
        });
    }
}


