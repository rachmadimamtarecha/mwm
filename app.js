import afinn111id from './afinn111id.js';

$('.progress').show();

$(document).ready(function () {
    $('.sidenav').sidenav();



});



let dataApi;



const fetchAll = () => {
    fetch("https://indonesian-news-headline.p.rapidapi.com/?type=wisata", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "beaa65b236mshd53692b21a51cb3p18a027jsna7f9e0cd3ca7",
                "x-rapidapi-host": "indonesian-news-headline.p.rapidapi.com"
            }
        })
        .then(response => {
            return response.json();
        }).then(response => {
            dataApi = response;
            drawCarousel(dataApi);
            addSentimen(dataApi);
            addArticles(dataApi, "positif");
            $('.carousel').carousel();
            $('.progress').hide();
        })
        .catch(err => {
            M.toast({
                html: err
            });
        });
}

const drawCarousel = (dataApi) => {
    for (let i = 0; i < dataApi.data.length; i++) {
        $(".carousel").append(`<a class="carousel-item" href="${dataApi.data[i].dis_url}" target="_blank"> <img src = "${dataApi.data[i].dis_image}"> <p class="indigo-text text-darken-4">${dataApi.data[i].dis_title}</p></a>`);
    }
}

const addSentimen = (dataApi) => {
    dataApi.data.forEach(dataApiSingle => {
        let titleanddescription = dataApiSingle.dis_title + " " + dataApiSingle.dis_description;
        let titleanddescriptionwordssplit = titleanddescription.split(/\W/);
        let afinn111idscore = 0;
        let sentimen;


        for (let i = 0; i < titleanddescriptionwordssplit.length; i++) {
            let titleanddescriptionwordssplitlowercase = titleanddescriptionwordssplit[i].toLowerCase();
            if (afinn111id.hasOwnProperty(titleanddescriptionwordssplitlowercase)) {
                afinn111idscore += Number(afinn111id[titleanddescriptionwordssplitlowercase]);
            }

        }

        if ((afinn111idscore / titleanddescriptionwordssplit.length) > 0) {
            sentimen = "positif";
        } else if ((afinn111idscore / titleanddescriptionwordssplit.length) < 0) {
            sentimen = "negatif";
        } else {
            sentimen = "netral";
        }

        dataApiSingle = Object.assign(dataApiSingle, {
            dis_sentimen: sentimen
        });





    });


    keywordsandmedia(dataApi);
}

const keywordsandmedia = (dataApi) => {
    let keywordslist = new Array();
    let medialist = new Array();
    dataApi.data.forEach(dataApiSingle => {
        const keywordssplit = dataApiSingle.dis_keywords.toLowerCase().split(",");
        medialist.push(dataApiSingle.dis_sitename);
        keywordssplit.forEach(keywordssplitfromsingle => keywordslist.push(keywordssplitfromsingle));
    });

    keywordslist = keywordslist.sort();
    keywordslist = keywordslist.map(value => value.trim());
    keywordslist = keywordslist.filter(function (value, index, arr) {
        return value != ""
    });
    keywordslist = keywordslist.filter(function (value, index, arr) {
        return value != "-"
    });

    keywordslist = keywordslist.filter(function (value, index, arr) {
        return value != "wisata"
    });

    keywordslist = keywordslist.filter(function (value, index, arr) {
        return value != "pariwisata"
    });

    keywordslist = keywordslist.filter(function (value, index, arr) {
        return value != "media sosial"
    });

    keywordslist = keywordslist.filter(function (value, index, arr) {
        return value != "travel"
    });

    keywordslist = [...new Set(keywordslist)];

    medialist = medialist.filter(function (value, index, arr) {
        return value != ""
    });

    medialist = [...new Set(medialist)];

    medialist = medialist.sort();

    let keywordsdanjumlah = new Array();

    keywordslist.forEach(keywordsSingle => keywordsdanjumlah.push({
        "keyword": keywordsSingle,
        "jumlahkeyword": dataApi.data.filter(dataApiFilter => dataApiFilter.dis_keywords.toLowerCase().includes(keywordsSingle)).length
    }));

    keywordsdanjumlah = keywordsdanjumlah.sort((a, b) => b.jumlahkeyword - a.jumlahkeyword);



    drawPie(keywordsdanjumlah);
    drawBar(dataApi, keywordsdanjumlah, medialist);

}

