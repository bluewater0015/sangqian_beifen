
//摇签结果页面
import './result_page.css';
import React,{ Component } from 'react';
import signImg from './images/sign.png';
import randomImg from './images/dog.png';
import handImg from './images/hand.png';
import iconImg from './images/icon.png';
import 'whatwg-fetch';
import Config from '../common/config';

class ResultPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: 0,
            height: 0,
            imgurl: '',
            nickname: '',
        }
    }
    componentDidMount(){
        this.fetchData();
        this.getClientHeight();
        this.setState({
            nickname: localStorage.getItem('nickname')
        })
    }
    //得到图片的信息
    fetchData(){
        let url = Config.api.image;
        //console.info(url)
        fetch(url,{
            method:'GET',
            //credentials: 'same-origin',
        }).then(res =>{
            //console.log(res)
            return res.json()
        }).then(data =>{
            console.log(data);
            this.setState({
                imgUrl: data.imageUrl
            })
        })
    }
    //得到宽度和高度
    getClientHeight() {
        let width = window.screen.width;
        let height = window.screen.height;
        this.setState({
            width: width,
            height: height,
        }) 
    }
    render(){
        return (
            <div className="result_page">
                <div className="sign_box box_center">
                    <div className="sign">
                        <img src={ signImg } alt="" />
                    </div>
                </div>
                <div className="randomImg_box">
                    <div className="random_img">
                        <img src={ this.state.imgUrl } alt="" />
                    </div>
                </div>
                <div className="pressImg_box box_center mar_bottom">
                    <div className="press fx">
                        <div className="press_img">
                            <img src={ handImg } alt="" />
                        </div>
                        <div className="saveImg_box">
                            <p className="box_center set_font font_size15">长按图片</p>
                            <p className="save_album box_center set_font font_size15">保存至相册</p>
                        </div>
                    </div>
                </div>
                <div className="signMessage_box">
                    <div className="sign_message fx">
                        <div className="sign_nickname">
                            <div className="font_size12 nickname_content">
                                <span className="nickname">{ this.state.nickname }</span>
                                <span className="luck">的小确幸在哪里？</span>
                            </div>
                            <div className="click_show font_size12">点击可见>></div>
                            <div className="store_account font_size12">60币已存入您的账户</div>
                        </div>
                        <div className="sign_icon fx_end">
                            <div className="icon">
                                <div className="box_center">
                                    <div className="icon_box">
                                        <img src={ iconImg } alt="" />
                                    </div>
                                </div>
                                <div className="online font_size12">
                                    线上轻松抓娃娃
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ResultPage