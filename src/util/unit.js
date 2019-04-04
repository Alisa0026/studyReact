import $ from 'jquery';

class Unit {
    constructor(ele) {
        this._currentEle = ele;
    }
}

// 字符串、数字
class ReactTextUnit extends Unit {
    getUnit(rootId) {
        this._rootId = rootId;
        return `<span data-reactid='${rootId}'>${this._currentEle}</span>`
    }
}

// 原生dom节点
class ReactNativeUnit extends Unit {

    getUnit(rootId) {
        this._rootId = rootId;
        let { type, props } = this._currentEle;
        let tagStart = `<${type} data-reactid='${rootId}'`;
        let childrenStr = '';
        let tagEnd = `</${type}>`;

        for (const propsKey in props) {
            if (/^on[A-Z]/.test(propsKey)) {
                // onClick截取出Click
                let eventType = propsKey.slice(2).toLowerCase();
                // 绑定事件
                $(document).delegate(`[data-reactid="${rootId}"]`, eventType, props[propsKey])
            
            } else if (propsKey === 'children') {
                // 子节点
                let children = props.children || [];
                childrenStr = children.map((child, i) => {
                    let childUnit = createUnitInstance(child);
                    return childUnit.getUnit(`${rootId}.${i}`)
                }).join('');

            } else {
                // 属性
                tagStart += ` ${propsKey}=${props[propsKey]}`;
            }
        }
        // <div id="sayHello">say<button>Hello</button></div>
        return `${tagStart}>${childrenStr}${tagEnd}`;
    }
}

// 复合组件
class ReactCompositeUnit extends Unit {
    getUnit(rootId) {
        this._rootId = rootId;
        let { type: Component, props } = this._currentEle;
        // 先创建组件实例
        let componentInstance = this._componentInstance = new Component(props);
        // 如果有组件将要挂载函数，去执行
        componentInstance.componentWillMount && componentInstance.componentWillMount()
        // 调用render 返回虚拟DOM
        let renderEle = componentInstance.render();
        // 获取渲染的单元实例
        let renderUnitInstance = createUnitInstance(renderEle);
        // 获取对应的HTMl
        let renderHtml = renderUnitInstance.getUnit(rootId);
        // 自定义mounted事件
        $(document).on('mounted', () => {
            componentInstance.componentDidMount && componentInstance.componentDidMount()
        });
        return renderHtml

    }
}

function createUnitInstance(ele) {
    if (typeof ele === 'number' || typeof ele === 'string') {
        return new ReactTextUnit(ele)
    }
    // {type:'div',props:{}} 原生dom节点
    if (typeof ele === 'object' && typeof ele.type === 'string') {
        return new ReactNativeUnit(ele)
    }
    // 自定义节点
    if (typeof ele === 'object' && typeof ele.type === 'function') {
        return new ReactCompositeUnit(ele)
    }
}
export default createUnitInstance