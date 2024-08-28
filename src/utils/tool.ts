
const browser = typeof window != 'undefined'
/**
 * @description: 存放cookie
 * @param {string} name 名称
 * @param {content} content 内容
 */
export const setCookie = (name: string, content: any, expires?: number) => {
  const isString = typeof content === 'string';
  if (browser) {
    if (expires) {
      const expTimeStamp = new Date();
      expTimeStamp.setTime(expTimeStamp.getTime() + expires * 24 * 60 * 60 * 1000);
      window.document.cookie = `${name}=${isString ? encodeURIComponent(content) : encodeURIComponent(JSON.stringify(content))
        };path=/;expires=${expTimeStamp.toUTCString()}`;
    } else {
      window.document.cookie = `${name}=${isString ? encodeURIComponent(content) : encodeURIComponent(JSON.stringify(content))
        };path=/`;
    }
  }
};

/**
 * @description: 取出cookie
 * @param {string} name 名称
 * @return {*}
 */
export const getCookie = (name: string, noTansfrom?: boolean): any => {
  if (browser) {
    const cookies = window.document.cookie;
    if (cookies) {
      const arrCookies = cookies.split(';').map((each) => each.trim().split('='));
      const cookie = arrCookies.find(([key]) => key === name);
      if (!cookie) return;
      try {
        if (noTansfrom) return decodeURIComponent(cookie[1])
        return JSON.parse(decodeURIComponent(cookie[1]));
      } catch (error) {
        return decodeURIComponent(cookie[1]);
      }
    }
  }
};

/**
 * @description: 删除cookie
 * @param {string} name
 */
export const removeCookie = (name: string) => {
  if (browser) {
    const exp = new Date();
    exp.setMonth(exp.getMonth() - 1);
    const cval = getCookie(name);
    if (cval != null) return (document.cookie = `${name}=; expires=${exp.toUTCString()};path=/`);
  }
};

/**
 * @description: 清除所有cookie
 */
export const clearCookies = () => {
  if (browser) {
    // eslint-disable-next-line no-useless-escape
    const cookieKeys = window.document.cookie.match(/[^ =;]+(?=\=)/g);
    if (cookieKeys) {
      cookieKeys.forEach((cookie) => {
        removeCookie(cookie);
      });
    }
  }
};

export const setSessionStore = (name: string, content: any): void => {
  if (browser) {
    window.sessionStorage.setItem(name, JSON.stringify(content));
  }
};

export const getSessionStore = (name: string): any => {
  if (browser) {
    const val = window.sessionStorage.getItem(name);
    if (val) {
      try {
        return JSON.parse(val);
      } catch (error) {
        window.sessionStorage.removeItem(name);
        return undefined;
      }
    }
    return undefined;
  }
};

export const removeSessionStore = (name: string) => {
  if (browser && name) {
    window.sessionStorage.removeItem(name);
  }
};

export const clearSessionStore = () => {
  if (browser) {
    window.sessionStorage.clear();
  }
};

/**
 * @description: 设置localStorage
 * @param {string} name
 * @param {any} content
 * @return {void}
 */
export const setLocalStore = (name: string, content: any): void => {
  if (browser) {
    window.localStorage.setItem(name, JSON.stringify(content));
  }
};

/**
 * @description: 获取localStorage
 * @param {string} name
 * @return {any}
 */
export const getLocalStore = (name: string): any => {
  if (browser) {
    const val = window.localStorage.getItem(name);
    if (val) {
      try {
        return JSON.parse(val);
      } catch (error) {
        window.localStorage.removeItem(name);
        return undefined;
      }
    }
    return undefined;
  }
};

/**
 * @description: 删除localStorage
 * @param {string} name
 */
export const removeLocalStore = (name: string) => {
  if (browser && name) {
    window.localStorage.removeItem(name);
  }
};

/**
 * @description: 清除所有localStorage
 * @param {null}
 */
export const clearLocalStore = () => {
  if (browser) {
    window.localStorage.clear();
  }
};
