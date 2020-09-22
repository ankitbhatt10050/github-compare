import React from 'react';
import {connect } from 'react-redux';
import{initUser} from '../../Store/action'; 
import { Input} from 'antd';

const { Search } = Input;


function inputTag(props){

//Adding user data inside Redux
   const addUser=(val)=>{
        
        const value=val
        if((value==='Enter'&&value)||(value))
        {
            props.addUserToRedux(val)
            
        }
    }        

        return(
            <div>
                    <div>
                        <Search
                        placeholder="Happy Searching..."
                        enterButton="Search"
                        size="large"
                        style={{marginBottom:"20px"}}
                        onSearch={value => addUser(value)}                        
                        />
                </div>
            </div>
        );

    }


const mapStateToProps=(state)=>
{
    return{
        users:state.user
    }
}

const mapDispatchToProp=dispatch=>{
    return{
        addUserToRedux:(userName)=>dispatch(initUser(userName)),
    }
}



export default connect(mapStateToProps,mapDispatchToProp)(inputTag);