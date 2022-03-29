import React, { useState, useRef } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";


export const Calendar = (props) => {
  
  const MinYY=props.MinYY;
  const MaxYY=props.MaxYY;
  const SelectedDD = 1;
  const SelectedMM=1;
  const SelectedYY=MaxYY;
  
  //const MMM = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const MMs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const[date, setDate]=useState({DD:SelectedDD, MMM:MMs[SelectedMM-1], YYYY:SelectedYY});
  const getDaysInMonth = (month, year) => (new Array(31)).fill('').map((v,i)=>new Date(year,month-1,i+1)).filter(v=>v.getMonth()===month-1).map(o=>o.getDate().toString());
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  //const DDs=getDaysInMonth(SelectedMM, MaxYY);
  const [DDs, setDDs]=useState(getDaysInMonth(SelectedMM, MaxYY));
  const YYs=range(MaxYY, MinYY, -1);

  const dateChange = (val) => {
    var newDate={};

    if(val.DD){
      newDate={...date, DD:val.DD}
      setDate(newDate);
    }
    if(val.MMM){
      setDDs(getDaysInMonth(MMs.indexOf(val.MMM)+1, MaxYY));
      newDate={...date, MMM:val.MMM}; 
      setDate(newDate);
    }
    if(val.YYYY){
      newDate={...date, YYYY:val.YYYY};
      setDate(newDate);
    }
    console.log("val",val,"newDate",newDate);
    props.onChange(newDate);
  } 
  return(
    <View style={{flexDirection:"row"}}>
      <Wheel style={{paddingHorizontal:5}} data={MMs} onChange={(index)=> dateChange({MMM:MMs[index]})}/>
      <Wheel style={{paddingHorizontal:5}} data={DDs} onChange={(index)=> dateChange({DD:DDs[index]})}/>
      <Wheel style={{paddingHorizontal:5}} data={YYs} onChange={(index)=> dateChange({YYYY:YYs[index]})}/>
    </View>
  )
}

const Wheel = (props) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex]=useState(0);
  const {data} = props;
  const slidSize=50;

  const onScroll = (e) => {
    //console.log(e);
    //console.log("onScroll", e.nativeEvent.contentOffset);
    const {x, y}=e.nativeEvent.contentOffset;
    var offset = (slidSize-(y%slidSize));
    //console.log("offset", offset);
    var newY=y;
    if(y%slidSize>slidSize/2){
      newY=e.nativeEvent.contentOffset.y+offset;
      scrollViewRef.current.scrollTo({y:newY, x:e.nativeEvent.contentOffset.x, animated:true})
     }
     else{
       var downOffset=slidSize-offset;
       newY=e.nativeEvent.contentOffset.y-downOffset;
       scrollViewRef.current.scrollTo({y:newY, x:e.nativeEvent.contentOffset.x, animated:true})
     }
    //scrollViewRef.current.scrollTo({y:e.nativeEvent.contentOffset.y+offset, x:e.nativeEvent.contentOffset.x, animated:true})
     
    const activeIndex=parseInt(newY/slidSize);
    console.log("activeIndex", activeIndex);
    setCurrentIndex(activeIndex);
    props.onChange(activeIndex);
  }

  return(
    <View style={[{flex:1, height:slidSize*3},props.style]}>
      <View style={{borderBottomWidth:3, borderBottomColor:"#8ed0d8", alignItems:"center", top:(slidSize*1)-(slidSize/3)}}/>
      <View style={{borderBottomWidth:3, borderBottomColor:"#8ed0d8", alignItems:"center", top:(slidSize*2)-(slidSize/3)}}/>
      <ScrollView 
      style={{flex:1}}
      ref={scrollViewRef}
      //onScrollEndDrag={onScroll}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={onScroll}>
        <View style={{height:slidSize}}><Text></Text></View>
        {
          data && data.map((item, index)=><View key={index} style={{height:slidSize, alignItems:"center"}}><Text style={[style.text, currentIndex==index && style.activeText]}>{item}</Text></View>) 
        } 
        <View style={{height:slidSize}}><Text></Text></View>
      </ScrollView>
    </View>
  )
}


const style=StyleSheet.create({
  text:{
    fontSize:20,
    color:"#d5d5d5",
    fontWeight:"bold"
  },
  activeText:{
    color:"#696969"
  }
})