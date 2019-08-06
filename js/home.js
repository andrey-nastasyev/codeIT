
"use strict";
// СДЛЕАТЬ ПРОВЕРКИ НЕ ЗАБЫТЬ!!!

// СОРТИРОВКА на половину 

//Блок «Companies by Location» если будет время


// АДПТИВКА



// добавление лоадера
(function() {




    const loader = document.querySelectorAll('.lds-spinner');
    const listItem = document.querySelectorAll('.main__content');
    for (let i = 0; i < listItem.length; i++) {
        loader[i].classList.remove('notActive');
    }

    // запрос на получение списка компаний 
    fetch('http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList', { method: "POST" })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            loader[0].classList.toggle('notActive');
            fillingListСontent(myJson);
            totalCompanies(myJson);
            companyPartners(myJson);
            for (let i = 0; i < listItem.length; i++) {
                listItem[i].classList.remove('notActive');
                loader[i].classList.add('notActive');
            }
        })
        .catch(error => console.error('Ошибка:', error));

    // запрос на получение новостей для слайдера
    fetch('http://codeit.ai/codeitCandidates/serverFrontendTest/news/getList', { method: "POST" })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            fillingSliderСontent(myJson)
        })
        .catch(error => console.error('Ошибка:', error));

    // отоброжение контента в слайдере
    function fillingSliderСontent(sliderData) {

        const sliderImages = document.querySelectorAll('.item div img');
        const sliderText = document.querySelectorAll('.slideText p');
        const sliderAuthor = document.querySelectorAll('.author span');
        const sliderDate = document.querySelectorAll('.date span');
        const reg = /(\d{2})(\d{2})(\d{4})(\d{0,})/;
        for (let i = 0; i < sliderData.list.length; i++) {
            sliderImages[i].setAttribute("src", sliderData.list[i].img);
            sliderText[i].textContent = sliderData.list[i].description;
            sliderAuthor[i].textContent = sliderData.list[i].author;
            sliderDate[i].textContent = sliderData.list[i].date.replace(reg, '$1.$2.$3'); ;
        }

    }

    // наполнение данными списка
    function fillingListСontent(listData) {
        const listItem = document.querySelectorAll('.main__content_scroll div');
        for (let i = 0; i < listData.list.length; i++) {
            listItem[i].textContent = listData.list[i].name;
        }
    }


    // "подсчёт количества компаний"
    function totalCompanies(data) {
        const sumCompanies = document.querySelectorAll('.main__companies');
        sumCompanies[0].textContent = data.list.length;
    }

    // наполнение блока "Сompany Partners"
    function companyPartners(data) {
        const parentItem = document.querySelectorAll('.main__content_scroll');
        const mainBlock = document.querySelectorAll('.main__block');
        const mainIteGrid = document.querySelectorAll('.main__item_grid');
        parentItem[0].addEventListener('click', (event) => {
            var wrap = document.querySelectorAll('.main__wrap-company');
            mainIteGrid[0].classList.add("activee");
            if(wrap.length !== 0) {
                for (let i = 0; i < wrap.length; i++) {
                    mainBlock[0].removeChild(wrap[i]);
                }
            }
            let target = event.target;
            for (let i = 0; i < data.list.length; i++) {
                if(target.textContent === data.list[i].name) {
                    for (let k = 0; k < data.list[i].partners.length; k++) {
                        addCompanyPartners(data, i, k);
                    }
                }
            }
        })
    }

    // Функция добавления и сортировки 

    function addCompanyPartners(data, i, k) {
        const mainBlock = document.querySelectorAll('.main__block');
        var wrap = document.createElement('div');
        var companyPercent = document.createElement('div');
        var companyName = document.createElement('div');
        wrap.className = "main__wrap-company";
        companyPercent.className = "main__company_percent";
        companyName.className = "main__company_name";
        wrap.appendChild(companyPercent);
        wrap.appendChild(companyName);
        sortByPercent(data.list[i].partners); // сортировка по %
        companyName.textContent = data.list[i].partners[k].name
        companyPercent.textContent = data.list[i].partners[k].value + "%";
        mainBlock[0].appendChild(wrap);
    }
    // функция для сортироки по проценту
    function sortByPercent(arr) {
        arr.sort((a, b) => a.value < b.value ? 1 : -1);
    }





    const prev = document.querySelectorAll('.prev');
    const next = document.querySelectorAll('.next');
    prev[0].addEventListener('click', minusSlide);
    next[0].addEventListener('click', plusSlide);
    let slideIndex = 1;
    showSlides(slideIndex);

    /* Функция увеличивает индекс на 1, показывает следующй слайд*/
    function plusSlide() {
        showSlides(slideIndex += 1);
    }

    /* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
    function minusSlide() {
        showSlides(slideIndex -= 1);  
    }

    /* Устанавливает текущий слайд */
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    /* Основная функция слайдера */
    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("item");
        if (n > slides.length) {
        slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }

}())
