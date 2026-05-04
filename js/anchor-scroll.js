document.addEventListener("DOMContentLoaded", function () {
    let anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()
            let blockID = anchor.getAttribute("href").substr(1)
            document.getElementById(blockID).scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        })
    }
})
