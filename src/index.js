import React,{Component} from "react";
import ReactDOM from "react-dom";
import './css/index.css';
import HeadModel from './components/header';
import LiModel from './components/Li';
import FooterModel from './components/footer';

class App extends Component{
  constructor(){
    super();
  
    this.state = {
      val:'',
      data:[],
      view:'#/all'
    }
  }
  componentDidMount(){
  	this.setState({
  		data:getItem('data')
  	})
  }
  changeVal = (newVal) => {
    this.setState({
      val:newVal
    })
  }
  changeData = (newData) => {
  	let {data} = this.state;
  	let data2 = Object.assign(data)
  	data2.unshift(newData)
    this.setState({
    	val:'',
      data:data2
    })
  }
  pchangeChicked = (id) =>{
  	let {data} = this.state;
  	let data2 = Object.assign(data)
  	data2.forEach(e=>{
  		if(e.id===id){
  			e.checked=!e.checked;
  		}
  	})
  	this.setState({
  		data:data2
  	})
  }
  //删除
  remove = (id) =>{
  	let {data} = this.state;
  	let data2 = null;
  	data2 = data.filter((e,i)=>{
  		return e.id!== id;
  	})
  	this.setState({
  		data:data2
  	})
  }
  //全选
  allChange = (ev) =>{
  	let {data} = this.state;
  	let {checked} = ev.target;
  	let data2 = Object.assign(data);
  	data2.forEach((e)=>{
  		e.checked = checked;
  	})
		this.setState({
			data:data2
		})
  }
  //替换数据
  changeText = (newData) =>{
  	let {data} = this.state;
  	let data2 = Object.assign(data)
  	data2.forEach((e,i)=>{
  		if(e.id===newData.id){
  			data2.splice(i,1,newData)
  		}
  	})
  	this.setState({
  		data:data2
  	})
  }
  //清除完成项
  clearFinish = () =>{
  	let {data} = this.state;
  	let data2 = Object.assign(data);
  	data2 = data2.filter(e=>{
  		return e.checked;
  	})
  	this.setState({
  		data:data2
  	})
  }
  //哈希
  changeView = (newView) => {
  	this.setState({
  		view:newView
  	})
  }
  render(){
  	let {data} = this.state;
		let data2 = null;
		let all = false;
		
		//全选开关
		let changeAll = null;
		let footer = null;
		let filter = [];
		let filterView = Object.assign(data);

		//过滤未选中
		filter = data.filter(e=>{
			return !e.checked
		})
		//过滤视图
		switch (this.state.view){
			case '#/active':
				filterView = filterView.filter(e=>{
					return !e.checked
				})
				break;
			case '#/completed':
				filterView = filterView.filter(e=>{
					return e.checked
				})
				break;
			default:
				filterView = Object.assign(data);
				break;
		}
		
		
		data2 = filterView.map((e,i)=>{
			let data ={
				key:e.id,
				checked:e.checked,
				txt:e.txt,
				id:e.id,
				pchangeChicked:this.pchangeChicked,
				remove:this.remove,
				changeText:this.changeText
			}
			return <LiModel {...data}/>
		})

		if(data.length){
			all = data.every(e=>e.checked);
			changeAll = (
				<input
          className="toggle-all"
          type="checkbox"
          checked={all} 
          onChange={this.allChange}
        />
			)
			
			//放置footer
			let footerdata = {
				num : filter.length,
				clearFinish : this.clearFinish,
				changeView: this.changeView,
				view:this.state.view
			}
			footer = <FooterModel {...footerdata}/>

			localStorage.setItem('data',JSON.stringify(data))
		}
		
		
		
		
    return (
      <div>
        <HeadModel 
	        val={this.state.val} 
	        changeVal={this.changeVal} 
	        data={this.state.data} 
	        changeData ={this.changeData}
        />
        <section className="main">
            {changeAll}
            <ul className="todo-list">
							{data2}
            </ul>
        </section>
        {footer}
      </div>
    )
  }
}
//获取本地数据有数据返回数据，没数据走默认
function getItem(data){
	return JSON.parse(window.localStorage.getItem(data)) || [{checked:false,id:10,txt:'呵呵'}];
}

ReactDOM.render(<App />,document.getElementById('app'))

if (module.hot) {
  module.hot.accept();
}
