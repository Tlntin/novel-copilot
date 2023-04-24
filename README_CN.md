### 主要功能
当您使用txt文件写小说时，调用AI自动完成小说提示。

### api接口所在项目

[链接](https://github.com/Tlntin/ChatRWKV-Novel-api)

### chatRWKV项目介绍
[链接](https://github.com/BlinkDL/ChatRWKV)

### 截图
![001.jpg](https://s2.loli.net/2023/04/24/r2JKiw1vxWGdEa9.jpg)
![002.png](https://s2.loli.net/2023/04/24/qXhPueW2jEvrBRJ.png)

### 对于开发人员，如何构建和运行
1.安装包
```bash
npm install
```
2. 使用 F5/Ctrl+F5 调试扩展

3.用vsce编译vsix(插件离线格式)
```bash
npm install -g vsce
vsce package
```

### 对于用户，你需要的是
1. 部署上面提到的[api服务](https://github.com/Tlntin/ChatRWKV-Novel-api)。
2. 安装此扩展并运行它。

### 高级自定义设置
- 打开vscode设置（文件，首选项，设置），搜索“Novel”，目前有以下高级设置

|名称 |默认值 |功能 |
| ---------------------- | ---------- | ------------------------------------- |
|server.address          |localhost   | api 服务器的地址。                         |
|server.port             | 6288       | api 服务器的端口。                         |
|server.generated_length | 256        | 预计一次生成多少文本                         |
|chunk_length            | 512        | 将数据分成块进行推理，减少了内存占用，但降低了推理速度。 |