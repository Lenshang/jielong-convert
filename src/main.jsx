import React from 'react';
import { Row, Col,Layout,Form, Input, Button, Radio  } from 'antd';
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }
    onFinish=(values)=>{
        var content=values["content"].replace(/，/g, ",");
        var result="序号,姓名/手机,楼号,门牌号,内容\n";
        for(var line of content.split("\n")){
            console.log(line)
            if(/^\d\./.test(line)){
                console.log("OK")
                var num=line.slice(0,line.indexOf("."));
                var _content=line.slice(line.indexOf(".")+1);
                result+=num+","+_content+"\n";
            }
            else{
                console.log("Failure")
            }
        }
        console.log(result)
        const uri = `data:text/csv;charset=utf-8,\ufeff${encodeURIComponent(result)}`;
        // 通过创建a标签实现
        const link = document.createElement("a");
        link.href = uri;
        // 对下载的文件命名
        link.download = `统计结果.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    onFinishFailed=(errorInfo)=>{

    }
    render(){
        const MainWindow=()=>{
            return (
            <div>
                <Form
                layout="vertical"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item label="请输入接龙文本" name="content" rules={[{ required: true, message: '请输入接龙的具体内容!' }]}>
                        <Input.TextArea autoSize={{ minRows: 5, maxRows: 100 }} placeholder="请输入接龙的内容" />
                    </Form.Item>
                    <Form.Item style={{"textAlign":"right"}}>
                        <Button type="primary" htmlType="submit" style={{"height":60}} block>生成表格</Button>
                    </Form.Item>
                </Form>
            </div>);
        }
        return <div>
            <h2 style={{"textAlign":"center"}}>接龙格式转EXCEL(CSV)</h2>
            
            <Row style={{"marginTop":"10"}}>
                <Col className='color-block1' xs={0} sm={0} md={6} lg={6} xl={8}></Col>
                <Col className='color-block2' xs={24} sm={24} md={12} lg={12} xl={8}>
                    <div style={{"fontWeight":"bold"}}>接龙内容请参照以下格式 逗号分割:</div>
                    <div>#接龙</div>
                    <div>各种蔬菜瓜果</div>
                    <div>例 姓名手机，楼号，室号，内容</div>
                    <br></br>
                    <div>1.张三18012345678，1号，101室，番茄1斤</div>
                    <div>2.李四18012345678，1号，102室，黄瓜1斤</div>
                    <div>3.王五18012345678，1号，103室，青菜5斤</div><br></br>
                    {MainWindow()}
                </Col>
                <Col className='color-block1' xs={0} sm={0} md={6} lg={6} xl={8}></Col>
            </Row>
        </div>
    }
}