const drawPie = (keywordsdanjumlah) => {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Topik', 'Jumlah'],
          [keywordsdanjumlah[0].keyword, keywordsdanjumlah[0].jumlahkeyword],
          [keywordsdanjumlah[1].keyword, keywordsdanjumlah[1].jumlahkeyword],
            [keywordsdanjumlah[2].keyword, keywordsdanjumlah[2].jumlahkeyword],
            [keywordsdanjumlah[3].keyword, keywordsdanjumlah[3].jumlahkeyword],
            [keywordsdanjumlah[4].keyword, keywordsdanjumlah[4].jumlahkeyword],
            [keywordsdanjumlah[5].keyword, keywordsdanjumlah[5].jumlahkeyword],
            [keywordsdanjumlah[6].keyword, keywordsdanjumlah[6].jumlahkeyword],
            [keywordsdanjumlah[7].keyword, keywordsdanjumlah[7].jumlahkeyword],
            [keywordsdanjumlah[8].keyword, keywordsdanjumlah[8].jumlahkeyword],
            [keywordsdanjumlah[9].keyword, keywordsdanjumlah[9].jumlahkeyword],

        ]);

        var options = {
            title: '10 topik utama pemberitaan media',
            is3D: true,
            backgroundColor: '#e3f2fd'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
        $("#narasipiechart").text(`Baru-baru ini, pemberitaan terkait wisata terpusat pada topik ${keywordsdanjumlah[0].keyword},   ${keywordsdanjumlah[1].keyword},  ${keywordsdanjumlah[2].keyword}, ${keywordsdanjumlah[3].keyword}, ${keywordsdanjumlah[4].keyword}`);
    }

}

const drawBar = (dataApi, keywordsdanjumlah, medialist) => {

    let keywordpadamedia = new Array();

    for (let i = 0; i < medialist.length; i++) {

        keywordpadamedia[i] = new Array();

    }



    for (let i = 0; i < medialist.length; i++) {
        let dataApifiltermedia = dataApi.data.filter(dataApifiltered => dataApifiltered.dis_sitename.includes(medialist[i]));

        keywordsdanjumlah.forEach(keywordsdanjumlahsingle => {

            keywordpadamedia[i].push({
                media: medialist[i],
                keyword: keywordsdanjumlahsingle.keyword,
                jumlah: dataApifiltermedia.filter(dataApifiltermedia => dataApifiltermedia.dis_keywords.toLowerCase().includes(keywordsdanjumlahsingle.keyword)).length
            })


        })

    }






    google.charts.load('current', {
        'packages': ['bar']
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();

        data.addColumn('string', 'Media');
        for (let i = 0; i < 10; i++) {
            data.addColumn('number', keywordsdanjumlah[i].keyword);
        }






        for (let i = 0; i < medialist.length; i++) {

            data.addRow([medialist[i], keywordpadamedia[i][0].jumlah, keywordpadamedia[i][1].jumlah, keywordpadamedia[i][2].jumlah, keywordpadamedia[i][3].jumlah, keywordpadamedia[i][4].jumlah, keywordpadamedia[i][5].jumlah, keywordpadamedia[i][6].jumlah, keywordpadamedia[i][7].jumlah, keywordpadamedia[i][8].jumlah, keywordpadamedia[i][9].jumlah]);

        }



        var options = {
            chart: {
                title: 'Perbandingan fokus media pada 10 topik utama',

            },

            bars: 'horizontal'

        };

        var chart = new google.charts.Bar(document.getElementById('barchart'));

        chart.draw(data, options);
        $("#narasibarchart").text(`${medialist.length} media menerbitkan artikel terkait wisata baru-baru ini, media yang memuat 10 topik teratas dapat menampilkan data`);



    }

    drawSentiment(dataApi, keywordsdanjumlah, medialist);


}

const drawSentiment = (dataApi, keywordsdanjumlah, medialist) => {

    for (let i = 0; i < 10; i++) {
        if (i === 0) {

            $('#selectTopik').append(`<option value="${keywordsdanjumlah[i].keyword}" selected>${keywordsdanjumlah[i].keyword}</option>`);
        } else {
            $('#selectTopik').append(`<option value="${keywordsdanjumlah[i].keyword}">${keywordsdanjumlah[i].keyword}</option>`);

        }



    }


    $('select').formSelect();





    $('#selectTopik').on('change', function (e) {
        $('.progress').show();
        let topik = $('#selectTopik').val();
        rundrawSentimen(topik);
    });

    const rundrawSentimen = (topik) => {

        let sentimenmedia = new Array();


        const dataApiselecttopik = dataApi.data.filter(dataApiselect => dataApiselect.dis_keywords.toLowerCase().includes(topik));

        for (let i = 0; i < medialist.length; i++) {
            let selectedtopiconmedia = dataApiselecttopik.filter(dataApiselecttopik => dataApiselecttopik.dis_sitename.includes(medialist[i]));

            let jumlahpositif = selectedtopiconmedia.filter(selectedtopiconmedia => selectedtopiconmedia.dis_sentimen.includes("positif")).length;
            let jumlahnetral = selectedtopiconmedia.filter(selectedtopiconmedia => selectedtopiconmedia.dis_sentimen.includes("netral")).length;
            let jumlahnegatif = selectedtopiconmedia.filter(selectedtopiconmedia => selectedtopiconmedia.dis_sentimen.includes("negatif")).length;

            sentimenmedia.push({
                media: medialist[i],
                positif: jumlahpositif,
                netral: jumlahnetral,
                negatif: jumlahnegatif
            });


        }




        google.charts.load("current", {
            packages: ["corechart", "bar"]
        });

        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Media');
            data.addColumn('number', 'Positif');
            data.addColumn('number', 'Netral');
            data.addColumn('number', 'Negatif');


            for (let i = 0; i < medialist.length; i++) {
                data.addRow([medialist[i], sentimenmedia[i].positif, sentimenmedia[i].netral, sentimenmedia[i].negatif]);
            }

            var options = {
                isStacked: true,
                colors: ["blue", "grey", "red"],
                backgroundColor: '#e3f2fd'


            };
            var chart = new google.visualization.BarChart(document.getElementById('sentimenchart'));
            chart.draw(data, options);

            $("#narasisentimenchart").text(`*Analisa sentimen menggunakan metode leksikal AFINN-111 yang diterjemahkan kedalam bahasa Indonesia.`);
            $('.progress').hide();


        }

    }
    let topik = $('#selectTopik').val();
    rundrawSentimen(topik);

}

