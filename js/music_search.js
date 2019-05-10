var li = "";
$("#search").click(function(){
    li = "";
    $.ajax({
        url: "http://10.36.133.110:3000/search",
        type: "get",
        dataType: "json",
        data: "keywords="+$("#input").val()+"&limit=50",
        success: function(res){
            var songs = res.result.songs;
            for(let i=0;i<songs.length;i++){
                let item = songs[i];
                li+=`<tr m_id="${item['id']}" index="${i}">
                        <td>${item['name']}</td>
                        <td>${item['artists'][0]['name']}</td>
                        <td>
                            <a href="javascript: void(0);" class="glyphicon glyphicon-play text-primary"></a>
                            &nbsp;
                            <a href="javascript: void(0);" class="glyphicon glyphicon-plus text-primary"></a></td>
                    </tr>`;
            }
            $("#list>tbody").html(li);
        }
    })
})

$("#list>tbody").on("click", function(e){
    if($(e.target).parent().parent().attr("m_id")){
        if($(e.target).hasClass("glyphicon-play")){
            var dealTr;
            dealTr = $(e.target).parent().parent();
            play(dealTr);
        }
    }
})