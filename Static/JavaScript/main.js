
const $openClose = document.getElementById("open-close"),
      $aside = document.getElementById("aside");

$openClose.addEventListener("click",()=>{
    $aside.classList.toggle("desplegar")
})

$('.sections article').hide();  
$('.sections #tab1').show();
$('aside.tabs div a').click(function(){
    $('.sections article').hide();
    var activeTab = $(this).attr('href');
    $(activeTab).show();     
    return false;
});