const addArticles = (dataApi, sentimen) => {





    const writeArticle = (dataApiFilter, sentimen) => {



        $('article').empty();
        dataApiFilter.forEach(dataApiFilterSingle => {


            if (sentimen === "positif") {
                $("article").append(`
    <div class="col s12 m6">

      <div class="card">
        <div class="card-image">
<a href="${dataApiFilterSingle.dis_url}" target="_blank"> 
          <img src="${dataApiFilterSingle.dis_image}">
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${dataApiFilterSingle.dis_url}" target="_blank" class="share btn-floating halfway-fab waves-effect waves-light blue"><i class="material-icons">share</i></a>
        </div>
        <div class="card-content">
<a class="share" href="${dataApiFilterSingle.dis_url}" target="_blank"> <span class="card-title">${dataApiFilterSingle.dis_title}</span></a>
          <p>  ${dataApiFilterSingle.dis_description}</p>
<p><br/> <a class="share"  target="_blank" href = "https://www.facebook.com/sharer/sharer.php?u=${dataApiFilterSingle.dis_url}">Bagikan dan dapatkan 1 poin </a></p>
        </div>
      </div>

    </div>

`);

            } else if (sentimen === "netral") {
                $("article").append(`
    <div class="col s12 m6">

      <div class="card">
        <div class="card-image">
<a href="${dataApiFilterSingle.dis_url}" target="_blank"> 
          <img src="${dataApiFilterSingle.dis_image}">
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${dataApiFilterSingle.dis_url}" target="_blank" class="share btn-floating halfway-fab waves-effect waves-light grey"><i class="material-icons">share</i></a>
        </div>
        <div class="card-content">
<a class="share" href="${dataApiFilterSingle.dis_url}" target="_blank"> <span class="card-title">${dataApiFilterSingle.dis_title}</span></a>
          <p>  ${dataApiFilterSingle.dis_description}</p>
<p><br/> <a class="share grey-text"  target="_blank" href = "https://www.facebook.com/sharer/sharer.php?u=${dataApiFilterSingle.dis_url}">Bagikan dan dapatkan 1 poin </a></p>
        </div>
      </div>

    </div>

`);

            } else if (sentimen === "negatif") {
                $("article").append(`
    <div class="col s12 m6">

      <div class="card">
        <div class="card-image">
<a href="${dataApiFilterSingle.dis_url}" target="_blank"> 
          <img src="${dataApiFilterSingle.dis_image}">
          </a>
        
        </div>
        <div class="card-content">
<a class="share" href="${dataApiFilterSingle.dis_url}" target="_blank"> <span class="card-title">${dataApiFilterSingle.dis_title}</span></a>
          <p>  ${dataApiFilterSingle.dis_description}</p>
<p><br/> <a class="share red-text"  target="_blank" href = "sms:1708&body=Lapor!%20${encodeURI(dataApiFilterSingle.dis_url)}" ><img src="https://www.lapor.go.id/themes/lapor/assets/images/logo.png"/> <br/>Laporkan pihak terkait agar mendapat evaluasi, dan  dapatkan 1 poin </a></p>
        </div>
      </div>

    </div>

`);

            }



        });








        $('.progress').hide();
    };

    if (sentimen === "positif") {
        let dataApiFilter = dataApi.data.filter(dataApiFiltered => dataApiFiltered.dis_sentimen.includes("positif"));
        writeArticle(dataApiFilter, sentimen);
    } else if (sentimen === "netral") {
        let dataApiFilter = dataApi.data.filter(dataApiFiltered => dataApiFiltered.dis_sentimen.includes("netral"));
        writeArticle(dataApiFilter, sentimen);
    } else if (sentimen === "negatif") {
        let dataApiFilter = dataApi.data.filter(dataApiFiltered => dataApiFiltered.dis_sentimen.includes("negatif"));
        writeArticle(dataApiFilter, sentimen);
    }

    $('#sentimen a').on('click', function (e) {
        $('#sentimen a').removeClass("disabled");
        $('.progress').show();
        addArticles(dataApi, $(this).attr('value'));
        $(this).addClass("disabled");
    });






}

