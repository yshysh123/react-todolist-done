import React,{Component} from "react";
class LiModel extends Component{
  constructor(){
    super();
    this.state = {
    	db:false,
    	esc:false
    }
  }
  changeChicked = () =>{
  	this.props.pchangeChicked(this.props.id)
  }
  remove = () =>{
  	this.props.remove(this.props.id)
  }
  //双击
  dbclick = (ev) =>{
  	this.setState({
  		db:true
  	},()=>{
  		this.db.value = this.props.txt;
  		this.db.focus();
  	})
  }
  //失焦
  blur = () =>{
  	if(this.db.value && !this.state.esc){
  		let {id,checked} = this.props;
	  	let newData = {
	  		id:id,
	  		checked:checked,
	  		txt:this.db.value
	  	}
	  	this.props.changeText(newData)
  	}
  	this.setState({
  		db:false,
  		esc:false
  	},()=>{
		this.db.value='';
  	})
  }
  //按键
  keyup = (ev) =>{
  	//回车保存数据
  	if(ev.keyCode===13){
	  	this.blur()
  	}
  	if(ev.keyCode===27){
  		this.setState({
	  		esc:true
	  	},()=>{
	  		this.blur()
	  	});
  	}
  }
  render(){
  	let {txt,checked} = this.props;
  	let sClass = checked?'completed':''
  	if(this.state.db){
  		sClass+=' editing'
  	}
    return (
      <li className={sClass}>
          <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={checked} 
                onChange={this.changeChicked}
               />
              <label onDoubleClick={this.dbclick}>{txt}</label>
              <button className="destroy" onClick={this.remove}></button>
          </div>
          <input 
	          type="text" 
	          className="edit"
	          onBlur={this.blur}
	          onKeyUp = {this.keyup}
	          ref = {(elem)=>{this.db=elem}}
          />
      </li>
    )
  }
}
export default LiModel;
