// 用自己写的react实现最简单渲染效果
let React = {
    nextRootIndex:0,
    render
}

function render(ele,container) {
    container.innerHTML = `<span data-reactid='${React.nextRootIndex}'>${ele}</span>`
}


export default React;