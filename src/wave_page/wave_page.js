
//摇签页
import React,{Component} from 'react';
import './wave_page.css';
import backImage from './images/sang.png';
import waveSignImage from './images/sangqian.png';
import waveSignImageGif from './images/sangqian1.gif';

// const bacgroundImage = {
//     backgroundSize: '100% 100%',
//     backgroundImage: 'url(' + backImage + ')'
// }

class WavePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: 0,
            height: 0,
            waveSignImage: waveSignImage,
        }
    }
    componentDidMount(){
        this.getClientHeight();
        //监听手机摇动事件
        this.listenerEvent();
    }
    listenerEvent() {
        //console.log('this',this);
        var _this = this;
        // 首先，定义一个摇动的阀值
        var SHAKE_THRESHOLD = 3000;
        // 定义一个变量保存上次更新的时间
        var last_update = 0;
        // 紧接着定义x、y、z记录三个轴的数据以及上一次出发的时间
        var x =0;
        var y =0;
        var z =0;
        var last_x =0;
        var last_y =0;
        var last_z =0;
        //判断移动浏览器是否支持运动传感器事件
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion',function(eventData) {
                var acceleration = eventData.accelerationIncludingGravity;
                var curTime = new Date().getTime();

                if ((curTime - last_update) > 100) {
                    var diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                    if (speed > SHAKE_THRESHOLD) {
                        //如何在这里拿到组件的this
                        //console.log('_this',_this);
                        _this.setState({
                           waveSignImage: waveSignImageGif 
                        })
                        setTimeout(()=>{
                            _this.props.history.push('/resultPage/resultPage');
                            //window.location.href = '/resultPage/resultPage';
                        },3000)
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            }, false);
        } else {
            alert('对不起，您的手机不支持');
        }
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
    render(){
        return (
            <div className="wavePage">
                <img src={ backImage } alt="" />
                <div className="wave_sign">
                    <div className="wave_img">
                        <img src={ this.state.waveSignImage } />
                    </div>
                </div>
            </div>
        )
    }
}
export default WavePage