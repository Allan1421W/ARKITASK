$('.sections article').hide();  
$('.sections #tab1').show();
$('ul.tabs li a').click(function(){
    $('.sections article').hide();

    var activeTab = $(this).attr('href');
    $(activeTab).show();     
    return false;
});