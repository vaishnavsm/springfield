var selected_item = -1, viewing_item = -1, current_ruleset=-1;

const updateDocumentList = ()=>{
    $(document).find("table tbody").empty();
    for(let i=0; i<volatile_store["edocs"].length; ++i){
        const curr_doc = volatile_store["edocs"][i];
        $(document).find("table tbody").append( "<tr data-item='"+curr_doc.name+"'>"+
                                                "<td>"+curr_doc.name+"</td>"+
                                                "<td>"+curr_doc.type+"</td>"+
                                                "</tr>");
    }
};

const table_click = (e) => {
    let row = $(e.target).parent('tr');
    let item = $(row).data("item");
    if(selected_item == item){
        //Unselect
        $(document).find('.selected-group').hide(100);
        $("tr").removeClass('active');
        selected_item = -1;
        return;
    }
    if(selected_item == -1){
        //Show Selection
        $(document).find('.selected-group').fadeIn(100).css('display', 'inline-block');
    }
    else{
        //Change Selection
        $("tr").removeClass('active');
    }
    $(row).addClass('active');
    selected_item = item;
};

const classify_action = ()=>{
    loadState("classification");
};

const save_state = () => {
    store.update({"key":"edocs"}, {"key":"edocs", "data":volatile_store['edocs']}, {}, (err, numReplaced)=>{
        if(err) console.log("Persistence Error: "+err.message);
        console.log("Replaced: "+numReplaced);
        if(numReplaced == 0){
            store.insert({"key":"edocs", "data":volatile_store['edocs']}, (err, doc)=>{
                if(err) console.log("Persistence Error: "+err.message);
                console.log("New Doc: %o",doc);
            });
        }
    });
};

