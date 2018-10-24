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
            Add
          </button>
      </form>
    )
  }
}

class ListArea extends React.Component{
  constructor(props){
    super(props);
    this.DeleteMe = this.DeleteMe.bind(this);
  }
  DeleteMe(id){
    this.props.DeleteItem(id);
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
               OnDelete={this.DeleteMe}
             />
       )
      }if(chooseValue===2 && complete===true){
        return(  
            <AppTodos 
                key={index} 
                id={id} 
                text={text} 
                OnDelete={this.DeleteMe}
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
  }
  handleDelete(){
    let id = this.props.id;
    this.props.OnDelete(id);
  }
  render(){
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
          <span className='ui blue button'
                // style={styles.delete} 
                onClick={this.handleDelete}>
                completed
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
            not complete
          </button>
          <button type='submit' onClick={this.handleComplete}>
            completed
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
          My TODO list with React
        </header>
        <FormArea AddTodoItem = {this.OnAddTodoItem} count={this.state.count} CountChange={this.OnCountChange} />
        <ListArea data = {data} DeleteItem={this.OnDelete} choosevalue={this.state.choosevalue}/>
        <AppFooter choosevalue={this.state.choosevalue} OnNotComplete = {this.handleNotComplete} OnComplete={this.handleComplete}/>
      </div>
    );
  }
}

export default App;
