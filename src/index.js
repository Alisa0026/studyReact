// 引用自己写的react
import React from './react'

// 字符串或者数字
// React.render('123',document.getElementById('root'))

// 原生的dom节点
// let btn = React.createElement('button', { id: '1' }, 'hello')
// let ele = React.createElement('div', { id: 'wrap' }, 'say', btn)

// 自定义组件
class CountNum extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            number: 0
        }
    }

    componentWillMount() {
        console.log('Counter将要挂载');
    }

    componentDidMount() {
        console.log('Counter挂载完成');
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1
        });
    }

    render() {
        let p = React.createElement('p', {}, this.state.number);
        let button = React.createElement('button', { onClick: this.handleClick }, '+')
        return React.createElement('div', { id: 'counter' }, p, button);
    }
}

let ele = React.createElement(CountNum, { name: '计数器' })

React.render(ele, document.getElementById('root'))