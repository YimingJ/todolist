import React from 'react';
class FormArea extends React.Component{
  constructor(props){
    super(props);
    this.state = {value:'',};
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({value:e.target.value})
  }
  handleClick(e){
    e.preventDefault();
    let text = this.state.value;
    if(!text.trim()){
      alert('input cannot be null')
      return
    }
    let id = this.props.count;
    this.setState({value:''});
    this.props.AddTodoItem({id,text,complete:false});
    this.props.CountChange(id);
  }
  render(){
    const value = this.state.value;
    return(
      <form className='form'>
          <input value = {value} onChange={this.handleChange} placeholder='TODO'/>
          <button type='submit' className='button' onClick={this.handleClick}>
            ADD
          </button>
      </form>
    )
  }
}

class ListArea extends React.Component{
  constructor(props){
    super(props);
    this.CompleteMe = this.CompleteMe.bind(this);
    this.DeleteMe = this.DeleteMe.bind(this);
    this.handleTodo = this.handleTodo.bind(this);
  }
  handleTodo(id){
    this.props.backTodoTop(id);
  }
  DeleteMe(id){
    this.props.DeleteItem(id);
  }
  CompleteMe(id){
    this.props.CompleteItem(id);
  }
  render () { 
    let chooseValue = this.props.choosevalue;
    const a = this.props.data.map(({ id, text,complete}, index) => {
      if(chooseValue===1 && complete===false){
       return(  
           <AppTodos 
               key={index} 
               id={id} 
               text={text} 
               OnComplete={this.CompleteMe}
               OnDelete={this.DeleteMe}
               chooseValue = {chooseValue}
               backTodo = {this.handleTodo}
             />
       )
      }if(chooseValue===2 && complete===true){
        return(  
            <AppTodos 
                key={index} 
                id={id} 
                text={text} 
                OnComplete={this.CompleteMe}
                OnDelete={this.DeleteMe}
                chooseValue = {chooseValue}
                backTodo = {this.handleTodo}
              />
        )
       }else {
        return null;
      }
    })

    return (
      <div> { a } </div>
    )
  }
}

class AppTodos extends React.Component{
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handletodo = this.handletodo.bind(this);
  }
  handletodo(){
    this.props.backTodo(this.props.id);
  }
  handleDelete(){
    this.props.OnDelete(this.props.id);
  }
  handleComplete(){
    let id = this.props.id;
    this.props.OnComplete(id);
  }
  render(){
    let span = null;
    if(this.props.chooseValue===1){
      span = <span className='ui blue button'
      // style={styles.delete} 
      onClick={this.handleComplete}>
      COMPLETED
</span>
    }else{
      span = <span className='ui blue button'
      // style={styles.delete} 
      onClick={this.handletodo}>
      TODO
</span>
    }
    return(
      <div className='comment'>
        <div className='content'>
          <span 
               className='author' 
                // style={styles.title} 
          >
              {this.props.text}
              {/* <span 
                   className={this.props.complete ? 'line' : ''} 
              /> */}
          </span>
         {span}
          <span className='ui blue button'
                // style={styles.delete} 
                onClick={this.handleDelete}>
                DELETE
          </span>
        </div>
      </div>
    )
  }
}
class AppFooter extends React.Component{
  constructor(props){
    super(props);
    this.handleNotComplete = this.handleNotComplete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }
  handleNotComplete(){
    this.props.OnNotComplete();
  }
  handleComplete(){
    this.props.OnComplete();
  }
  render(){
    return(
      <div>
        <button type='submit' onClick={this.handleNotComplete}>
            TODO
          </button>
          <button type='submit' onClick={this.handleComplete}>
            COMPLETED
          </button>
      </div>
    )
  }
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.handleComplete=this.handleComplete.bind(this);
    this.handleNotComplete=this.handleNotComplete.bind(this);
    this.OnAddTodoItem = this.OnAddTodoItem.bind(this);
    this.OnCountChange = this.OnCountChange.bind(this);
    this.OnDelete = this.OnDelete.bind(this);
    this.Complete = this.Complete.bind(this);
    this.backTodo = this.backTodo.bind(this);
  }
  state = {
    choosevalue : 1,
    data: this.props.data,
    count:1,
  }
  OnAddTodoItem(newItem){
    let newData = this.state.data.concat(newItem);
    // console.log(newData);
    this.setState({data : newData});
  }
  OnCountChange(count){
    let newCount = count+1;
    this.setState({count:newCount});
  }
  OnDelete(id){
    let newData = this.state.data.slice();
    for(let i =0;i<newData.length;i++){
      if(newData[i].id===id){
        newData.splice(i,1);
      }
    }
    this.setState({data:newData});
  }
  backTodo(id){
    let newData = this.state.data.map((item)=>{
      if(item.id===id){
        item.complete=false
      }
      return item;
    })
    this.setState({data:newData});
  }
  Complete(id){
    let newData = this.state.data.map((item)=>{
      if(item.id===id){
        item.complete=true
      }
      return item;
    })
    this.setState({data:newData});
  }
  handleNotComplete(){
    this.setState({choosevalue:1});
  }
  handleComplete(){
    this.setState({choosevalue:2});
  }
  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <header className="header">
          My TODO List
        </header>
        <FormArea AddTodoItem = {this.OnAddTodoItem} count={this.state.count} CountChange={this.OnCountChange} />
        <ListArea data = {data} backTodoTop={this.backTodo} DeleteItem={this.OnDelete} CompleteItem={this.Complete} choosevalue={this.state.choosevalue}/>
        <AppFooter choosevalue={this.state.choosevalue} OnNotComplete = {this.handleNotComplete} OnComplete={this.handleComplete}/>
      </div>
    );
  }
}

export default App;
