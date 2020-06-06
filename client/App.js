import React, { Component } from 'react';
import '../public/assets/styles.css';
import  Routes  from "./Routes.js";

const showForm=()=>{
   let form=(<form><input placeholder='name' type='text'/></form>)
}
class App extends Component
{
   render()
   {
      return(<Routes></Routes>)
   }
}

export default App;
