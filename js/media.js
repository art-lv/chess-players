document.addEventListener("DOMContentLoaded", () => {
    const img = document.querySelector(".js-promo--img")
    const top = document.querySelector(".js-promo--top")
    const bottom = document.querySelector(".js-promo--bottom")
    const content = document.querySelector(".js-promo--content")

    if (!img || !bottom || !content) return

    const mq = window.matchMedia("(max-width: 1365px)")

    function relocate(e) {
        if (!img || !bottom || !content) return

        if (e.matches) {
            bottom.before(img)
        } else {
            content.after(img)
        }
    }

    relocate(mq)
    mq.addEventListener("change", relocate)
})
