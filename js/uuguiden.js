var uuguiden = function () {

    var debug = true;

    dmsg('uuguiden()');

    function dmsg(str) {
        if (debug) {
            console.log(str);
        }
    }

    var checkboxes = document.querySelectorAll('#filters input[type=checkbox]');

    var filter_main_customize_button = document.querySelector("#filter-main-customize");
    var filter_main_show_all_button = document.querySelector("#filter-main-show-all");
    var section_customize = document.querySelector("#customize");

    function filter_main_customize_button_action() {
        filter_main_customize_button.setAttribute("data-selected", "selected");
        filter_main_show_all_button.removeAttribute("data-selected");
        show_customize_section();
    }
    filter_main_customize_button.addEventListener('click', filter_main_customize_button_action, false);

    function filter_main_show_all_button_action() {
        filter_main_show_all_button.setAttribute("data-selected", "selected");
        filter_main_customize_button.removeAttribute("data-selected");
        hide_customize_section();
    }
    filter_main_show_all_button.addEventListener('click', filter_main_show_all_button_action, false);

    function show_customize_section() {
        section_customize.removeAttribute("hidden");
    }

    function hide_customize_section() {
        section_customize.setAttribute("hidden", "hidden");
    }


    function get_selected_topics() {
        var selected_topics = [];

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selected_topics.push(checkboxes[i].dataset.topic)
            }
        }
        return selected_topics;
    }

    // get_selected_topics();

    function add_checkbox_listeners() {

        function set_parent_checkbox_to_checked(idstr) {
            var parent_checkbox = document.querySelector("#" + idstr);
            if (parent_checkbox && parent_checkbox.tagName == "INPUT" && parent_checkbox.type == "checkbox") {
                parent_checkbox.checked = true;
            }
        }

        dmsg('add checkbox change listeners');

        function see_if_parent_checkbox_should_be_checked(e) {
            var target = e.target;
            dmsg(target.id);
            if (target.dataset.parent && target.checked) {
                dmsg('parent: ' + target.dataset.parent);
                set_parent_checkbox_to_checked(target.dataset.parent);
            } else {
                dmsg('no parent');
            }
        }

        function add_unselect_children_event_listener_to_checkbox_inputs_with_children(el) {
            dmsg("add_unselect_children_event_listener_to_checkbox_inputs_with_children(el). parent: " + el.id + ", children: " + el.dataset.children);
            if (el.tagName == "INPUT" && el.type == "checkbox" && el.dataset.children) {
                // is a input type = checkbox and has children dataset

                let child_ids = el.dataset.children.split(' ');

                dmsg("id: " + el.id + " children: " + el.dataset.children);

                var child_checkboxes = [];

                var current_el;

                for (let i = 0; i < child_ids.length; i++) {
                    dmsg("child_ids: " + child_ids);
                    current_el = document.getElementById(child_ids[i]);
                    if (current_el && current_el.tagName == "INPUT" && current_el.type == "checkbox") {
                        dmsg("child_checkboxes.push(current_el) :" + current_el.id);
                        child_checkboxes.push(current_el);
                    }
                }

                function unselect_children_on_change(e) {
                    var target = e.target;

                    if (!target.checked) {
                        for (let i = 0; i < child_checkboxes.length; i++) {
                            child_checkboxes[i].checked = false;
                        }
                    }
                }

                el.addEventListener('change', unselect_children_on_change, false);

                // if element is input type = checkbox and element has children dataset and children dataset is not empty
                // add an event listener for change - if after the change the checkbox is not checked, then set children to not checked as well.

            }
        }

        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('change', see_if_parent_checkbox_should_be_checked, false);
        }

        var parent_checkboxes = document.querySelectorAll("input[type=checkbox][data-children]");
        for (let i = 0; i < parent_checkboxes.length; i++) {
            add_unselect_children_event_listener_to_checkbox_inputs_with_children(parent_checkboxes[i]);
        }

    }

    // when checking a checkbox, also set parent checkbox to checked


    // when unchecking a checkbox, also uncheck it's children

    add_checkbox_listeners();


}



window.addEventListener('load', uuguiden, false);