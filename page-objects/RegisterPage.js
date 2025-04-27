export class RegisterPage{
  constructor (page) {
    this.page = page

    this.emailInput = page.getByPlaceholder ('e-mail')
    this.passwordInput = page.getByPlaceholder ('Password')
    this.registerButton = page.getByRole('button', { name: 'Register' })

  }

  signUpAsNewUser = async(email, password) => {
    //type in email input
    await this.emailInput.waitFor()
    await this.emailInput.fill(email)
    // type in password
    await this.passwordInput.fill(password)
    // click register button
    await this.registerButton.waitFor()
    await this.registerButton.click()
  }

}