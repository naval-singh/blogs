$(document).ready(function(){

    $.getJSON('http://localhost:3000/fetchCategories',function(data){
        $.each(data,function(index,item){
            $('#category').append($('<option>').text(item.category))
        })
    })    
});