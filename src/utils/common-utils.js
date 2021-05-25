export const redirect = (string) => {
  window.location.href = string;
};

export const isEmpty = (input) => {
  if (input === null || input === undefined) {
    return true;
  }
  if (typeof input === "string" && input.trim() === "") {
    return true;
  }
  if (Array.isArray(input) && input.length === 0) {
    return true;
  }
  if (typeof input === "object" && Object.keys(input).length === 0) {
    return true;
  }
  return false;
};

export const isName = (name) => {
  const regex = new RegExp(/^[a-zA-Z ]{3,50}$/);
  return regex.test(name);
};

export const isEmail = (email) => {
  const regex = new RegExp(/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,4})+$/);
  return regex.test(email);
};

export const isUrl = (string) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    string
  );
};

export const isFloat = (val) => {
  var floatRegex = /^-?\d+(?:[.]\d*?)?$/;
  if (!floatRegex.test(val)) return false;

  val = parseFloat(val);
  if (isNaN(val)) return false;
  return true;
};

export const isInt = (val) => {
  var intRegex = /^-?\d+$/;
  if (!intRegex.test(val)) return false;

  var intVal = parseInt(val, 10);
  return parseFloat(val) == intVal && !isNaN(intVal);
};

export const copyIntoClipboard = (string) => {
  const el = document.createElement("textarea");
  el.value = string;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const numberWithCommas = (number) => {
  return roundNumber(number)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const roundNumber = (number) => {
  return parseFloat(number).toFixed(2);
};

export const removeAllCookies = () => {
  return document.cookie.split(";").reduce(function (acc, cookie) {
    const eqPos = cookie.indexOf("=");
    const cleanCookie = `${cookie.substr(
      0,
      eqPos
    )}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    return `${acc}${cleanCookie}`;
  }, "");
};

export const stringToPascal = (word) => {
  return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
};
