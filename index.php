<!--
Champion builder v0.1
js, php, css/scss, gulp, jquery
made by 4yk (Yasinskiy Roman)
-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="assets/css/compressed/style.min.css">
	<link rel="stylesheet" href="assets/css/vendor/perfect-scrollbar.css">

</head>
<body lang="en_US">
<section class="main-info">
    <div class="container">
        <div class="f-wrap no-wrap">
            <div class="icon">
                <img src="" alt="" class="js-icon-main">
            </div>
            <div class="spells">
                <div class="spell-items">
                    <div class="spl-item js-icon-p"><img src="" alt=""></div>
                    <div class="spl-item js-icon-q"><img src="" alt=""></div>
                    <div class="spl-item js-icon-w"><img src="" alt=""></div>
                    <div class="spl-item js-icon-e"><img src="" alt=""></div>
                    <div class="spl-item js-icon-r"><img src="" alt=""></div>
                </div>
                <div class="spell-descr">
                    <div class="spl-dscr js-spell-p">
                        <p class="title"></p>
                        <p class="tooltip"></p>
                    </div>
                    <div class="spl-dscr js-spell-q">
                        <p class="title"></p>
                        <p class="tooltip"></p>
                    </div>
                    <div class="spl-dscr js-spell-w">
                        <p class="title"></p>
                        <p class="tooltip"></p>
                    </div>
                    <div class="spl-dscr js-spell-e">
                        <p class="title"></p>
                        <p class="tooltip"></p>
                    </div>
                    <div class="spl-dscr js-spell-r">
                        <p class="title"></p>
                        <p class="tooltip"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>


</section>
<section class="main-block">
    <div class="container">
        <div class="f-wrap">
            <section class="stats">
                <div class="level-block">
                    <p>Your level:</p>
                    <input type="number" class="js-level" value="0">
                </div>
                <table class="js-stats main-stats" border="1px"></table>
            </section>
            <div class="additional-blocks">

            </div>
        </div>
    </div>
</section>
<!--    Popup Champion-->
<div class="champ-popup js-popup" id="champion-popup">
    <div class="cont ">
		<div class="title">Choose your Champion:</div>
<!--		<span class="js-close-popup champ-popup__close">-->
<!--			<svg width="20" height="20">-->
<!--				<path d="M 0 0 L 20 20" stroke-width="2" stroke="#000" fill="transparent"/>-->
<!--				<path d="M 20 0 L 0 20" stroke-width="2" stroke="#000" fill="transparent"/>-->
<!--			</svg>-->
<!--		</span>-->
		<div class="js-champ-cont js-scroll-bar champ-popup__cont">

		</div>
	</div>
</div>

<!-- JQuery -->
<!--<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>-->
<script src="assets/js/build.js"></script>
</body>
</html>

