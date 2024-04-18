export const setCookieValue = (name: string, value: string, expiresDate?: Date, samesite: boolean = false) => {
  document.cookie = `${name}=${value}; ${samesite ? 'samesite=lax;' : ''} ${expiresDate ? `expires=${expiresDate.toUTCString()}` : ''}`;
};

export const getCookieValue = (name: string) => {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find((value) => {
    const valueName = value.trim().split('=')[0];
    return valueName === name;
  });

  return cookie?.split('=')[1];
};

export const deleteCookieValue = (name: string) => {
  document.cookie = `${name}=; Max-Age=-1`;
};
