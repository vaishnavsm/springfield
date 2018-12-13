var document, store, volatile_store;
var Chart = require("chart.js");

const export_action = ()=>{
    loadState("export");
};

const create_pie_chart = ()=>{
    new Chart(document.getElementById('myChart').getContext('2d'), {
        type: 'pie',
        data: {
            datasets: [{
                data: [10,20,30,40,10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Red',
                'Orange',
                'Yellow',
                'Green',
                'Blue'
            ]
        },
        options: {
            responsive: true
        }
    });
};

const create_bar_chart = () =>{
    new Chart(document.getElementById("myChart").getContext('2d'), {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
};

const on_init = (_document, _store, _volatile_store)=>{
    document = _document;
    store = _store;
    volatile_store = _volatile_store;

    $(document).find("#export").on('click', export_action);
    $(document).find("#save-state").on('click', save_state);
    $(document).find("#myButton1").on('click', function () {
        create_pie_chart();
    });
    $(document).find("#myButton2").on('click', function () {
        create_bar_chart();
    });

    create_pie_chart(); // by default
};

const on_unload = (document)=>{

};

exports.on_init = on_init;
exports.on_unload = on_unload;