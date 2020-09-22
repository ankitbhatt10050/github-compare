import axios from 'axios';
import{notification} from 'antd';

//To add data asynchronously  in redux
//cause function call inside reducer will not wait for axios to complete

export const setUser=(userData)=>{
    console.log("[action]",userData);
    return{
        type:'addUser',
        userData:userData
    }
}



export const initUser=(userName)=>{
    return dispatch=>{
        axios.get('https://api.github.com/users/'+userName)
        .then(res=>{
            dispatch(setUser(res.data));
        }).catch(err =>{
            notification.error({message:"User Not Found"})
        })
    }

};


