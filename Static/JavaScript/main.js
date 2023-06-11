const $openClose = document.getElementById("open-close"),
      $aside = document.getElementById("aside");

$openClose.addEventListener("click",()=>{
    $aside.classList.toggle("desplegar")
})

$('#content article').hide();  
$('#content #tab1').show();
$('aside.tabs div a').click(function(){
    $('#content article').hide();
    var activeTab = $(this).attr('href');
    $(activeTab).show();     
    return false;
<<<<<<< HEAD
});
=======
});
>>>>>>> b4a1938011be4a044b702464fdbd86b9a48d3fbf
