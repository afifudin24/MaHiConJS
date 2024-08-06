
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2); // Tambahkan 0 di depan jika kurang dari 10
let date = ('0' + today.getDate()).slice(-2); // Tambahkan 0 di depan jika kurang dari 10
console.log(month);
console.log(year);
let formattedDate = `${year}-${month}-${date}`;
function capitalizeFirstLetter(str) {
    if (str.length === 0) return str; // Jika string kosong
    return str.charAt(0).toUpperCase() + str.slice(1);
}
$.ajax({
    url : "https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/kota.json",
    type : "GET",
    success : function(response){
        var kota = JSON.parse(response);
        console.log(JSON.parse(response))
        console.log(kota[4])
        $.each(kota, function(index, item){
            console.log(item);
            var namakota = capitalizeFirstLetter(item);
            var row = `<option value='${item}'>${namakota}</option>`;
            $(".pilihkota").append(
            row
            );
         })
    },
    error: function(err){
        console.log(err);
    }
})

$('.konverter').on('click', function () {
    console.log($(".date").val())
    // var oke = $(".date").val();
    var tanggal = $(".date").val();
    if(tanggal == ""){
        alert("Isi tanggal dahulu")
    }else{
        $('.loader').removeClass('hidden');
        $(".display").empty();
        $.ajax({
        url: `http://api.flagodna.com/hijriyah/api/` + tanggal,
        
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
            $('.loader').addClass('hidden')
            // $('.display').removeClassClass('h-0');
            $('.display').append(`
                <div class='w-full p-4'>
                 <table class="min-w-full border text-xs md:text-sm border-gray-300 rounded-md">

                            <tr>
                                <td class="border bg-gray-100 border-gray-300 p-2">Masehi</td>
                                <td class="border border-gray-300 p-2">${result[0].hari}, ${result[0].tanggal_masehi} ${result[0].bulan_masehi} ${result[0].tahun_masehi}</td>
                            </tr>
                            <tr>
                                <td class="border bg-gray-100 border-gray-300 p-2">Hijriyah</td>
                                <td class="border border-gray-300 p-2">${result[0].hari}, ${result[0].tanggal_hijriyah} ${result[0].bulan_hijriyah} ${result[0].tahun_hijriyah}</td>
                            </tr>
                            <tr>
                                <td class="border bg-gray-100 border-gray-300 p-2">Acara</td>
                                <td class="border border-gray-300 p-2">${result[0].acaranya !== "" ? result[0].acaranya : "Tidak Ada Acara"}</td>
                            </tr>
                     
                    </table>
                </div>`);
            $('.display').addClass('max-h-60');
           

            // $('.display').removeClass('opacity-0');

            console.log(result);
        },
        error: function () {
            console.log("error");
        }
    });
}
});

$(".tampilkanJadwal").click(function(){
    var namakota = $('.pilihkota').val();
    console.log(namakota)
    if(namakota == null){
        alert("Pilih Kota Dulu");
    }else{

        $('.loaderJadwal').removeClass('hidden');
        $("#tableJadwal").empty();
    $("#tableJadwal").append(`  <tr>
                        <th class="border bg-gray-100 border-gray-300 p-2">Tanggal</th>
                        <th class="border bg-gray-100 border-gray-300 p-2">Imsyak</th>
                        <th class="border bg-gray-100 border-gray-300 p-2">Shubuh</th>
                        <th class="border bg-gray-100 border-gray-300 p-2">Dzuhur</th>
                        <th class="border bg-gray-100 border-gray-300 p-2">Ashr</th>
                        <th class="border bg-gray-100 border-gray-300 p-2">Maghrib</th>
                        <th class="border bg-gray-100 border-gray-300 p-2">Isya</th>
                        
                    </tr>`);
    $.ajax({
        url : `https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${namakota}/${year}/${month}.json`,
        type : "GET",
        success : function(response){
            $('.loaderJadwal').addClass('hidden');
            var jadwal = JSON.parse(response);
            console.log(jadwal);
            $.each(jadwal, function(index, item){
                var row = `
                <tr>
                    <td class='border border-gray-300 p-2'>${item.tanggal}</td>
                    <td class='border border-gray-300 p-2'>${item.imsyak}</td>
                    <td class='border border-gray-300 p-2'>${item.shubuh}</td>
                    <td class='border border-gray-300 p-2'>${item.dzuhur}</td>
                    <td class='border border-gray-300 p-2'>${item.ashr}</td>
                    <td class='border border-gray-300 p-2'>${item.magrib}</td>
                    <td class='border border-gray-300 p-2'>${item.isya}</td>
                </tr<
            `;
            $("#tableJadwal").append(row);
            })
           
        },
        error : function(err){
            console.log(err);
        }
    });
    $('.displayJadwal').addClass('max-h-full');
}
})
$('.clear').on('click', function () {
    $('.hadits').removeClass('translate-y-0');
    $('.hadits').removeClass('opacity-100');

})