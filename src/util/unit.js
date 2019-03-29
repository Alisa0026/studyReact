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
class ReactNativeUnit extends Unit{

    getUnit(rootId) {
        this._rootId = rootId;
        let {type,props} = this._currentEle;
        let tagStart = `<${type} data-reactid='${rootId}'`;
        let childrenStr = '';
        let tagEnd= `</${type}>`;

        for (const propsKey in props) {
            if (propsKey === 'children') {
                // 子节点
                let children = props.children || [];
                childrenStr = children.map((child,i)=>{
                    let childUnit = createUnitInstance(child);
                    return childUnit.getUnit(`${this.rootId}.${i}`)
                }).join('');

            }else{
                // 属性
                tagStart += ` ${propsKey}=${props[propsKey]}`;
            }
        }
        // <div id="sayHello">say<button>Hello</button></div>
        return `${tagStart}>${childrenStr}${tagEnd}`;
    }
}

function createUnitInstance(ele) {
    if (typeof ele === 'number' || typeof ele === 'string') {
        return new ReactTextUnit(ele)
    }
    // {type:'div',props:{}} 原生dom节点
    if(typeof ele === 'object' && typeof ele.type === 'string'){
        return new ReactNativeUnit(ele)
    }
}
export default createUnitInstance