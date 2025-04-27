import { expect } from "@playwright/test";
import { timeout } from "../playwright.config";
export class DeliveryDetails {
  constructor (page){
    this.page = page

    this.firstName = page.getByRole('textbox', { name: 'First name' })
    this.lastName = page.getByRole('textbox', { name: 'Last name' })
    this.street = page.getByRole('textbox', { name: 'Street' })
    this.postCode = page.getByRole('textbox', { name: 'Post code' })
    this.city = page.getByRole('textbox', { name: 'City' })
    this.countryDropDown = page.locator('[data-qa="country-dropdown"]')
    this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
    this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
    this.savedAddressContainer = page.locator ('[data-qa="saved-address-container"]')
    this.savedAddressFirstName = page.locator ('[data-qa="saved-address-firstName"]')
    this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
    this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
    this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')

  }

  fillDetails = async (userAddress) => {

    await this.firstName.waitFor()
    await this.firstName.fill(userAddress.firstName)
    await this.lastName.fill(userAddress.lastName)
    await this.street.fill (userAddress.street)
    await this.postCode.fill (userAddress.postcode)
    await this.city.fill (userAddress.city)
    await this.countryDropDown.waitFor()
    await this.countryDropDown.selectOption(userAddress.country)

  }
  saveDetails = async () => {
    const addressCountBeforeSaving = await this.savedAddressContainer.count()
    await this.saveAddressButton.waitFor()
    await this.saveAddressButton.click()
    await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)
    
    await this.savedAddressFirstName.first().waitFor()
    expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstName.inputValue())

    await this.savedAddressLastName.first().waitFor()
    expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastName.inputValue())

    await this.savedAddressStreet.first().waitFor()
    expect(await this.savedAddressStreet.first().innerText()).toBe(await this.street.inputValue())

    await this.savedAddressCity.first().waitFor()
    expect(await this.savedAddressCity.first().innerText()).toBe(await this.city.inputValue())

    await this.savedAddressPostcode.first().waitFor()
    expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postCode.inputValue())

    await this.savedAddressCountry.first().waitFor()
    expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropDown.inputValue())
  }

  continueToPayment = async () => {
    await this.continueToPaymentButton.waitFor()
    await this.continueToPaymentButton.click()
    await this.page.waitForURL(/\/payment/, {timeout: 3000})
  }
   
}