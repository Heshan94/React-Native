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
    })    

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
    this.setState((prev)=>{
      const temp=eval(prev.expressionText);
      return{
        result:temp
      }
    })
  }

  render(){
    let numbersArray=[[1,2,3],[4,5,6],[7,8,9],[".",0,"="]];
    let rows=[];
    for(let i=0;i<4;i++){
      let col=[];
      for(let j=0;j<3;j++){
        if(numbersArray[i][j]!=="="){
          col.push(<TouchableOpacity onPress={()=>this.handlePressed(numbersArray[i][j])} style={styles.btn}><Text style={styles.buttonText}>{numbersArray[i][j]}</Text></TouchableOpacity>)
        } 
        else{
          col.push(<TouchableOpacity onPress={()=>this.evaluateResult()} style={styles.btn}><Text style={styles.buttonText}>{numbersArray[i][j]}</Text></TouchableOpacity>)
        } 
      }
        rows.push(<View style={styles.buttonRow}>{col}</View>);
    }

    let operationsArray=["Dl","+","-","/","*","C"];
    let operations=[]
    for(let i=0;i<operationsArray.length;i++){
      if(operationsArray[i]==="C"){
        operations.push(<TouchableOpacity onPress={()=>{this.clearText()}} style={styles.btn}><Text style={styles.buttonText}>{operationsArray[i]}</Text></TouchableOpacity>)   
      }

      else if(operationsArray[i]==="Dl"){
        operations.push(<TouchableOpacity onPress={()=>{this.deleteElement()}} style={styles.btn}><Text style={styles.buttonText}>{operationsArray[i]}</Text></TouchableOpacity>)
      }

      else{
        operations.push(<TouchableOpacity onPress={()=>{this.handlePressed(operationsArray[i])}} style={styles.btn}><Text style={styles.buttonText}>{operationsArray[i]}</Text></TouchableOpacity>)
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
    backgroundColor:'blue',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },

  expression:{
    flex:1,
    backgroundColor:'green',
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },

  resultText:{
    fontSize:50,
    color:'white'
  },

  expressionText:{
    fontSize:25,
    color:'white'
  },

  buttons:{
    flex:7,
    flexDirection:'row'
  },

  numbers:{
    flex:4,
    backgroundColor:"red"
  },

  btn:{
    flex:1,
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'center'

  },

  buttonRow:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  },

  buttonText:{
    fontSize:60,
  },

  operations:{
    flex:1,
    backgroundColor:"yellow",
    justifyContent:'space-evenly',
    alignItems:'center'
  }
});

export default App;
