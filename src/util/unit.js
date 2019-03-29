class Unit {
    constructor(ele) {
        this._currentEle = ele;
    }
}

class ReactTextUnit extends Unit {
    getUnit(rootId) {
        this._rootId = rootId;
        return `<span data-reactid='${rootId}'>${this._currentEle}</span>`
    }
}

function createUnitInstance(ele) {
    if (typeof ele === 'number' || typeof ele === 'string') {
        return new ReactTextUnit(ele)
    }
}
export default createUnitInstance