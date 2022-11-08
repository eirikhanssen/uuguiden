var uuguiden = function () {
  console.log('uuguiden()');
  var openRequestedDetails = function () {
    var location_hash = location.hash.split('?')[0];

    if (location_hash != undefined && location_hash != '') {
      var requested_details = document.querySelector('details' + location_hash);
      if (requested_details != null) {
        requested_details.setAttribute("open", "");
      }
    }
  }

  var openTargetDetails = function (e) {
    // check if link target is a target details on the same page.
    // set the open attribute if it is

    var anchor = e.target;
    var href = anchor.getAttribute("href");
    console.log('anchor-href: ' + href);

    document.querySelector(href).setAttribute('open', 'open');

  }

  var links = document.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', openTargetDetails, false);
  }

  function add_clicker_fn_to_selector(selector, fn) {
    let domnodes = document.querySelectorAll(selector);
    for (let i = 0; i < domnodes.length; i++) {
      domnodes[i].addEventListener('click', fn)
    }
  }

  function apply_filter_main_buttons(e) {
    target = e.target;
    document.body.setAttribute("data-filter-main", target.getAttribute("data-filter"));
    update_main_filtering();
  }
  add_clicker_fn_to_selector("#filter-main button", apply_filter_main_buttons);


  function apply_filter_main_radios() {
    document.body.setAttribute("data-filter-main", document.querySelector('input[name="customizer-main"]:checked').value);
    update_main_filtering();
  }
  add_clicker_fn_to_selector("#filter-main-radios button", apply_filter_main_radios);

  function hide_software_filter() {
    el = document.querySelector("#section-filter-by-software");
    el.hidden = true;
  }

  function show_software_filter() {
    el = document.querySelector("#section-filter-by-software");
    el.hidden = false;
  }

  function show_content_filter() {
    el = document.querySelector("#section-filter-by-content-type");
    el.hidden = false
  }

  function hide_content_filter() {
    el = document.querySelector("#section-filter-by-content-type");
    el.hidden = true;
  }

  function update_main_filtering() {
    let data_filter_main = document.body.dataset.filterMain;
    switch (data_filter_main) {
      case "show-all":
        hide_content_filter();
        hide_software_filter();
        break;
      case "by-content-type":
        hide_software_filter();  
        show_content_filter();
        break;
      case "by-software":
        hide_content_filter();  
        show_software_filter();
        break;
      default: 
        console.log("update_main_filtering(): this is unexpected!");
        console.log(data_filter_main);
        break;
    }
  }

  openRequestedDetails();

}

window.addEventListener('load', uuguiden, false);