const loadPage = (page) => {

    if (page === "") {
        $("#dashboard").show();
        $("#poin").hide();
        $("#bagikan").hide();
    } else if (page === "#dashboard") {
        $("#dashboard").show();
        $("#poin").hide();
        $("#bagikan").hide();
    } else if (page === "#bagikan") {
        $("#dashboard").hide();
        $("#poin").hide();
        $("#bagikan").show();
    } else if (page === "#poin") {
        $("#dashboard").hide();
        $("#poin").show();
        $("#bagikan").hide();
    }


}

const cacheKey = "POINT";
if (typeof (Storage) !== "undefined") {

    if (localStorage.getItem(cacheKey) === null) {

        localStorage.setItem(cacheKey, 0);

    } else {
        $('#jumlahpoin').text(localStorage.getItem(cacheKey));
    }



} else {
    M.toast({
        html: "Browser tidak mendukung Web Storage"
    });

}




fetchAll();
let page = window.location.hash;
loadPage(page);

$('#sentimen .blue').addClass("disabled");








if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();


}


function registerServiceWorker() {
    return navigator.serviceWorker.register('./service-worker.js', {scope: '/mwm/'})
        .then(function (registration) {
            console.log('Registrasi service worker berhasil.');
            return registration;
        })
        .catch(function (err) {
            console.error('Registrasi service worker gagal.', err);
        });
}







$(document).ready(function () {

    $('body').on('click', '.menu', function (e) {

        let page = $(this).attr("href");
        loadPage(page);


    });



    $('article').on('click', '.share', function (e) {
        let number = localStorage.getItem(cacheKey);
        number++;
        localStorage.setItem(cacheKey, number);
        M.toast({
            html: "Selamat, anda dapat 1 poin"
        });


        $('#jumlahpoin').text(localStorage.getItem(cacheKey));




    });




    $('#poin').on('click', '#gratisrapid', function (e) {
        let number = localStorage.getItem(cacheKey);
        if (number - 5 >= 0) {
            localStorage.setItem(cacheKey, number - 5);
            M.toast({
                html: "Berhasil redeem, segera tukarkan vouchernya ya"
            });
            $("#vouchercode").text("TRAVELMAN");
            $("#gratisrapid").hide();
        } else {
            M.toast({
                html: "Maaf poin anda belum cukup untuk meredem voucher"
            });
        }



        $('#jumlahpoin').text(localStorage.getItem(cacheKey));




    });







});
