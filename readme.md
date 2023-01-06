# ThinkPlugsStatic

#### 介绍

用于支持 ThinkAdmin 后端的脚本样式及部分项目初始化文件。

目前代码主仓库放在`Gitee`,`Github`仅为镜像仓库用于发布`Composer`包。

安装时会替换`public/static`目录（自定义脚本和样式`public/static/extra`目录除外），因此要注意是否有对`public/static`进行修改，如果有修改我们不建议安装此模块，自定义脚本和样式可以放置于`public/static/extra`，更新时此目录不会被替换！

由于`layui 2.8`未正式发布，所以这里只用了`rc`版本，待其正式发布之后我们也会相应发布上线。

#### 全新或更新安装 ( 空目录或项目根目录下执行 )

```shell
composer require zoujingli/think-plugs-static
```

#### 启动测试环境并访问 http://127.0.0.1:8000

```shell
php think run --host 127.0.0.1
```