const keys = {
  37: 1, 38: 1, 39: 1, 40: 1,
};

const iDevices = [
  'iPad Simulator',
  'iPhone Simulator',
  'iPod Simulator',
  'iPad',
  'iPhone',
  'iPod',
];
const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
const { platform } = window.navigator;

export const isIPAD = /iPad/i.test(userAgent) || /iPhone OS 3_1_2/i.test(userAgent) || /iPhone OS 3_2_2/i.test(userAgent);

export const isIOS = !iDevices.indexOf(platform);

export const isIE = userAgent.indexOf('Edge/') > 0 || userAgent.indexOf('Trident/') > 0 || userAgent.indexOf('MSIE ') > 0;

export const isOperaMini = (userAgent.indexOf('Opera Mini') > -1) || Object.prototype.toString.call(window.operamini) === '[object OperaMini]';

export function isMobile() {
  let check = false;
  ((a) => {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) check = true;
  })(userAgent);
  return check || isIPAD;
}

export function getBrowserInfo() {
  const ua = navigator.userAgent; let tem;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE ', version: (tem[1] || '') };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/);
    if (tem != null) {
      return { name: 'Opera', version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  tem = ua.match(/version\/(\d+)/i);
  if (tem != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1],
  };
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomFromArray(array) {
  return array[getRandomInt(0, array.length - 1)];
}

export function getBodyScrollTop() {
  return (
    window.pageYOffset
    || (document.documentElement && document.documentElement.scrollTop)
    || (document.body && document.body.scrollTop)
  );
}

export function declension(num, expressions) {
  let result;
  let count = num % 100;
  if (count >= 5 && count <= 20) {
    result = expressions['2'];
  } else {
    count %= 10;
    if (count === 1) {
      result = expressions['0'];
    } else if (count >= 2 && count <= 4) {
      result = expressions['1'];
    } else {
      result = expressions['2'];
    }
  }
  return result;
}

export function ga() {
  const analitics = {
    send(category, action, label, id) {
      if (typeof ga !== 'undefined') {
        if (typeof label !== 'undefined' && label !== '') {
          if (id) ga('send', 'event', category, action, label, id);
          else ga('send', 'event', category, action, label);
        } else {
          ga('send', 'event', category, action);
        }
      }
    },
  };
  return analitics;
}

export function share(network, link, callback) {
  function sharePopup(url, width = 400, height = 400, _callback) {
    const shareWindow = window.open(url, '_blank', `height=${height},width=${width},menubar=no,toolbar=no,location=no`);
    const watchTimer = setInterval(() => {
      if (shareWindow.closed) {
        clearInterval(watchTimer);
        if (typeof _callback !== 'undefined') {
          _callback();
        }
      }
    }, 200);
  }

  switch (network) {
    case 'vk':
      sharePopup(`https://vk.com/share.php?url=${link}`, 550, 300, callback);
      break;
    case 'fb':
      sharePopup(`https://www.facebook.com/sharer/sharer.php?u=${link}`, 550, 300, callback);
      break;
    case 'tw':
      sharePopup(`https://twitter.com/intent/tweet?original_referer=${link}&tw_p=tweetbutton&url=${link}`, 550, 300, callback);
      break;
    case 'ok':
      sharePopup(`https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st._aid=ExternalShareWidget_SharePreview&st.shareUrl=${link}`, 550, 300, callback);
      break;
    case 'tg':
      sharePopup(`https://telegram.me/share/url?url=${link}`, 550, 300, callback);
      break;
    default:
      break;
  }
}

export function isScrolledIntoView(el) {
  const elemTop = el.getBoundingClientRect().top;
  const elemBottom = el.getBoundingClientRect().bottom;
  const elHeight = elemBottom - elemTop;
  // return (elemTop >= -window.innerHeight/2)
  // && (elemTop <= window.innerHeight/2)
  // && (elemBottom >= window.innerHeight/2)
  // && (elemBottom <= 3*window.innerHeight/2);
  return elemBottom <= elHeight;
}

export function dLayer(data) {
  if ('dataLayer' in window) {
    window.dataLayer.push(data);
  }
}

export function getOS() {
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

export const isMAC = getOS() === 'Mac OS';

/**
 * @param {function} func - function
 * @param {number} wait - wait time in millisecond
 * @param {boolean} immediate - run immediately
 */
export function debounce(func, wait, immediate) {
  let timeout;

  return (...args) => {
    const context = this;

    const later = () => {
      timeout = null;

      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export function socialAuthorization(network, callback) {
  let url = '';
  switch (network) {
    case 'vk':
      url = '/auth/social/vkontakte';
      break;
    case 'fb':
      url = '/auth/social/facebook';
      break;
    case 'ok':
      url = '/auth/social/odnoklassniki';
      break;
    default:
      url = '';
  }
  const loginWindow = window.open(url, '_blank',
    `height=${500},width=${500}`);
  const watchTimer = setInterval(() => {
    try {
      if (loginWindow.closed) {
        clearInterval(watchTimer);
        callback();
      }
    } catch (e) {
      // callback();
    }
  }, 200);
}

export function getLang() {
  const lang = localStorage.getItem('DEVELUP_LANG');
  let browserLang = (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage;
  browserLang = browserLang.indexOf('ru') >= 0 ? 'ru' : 'en';
  return lang || browserLang;
}

export function blobToFile(blob, fileName) {
  if (!this.isIE()) {
    return new File([blob], fileName, { type: blob.type, lastModified: Date.now() });
  }
  const localBlob = blob;
  localBlob.lastModifiedDate = new Date();
  localBlob.name = fileName;
  return localBlob;
}

export function preventDefault(e) {
  const event = e || window.event;
  if (event.preventDefault) event.preventDefault();
  event.returnValue = false;
}

export function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    this.preventDefault(e);
  }
  return !keys[e.keyCode];
}

export function disableScroll() {
  if (window.addEventListener) { // older FF
    window.addEventListener('DOMMouseScroll', this.preventDefault,
      false);
  }
  window.onwheel = this.preventDefault; // modern standard
  document.onmousewheel = this.preventDefault; // older browsers, IE
  window.onmousewheel = this.preventDefault; // older browsers, IE
  window.ontouchmove = this.preventDefault; // mobile
  document.onkeydown = this.preventDefaultForScrollKeys;
}

export function enableScroll() {
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', this.preventDefault,
      false);
  }
  document.onmousewheel = null;
  window.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}

export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}
