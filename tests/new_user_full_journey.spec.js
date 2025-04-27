import { test } from "@playwright/test"
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page-objects/ProductsPage"
import { Navigation } from "../page-objects/Navigation"
import { Checkout} from "../page-objects/Checkout"
import { LoginPage } from "../page-objects/LoginPage"
import { RegisterPage } from "../page-objects/RegisterPage"
import { DeliveryDetails } from "../page-objects/DeliveryDetails";
import { deliveryDetails as userAddress } from "../data/deliveryDetails";
import { PaymentPage } from "../page-objects/PaymentPage.js";
import { paymentDetails } from "../data/paymentDetails.js";

test ("New user full end-to-end test journey", async ({ page }) => {
    //productPage.visit()
    //productsPage.visit()
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.sortByCheapest()

    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)
    const navigation = new Navigation (page)
    await navigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const login = new LoginPage(page)
    await login.moveToSignup()

    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.completePayment()
})


// numbers start with 0 which is why 0 is used for 1 that is displayed to user