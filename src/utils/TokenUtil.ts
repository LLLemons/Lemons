import Cookies from 'js-cookie';
import psl, { ParsedDomain } from 'psl';

/**
 * @name getToken
 */
export function getToken() {
  return Cookies.get('jhi-authenticationToken');
}
/**
 * @name refreshToken
 */
export function getRefreshToken() {
  return Cookies.get('refreshToken');
}
/**
 *
 * @param {string} token
 * @param {string} refreshToken
 */
export function setToken(token: string, refreshToken?: string) {
  // 获取域名
  const parsed = psl.parse(document.domain) as ParsedDomain;
  // 判断是否是合法域名ParsedDomain
  if (parsed.listed) {
    Cookies.set('jhi-authenticationToken', token, {
      domain: `.${parsed.domain}`,
    });
    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken, {
        domain: `.${parsed.domain}`,
      });
    }
  } else {
    Cookies.set('jhi-authenticationToken', token);
    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken);
    }
  }
}
/**
 * @name clear token
 */
export function clearToken() {
  // 获取域名
  const parsed = psl.parse(document.domain) as ParsedDomain;
  // 判断是否是合法域名
  if (parsed.listed) {
    Cookies.remove('jhi-authenticationToken', {
      domain: `.${parsed.domain}`,
    });
    Cookies.remove('refreshToken', { domain: `.${parsed.domain}` });
  }
  Cookies.remove('jhi-authenticationToken');
  Cookies.remove('refreshToken');
}

Object.defineProperties(window, {
  setToken: {
    value: setToken,

  },
  getToken: {
    value: getToken
  },

  getRefreshToken: {
    value: getRefreshToken
  },
  clearToken: {
    value: clearToken
  }
});
