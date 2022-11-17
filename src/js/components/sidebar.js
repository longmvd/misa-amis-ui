
/**
 * Click thu nhỏ sidebar
 * Author: MDLONG(22/10/2022)
 */
export function handleMinimizeSidebar(){
    document.querySelector('#btn-bar--black').addEventListener('click',minimizeSidebar)
}

/**
 * Click phóng to sidebar
 * Author: MDLONG(22/10/2022)
 */
export function handleEnlargeSidebar(){
    document.querySelector('#btn-bar--white').addEventListener('click',enlargeSidebar)
}

/**
 * Thu nhỏ sidebar
 * Author: MDLONG(22/10/2022)
 */
export function minimizeSidebar(){
    document.querySelector('.sidebar').classList.add("mini");
    document.querySelector('#btn-bar--black').style.display = 'none';
}

/**
 * Phóng to sidebar
 * Author: MDLONG(22/10/2022)
 */
function enlargeSidebar(){
    document.querySelector('.sidebar').classList.remove('mini');
    document.querySelector('#btn-bar--black').style.display = 'block';
}
