import React,{useState,useEffect} from 'react';
import { Image, Divider,Badge,Avatar,Spin, Alert,Button} from 'antd';
import { GithubFilled,UserOutlined} from '@ant-design/icons';
import Axios from 'axios';
import Star from '../component/card/Star/Star';
import {useDispatch} from 'react-redux';



const Info=(props)=>{
    const[info,setUser]=useState();

    const dispatch=useDispatch();
    const removeUserFromRedux=(data)=>dispatch({type:'removeUser',data:data});

     // eslint-disable-next-line
    const[error,setError]=useState(false);
    useEffect(()=>{
            Axios.get('https://api.github.com/users/'+props.match.params.login)
            .then(res=>{
                
                setUser(res)
            }).catch(err =>{
                console.log(err);
                setError(true);
                
            })
         
    },[props.match.params.login])


    const removeUser=()=>{
        console.log('user Removed',info)
        removeUserFromRedux(info.data);
        props.history.push("/");
        
    }

    const userData = (info)?(   
        //Component cointaining Images and badges         
                        <div>    
                            <div >
                                <Image width={200} src={""+info.data.avatar_url} />
                                    <div>
                                        <ul style={{display:"inline-block"}}>
                                            <li style={{listStyle:"none",display:"inline-block",position:"relative",right:"40px"}}>
                                                {
                                                    (info.data.public_repos)?
                                                    (<Badge  size="default" offset={[11, 20]} count={info.data.public_repos}>
                                                        <GithubFilled style={{fontSize:"35px",marginTop:"10px"}} />
                                                        <p>Repos</p> 
                                                    </Badge>)
                                                    :(<Badge  size="default" offset={[11, 20]} count={0}>
                                                        <GithubFilled style={{fontSize:"35px",marginTop:"10px"}} />
                                                        <p>Repos</p> 
                                                    </Badge>)
                                                }
                                            </li>
                                            <li style={{listStyle:"none",display:"inline-block",position:"relative",right:"15px"}}>
                                                {
                                                    (info.data.followers)?(
                                                        <Badge  size="default" offset={[3,11]} count={info.data.followers}>
                                                            <Avatar size={36} icon={<UserOutlined />} />
                                                            <p>Followers</p>
                                                         </Badge>
                                                    ):
                                                    ( <Badge  size="default" offset={[3,11]} count={0}>
                                                        <Avatar size={36} icon={<UserOutlined />} />
                                                        <p>Followers</p>
                                                     </Badge>)
                                                }
                                               
                                                
                                            </li>
                                            
                                            <li style={{listStyle:"none",display:"inline-block",position:"relative",right:"5px"}}>
                                            {
                                                (info.data.following)?(
                                                    <Badge  size="default" offset={[3,11]} count={info.data.following}>
                                                        <Avatar size={36} icon={<UserOutlined />} />   
                                                        <p>Following</p>                                     
                                                </Badge>
                                                ):(
                                                    <Badge  size="default" offset={[3,11]} count={0}>
                                                        <Avatar size={36} icon={<UserOutlined />} />   
                                                        <p>Following</p>                                     
                                                </Badge>
                                                )
                                            }
                                                
                                                
                                            </li>
                                        </ul>
                                        
                                    </div>
                                    <div style={{position:"relative",bottom:"28px"}}>
                                        <Star data={info.data}/>
                                    </div>

                                    <div >
                                    <Button style={{position:"relative",bottom:"22px"}} onClick={removeUser} type="primary">Delete User</Button>
                                    </div>

                                    

                                







                         <div style={{position:"relative",bottom:"40px"}}>
                                        <Divider style={{background:"lightgray"}} orientation="right" plain></Divider>                      
                                            {
                                                (info.bio)?(<p>
                                                    {info.bio}
                                                    </p>):null
                                            }
                                            
                                        <p>Hireable:{(info.hireable)?"True":"False"}</p>
                                            
                                            <p>
                                            Location:{(info.location)?info.location:null}
                                            </p>
                                        <Divider style={{background:"lightgray"}} orientation="right" plain></Divider>                     
                            </div>












                                   


                         </div>
                        </div>     ) :
                        (<div style={{textAlign:"center"}}>
                                    <Spin >
                                        <Alert
                                        message="Loading Data..."
                                        type="info"
                                        />
                                    </Spin>
                        </div>
                        )
        







    return(
        <div>
            
            {
                Error?(<div>{userData}</div>):(<Spin >
                    <Alert
                    message="Loading Data..."
                    type="info"
                    />
                </Spin>)
            }
   
        </div>
    );
}
export default Info;