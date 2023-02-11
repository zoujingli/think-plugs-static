# ThinkPlugsStatic for ThinkAdmin

[![Latest Stable Version](https://poser.pugx.org/zoujingli/think-plugs-static/v/stable)](https://packagist.org/packages/zoujingli/think-plugs-static)
[![Latest Unstable Version](https://poser.pugx.org/zoujingli/think-plugs-static/v/unstable)](https://packagist.org/packages/zoujingli/think-plugs-static)
[![Total Downloads](https://poser.pugx.org/zoujingli/think-plugs-static/downloads)](https://packagist.org/packages/zoujingli/think-plugs-static)
[![Monthly Downloads](http://img.shields.io/packagist/dm/zoujingli/think-plugs-static.svg)](https://packagist.org/packages/zoujingli/think-plugs-static)
[![License](https://poser.pugx.org/zoujingli/think-plugs-static/license)](https://packagist.org/packages/zoujingli/think-plugs-static)

**ThinkAdmin** 后台 **`UI`** 框架及部分项目初始化文件，开源免费可商用！

代码主仓库放在`Gitee`，`Github`仅为镜像仓库用于发布`Composer`包。

安装此插件会占用并替换`public/static`部分目录（自定义脚本和样式`public/static/extra`目录除外），若有对 `public/static` 有修改不建议安装此插件，否则会造成修改的内容丢失！

使用 `Composer` 卸载此插件时，不会删除 `public/static` 目录，需要手动删除目录和数据表。

由于`layui 2.8`未正式发布，所以这里只用了`rc`版本，待其正式发布之后我们也会相应发布更新版本。

### 安装插件

```shell
# 注意，插件仅支持在 ThinkAdmin v6 系统中使用
composer require zoujingli/think-plugs-static
```

### 卸载插件

```shell
# 插件卸载不会删除 public/static 目录的代码
# 卸载后通过 composer update 时不会再更新，其他依赖除外
composer remove zoujingli/think-plugs-static
```

### 版权说明

**ThinkPlugsStatic** 遵循`MIT`开源协议发布，并免费提供使用。

本项目包含的第三方源码和二进制文件的版权信息将另行标注，请在对应文件查看。

版权所有 Copyright © 2014-2023 by ThinkAdmin (https://thinkadmin.top) All rights reserved。