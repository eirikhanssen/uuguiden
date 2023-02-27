var uuguiden = function () {

    var debug = false;

    dmsg('uuguiden()');

    function dmsg(str) {
        if (debug) {
            console.log(str);
        }
    }

    var checkboxes = document.querySelectorAll('#filters input[type=checkbox]');

    var filter_main_customize_button = document.querySelector("#filter-main-customize");
    var filter_main_show_all_button = document.querySelector("#filter-main-show-all");
    var confirm_choices_button = document.getElementById("confirm-choices-button");
    
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

    // WIP
    function update_toc() {
        var nav = document.getElementById("guide-toc");
        var nav_list = document.createElement('ul');
        var active_topics = document.querySelectorAll("#topics article:not([hidden])");

        function create_nav_link_item(el){
            var link_item = document.createElement("li");
            var internal_link = document.createElement('a');
            internal_link.setAttribute("href", "#" + el.id);
            internal_link.innerHTML=el.querySelector('h3').innerHTML;
            link_item.appendChild(internal_link);
            return link_item;
        }

        for(let i=0; i<active_topics.length; i++) {
            nav_list.appendChild(create_nav_link_item(active_topics[i]));
        }
        nav.innerHTML="";
        nav.appendChild(nav_list);
    }

    // TODO/WIP - need checking!
    function initialize_filtering () {
        var all_topics = document.querySelectorAll("#topics > article");
        var all_specifics = document.querySelectorAll("[data-specific]");

        function get_selected_topics() {
            var selected_topics = [];
    
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    //selected_topics.push('topic-' + checkboxes[i].dataset.topic);
                    selected_topics.push(checkboxes[i].dataset.topic);
                }
            }
            dmsg("get_selected_topics()");
            dmsg(selected_topics);
            return selected_topics;
        }

        function show_all_topics() {
           
            document.body.classList.remove('filtered');

            // dmsg("show_all_topics()");

            for(let i=0; i<all_topics.length; i++) {
                all_topics[i].hidden=false;
            }

            for(let i=0; i<all_specifics.length; i++) {
                all_specifics[i].hidden=false;
            }

            update_toc();
        }
    
        function hide_all_topics() {
          // dmsg("hide_all_topics()");
            for(let i=0; i<all_topics.length; i++) {
                all_topics[i].hidden=true;
            }
        }

        function apply_filtering_to_topics_based_on_checked_status() {

         // dmsg("apply_filtering_to_topics_based_on_checked_status()");
            
            var selected_topics = get_selected_topics();

            if(selected_topics.length == 0) {
                show_all_topics();
                document.body.classList.remove('filtered');
                return
            } else {
                document.body.classList.add('filtered');
            }

            for(let i=0; i<all_topics.length; i++) {
                let id = all_topics[i].id;
                let topic = id.replace('topic-','');
                dmsg(" selected_topics: " + selected_topics + "\nid: " + id + " topic: " + topic);
                if(selected_topics.includes(topic)) {
                    all_topics[i].hidden=false;
                } else {
                    all_topics[i].hidden=true;
                }
            }

            // show or hide specific information depending on dataset.specific and selected topics

            for(let i=0; i<all_specifics.length; i++) {
                if(selected_topics.includes(all_specifics[i].dataset.specific)) {
                    all_specifics[i].hidden=false;
                } else {
                    all_specifics[i].hidden=true;
                }
            }
        }

        // add the event listener to the confirm button
        document.getElementById('filter-main-show-all').addEventListener("click",show_all_topics,false);
        document.querySelector("#confirm-choices-button").addEventListener("click", apply_filtering_to_topics_based_on_checked_status,false);
    }

        

    // get_selected_topics();

    function add_checkbox_listeners() {

        function set_parent_checkbox_to_checked(ID) {
            var parent_checkbox = document.getElementById(ID);
            if (parent_checkbox && parent_checkbox.tagName == "INPUT" && parent_checkbox.type == "checkbox") {
                parent_checkbox.checked = true;
            }
            // if the parent checkbox also has a parent value
            if (parent_checkbox.dataset.parent && (document.getElementById(parent_checkbox.dataset.parent).checked==false)) {
                set_parent_checkbox_to_checked(parent_checkbox.dataset.parent);
            }
        }

        // dmsg('add checkbox change listeners');

        function see_if_parent_checkbox_should_be_checked(e) {
            var target = e.target;
         //   dmsg(target.id);
            if (target.dataset.parent && target.checked) {
         //       dmsg('parent: ' + target.dataset.parent);
                set_parent_checkbox_to_checked(target.dataset.parent);
            } else {
         //       dmsg('no parent');
                return;
            }
        }

        function add_unselect_children_event_listener_to_checkbox_inputs_with_children(el) {
            // dmsg("add_unselect_children_event_listener_to_checkbox_inputs_with_children(el). parent: " + el.id + ", children: " + el.dataset.children);
            if (el.tagName == "INPUT" && el.type == "checkbox" && el.dataset.children) {
                // is a input type = checkbox and has children dataset

                let child_ids = el.dataset.children.split(' ');

                // dmsg("id: " + el.id + " children: " + el.dataset.children);

                var child_checkboxes = [];

                var current_el;

                for (let i = 0; i < child_ids.length; i++) {
                    // dmsg("child_ids: " + child_ids);
                    current_el = document.getElementById(child_ids[i]);
                    if (current_el && current_el.tagName == "INPUT" && current_el.type == "checkbox") {
                    // dmsg("child_checkboxes.push(current_el) :" + current_el.id);
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
    initialize_filtering();

    // refresh table of contents when confirming filtering
    confirm_choices_button.addEventListener('click',update_toc,false);
    
    // generate table of contents on page load
    update_toc();
}



window.addEventListener('load', uuguiden, false);