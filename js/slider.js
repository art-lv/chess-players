function initSlider(sliderClass, options = {}) {
    const {
        loop = false,
        autoplay = false,
        interval = 4000,
        slidesToShow = 3,
        slidesToScroll = 1,
        responsive = {},
        controls = false,
        counter = false,
        dots = false,
    } = options

    const sliderContainer = document.querySelector(`.${sliderClass}`)
    if (!sliderContainer) return

    const track = sliderContainer.querySelector(".js-track")
    const slides = sliderContainer.querySelectorAll(".js-slide")
    const btnPrev = sliderContainer.querySelector(".js-prev")
    const btnNext = sliderContainer.querySelector(".js-next")
    const currentEl = sliderContainer.querySelector(".js-current")
    const totalEl = sliderContainer.querySelector(".js-total")
    const dotsContainer = sliderContainer.querySelector(".js-dots")
    const slider = sliderContainer.querySelector(".js-slider")
    if (!track || slides.length === 0 || !slider) return

    let index = 0
    const totalSlides = slides.length
    let currentSlidesToShow = slidesToShow
    let currentSlidesToScroll = slidesToScroll
    let totalPages = Math.ceil(totalSlides / currentSlidesToShow)
    let slideWidth = 0
    let autoTimer = null
    let dotsArr = []

    function resetAutoplay() {
        if (!autoplay) return
        clearInterval(autoTimer)
        autoTimer = setInterval(nextSlide, interval)
    }

    function applyResponsive() {
        const width = window.innerWidth

        currentSlidesToShow = slidesToShow
        currentSlidesToScroll = slidesToScroll

        Object.keys(responsive)
            .sort((a, b) => b - a)
            .forEach((breakpoint) => {
                if (width <= breakpoint) {
                    currentSlidesToShow =
                        responsive[breakpoint].slidesToShow ??
                        currentSlidesToShow

                    currentSlidesToScroll =
                        responsive[breakpoint].slidesToScroll ??
                        currentSlidesToScroll
                }
            })

        totalPages = Math.ceil(totalSlides / currentSlidesToShow)

        if (index > totalSlides - currentSlidesToShow) {
            index = Math.max(0, totalSlides - currentSlidesToShow)
        }
    }

    function setSlidesWidth() {
        const containerWidth = slider.offsetWidth
        slideWidth = containerWidth / currentSlidesToShow

        slides.forEach((slide) => {
            slide.style.width = `${slideWidth}px`
            slide.style.flex = `0 0 ${slideWidth}px`
        })
    }

    function createDots() {
        if (!dots || !dotsContainer) return

        dotsContainer.innerHTML = ""
        dotsArr = []

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement("span")
            dot.classList.add("slider-dot")

            dot.addEventListener("click", () => {
                index = i * currentSlidesToShow
                updateSlider()
                resetAutoplay()
            })

            dotsContainer.appendChild(dot)
            dotsArr.push(dot)
        }
    }

    function updateSlider() {
        track.style.transform = `translateX(-${index * slideWidth}px)`

        const currentPage = Math.floor(index / currentSlidesToShow)

        if (counter && currentEl) {
            currentEl.textContent = currentPage + 1
        }

        if (counter && totalEl) {
            totalEl.textContent = totalPages
        }

        if (controls && !loop) {
            if (btnPrev) {
                btnPrev.disabled = index === 0
            }

            if (btnNext) {
                btnNext.disabled = index >= totalSlides - currentSlidesToShow
            }
        }

        if (dots && dotsArr.length) {
            dotsArr.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentPage)
            })
        }
    }

    function nextSlide() {
        if (index < totalSlides - currentSlidesToShow) {
            index += currentSlidesToScroll

            if (index > totalSlides - currentSlidesToShow) {
                index = totalSlides - currentSlidesToShow
            }
        } else if (loop) {
            index = 0
        }

        updateSlider()
        resetAutoplay()
    }

    function prevSlide() {
        if (index > 0) {
            index -= currentSlidesToScroll

            if (index < 0) {
                index = 0
            }
        } else if (loop) {
            index = totalSlides - currentSlidesToShow
        }

        updateSlider()
        resetAutoplay()
    }

    if (controls) {
        if (btnNext) btnNext.addEventListener("click", nextSlide)
        if (btnPrev) btnPrev.addEventListener("click", prevSlide)
    }

    if (autoplay) {
        autoTimer = setInterval(nextSlide, interval)
    }

    window.addEventListener("resize", () => {
        applyResponsive()
        setSlidesWidth()
        createDots()
        updateSlider()
    })

    applyResponsive()
    setSlidesWidth()
    createDots()
    updateSlider()
}

initSlider("js-participants-slider", {
    loop: true,
    autoplay: true,
    interval: 4000,
    slidesToShow: 3,
    slidesToScroll: 3,
    controls: true,
    counter: true,
    dots: false,

    responsive: {
        1365: {
            slidesToShow: 2,
            slidesToScroll: 2,
        },
        767: {
            slidesToShow: 1,
            slidesToScroll: 1,
        },
    },
})

initSlider("js-stages-slider", {
    loop: false,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    controls: true,
    counter: false,
    dots: true,
})
