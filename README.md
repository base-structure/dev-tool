# 开发辅助工具

功能：

 - 项目源码备注统一管理
 - vscode 代码备注提示

## 本地安装

- desc 命令
- gen命令
- vscode插件

```
// 安装
npm run init
```

## vscode配置

```
    "search.exclude": {
        "**/.descfiles": true
    },
    "files.exclude": {
        "**/.descfiles": true
    }
```

## desc

在项目路径下执行 `desc init` 生成及更新项目描述文件

## 使用

- vscode 源代码路径下右键 "jump to desc"
- 在desc文件descs字段中添加注释的key-value对
- 源代码鼠标hover到对应的key单词上，会提示value值

## desc 统一管理

`lib/desc-project.js`

```
module.exports = {
    "root": "/path/to/descriptions",
    "projects": {
        "default": {
            "project1": "/path/to/project1"
        },
        "pc1": {
            "project1": "/path/to/project1"
        }
    }
}

```

- 在项目`project`下运行`desc init`生成`.description`文件夹
- 在`lib/desc-project.js`中注册项目
- 运行 `desc commit`或者 `desc commit -e pc1 -p project`. 项目下的`.description`文件夹会复制到`root`路径中
- 运行 `desc link`删除原项目下的`.description`文件夹，建立软链接
- 若`root`是一个git仓库，可以运行`desc push -m "commit message"`提交代码并推送到远程

## demo

`desc/demo`


![demo0](/desc/demo/image/demo-0.png)

![demo1](/desc/demo/image/demo-1.jpeg)

![demo2](/desc/demo/image/demo-2.png)

![demo3](/desc/demo/image/demo-3.jpeg)

![demo4](/desc/demo/image/demo-4.png)


# 备注

一开始只是考虑用node做代码备注文件的生成、编辑、提交的部分，没有考虑做vscode插件。

所以只有部分代码在插件源码`desc`路径下。

若把生成文件的相关逻辑也添加到插件路径下，插件才具备完整且独立的功能。
