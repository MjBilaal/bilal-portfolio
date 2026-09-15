/*
 * Efface les anciens cookies Google Analytics (_ga, _ga_XXXXXXXX) déposés avant le retrait
 * de GA4 et de Google Tag Manager (septembre 2026). Le site n'en dépose plus aucun.
 *
 * GA4 les écrit sur le domaine racine (.bilalmedj.com) : on les expire donc pour chaque
 * variante de domaine, sinon le navigateur ignore la suppression.
 *
 * À retirer après septembre 2028 : un cookie _ga vit au plus 2 ans après la dernière visite.
 */
(function () {
    "use strict";

    var host = window.location.hostname;
    var parts = host.split(".");
    var domains = ["", host, "." + host];

    if (parts.length > 2) {
        var root = parts.slice(-2).join(".");
        domains.push(root, "." + root);
    }

    document.cookie.split(";").forEach(function (cookie) {
        var name = cookie.split("=")[0].trim();
        if (!/^_ga(_|$)/.test(name)) {
            return;
        }
        domains.forEach(function (domain) {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (domain ? "; domain=" + domain : "");
        });
    });
})();
