# 开发辅助工具

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

- 源代码路径下邮件 "jump to desc"
- 在desc文件descs字段中添加注释的key-value对
- 源代码鼠标hover到对应的key单词上，会提示value值


## demo

`desc/demo`


![demo1](/desc/demo/image/demo-1.png)

![demo2](/desc/demo/image/demo-2.png)
