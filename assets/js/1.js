
var salesMarkers = [
    ['м.Львів', 'вул. Кульпарківська, 160', '49.815468', '23.983941', 1], ['м.Одеса', 'вул.Контр-адмірала Луніна, 2', '46.434762', '30.736070', 2], ['м.Харків', 'вул. Алчевських, 17', '50.003682', '36.241307', 3], ['м.Миколаїв', 'Проспект Центральний, 28 ', '46.968153', '31.974917', 4], ['м.Київ', 'вул.Борщаговська 206', '50.442543', '30.435047', 5], ['м.Запоріжжя', 'Проспект Перемоги, 61  (навпроти ТЦ «Амстор»)', '47.839009', '35.122601', 6], ['м.Дніпро', 'вул. Новосільна 15а', '48.447024', '35.018368', 7], ['м.Херсон', 'вул. Черноморська,38', '46.659933', '32.633992', 8],
]

$(document).ready(function(){
    if( $(window).width()>991 ){

        $(document).ready(function() {
            $('#fullpage').fullpage({
                fixedElements: '#left-colum, #right-colum-d,#right-colum-u,.copyright',
                paddingBottom: '0px',
                resize : true,
                anchors:['main', 'advantage','production', 'objects',  'tehnic', 'contacts'],
                menu: '#MenuNav',
                animateAnchor: false,
            });
        });

        $('.down-scroll').on('click',function(){
            $.fn.fullpage.moveSectionDown();
        });
        $('.down-scroll.up').on('click',function(){
            $.fn.fullpage.moveTo(1, 0);
        });
        //
    } else {
        $('.section.main').attr('id','main');
        $('.section.advantage').attr('id','advantage');
        $('.section.object').attr('id','objects');
        $('.section.tehnic').attr('id','tehnic');
        $('.section.production').attr('id','production');
        $('.section.contacts').attr('id','contacts');
        $('.down-scroll.up').on('click',function(){
            $('html, body').animate({ scrollTop: 0}, 1000);
        });

    }
});
       