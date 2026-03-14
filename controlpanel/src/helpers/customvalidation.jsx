const FormFieldValidations = {
    alphabetsWithSpace: {
        value: /^[a-zA-Z][a-zA-Z ]*$/,
        message: "Enter Alphabets with Space only"
    },
    specialCharRegex: {
        value: /^[a-zA-Z0-9 ]*$/,
        message: "Enter only alphabets and numbers"
    },
    firstName: {
        value: /^[a-zA-Z][a-zA-Z ]*$/,
        message: "Please enter valid first name"
    },
    lastName: {
        value: /^[a-zA-Z][a-zA-Z ]*$/,
        message: "Please enter valid last name"
    },
    alphabetsWithoutSpace: {
        value: /^[A-Za-z]+$/,
        message: "Enter Alphabets only"
    },
    contactNumber: {
        value: /^(\+\d{1,2}\s)?\(?\d{3,15}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        message: "Please enter valid phone number."
    },
    phoneMNumber: {
        value: /^(?:(?:\+1|1)[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/,
        message: "Enter valid phone number."
    },
    CompanyWebsite: {
        value: /^(https?:\/\/)?(www\.)?[^.]+\.[a-zA-Z]{2,}$/,
        message: "Enter Valid company Website"
    },
    mobileNumber: {
        value: /^[1-9]\d{9}$/,
        message: "Enter valid phone number."
    },
    fax: {
        value: /^\+?[0-9\s().-]+$/,
        message: "Enter Valid fax No."
    },
    emailAddress: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: "Enter Valid Email Address"
    },
    emailAddressWithoutSpecialChar: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Enter Valid Email Address"
    },
    Sequence: {
        value: /^[0-9]{5}$/,
        message: "Enter Valid Sequence"
    },
    zipcode: {
        value: /^[0-9]{5}$/,
        message: "Enter Valid Zip code"
    },
    password: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/,
        message: "Password must contain minimum 8 characters.(Minimum 1 UPPER case alphabet, 1 lower case alphabet and 1 special character.)"
    },
    address: {
        value: /^[ a-zA-Z0-9!@#$&()`.+,/"-]*$/,
        message: "Enter Alphabets, number, space & hypen only"
    },
    number: {
        value: /^\d+$/,
        message: "Enter only Numeric value"
    },
    alphaNumeric: {
        value: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
        message: "Enter only Alpha Numeric value"
    },
    mobileNumberA: {
        value: /^(?:\d{1,3}|\(\d{1,3}\))?(?:[-.\s]|\(\d{1,3}\)(?:[-.\s]))?\d{10,14}$/,
        message: "Please enter valid phone number."
    },
    flyerType: {
        value: /\S/,
        message: "Please select type option"
    },
    CompanyWebsiteNew: {
        value: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
        message: "Enter Valid company Website"
    },
    Subject: {
        value: /^[a-zA-Z0-9_-][a-zA-Z0-9_-]{1,50}$/,
        message: "Enter Valid Subject"
    },
    emailWithComma: {
        value: /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)+$/,
        message: "Enter Valid Email Address"
    }
};
export default FormFieldValidations;
