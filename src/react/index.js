// 用自己写的react实现最简单渲染效果
import $ from 'jquery'
import createUnitInstance from '../util/unit'

let React = {
    nextRootIndex: 0,
    render
}

function render(ele, container) {
    //test
    // 扩展、通用，工厂方法，实例化组件
    let unitInstance = createUnitInstance(ele);
    // 获取对应的html
    let unit = unitInstance.getUnit(React.nextRootIndex);
    // 放到容器中
    $(container).html(unit);
}


export default React;