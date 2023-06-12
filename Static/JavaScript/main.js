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
});
