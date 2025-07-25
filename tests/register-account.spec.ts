import { test } from '../pages/basePage'
import { createFakeUser } from '../helpers/fakeUserData';

const user = createFakeUser();

test('Register and Delete account via UI @newAccount', async ({ homePage, registerPage }) => {
    await homePage.goToHome()
    await homePage.goToSignupLogin()
    await registerPage.SignupInit(user.fullName, user.email)
    await registerPage.FillAccountInformation(user.firstName, user.lastName, user.password, user.company, user.address, user.state, user.city, user.zipCode, user.phone)
    await registerPage.ValidateUserLogged(user.fullName)
    await registerPage.DeleteAccount()
});

