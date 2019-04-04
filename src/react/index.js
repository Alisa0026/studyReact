// 用自己写的react实现最简单渲染效果
import $ from 'jquery'
import createUnitInstance from '../util/unit'
import createElement from '../util/element'
import Component from '../util/component'

let React = {
    nextRootIndex: 0,
    render,
    createElement,
    Component
}

function render(ele, container) {
    // 扩展、通用，工厂方法，实例化组件
    let unitInstance = createUnitInstance(ele);
    // 获取对应的html
    let unit = unitInstance.getUnit(React.nextRootIndex);
    // 放到容器中
    $(container).html(unit);
    // 触发一个自定义事件 mounted，因为 getUnit中不同的组件都会监听 mounted 事件
    $(document).trigger('mounted');
}


export default React;