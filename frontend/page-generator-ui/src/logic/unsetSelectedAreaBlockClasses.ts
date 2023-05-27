const unsetSelectedAreaBlockClasses = () => {
    Array.from(document.querySelectorAll(".currently-selected-area, .currently-selected-block")).forEach((el) => {
        el.classList.remove("currently-selected-area")
        el.classList.remove("currently-selected-block")
    })
}
export default unsetSelectedAreaBlockClasses