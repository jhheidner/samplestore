
import { test } from "@playwright/test"
import {MyAccountPage} from "../page-objects/MyAccountPage"
import { getLoginToken } from "../api-calls/getLoginToken"
import { adminDetails } from "../data/userDetails"

test ("My Account using cookie injection and mocking network request", async ({page}) => {
  // Make a request to get login token
 const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)

 //Setup network request
  await page.route("**/api/user**", async (route, request) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify ({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
   })

  })

 const myAccount = new MyAccountPage(page)
 await myAccount.visit()
 await page.evaluate(([loginTokenInsideBrowserCode]) => {
    document.cookie = "token=" + loginTokenInsideBrowserCode}, [loginToken])
  await myAccount.visit()
  await myAccount.waitForPageHeading()
  await myAccount.waitForErrorMessage()
  
 })