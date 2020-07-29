//Create Breeds list
$(document).ready(function(){

    //get list of breeds
    $.ajax({
        type: "get",
        url: "https://dog.ceo/api/breeds/list/all",
        success: function(data) {

            //json data
            let thisData = data.message;
            //empty array
            let newData = [];
            
            //manipulate the DOM to create a dropdown list of breeds
            for(var i in thisData){
                if(thisData[i].length>0){
                    thisData[i].forEach(element => {
                        newData.push(i+" "+element);
                        $('#breeds_list').append('<option value=' + i + "-" + element + '>' + element + " " + i + '</option>');
                   });
               }else{
                    $('#breeds_list').append('<option value=' + i + '>' + i + '</option>');
                }
            }
        },
        error: function(err){
            console.log(err);
        }
    }); //end ajax

});


//Default: display images of "Affenpinscher"
$(document).ready(function(){
    let results = $('#results');
    $.ajax({
        type: "get",
        url: "https://dog.ceo/api/breed/affenpinscher/images",
        success: function(data) {

            //Json data
            let dogData = data.message;

            //conditions
            let length = dogData.length;
            if(dogData.length>8){
                length = 8;
            }

            for(let i = 0; i < length; i++ ){
                let image = dogData[i];
                results.append('<div class="col-xl-3 col-md-6 mb-4">'
                                    +'<div class="card border-0 shadow">'
                                        +'<div class="bg-image" style="background-image: url('+image+');">'
                                    +'</div>'
                                +'</div>');
            }
        },
        error: function(err){
            console.log(err);
        }
    }); //end ajax
});



$(document).ready(function(){
    $('#breeds_list').on('change', function(){

        //selected value
        let selected = this.value;
        // //get page
        // let current_url = window.location.href;
        // let url = new URL(current_url);
        // let page = url.searchParams.get("page");

        // //set page
        // if(!page){
        //     page = 1;
        // }else{
        //     page = Number(page)+1;
        // }
        
        // window.history.replaceState(null, null, "?page="+page.toString());

        let results = $('#results');
        results.html("");
        
        //get request
        $.ajax({
            type: "get",
            url: "https://dog.ceo/api/breed/"+selected.replace('-', '/')+"/images",
            success: function(data) {

                //Json data
                let dogData = data.message;

                //conditions
                let length = dogData.length;
                if(dogData.length>8){
                    length = 8;
                }

                for(let i = 0; i < length; i++ ){
                    let image = dogData[i];
                    results.append('<div class="col-xl-3 col-md-6 mb-4">'
                                        +'<div class="card border-0 shadow">'
                                            +'<div class="bg-image" style="background-image: url('+image+');">'
                                        +'</div>'
                                    +'</div>');
                }
            },
            error: function(err){
                console.log(err);
            }
        }); //end ajax
        
        
    });
});
