/**
 * Xử lý tooltips
 * Author: MDLONG(22/10/2022)
 */
export function handleTooltip(){
    let haveTooltips = this.$el.querySelectorAll('.have-tooltip')
    Array.from(haveTooltips).forEach(element =>{
        element.addEventListener('mouseenter', showToolTip.bind(this))
        element.addEventListener('mouseleave', hideToolTip.bind(this))
    })
}
/**
 * Hiển thị tooltip
 * Author: MDLONG(22/10/2022)
 * @param {event} event 
 */
function showToolTip(event){
    let x = event.clientX + 20
    let y = event.clientY + 20
    let tooltip = this.$el.querySelector('.tooltip')
    tooltip.innerText = ''
    tooltip.innerText = event.currentTarget.getAttribute('tooltip')
    tooltip.style.top = y + 'px';
    tooltip.style.left = x + 'px'
    tooltip.style.visibility= 'visible'
}
/**
 * Ẩn thị tooltip
 * Author: MDLONG(22/10/2022)
 * 
 */
function hideToolTip(){
    this.$el.querySelector('.tooltip').style.visibility = 'hidden';
}
