/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React ,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';



class App extends Component{

  constructor(){
    super();
    this.state={
      expressionText:"",
      result:""
    }

    this.operationsArray=["Del","+","-","/","*","C"];

    this.handlePressed=this.handlePressed.bind(this);
    this.clearText=this.clearText.bind(this);
    
  }

  deleteElement(){  
      this.setState((prev)=>{
        let temp=prev.expressionText.slice(0,(prev.expressionText.length-1));
        return{
          expressionText:temp
        }
      })
  }

  handlePressed(text){
    this.setState((prev)=>{
      return{
        expressionText:prev.expressionText+text
      }
    });
    
  }

  handleOperationPressed(text){
    let temp=this.state.expressionText.split('').pop();
    if(this.state.expressionText==="" || temp==="+"|| temp==="-"|| temp==="*"|| temp==="/"){
      return;
    }
    else{
      this.setState((prev)=>{
        return{
          expressionText:prev.expressionText+text
        }
      })
    }
  }

  clearText(){
    this.setState((prev)=>{
      return{
        expressionText:"",
        result:""
      }
    })
  }

  evaluateResult(){
    let lastElement=this.state.expressionText.slice(-1);
    let isValid=lastElement!=="+" && lastElement!=="-" && lastElement!=="*" && lastElement!=="/";
    if(isValid){
    this.setState((prev)=>{
      const temp=eval(prev.expressionText);
      return{
        result:temp
      }
    })
  }
  else{
    return;
  }
  }

  render(){
    let numbersArray=[[1,2,3],[4,5,6],[7,8,9],[".",0,"="]];
    let rows=[];
    for(let i=0;i<4;i++){
      let col=[];
      for(let j=0;j<3;j++){
        if(numbersArray[i][j]!=="="){
          col.push(<TouchableOpacity key={numbersArray[i][j]} onPress={()=>this.handlePressed(numbersArray[i][j])} style={styles.btn}><Text style={styles.buttonText}>{numbersArray[i][j]}</Text></TouchableOpacity>)
        } 
        else{
          col.push(<TouchableOpacity key={numbersArray[i][j]} onPress={()=>this.evaluateResult()} style={styles.btn}><Text style={styles.buttonText}>{numbersArray[i][j]}</Text></TouchableOpacity>)
        } 
      }
        rows.push(<View key={i} style={styles.buttonRow}>{col}</View>);
    }

    let operations=[]
    for(let i=0;i<this.operationsArray.length;i++){
      if(this.operationsArray[i]==="C"){
        operations.push(<TouchableOpacity key={this.operationsArray[i]} onPress={()=>{this.clearText()}} style={styles.btn}><Text style={styles.operationText}>{this.operationsArray[i]}</Text></TouchableOpacity>)   
      }

      else if(this.operationsArray[i]==="Del"){
        operations.push(<TouchableOpacity key={this.operationsArray[i]} onPress={()=>{this.deleteElement()}} style={styles.btn}><Text style={styles.operationText}>{this.operationsArray[i]}</Text></TouchableOpacity>)
      }

      else{
        operations.push(<TouchableOpacity key={this.operationsArray[i]} onPress={()=>{this.handleOperationPressed(this.operationsArray[i])}} style={styles.btn}><Text style={styles.operationText}>{this.operationsArray[i]}</Text></TouchableOpacity>)
      }  
    }

    return(
      <View style={styles.container}>
        
          <View style={styles.result}>
            <Text style={styles.resultText}>{this.state.result}</Text>
          </View>

          <View style={styles.expression}>
            <Text style={styles.expressionText}>{this.state.expressionText}</Text>
          </View>

          <View style={styles.buttons}>
         
            <View style={styles.numbers}>
              {rows}
            </View>

            <View style={styles.operations}>
              {operations}
            </View>

        </View>

      </View>
     
    )
  }

}



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'blue'
  },

  result:{
    flex:2,
    backgroundColor:'#ffffff',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },

  expression:{
    flex:1,
    backgroundColor:'#ffffff',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },

  resultText:{
    fontSize:50,
    color:'black'
  },

  expressionText:{
    fontSize:25,
    color:'black'
  },

  buttons:{
    flex:7,
    flexDirection:'row'
  },

  numbers:{
    flex:4,
    backgroundColor:"#3a3e40",
    
  },

  btn:{
    flex:1,
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'center',
    fontSize:5

  },

  buttonRow:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },

  buttonText:{
    fontSize:50,
    color:"white"
  },

  operationText:{
    fontSize:30,
    color:"white"
  },

  operations:{
    flex:1,
    backgroundColor:"#5f6267",
    justifyContent:'space-evenly',
    alignItems:'center'
  }
});

export default App;
