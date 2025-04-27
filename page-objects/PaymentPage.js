import { expect } from "@playwright/test";
import { timeout } from "../playwright.config";
import { paymentDetails } from "../data/paymentDetails";

export class PaymentPage {
  constructor (page){
    this.page = page

    this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator ('[data-qa="discount-code"]')

   this.discountInput= page.getByRole('textbox', { name: 'Discount code' })
   this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
   this.totalValue = page.locator('[data-qa="total-value"]')
   this.discountActivateMessage = page.locator('[data-qa="discount-active-message"]')
   this.discountValue = page.locator('[data-qa="total-with-discount-value"]')
   this.creditCardOwnerField = page.getByRole('textbox', { name: 'Credit card owner' })
   this.creditCardNumberField = page.getByRole('textbox', { name: 'Credit card number' })
   this.validUntilField = page.getByRole('textbox', { name: 'Valid until' })
   this.cvcField = page.getByRole('textbox', { name: 'Credit card CVC' })
   this.payButton = page.locator ('[data-qa="pay-button"]')



  }

  activateDiscount = async() =>{
    await this.discountCode.waitFor()
    const code = await this.discountCode.innerText()
    await this.discountInput.waitFor()
    await this.discountInput.fill(code)
    // need to fill out the discount input
    // wait to see that the input contains the value which was entered

    await expect(this.discountInput).toHaveValue(code)
    await this.activateDiscountButton.waitFor()

   // optional: check that "Discount activated" is not showing before clicking

    await expect(this.discountActivateMessage).toBeHidden()
    await expect(this.discountValue).toBeHidden()
     // Get total value BEFORE discount
     await this.totalValue.waitFor();

    const totalBeforeText = await this.totalValue.innerText();
    const totalBefore = parseFloat(totalBeforeText.replace(/[^\d.]/g, ''));
    await this.activateDiscountButton.click()

    // check that it displays "Discount activated"
    await this.discountActivateMessage.waitFor()
    expect(await this.discountActivateMessage).toHaveText("Discount activated!")

    // Check that there is now a discounted price total showing

    await this.discountValue.waitFor()
    expect(await this.discountValue).toBeVisible()
    const totalAfter = parseFloat((await this.discountValue.innerText()).replace(/[^\d.]/g, ''))
    expect(totalAfter).toBeLessThan(totalBefore);

    //fill in payment Details
    // check that the discounted price total is smaller than the regular price



    /* Option 2 for slow typing

    await this.discountInput.focus()
    await this.page.keyboard.type(code, {delay: 1000}) 
    // please use a delay between keystrokes defined by 1000

    expect(await this.discountInput.inputValue()).toBe(code)
    */
  }

  fillPaymentDetails = async(paymentDetails) =>{
  await this.creditCardOwnerField.waitFor()
  await this.creditCardOwnerField.fill(paymentDetails.Owner)
  await this.creditCardNumberField.fill(paymentDetails.Number)
  await this.validUntilField.fill(paymentDetails.validUntil)
  await this.cvcField.fill(paymentDetails.cvc)
  await this.cvcField.fill (paymentDetails.cvc)

  }

  completePayment = async () =>{
    await this.payButton.waitFor()
    await this.payButton.click()
    await this.page.waitForURL(/\/thank-you/, { timeout: 3000})
  }


}