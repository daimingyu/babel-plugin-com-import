# babel-plugin-com-import



# 一、介绍

`babel-plugin-com-import`是实现按需加载babel插件，目前支持组件库`com-58-pc`和函数库`lodash`。

# 二、基本使用

## 1、安装依赖

```
npm install babel-plugin-com-import --save-dev
```

## 2、在webapck中配置babel-loader
```
module.exports = {
    ...
    module: {
            rules: [
                {
                    test: /\.(js|jsx)?$/,
                    use: "babel-loader",
                    exclude: /node_modules/
                },
            ]
    }
    ...
}
```


## 3、在.babelrc文件中配置

### 1、只处理一种库

```
{
	"plugins": [
		[
			"com-import",
			{
				"library": "com-58-pc"
			}
		]
	]
}
```
### 2、处理多种库

```
{
	"plugins": [
		[
			"com-import",
			{
				"library": ["com-58-pc", "lodash"]
			}
		]
	]
}
```

# 三、在create-react-app初始化的项目中使用

## 1、安装依赖

```
npm install babel-plugin-com-import --save-dev
```

## 2、启用`babelrc`配置

create-react-app初始化的项目禁用了babelrc配置文件，所以需要我们修改配置，让babelrc文件起作用，可通过以下几种方法来达到修改配置的目的。

### 直接修改的配置文件

运行`npm run eject`吐出webpack配置文件

找到`config/webpack.config.js`

在该文件中可以看到

![](https://user-gold-cdn.xitu.io/2019/9/26/16d6c98adcd577fa?w=909&h=341&f=png&s=41020)

babelrc被禁用了，可以直接将`false`改为`true`即可。

### 通过`react-app-rewired`重写配置

1、安装`react-app-rewired`

```
npm install react-app-rewired --save-dev
```

2、安装`customize-cra`

```
npm install customize-cra --save-dev
```

3、在项目根目录下创建 `config-overrides.js`

```
+-- your-project
|   +-- config-overrides.js
|   +-- node_modules
|   +-- package.json
|   +-- public
|   +-- README.md
|   +-- src
```

4、 `config-overrides.js`内容如下

```
const { useBabelRc, override } = require('customize-cra')

const config = override(useBabelRc())

module.exports = config
```

5、 修改`package.json`的`scripts`

```
  "scripts": {
    - "build": "react-scripts build",
    + "build": "react-app-rewired build",
  }
```

## 3、最后在项目根目录创建`.babelrc`文件，写入配置内容

### 1、只处理一种库

```
{
	"plugins": [
		[
			"com-import",
			{
				"library": "com-58-pc"
			}
		]
	]
}
```
### 2、处理多种库

```
{
	"plugins": [
		[
			"com-import",
			{
				"library": ["com-58-pc", 'lodash']
			}
		]
	]
}
```