const ocr = ()=>{
    //TODO: MIDDLEWARE TO OCRs
    volatile_store['edocs'] = [ {"name":"abc", "type":"pdf", "data":"Lorem ipsum dolor sit amet, id dicant numquam pro. Cu dicit splendide vis, docendi noluisse per id, te eos odio adipiscing. Id ius fugit timeam constituam, labitur concludaturque his cu, mei possim philosophia in. Quo in agam decore munere, at per errem maiorum, eu magna senserit pro. In nam invidunt liberavisse. Vis facilisi suavitate percipitur te, eum scripta probatus rationibus an, te affert recusabo est.\n\nConsul nostro vim et. Ne his lucilius conclusionemque. Audire dolorem ex vix, sensibus splendide scriptorem eam ea. Audiam viderer interpretaris te vim. Id qui suas cetero theophrastus. Ex vel assum molestie. Quodsi aliquid suscipiantur te usu.\n\nEa augue commune pro. Eirmod impedit pro ut, sea at option tritani. Odio intellegat honestatis no eam, vocent civibus assentior ut est, purto constituto ea ius. Vis equidem denique periculis at, ea soluta appareat voluptatibus sed. Est nemore tamquam ad, ad cibo atqui erant est.\n\nGubergren persecuti vis ei, mel fastidii detraxit postulant ea. Fabulas salutandi has no. Cu aperiam pertinax quo. Sit eius facilis complectitur ut, ne agam detracto singulis his. No oratio scripta definitionem mel, tale viderer virtute vis an. Nam cu eros integre.\n\nIn scaevola consequat interpretaris vix, ex veritus eleifend interesset eos, ex torquatos maiestatis sit. Nam velit disputando repudiandae ut, eam lorem diceret et. Vix minimum offendit partiendo ut, sumo liber rationibus vim at, ex posse iracundia hendrerit vim. Mentitum partiendo eu has.\n\nVel nulla omnes eligendi eu. At pri graeci inermis vivendum. At timeam copiosae euripidis eos, at eam eros noster intellegebat. Sed ea appetere repudiandae, id sed nostrud blandit nominavi.\n\nEx eruditi epicurei vis. Eos dicta euismod debitis ne, his semper singulis et, pro odio euismod at. Ut usu laudem dissentiunt, an qui eros meis atomorum. Sea equidem nostrum ad, no audiam vulputate mei. Labores persecuti cu eos, vix commodo tractatos deterruisset at, wisi error sit te.\n\nEum ut nibh magna contentiones, sit veri honestatis definitionem ex, nulla expetenda honestatis per in. Fierent expetenda his ei. Fugit vocibus legendos et duo. Hinc duis mel te, verear dignissim sit an, soluta elaboraret id sit. An consul propriae accusata est. Ut tollit deleniti euripidis sed, aliquam atomorum mediocritatem an his.\n\nTe prompta legendos signiferumque sed, sea no graeco delectus delicatissimi. Amet alii facete ius ne, semper persius albucius qui ea, facete contentiones concludaturque eum an. Ei modo habemus reprehendunt mea. Te ridens complectitur qui, ne vivendum gloriatur nec.\n\nQuo te tincidunt mnesarchum, usu eu modus graeco. Cum oratio mucius ne, id quaestio interpretaris sit, dicit denique ad sit. Cum in purto clita decore, in mel similique rationibus deterruisset. No pro dolorum philosophia, dolorum nominati ius ea. Ferri consetetur eam te."},
                                {"name":"cdf", "type":"pdf", "data":"Ei altera audire sea, nec veri persecuti cu. Ea nam tantas voluptua, quod legere adipiscing vim et, ex ius viris consulatu. Legere copiosae quaestio ut vim. Ad ius eleifend omittantur, id eleifend praesent mel.\n\nMucius ceteros eu vim, quo te errem aliquam, assum eleifend reprehendunt et eam. Ea altera malorum discere pri. Sit id verear euismod. Mea alia falli electram at, altera habemus te pro.\n\nDicta veritus fastidii te vix. Ei est mollis deterruisset. Vix dicam placerat ad. At eam tantas doctus, sea at dico rationibus. Qui illud inermis facilis eu, eam ei dico everti.\n\nImpedit praesent referrentur pro id, dolore salutatus te has. At graece tincidunt vix, case erant omnes no nam. Saepe dicunt maluisset qui ne. Eu eum appetere conceptam, choro phaedrum gloriatur an has, sed probo admodum gloriatur ei.\n\nModo purto molestiae cu eum, ex mundi albucius cum. In vel cibo dicant regione, ei brute qualisque gloriatur usu, et invenire posidonium sea. Duo in mentitum tractatos dignissim, sit quis summo delenit ex, dicat molestiae euripidis pri ei. Minim aliquid eam no. Ut numquam scriptorem usu, sint euismod at usu.\n\nChoro scripta phaedrum cu mea, in congue nemore moderatius sit. Vis in soluta phaedrum philosophia. Erant oblique sed ad, melius consequat disputationi te usu, choro quidam suscipiantur mea et. An agam accommodare quo, quas ullum adolescens his ne, et duo lorem viris eligendi. Eripuit repudiandae an eum, recusabo dignissim evertitur ne eam, ei vix mandamus perpetua. Vitae persius assentior duo at, errem albucius eloquentiam eos at.\n\nTacimates concludaturque cum eu, populo impedit indoctum usu no. An usu labore impedit noluisse, per aliquip voluptatum suscipiantur eu, natum exerci laudem eum cu. Te sea facete placerat. Dicit timeam urbanitas ex his, veritus eleifend honestatis ius ne. Vix vivendo recusabo id.\n\nPostea definiebas at mea, ea sed utamur vulputate, duo an habeo oporteat. Has assueverit constituam ex, eu purto recteque efficiantur vim. Eum id offendit lobortis perpetua, inani deterruisset mediocritatem ut ius. Minim menandri id qui, quod perfecto antiopam ad eos, ei dicam audiam quaerendum est. Novum dicant eligendi no eos.\n\nMeis fabellas no vim, et tritani laoreet consetetur nec. Vivendo minimum ne sit, decore impetus principes has in. Vel ex vocent prodesset efficiendi, usu ut elit quaeque, his ne democritum delicatissimi. Ne ipsum feugait usu, ei sed meis everti probatus. Id pro fuisset apeirian explicari. Dolorum antiopam no usu.\n\nMei no apeirian suavitate, mea ex veritus invidunt. Ius et dictas diceret salutandi, erat moderatius per te. Usu errem insolens instructior ei, ex eam vidit commune eloquentiam, et vel recteque mnesarchum. Illum lobortis disputationi est ei. Vix an mucius laoreet suscipit, vel ad audiam detracto explicari."}]
    updateDocumentList();
};

const remove_doc = ()=>{
    $(document).find('.selected-group').hide(100);
    $("tr").removeClass('active');
    const idx = volatile_store["edocs"].map((e)=>(e.name)).indexOf(selected_item);
    if(idx>-1)  volatile_store["edocs"].splice(idx, 1);
    updateDocumentList();
    selected_item = -1;
}

const open_view = ()=>{
    if(selected_item == -1 || viewing_item != -1){
        $(document).find(".view-pane").hide(100, ()=>{
            viewing_item = -1;
            if(selected_item != -1) open_view();
        });
        return;
    }
    else{
        viewing_item = selected_item;
        let idx = volatile_store["edocs"].map((e)=>(e.name)).indexOf(viewing_item);
        $(document).find("#doc-text").val(volatile_store["edocs"][idx].data);
        $(".view-pane").show(100);
    }
}

