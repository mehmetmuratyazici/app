
export const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_iGhAmrGHX",
    cognito_domain: "https://us-east-1iGhAmrGHX.auth.us-east-1.amazoncognito.com",
    client_id: "vttgh3ahkve1e23k7rjf4cbjb",
    redirect_uri: "http://localhost:3000/dashboard",
    response_type: "code",
    scope: "email openid phone",
    post_logout_redirect_uri: window.location.origin + '/',
  };

export const isMaintenance = true;