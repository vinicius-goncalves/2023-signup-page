function ValidationOption(regex, message) {
    this.regex = regex
    this.message = message
}

function Validation() {
    this.username = new ValidationOption(/.{3,}/, 'The username must be greater than three (3) characters.')
    this.email = new ValidationOption(/.+\@.+\..{1,3}/, 'The e-mail path has an invalid value.')
    this.password = new ValidationOption(/.{6,}/, 'The password must be greater than 5 (5) characters.')
}

export default Validation