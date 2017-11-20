
//丧签首页
import React,{Component} from 'react';
import './luck_sign.css';
import Config from '../common/config';

import backImage from './images/luckImage.png';
import nicknameImage from './images/nickname.png';
import confirmImage from './images/confirm.png';
import iconImage from './images/icon.png';
import ConfigAddress from '../common/config_address';
import MpConfig from '../common/mp_config';

// const bacgroundImage = {
//     backgroundSize: '100% 100%',
//     backgroundImage: 'url(' + backImage + ')'
// }

class LuckSign extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: 0,
            height: 0,
            isShowNickImage: true,
            nickname_tips: false,
            //autofocus: '',
        }
    }

    componentDidMount(){
        MpConfig();
        /*正式环境上的百度统计*/
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?303e83ab627ff15a5d6a395c028924a1";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
        //刚进入时,清空localStorage
        //localStorage.removeItem('nickname');
        //得到屏幕的高度
        this.getClientHeight();
        //得到UserID
        //this.getUserId();
        //微信自定义分享
        this.wxShare();
    }
    //得到UserId，微信进行授权
    getUserId() {
        let url = Config.api.me;
        fetch(url, {method: 'GET', credentials: 'same-origin',})
        .then((res) => {
            if (res.status != 200) {
                let currentUrl = window.location.href;
                window.location.href = Config.api.login + '?redirectUrl=' + currentUrl
            }
            return res.json()
        }).then((res) => {
            console.log(res)
        });

    }

    //微信自定义分享
    wxShare() {
       //自定义分享
        //setTimeout(function () {
            window.wx.ready(() => {
                window.wx.checkJsApi({
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function (res) {
                        console.log(JSON.stringify(res))
                    }
                });
                window.wx.showOptionMenu();
                //let urlWx = ConfigAddress.url.mpPortfolioDetail;
                let urlWx = 'https://stage.starcandy.cn/luckSign/luckSign';
                //分享到朋友圈
                window.wx.onMenuShareTimeline({
                    title: '送你一签，以毒攻毒', // 分享标题
                    link: urlWx,
                    imgUrl: 'http://media.starcandy.cn/advertisement/78a1d0a0b7c525b3ebbb91396df1d967',
                    success: function (res) {
                        console.log(res)
                    },
                    cancel: function () {
                    }
                });
                //分享给朋友
                window.wx.onMenuShareAppMessage({
                    title: '送你一签，以毒攻毒',
                    desc: '喝不下的毒鸡汤，分你一碗\n点击查阅',
                    link: urlWx,
                    imgUrl: 'http://media.starcandy.cn/advertisement/78a1d0a0b7c525b3ebbb91396df1d967',
                    type: 'link',
                    dataUrl: '',
                    success: function (res) {
                        console.log(res)
                    },
                    cancel: function () {
                    }
                });

            });
        //}, 0)
        //自定义分享结束 
    }
    getClientHeight() {
        //console.log('width',window.screen.width);
        //console.log('height',window.screen.height);
        //console.log('myDiv',this.refs.myDiv);
        //let myDiv = this.refs.myDiv;

        let width = window.screen.width;
        let height = window.screen.height;

        this.setState({
            width: width,
            height: height,
        })
        
    }
    //校验用户昵称
    nickNameEvent() {
        //console.log(this.textInput);
        //this.textInput.focus();
        this.setState({
            isShowNickImage: false,
            //autofocus: 'autofocus',
        })

    }
    checkNickNameEvent(e) {
        //console.log('checkNickNameEvent');
        //console.log(e.target.value);
        this.setState({
            nickname: e.target.value,
        },()=>{
            var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,12}$/;
            if(!(reg.test(this.state.nickname))){
                console.log('请输入正确的用户昵称');
                this.setState({
                    nickname_tips: true
                })
            }else{
                this.setState({
                    nickname_tips: false
                })
            }
        })
    }
    nickNameChange(e) {
        console.log('nickNameChange',e.target.value);
    }
    //点击确定跳转到下一个页面
    confirmEvent() {
        console.log('确定');
        if(this.state.nickname && !this.state.nickname_tips) {

            //let url = Config.api.luckSign + "?scanActivityType=SANGQIAN";
            let url = Config.api.luckSign;
            //console.log('url',url);
            // let param = {
            //     'scanActivityType': 'SANGQIAN',
            // }
            var str = 'scanActivityType=SANGQIAN'
            fetch(url,{
                method:'PUT',
                credentials: 'same-origin',
                headers: {
                    //'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: str
            }).then(res =>{
                console.log(res)
                //return res.json()
            }).then(data =>{
                console.log('data',data);
            })
            localStorage.setItem('nickname',this.state.nickname);
            this.props.history.push('/wavePage/wavePage');
        }else {
            this.setState({
                nickname_tips: true
            })
        }
    }

    // confirmEvent() {
    //     let url = Config.api.luckSign;
    //     let param = {
    //         'scanActivityType': 'SANGQIAN',
    //     }
    //     const request = new Request(url, {
    //         method: 'PUT',
    //         credentials: 'same-origin',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(param)
    //     })
    //     return fetch(request).then(res=>{
    //         //return res.json()
    //     }).then(data=>{
    //         console.log('submitData',data);
    //         //数据请求过来了证明已经提交信息成功，所以展示成功弹出框
            
    //     }).catch(err=> {
    //         console.log(err);  
    //     })
    // }

    
    render(){
        return (
            <div className="luckSign" ref="myDiv" 
            style={{padding: '17px 15px',width: this.state.width,height: this.state.height}}>
                <img src={ backImage } alt="" />
                <div className="nickname_box">
                    <div className="nickname center">
                        <div className="nickname_content center" onClick={ (e)=>this.nickNameEvent(e)}>
                            {
                              this.state.isShowNickImage?
                              <div className="nicknameImage_box">
                                <img src={nicknameImage} alt="" />
                              </div>
                              :<input className="nickInput"
                              type="text"
                              onBlur={ this.checkNickNameEvent.bind(this)}
                              onChange={ this.nickNameChange.bind(this)}
                              autoFocus
                              />
                            }
                        </div>
                    </div>
                </div>
                <div className="nickname_tips">
                    {
                        this.state.nickname_tips ?
                        <div className="color_red center">用户昵称不能超过12个字符</div>:''
                    }
                </div>

                <div className="confirm_box" onClick={ ()=>this.confirmEvent()}>
                    <div className="confirm">
                        <img src={ confirmImage } alt="" />
                    </div>
                </div>
            </div>
        )
    }
}
export default LuckSign