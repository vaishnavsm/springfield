var document, store, volatile_store, selected_ruleset = -1, selected_item = -1;

const updateRulesetList = ()=>{
    $(document).find(".list-group .list-group-item").remove();
    for(let i=0; i<volatile_store["rulesets"].length; ++i){
        const ruleset = volatile_store["rulesets"][i];
        $(document).find(".list-group").append( "<li class='list-group-item' data-item='"+ruleset.name+"'>"+
                                                    "<div class='media-body'>"+
                                                        "<strong>"+ruleset.name+"</strong>"+
                                                    "</div>"+
                                                "</li>");
    }
};

const updateRulesList = ()=>{
    $(document).find("table tbody").empty();
    for(let i=0; i<selected_ruleset.rules.length; ++i){
        const rule = selected_ruleset.rules[i];
        $(document).find("table tbody").append( "<tr data-item='"+rule.name+"'>"+
                                                "<td>"+rule.name+"</td>"+
                                                "<td>"+rule.example_list.length+"</td>"+
                                                "<td>"+rule.confidence+" %</td>"+
                                                "</tr>");
    }
};

const classify_action = ()=>{
    loadState("rules");
};

const new_ruleset = ()=>{
    let ruleset_name = $(document).find("#new-ruleset").val();
    volatile_store["rulesets"].push({
        name: ruleset_name,
        rules: []
    });
    updateRulesetList();
};

const del_ruleset = ()=>{
    let ruleset_idx = volatile_store["rulesets"].map((e)=>(e.name)).indexOf(selected_ruleset.name);
    if(ruleset_idx == -1){
        alert("Invalid Ruleset");
        return;
    }
    volatile_store["rulesets"].splice(ruleset_idx,1);
    $(document).find('.list-group-item').removeClass('active');
    $(document).find('.without-ruleset').css('display', 'block');
    $(document).find('.with-ruleset').css('display', 'none');
    ruleset_idx = -1;
    updateRulesetList();
};

const select_ruleset = (e)=>{
    if($(e.target).hasClass('list-group-header') || $(e.target).parent('.list-group-header')[0] != undefined) return;
    const ruleset_name = $(e.target).closest('.list-group-item').data('item');
    const ruleset_idx = volatile_store['rulesets'].map((e)=>(e.name)).indexOf(ruleset_name);
    if(ruleset_idx == -1){
        alert("Invalid Ruleset");
        return;
    }
    selected_ruleset = volatile_store['rulesets'][ruleset_idx];
    $(document).find('.list-group-item').removeClass('active');
    $(e.target).closest('.list-group-item').addClass('active');
    $(document).find('.without-ruleset').css('display', 'none');
    $(document).find('.with-ruleset').css('display', 'block');
    $(document).find('.btn-group.with-ruleset').css('display', 'inline-block');
    updateRulesList();
}

const add_rule = ()=>{
    let rule_name = $(document).find("#new-rule").val();
    selected_ruleset.rules.push({
        name: rule_name,
        example_list: [],
        confidence: 0
    });
    updateRulesList();
};

const del_rule = ()=>{
    let rule_idx = selected_ruleset.rules.map((e)=>(e.name)).indexOf(selected_item);
    if(rule_idx == -1){
        alert("Invalid Rule");
        return;
    }
    selected_ruleset.rules.splice(rule_idx,1);
    $(document).find('.with-rule').css('display', 'none');
    selected_item = -1;
    updateRulesList();
};

const table_click = (e) => {
    let row = $(e.target).closest('tr');
    let item = $(row).data("item");
    if(selected_item == item){
        //Unselect
        $(document).find('.with-rule').hide(100);
        $("tr").removeClass('active');
        selected_item = -1;
        return;
    }
    if(selected_item == -1){
        //Show Selection
        $(document).find('.with-rule').fadeIn(100).css('display', 'inline-block');
    }
    else{
        //Change Selection
        $("tr").removeClass('active');
    }
    $(row).addClass('active');
    selected_item = item;
};

const train_ruleset = ()=>{
    //TODO: TAKE THE DATA AND TRAIN THE RULESET.
    //structure is {ruleset: [..., {name: 'ruleset name', rules: [..., {name: 'rule name', confidence: 'confidence level', example_list: ['text1', 'text2', ...]}, ...]}, ...]}
};

const apply_ruleset = ()=>{
    //TODO: TAKE THE DATA AND APPLY THE RULESET.
    //expected structure is {classified: [..., {name: 'document name', data: [..., {name: 'rule name', data: 'extracted data'}, ...]}, ...]}
    volatile_store['classified'] = [{name: 'a', data:[{name: 'tag1', data: 'abc'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}, {name: 'tag2', data: 'edf'}]}, {name: 'b', data:[{name: 'tag1', data: 'www'}, {name: 'tag2', data: 'xyz'}]}];
    loadState("classification");
};

const on_init = (_document, _store, _volatile_store)=>{
    selected_ruleset = -1;
    selected_item = -1;
    document = _document;
    store = _store;
    volatile_store = _volatile_store;
    if(volatile_store["rulesets"] == undefined){
        volatile_store["rulesets"] = [];
        store.find({"key":"rulesets"}, (err, docs)=>{
            if(err){
                console.log("Persistence Error: %s", err.message);
                return;
            }
            for(let i=0; i<docs.length; ++i){
                for(let j=0; j<docs[i].data.length; ++j){
                    volatile_store["rulesets"].push(docs[i].data[j]);
                }   
            }
            updateRulesetList();
        });
    }
    updateRulesetList();
    $(document).find("#classify").on('click', classify_action);
    $(document).find("#save-state").on('click', save_state);
    $(document).find("#add-ruleset").on('click', new_ruleset);
    $(document).find("#add-rule").on('click', add_rule);
    $(document).find("form").on('submit', (e)=>{e.preventDefault();});
    $(document).find("#delete-ruleset").on('click', del_ruleset);
    $(document).find("#delete-rule").on('click', del_rule);
    $(document).find("#train-ruleset").on('click', train_ruleset);
    $(document).find("#apply-ruleset").on('click', apply_ruleset);
    $(document).find(".list-group").on('click', select_ruleset);
    $(document).find("tbody").on('click', table_click);
};

const on_unload = (document)=>{
    
}

exports.on_init = on_init;
exports.on_unload = on_unload;