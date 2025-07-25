import { test } from '@playwright/test';
import { HomePage } from '../pages/Home/HomePage';
import { RegisterPage } from '../pages/RegisterAccount/RegisterPage';
import { createFakeUser } from '../helpers/fakeUserData';

const user = createFakeUser();

test('Register and Delete account via UI @newAccount', async ({ page }) => {
    const home = new HomePage(page);
    const register = new RegisterPage(page);
    await home.goToHome()
    await home.goToSignupLogin()
    await register.SignupInit(user.fullName, user.email)
    await register.FillAccountInformation(user.firstName, user.lastName, user.password, user.company, user.address, user.state, user.city, user.zipCode, user.phone)
    await register.ValidateUserLogged(user.fullName)
    await register.DeleteAccount()
});

