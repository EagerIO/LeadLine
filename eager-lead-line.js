(function(){
  if (!document.body.addEventListener || !document.body.setAttribute || !document.body.querySelector || !document.body.classList || !document.body.classList.add || !window.localStorage) {
    return
  }

  var options, optionsString, colorStyle, htmlStyle, el, lastElHeight, show, hide, setHTMLStyle;

  options = INSTALL_OPTIONS;

  optionsString = JSON.stringify(options);
  if (localStorage[optionsString]) {
    return;
  }

  document.documentElement.setAttribute('eager-lead-line-goal', options.goal);

  colorStyle = document.createElement('style');
  colorStyle.innerHTML = '' +
    '.eager-lead-line {' +
      'background: ' + options.color + ' !important' +
    '}' +
    '.eager-lead-line .eager-lead-line-button {' +
      'color: ' + options.color + ' !important' +
    '}' +
  '';
  document.body.appendChild(colorStyle);

  el = document.createElement('eager-lead-line');
  el.className = 'eager-lead-line';
  el.innerHTML = '' +
    '<div class="eager-lead-line-close-button"></div>' +
    '<div class="eager-lead-line-content">' +
      '<div class="eager-lead-line-text"></div>' +
      (options.goal === 'announcement' ? '' :
      '<' + (options.goal === 'signup' ? 'form' : 'div') + ' class="eager-lead-line-form">' +
        (options.goal !== 'signup' ? '' :
        '<input name="email" class="eager-lead-line-input" type="email" placeholder="Email address" spellcheck="false" required>') +
        (options.goal === 'cta' ?
        '<a target="_blank" class="eager-lead-line-link">' : '') +
          '<button ' + (options.goal === 'signup' ? 'type="submit" ' : '') + 'class="eager-lead-line-button"></button>' +
        (options.goal === 'cta' ?
        '</a>' : '') +
      '</' + (options.goal === 'signup' ? 'form' : 'div') + '>') +
    '</div>' +
    '<div class="eager-lead-line-branding">' +
      '<a class="eager-lead-line-branding-link" href="https://eager.io?utm_source=eager_leads_powered_by_link" target="_blank">Powered by Eager</a>' +
    '</div>' +
  '';
  el.querySelector('.eager-lead-line-text').appendChild(document.createTextNode(options[options.goal + 'Text']));
  if (options.goal !== 'announcement') {
    el.querySelector('.eager-lead-line-button').appendChild(document.createTextNode(options[options.goal + 'ButtonText'] || '&nbsp;'));
  }
  if (options.goal == 'cta') {
    el.querySelector('.eager-lead-line-link').setAttribute('href', options.ctaLinkAddress);
  }
  document.body.appendChild(el);

  show = function() {
    var input;

    document.documentElement.setAttribute('eager-lead-line-show', 'true');

    input = el.querySelector('input.eager-lead-line-input');
    if (input) {
      input.focus();
    }
  };
  show();

  hide = function() {
    localStorage[optionsString] = true;
    document.documentElement.setAttribute('eager-lead-line-show', 'false');
    document.body.removeChild(htmlStyle);
  };
  el.querySelector('.eager-lead-line-close-button').addEventListener('click', hide);
  if (options.goal == 'cta') {
    el.querySelector('.eager-lead-line-link').addEventListener('click', hide);
  }

  htmlStyle = document.createElement('style');
  lastElHeight = 0;
  setHTMLStyle = function() {
    var elHeight = el.clientHeight;
    if (lastElHeight !== elHeight) {
      htmlStyle.innerHTML = '' +
        'html {' +
          '-webkit-transform: translate3d(0, ' + elHeight + 'px, 0) !important;' +
          'transform: translate3d(0, ' + elHeight + 'px, 0) !important' +
        '}' +
      '';
    }
    lastElHeight = elHeight;
  };
  setHTMLStyle();
  document.body.appendChild(htmlStyle);
  window.addEventListener('resize', setHTMLStyle);

  // iOS :hover CSS hack
  el.addEventListener('touchstart', function(){}, false);
})();
