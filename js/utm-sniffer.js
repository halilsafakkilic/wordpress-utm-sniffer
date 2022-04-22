function getValFromQuery(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (pair[0] === variable) {
            return pair[1];
        }
    }

    return null;
}

function createCookie(name, value, day = 30) {
    let expires = '';
    if (day) {
        let date = new Date();
        date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    }

    document.cookie = name + '=' + value + expires + '; path=/; SameSite=Lax; Secure';
}

function readCookie(name) {
    name += '=';

    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }

    return null;
}

jQuery(document).ready(function () {
    let utmData;

    let gclid = getValFromQuery('gclid');
    if (gclid) {
        utmData = {
            gclid: gclid,
            source: getValFromQuery('utm_source'),
            medium: getValFromQuery('utm_medium'),
            campaign: getValFromQuery('utm_campaign'),
            term: getValFromQuery('utm_term'),
            content: getValFromQuery('utm_content'),

            page_url: window.location.href.split('?')[0],
            page_ref: null
        };

        if (document.referrer.indexOf(location.protocol + '//' + location.host) === 0) {
            utmData.page_ref = document.referrer;
        }

        createCookie('utm_sniffer', JSON.stringify(utmData));
    } else {
        utmData = readCookie('utm_sniffer');
        if (utmData) {
            utmData = JSON.parse(utmData);
        }
    }

    if (utmData) {
        Object.keys(utmData).forEach(function (key) {
            let field = jQuery('#utmi_' + key);
            if (!field.length) {
                return;
            }

            field.val(utmData[key]);
        });
    }
});