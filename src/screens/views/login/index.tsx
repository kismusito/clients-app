import Lottie from "lottie-react";

import { LoginForm } from "src/screens/forms/login";
import { LoginContainer } from "src/screens/styled/login/login-container";
import { LoginFormContainer } from "src/screens/styled/login/login-form-container";
import { LoginIllustrationContainer } from "src/screens/styled/login/login-illustration-container";

import mobilePaymentIllustration from "src/assets/illustrations/mobile-payment.json";

export const Login = (): JSX.Element => {
  return (
    <LoginContainer>
      <LoginFormContainer>
        <LoginForm />
      </LoginFormContainer>
      <LoginIllustrationContainer>
        <Lottie
          animationData={mobilePaymentIllustration}
          loop
          style={{ width: 600 }}
        />
      </LoginIllustrationContainer>
    </LoginContainer>
  );
};
