### Main function
When you use txt file to write a novel, invoke AI to autocomplete novel hints.

### The project where the api interface is located

[link](https://github.com/Tlntin/ChatRWKV-Novel-api)

### chatRWKV project introduction
[link](https://github.com/BlinkDL/ChatRWKV)

### Screenshot
![001.jpg](https://s2.loli.net/2023/04/24/r2JKiw1vxWGdEa9.jpg)
![002.png](https://s2.loli.net/2023/04/24/qXhPueW2jEvrBRJ.png)

### For Developer, How to build and run 
1. install package
```bash
npm install
```
2. debug extension with F5/Ctrl+F5

3. build vsix with vsce
```bash
npm install -g vsce
vsce package
```

### For User, What you need is
1. Deploy the [api service](https://github.com/Tlntin/ChatRWKV-Novel-api) mentioned above.
2. Install this Extension and run it.

### Advanced Custom Settings
- Open vscode settings (file, preferences, settings), and search "Novel", than currently there are the following advanced settings

| Name                    | Default   | Function                                                     |
| ----------------------- | --------- | ------------------------------------------------------------ |
| server.address          | localhost | The address of the api server.                               |
| server.port             | 6288      | The port of the api server.                                  |
| server.generated_length | 256       | How much text is expected to be generated at one time        |
| chunk_length            | 512       | Divide the data into blocks for reasoning, which reduces memory usage, but reduces the speed of reasoning. |