const view_action = ()=>{
    $(document).find(".view-group").css("display", "inline-block");
    open_view();
}
const train_rule = ()=>{
    $(document).find(".view-group").css("display", "none");
    open_view();
}

const discard_view = ()=>{
    $(document).find("#doc-text").val("");
    $(document).find(".tagging-header").hide(100);
    $(".view-pane").hide(100);
    viewing_item = -1;
}

const save_view = ()=>{
    let idx = volatile_store["edocs"].map((e)=>(e.name)).indexOf(viewing_item);
    volatile_store["edocs"][idx].data = $(document).find("#doc-text").val();
    $(document).find(".tagging-header").hide(100);
    $(document).find(".view-pane").hide(100);
    viewing_item = -1;
}

const toggle_tag_list = ()=>{
    if($(document).find(".tagging-header").css("display") == "none"){
        $(document).find(".tagging-header").show(100);
        if(volatile_store['rulesets'] == undefined){
            alert("Please open Rules pane to load rules and rulesets.");
        }
        else{
            let element =   "<option>"+
                                "Choose Ruleset"+
                                "</option>";
            $(document).find("#ruleset-list").append(element);
            for(let i=0; i<volatile_store['rulesets'].length; ++i){
                const ruleset = volatile_store['rulesets'][i];
                let element =   "<option value='"+ruleset.name+"'>"+
                                ruleset.name+
                                "</option>";
                $(document).find("#ruleset-list").append(element);
            }
        }
    }
    else{
        $(document).find(".tagging-header").hide(100);
    }
}

const load_rule_list = ()=>{
    let ruleset_name = $(document).find("#ruleset-list").val();
    console.log(ruleset_name);
    let ruleset_idx = volatile_store["rulesets"].map((e)=>(e.name)).indexOf(ruleset_name);
    current_ruleset = ruleset_idx;
    let ruleset = volatile_store["rulesets"][ruleset_idx];
    console.log(volatile_store["rulesets"]);
    console.log(ruleset);
    let rules_list = ruleset.rules;
    
    let element =   "<option>"+
                    "Choose Rule"+
                    "</option>";
    $(document).find("#rule-list").append(element);
    for(let i=0; i<rules_list.length; ++i){
        let element =   "<option value='"+rules_list[i].name+"'>"+
                        rules_list[i].name+
                        "</option>";
        $(document).find("#rule-list").append(element);
    }
};

const add_tag = ()=>{
    const rule_name = $(document).find("#rule-list").val();
    const ruleset = volatile_store["rulesets"][current_ruleset];
    const rule_idx = ruleset.rules.map((e)=>(e.name)).indexOf(rule_name);
    if(rule_idx == -1){
        alert("Invalid Rule");
        return;
    }
    ruleset.rules[rule_idx].example_list.push("");
}

const doc_blur = ()=>{
    let elem = $(document).find("#doc-text");
    s=elem[0].selectionStart;
    e=elem[0].selectionEnd;
    $(document).find("#selection").val(elem.val().substring(s, e));
}
var document, store, volatile_store;
const on_init = (_document, _store, _volatile_store)=>{
    document = _document;
    store = _store;
    volatile_store = _volatile_store;
    if(volatile_store["edocs"] == undefined){
        volatile_store["edocs"] = [];
        store.find({"key":"edocs"}, (err, docs)=>{
            if(err){
                console.log("Persistence Error: %s", err.message);
                return;
            }
            for(let i=0; i<docs.length; ++i){
                for(let j=0; j<docs[i].data.length; ++j){
                    volatile_store["edocs"].push(docs[i].data[j]);
                }   
            }
            updateDocumentList();
        });
    }
    updateDocumentList();
    $(document).find("#ocr").on('click', ocr);
    $(document).find("#classify").on('click', classify_action);
    $(document).find("#remove-doc").on('click', remove_doc);
    $(document).find("#save-state").on('click', save_state);
    $(document).find("#save-view").on('click', save_view);
    $(document).find("#train-rule").on('click', train_rule);
    $(document).find("#view").on('click', view_action);
    $(document).find("#discard-view").on('click', discard_view);
    $(document).find("#tag-selection").on('click', toggle_tag_list);
    $(document).find("#tag").on("click", add_tag);
    $(document).find("tbody").on('click', table_click);
    $(document).find("#ruleset-list").on("change", load_rule_list);
    $(document).find("#doc-text").on("blur", doc_blur);
};

const on_unload = (document)=>{
    
}

exports.on_init = on_init;
exports.on_unload = on_unload;