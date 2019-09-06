# 开发辅助工具

## 本地安装

```
// 安装
npm link

// 移除
npm unlink
```

## vocode插件

将desc目录复制到vscode插件目录下

```
cp -r /usr/share/code/resources/app/extensions/
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

在项目路径下执行 `desc init`, `desc update` 生成及更新项目描述文件

## 使用

- 源代码路径下邮件 "jump to desc"
- 在desc文件descs字段中添加注释的key-value对
- 源代码鼠标hover到对应的key单词上，会提示value值
