import { isDesktopViewport } from "../utils/isDesktopViewport"

export class Navigation {
  

  constructor(page){
    this.page = page

    this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
    this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')

  }

  getBasketCount = async () =>{
    // return number
    await this.basketCounter.waitFor()
    const text = await this.basketCounter.innerText()
    return parseInt(text, 10)
  }
// true if desktop
// false if mobile > reverse false using !

    goToCheckout = async () =>{
      // if mobile viewport, then first open the burger menu
      if (!isDesktopViewport(this.page)) {
        await this.mobileBurgerButton.waitFor()
        await this.mobileBurgerButton.click()
      }
      //go to checkout page
      await this.checkoutLink.waitFor()
      //await expect(this.checkoutLink).toHaveText("Continue to Checkout")
      await this.checkoutLink.click()
      await this.page.waitForURL("/basket")
  
    }



}