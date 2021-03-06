function initModal() {
    let overlay = document.querySelector(".overlay--modal");
    let header = document.querySelector(".header"); // ему тоже будем добавлять paddingRight, так как он fixed
    let withPaddingElems = [g_body, header]; // сюда добавляем все элементы, к которым хотим добавить padding 

    function toggleModal() {
        overlay.classList.toggle("visible");
        g_body.classList.toggle("hideScroll");
        withPaddingElems.forEach(elem => { // и тут этот padding
            elem.style.paddingRight = (elem.style.paddingRight === "" ? `${g_scrollBarWidth}px` : "");
        });
    }
    
    function showModal(id) {
        toggleModal();
        document.querySelector(`#${id}`).classList.add("visible");
    }

    function changeModal(id) { // закрыть текущее модальное окно, и открыть новое через 700 мс
        closeModal();
        setTimeout(() => showModal(id), 700);
    }
    
    function closeModal() {
        document.querySelector(".modal.visible").classList.remove("visible");
        setTimeout(() => {
            toggleModal();
        }, 150); // так как 0.3s ease-in-out, это нужно чтобы окно модальное не прыгало резко влево во время закрытия
    }
    
    document.querySelectorAll("[data-modal]").forEach(item => {

        item.addEventListener("click", () => {
            showModal(item.dataset.modal);

            if (item.dataset.changeportfolio !== undefined) {
                document.querySelector(".modal__portfolio img").setAttribute("src", "" + item.dataset.changeportfolio);
                document.querySelector(".modal__portfolio source").setAttribute("srcset", item.dataset.changeportfolio.replace(/\.[^/.]+$/, ".webp"));
                //console.log(item.dataset.changeportfolio);
            }
        });
    });

    document.querySelectorAll("[data-changeModal]").forEach(item => {
        item.addEventListener("click", () => changeModal(item.dataset.changemodal));
    });
    
    document.querySelectorAll("[data-closeModal]").forEach(item => {
        item.addEventListener("click", () => closeModal());
    });

    document.querySelectorAll(".card__form").forEach(form => {
        inputs = form.querySelectorAll(".c-field__input");
        
        form.addEventListener("submit", function(e) {
            console.log("Отправка формы");

            $.post("./ajax.php",
            {
                act: "send",
                name: inputs[0].value,
                mail: inputs[1].value,
                number: inputs[2].value,
                from: inputs[3].value
            },
            function (result) {
                if (result) {
                    if (inputs[3].classList.contains("themeFrom")) { // если форма была отправлена с модалки
                        changeModal("modal_success");
                    }
                    else {
                        showModal("modal_success");
                    }
                }
                else {
                    console.log("Ошибка соединения с сервером!");
                }
            });

            e.preventDefault();
        });
    });

}

initModal();