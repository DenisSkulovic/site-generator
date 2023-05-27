const unsetHoveredAreaBlockClasses = () => {
    Array.from(document.querySelectorAll(".currently-hovered-area, .currently-hovered-block")).forEach((el) => {
        el.classList.remove("currently-hovered-area")
        el.classList.remove("currently-hovered-block")
    })
}
export default unsetHoveredAreaBlockClasses