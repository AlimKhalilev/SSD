--include("_webpsup.js");

$(document).ready(function() {

    /* GLOBALS */

    const g_html = document.documentElement;
    const g_body = document.body;
    const g_scrollBarWidth = getScrollBarWidth();

    function getScrollBarWidth() { // получаем ширину скролла
        let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0); // высота видимой страницы
        let height = Math.max(g_body.scrollHeight, g_body.offsetHeight, g_html.clientHeight, g_html.scrollHeight, g_html.offsetHeight); // общ. высота страницы

        const scrollBlock = document.createElement("div");
        scrollBlock.classList.add("scroll-block-dummy");
        g_body.appendChild(scrollBlock);

        const scrollBarWidth = scrollBlock.offsetWidth - scrollBlock.clientWidth;
        g_body.removeChild(scrollBlock);
        return (height > vh ? scrollBarWidth : 0); // если общая высота страницы больше видимой высоты, не добавляем ширину скролла
    }

    function placeElemPositionY(elem, className) { // устанавливаем элемент сверху или снизу от основного элемента
        let height = Math.max(g_body.scrollHeight, g_body.offsetHeight, g_html.clientHeight, g_html.scrollHeight, g_html.offsetHeight);
        let box = elem.getBoundingClientRect();

        if (Math.abs((height - (box.top + pageYOffset)) - elem.offsetHeight) < 1) { // если при показе у нас смещается высота страницы
            elem.classList.add(className);
        }
    }
    
    // ##############

    --include("_modal.js")
    --include("_burger.js")
    --include("_slider.js")
    --include("_scroll.js")
    
    --include("_passwordSwitcher.js")
    --include("_customSelect.js")
    --include("_details.js")
    --include("_dropdown.js")
    --include("_adaptImg.js")

    function openChooseButtons(chooseButtons) {
        chooseButtons.forEach((button, i) => {
            button.classList.add("show");
        });
    }

    const chooseButtons = document.querySelectorAll(".choose__elem .btn__descr");

    chooseButtons.forEach(item => {
        //item.style.setProperty('--width', `${item.clientWidth}px`);
        item.classList.add("hidden");
    });

    let isChooseSectionScrolled = false; // работает или не работает (false работает)

    $(document).scroll(function () {
        let scrollPos = $(window).scrollTop();
        let chooseSection = $(".choose").offset().top;
    
        if (!isChooseSectionScrolled) {

            if (Math.floor(Math.abs(scrollPos - chooseSection)) < 40) {
                console.log("УАВФЫФ");
                openChooseButtons(chooseButtons);
                isChooseSectionScrolled = true;
            }
        }
    });

});