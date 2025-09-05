/*
  This is a utility to dynamically change the favicon of the app to make it easier for developers
  to identify which environment they are viewing.
  LocalHost: Red
  Staging: Orange
  Production: Blue
*/

const hostname = window.location.hostname;
const localhostRegex = /localhost/;
const stagingRegex = /\w*\.staging\.amplitude\.com/;
const isLocalhost = localhostRegex.test(hostname);
const isStaging = stagingRegex.test(hostname);
let faviconExtString = '';
if (isLocalhost) {
  faviconExtString = '-dev';
} else if (isStaging) {
  faviconExtString = '-staging';
}
const favicons = document.querySelectorAll('link[rel="icon"]');
favicons.forEach((favicon) => {
  const faviconURL = favicon.href;
  const extension = faviconURL.split('.').pop();
  favicon.href = faviconURL.replace(
    `.${extension}`,
    `${faviconExtString}.${extension}`,
  );
});
