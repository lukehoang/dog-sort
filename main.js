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
            
            //re-render the DOM to create a dropdown list of breeds
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
    let selected = "affenpinscher";
    createView(selected);
});

//Breeds list on selected
$(document).ready(function(){
    $('#breeds_list').on('change', function(){
        //selected value
        let selected = this.value;
        createView(selected);
    });
});


//Function to re-render the view
function createView(selected){
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
                //create pagination when there are more than 8 images in the collections
                let number_of_pages = (dogData.length - dogData.length % 8) / 8 + 1;
                $('#pagination').html("");
                $('#pagination').removeClass('d-none');
                for(let i = 1; i <= number_of_pages; i++){
                    if(i == 1){
                        $('#pagination').append('<li class="page-item"><a class="page-link active" id="page-link-'+i+'" onclick="pageUpdate(' + i + ');">' + i + '</a></li>');
                    }else{
                        $('#pagination').append('<li class="page-item"><a class="page-link" id="page-link-'+i+'" onclick="pageUpdate(' + i + ');">' + i + '</a></li>');
                    }
                }

            }else{
                //hide pagination when there are less then 8 images in the collections
                $('#pagination').addClass('d-none');
            }

            ///re-render the DOM
            for(let i = 0; i < length; i++ ){
                let image = dogData[i];
                results.append('<div class="col-xl-3 col-md-6 mb-4">'
                                    +'<div class="card border-0 shadow">'
                                        +'<div class="bg-image" style="background-image: url('+image+');">'
                                            +'<a data-lity href="'+image+'"><i class="fas fa-search-plus icon"></i></a>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>');
            }
        },
        error: function(err){
            console.log(err);
        }
    }); //end ajax
}



//function for paging
function pageUpdate(page){

    //set active page
    $('.page-link').removeClass('active');
    let link = "#page-link-"+page.toString();
    let page_link = $(link).addClass('active');

    //truncate results
    let results = $('#results');
    results.html("");

    //get current breed selected
    let selected = $('#breeds_list').val();
   
    //re-render the DOM
    $.ajax({
        type: "get",
        url: "https://dog.ceo/api/breed/"+selected.replace('-', '/')+"/images",
        success: function(data) {
            let dogData = data.message;
            let i = 0;
            let length = 8;
            if(page > 1){
                length = page*8;
                i = length - 8;
            }
            for(i; i<length; i++ ){
                if(dogData[i] != undefined){
                let image = dogData[i];
                results.append('<div class="col-xl-3 col-md-6 mb-4">'
                                    +'<div class="card border-0 shadow">'
                                        +'<div class="bg-image" style="background-image: url('+image+');">'
                                            +'<a data-lity href="'+image+'"><i class="fas fa-search-plus icon"></i></a>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>');
                }
            }
        },
        error: function(err){
            console.log(err);
        }
    }); //end ajax
}