var uuguiden = function () {

    var debug = true;

    dmsg('uuguiden()');

    function dmsg(str) {
        if (debug) {
            console.log(str);
        }
    }

    var filter_main_customize_button = document.querySelector("#filter-main-customize");
    var filter_main_show_all_button = document.querySelector("#filter-main-show-all");
    var filter_checkboxes = document.querySelectorAll("#customize input");
    var confirm_choices_buttons = document.querySelectorAll("button[id^=confirm-choices-button]");
    var reset_filters_buttons = document.querySelectorAll("button[id^=reset-filter-button]");
    var customizer = document.querySelector("#customize");
    var skiplink = document.querySelector("#skiplink");
    var contents = document.querySelector("#contents");
    var show_all_content_button = document.querySelector("#show-all-content-button");
    var open_filter_button = document.querySelector("#open-filter-button");
    var permalink_container = document.querySelector("#permalink-container");


    function scroll_to_contents() {
        contents.scrollIntoView({behavior: "smooth"});
    }

    function scroll_to_customizer() {
        customizer.scrollIntoView({behavior: "smooth"});
    }

    function activate_skiplink() {
        skiplink.click();
    }

    function open_filters() {
        customizer.open=true;
    }

    function close_filters() {
        customizer.open=false;
    }

    // when filters are applied, generate a permalink that can be used to apply the filters on page load
    // add this link to the permalink_container
    function generate_permalink() {
        // TODO
    }

    // to be run on page load - if filters are in the url-string, activate them
    function apply_permalink_filters() {
        // TODO
    }

    function disable_unused_filters() {
        console.log("disable_unused_filters()");
        var app_filters = document.querySelectorAll("#filters [data-app]");
        var topic_filters = document.querySelectorAll("#filters [data-topic]");

        function times_used(attribute, value) {
            var elements = document.querySelectorAll('main ['+ attribute + '*=' + value + ']');
            //console.log('main ['+ attribute + '=' + value + ']');
            return elements.length;
        }

        // ikke klar!
        function disable_filter(el) {
            ///el.parent.parent.parent.classList.add('disabled');
            console.log("removing: " + el.id);
            el.parentElement.parentElement.classList.add('disabled');
        }

        for(let i=0; i<app_filters.length; i++) {
            if(times_used("data-app", app_filters[i].dataset.app) == 0) {
                disable_filter(app_filters[i]);
            } else {
                console.log("keeping: " + app_filters[i].id);
            }
        }

        for(let i=0; i<topic_filters.length; i++) {
            if(times_used("data-rel", topic_filters[i].dataset.topic) == 0) {
                disable_filter(topic_filters[i]);
            } else {
                console.log("keeping: " + topic_filters[i].id);
            }
        }
    }

/*
    function filter_main_customize_button_action() {
 
        show_customize_section();
    }*/
    
    //filter_main_customize_button.addEventListener('click', filter_main_customize_button_action, false);

    function filter_main_show_all_button_action() {
        filter_main_show_all_button.setAttribute("data-selected", "selected");
        filter_main_customize_button.removeAttribute("data-selected");
        hide_customize_section();
    }
    /*filter_main_show_all_button.addEventListener('click', filter_main_show_all_button_action, false);*/
/*
    function show_customize_section() {
        customizer.removeAttribute("hidden");
    }

    function hide_customize_section() {
        customizer.setAttribute("hidden", "hidden");
    }*/

    // WIP
    function update_toc() {
        var nav = document.getElementById("guide-toc");
        var nav_list = document.createElement('ul');
        var active_topics = document.querySelectorAll("#topics article:not([hidden])");

        function create_sub_navlist_item(el) {
            let list_item = document.createElement('li');
            let link = document.createElement('a');
            let href = "#" + el.id;
            let link_text = el.querySelector('h3,h4').innerHTML;
            link.setAttribute("href", href);
            link.innerHTML = link_text;
            list_item.appendChild(link);
            return list_item;
        }

        function create_sub_nav_list(el) {

            var visible_subsections = el.querySelectorAll('section:not([hidden])');

            if (visible_subsections.length == 0) {
                return false;
            }

            // at this point there are at least one section descendant of the element

            var sub_nav_list = document.createElement('ul');

            for (let i = 0; i < visible_subsections.length; i++) {
                sub_nav_list.appendChild(create_sub_navlist_item(visible_subsections[i]));
            }
            return sub_nav_list;
        }

        function create_nav_link_item(el) {
            var link_item = document.createElement("li");
            var internal_link = document.createElement('a');
            internal_link.setAttribute("href", "#" + el.id);
            internal_link.innerHTML = el.querySelector('h3').innerHTML;
            link_item.appendChild(internal_link);

            let sub_nav_list = create_sub_nav_list(el);

            if (sub_nav_list) {
                link_item.appendChild(sub_nav_list);
            }

            return link_item;
        }

        for (let i = 0; i < active_topics.length; i++) {
            nav_list.appendChild(create_nav_link_item(active_topics[i]));
        }
        nav.innerHTML = "";
        nav.appendChild(nav_list);
    } // update_toc()

    function reset_filters() {
        for(let i = 0; i<filter_checkboxes.length; i++) {
            filter_checkboxes[i].checked=false;
        }
    } // reset_filters()

    function initialize_filtering() {
        var all_topics = document.querySelectorAll("#topics > article");
        var all_rels = document.querySelectorAll("[data-rel]");
        var all_app_checkboxes = document.querySelectorAll("#filters input[type=checkbox][data-app]");
        var all_topic_checkboxes = document.querySelectorAll('#filters input[type=checkbox][data-topic]');
        var all_app_subtopics = document.querySelectorAll("#topics [data-app]");
        

        function get_selected_apps() {
            var selected_apps = [];
            for (var i = 0; i < all_app_checkboxes.length; i++) {
                if (all_app_checkboxes[i].checked) {
                    selected_apps.push(all_app_checkboxes[i].dataset.app);
                }
            }
            return selected_apps;  
        }

        function get_selected_topics() {
            var selected_topics = [];

            for (var i = 0; i < all_topic_checkboxes.length; i++) {
                if (all_topic_checkboxes[i].checked) {
                    selected_topics.push(all_topic_checkboxes[i].dataset.topic);
                }
            }
            return selected_topics;
        }

        function show_all_app_subtopics () {
            for (let i = 0; i < all_app_subtopics.length; i++) {
                all_app_subtopics[i].hidden = false;
            }
        }

        function show_all_topics() {

            document.body.classList.remove('filtered');

            // dmsg("show_all_topics()");

            for (let i = 0; i < all_topics.length; i++) {
                all_topics[i].hidden = false;
            }

            for (let i = 0; i < all_rels.length; i++) {
                all_rels[i].hidden = false;
            }

            show_all_app_subtopics ();

            update_toc();
        }

        function hide_all_topics() {
            // dmsg("hide_all_topics()");
            for (let i = 0; i < all_topics.length; i++) {
                all_topics[i].hidden = true;
            }
        }

        function have_common_words(a, b) {
            //            dmsg("have_common_words()");
            //            dmsg("a: " + a);
            //            dmsg("b: " + b);
            var setA;
            var setB;
            if (typeof (a) == "string") {
                setA = a.split(" ");
            } else if (Array.isArray(a)) {
                setA = a;
            }
            if (typeof (b) == "string") {
                setB = b.split(" ");
            } else if (Array.isArray(b)) {
                setB = b;
            }

            dmsg("setA: " + setA + "\nsetB: " + setB);
            dmsg("typeof(setA): " + typeof (setA) + "\ntypeof(setB): " + typeof (setB));
            dmsg("Array.isArray(setA): " + Array.isArray(setA) + "\nArray.isArray(setB): " + Array.isArray(setB));

            for (let i = 0; i < setA.length; i++) {
                if (setB.includes(setA[i])) {
                    dmsg("match: " + setA[i]);
                    return true;
                }
            }

            dmsg("no match");
            return false;
        }


        function close_filter() {
            customizer.open=false;
        }

        

        function apply_filtering() {

            // dmsg("apply_filtering()");

            var selected_topics = get_selected_topics();
            var selected_apps = get_selected_apps();


            if (selected_topics.length == 0) {
                show_all_topics();
                document.body.classList.remove('filtered');
            } else {
                document.body.classList.add('filtered');

                for (let i = 0; i < all_topics.length; i++) {
                    let id = all_topics[i].id;
                    let topic = id.replace('topic-', '');
                    dmsg(" selected_topics: " + selected_topics + "\nid: " + id + " topic: " + topic);
                    if (selected_topics.includes(topic)) {
                        all_topics[i].hidden = false;
                    } else {
                        all_topics[i].hidden = true;
                    }
                }
    
                for (let i = 0; i < all_rels.length; i++) {
                    if (have_common_words(get_selected_topics(), all_rels[i].dataset.rel)) {
                        all_rels[i].hidden = false;
                    } else {
                        all_rels[i].hidden = true;
                    }
                }

                if(selected_apps.length == 0) {
                    show_all_app_subtopics();
                } else {
                    for (let i = 0; i < all_app_subtopics.length; i++) {
                        if (have_common_words(get_selected_apps(), all_app_subtopics[i].dataset.app)) {
                            all_app_subtopics[i].hidden = false;
                        } else {
                            all_app_subtopics[i].hidden = true;
                        }
                    }
                }
            }

            

        } // apply_filtering()

        // add event listener to the show all content button
        show_all_content_button.addEventListener("click", show_all_topics, false);
        show_all_content_button.addEventListener("click", close_filters, false);
        show_all_content_button.addEventListener("click",scroll_to_contents,false);

        // add event listener to the open filter button
        open_filter_button.addEventListener("click",open_filters,false);
        open_filter_button.addEventListener("click",scroll_to_customizer,false);

        // add the event listener to the confirm button(s)
        for(let i = 0; i<confirm_choices_buttons.length; i++) {
            confirm_choices_buttons[i].addEventListener("click", apply_filtering, false);
            confirm_choices_buttons[i].addEventListener("click", close_filter, false);
        }
    } // initialize_filtering ()

    

    // get_selected_topics();

    function add_checkbox_listeners() {
        var all_checkboxes = document.querySelectorAll("#filters input[type=checkbox]");

        function set_parent_checkbox_to_checked(ID) {
            var parent_checkbox = document.getElementById(ID);
            if (parent_checkbox && parent_checkbox.tagName == "INPUT" && parent_checkbox.type == "checkbox") {
                parent_checkbox.checked = true;
            }
            // if the parent checkbox also has a parent value
            if (parent_checkbox.dataset.parent && (document.getElementById(parent_checkbox.dataset.parent).checked == false)) {
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

        for (let i = 0; i < all_checkboxes.length; i++) {
            all_checkboxes[i].addEventListener('change', see_if_parent_checkbox_should_be_checked, false);
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
    for(let i = 0; i<confirm_choices_buttons.length; i++) {
        confirm_choices_buttons[i].addEventListener("click", update_toc, false);
        //confirm_choices_buttons[i].addEventListener("click", activate_skiplink, false);
        confirm_choices_buttons[i].addEventListener("click", scroll_to_contents, false);
    }

    //
    for(let i = 0; i<reset_filters_buttons.length; i++) {
        reset_filters_buttons[i].addEventListener("click", reset_filters, false);
    }
    
    // disable unused_filters on page load
    disable_unused_filters();

    // generate table of contents on page load
    update_toc();
}

window.addEventListener('load', uuguiden, false);