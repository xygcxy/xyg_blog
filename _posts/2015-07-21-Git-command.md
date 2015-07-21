---
layout: post
title: Git操作相关
category : 笔记
tagline: "Supporting tagline"
tags : [Git,工具]
---
{% include JB/setup %}
# Git 常用命令参考
---
## Git 常用命令参考

以下列举的常用命令和参数，并不完整，完整版请看官方的 [Git 命令参考手册](https://git-scm.com/docs)

### 基本操作

#### `$ git add [-v|f|n] [<pathspec>...]`

- `-v`  :  输出执行后的结果信息
- `-f`  :  允许提交 .gitignore 列表中的文件
- `-n`  :  尝试执行 add 命令，输出变化列表，但不对版本库造成任何影响
- `<pathspec>`  :  指定 add 的文件，支持 `.` 和 `*` 通配符

建议始终带上 `-v` 参数
> `$ git add -v .`
>
> `$ git add -vf a.js file_in_gitignore`
>
> `$ git add -n template_*.js`

<!--break-->
#### `$ git commit [-a] [-m] [-e] [--amend] [--allow-empty] [-c] [<file>...]`

- `-a` :  对工作区的修改和删除生效（剩了 git add 操作），但对新文件无效
- `-m <msg>` :  commit message
- `-c <commit>` :  复用 commit 的 message，并进入编辑模式
- `-e` : 进入编辑模式，编辑 message，对需要写很多 message 时非常有用
- `--amend` :  把当前提交和上一次提交 merge 为一个，并覆盖之
- `--allow-empty` :  允许提交一个空的提交

> `$ git commit -m "提交暂存区的所有内容"`
>
> `$ git commit -a -m "提交工作区和暂存区的所有内容，除工作区中的新文件外"`
>
> `$ git commit --amend` merge 并覆盖上一次 commit
>
> `$ git commit --allow-empty -m "提交一个空的 commit"`
>
> `$ git commit --allow-empty -c HEAD`   提交一个空的 commit，并引用上次 commit 的 message
> 
> `$ git commit -e` 进入编辑模式写 message，但需要写很多 message 时管用
>
> `$ git commit -m "写着写着，发现需要写很多，这时候可以进入编辑模式。。。" -e`

#### `$ git revert [-n] <commit>`

撤销指定 commit 的修改，并把这次的撤销作为一个新的 commit 提交

- `-n` :  仅撤销工作区和暂存区，不影响版本库中的内容

> `$ git revert HEAD` 撤销前一个 commit
>
> `$ git revert -n HEAD` 撤销前一个 commit，但不提交
>
> `$ git revert HEAD^` 撤销前前一个 commit，`^` 可以类推 `^^^...`
>
> `$ git revert 4ad2499` 撤销指定 commit


### 分支管理


#### `$ git branch [-r | -a] [(--merged | --no-merged | --contains) [<commit>]]`

- `-r` :  查看远程 branch
- `-a` :  查看本地和远程 branch
- `--merged` :  列出已 merge 到指定 commit 的分支
- `--no-merged` : 列出未 merge 到指定 commit 的分支（创建时基于该 commit）
- `--contains` :  列出包含指定 commit 的分支

> `$ git branch -a` 查看版本库中的所有分支，包括远程分支
>
> `$ git branch -r` 产看远程版本库中的分支
>
> `$ git branch --merged` 查看已 merge 到当前分支的分支列表
>
> `$ git branch --merged master`
>
> `$ git branch --no-merged branch_name`
>
> `$ git branch --contains commit_id`


#### `$ git branch (-d | -D) [-r] <branchname>`

- `-d | -D` : 删除本地分支，`-d` 未被 merged 的分支将失败， `-D` 忽略分支状态
- `-r` : 删除本地远程分支指针，对远程版本库并不影响

> `$ git branch -d branch_name`
>
> `$ git branch -d -r branch_name`


#### `$ git checkout -b <new_branch> [<start_point>]`

- `-b` :  创建新分支，并切换到该分支
- `<new_branch>` :  新分支的名称
- `<start_point>` :  commit_id 或 branch_name，也可以是远程分支名（`<remote>/<branch>`）

> `$ git checkout -b abc` 当前分支基础上，创建一个名为 abc 的分支，并切换到 abc 分支
>
> `$ git checkout -b abc master` 基于 master 分支 ......
>
> `$ git checkout -b abc origin/master` 基于远程 master 分支 ......


#### `$ git push`

`git push` 的参数比较复杂，下面例举工作中最常用的几个方式：

> `$ git push origin HEAD` 当前 branch 以同名方式推送到远程版本库
>
> `$ git push origin branch_name` 把指定 branch 推送到远程版本库
>
> `$ git push origin local_branch:remote_branch` 本地 branch 推送到远程，分别指定具体名称
>
> `$ git push origin :remote_branch` 删除远程版本库中的 branch
>
> `$ git push origin --all` 把本地所有 branch 都推送到远程版本库，除了 tag
>
> `$ git push origin --all --follow-tags` 把本地所有 branch 都推送到远程版本库，包括 tag
>
> `$ git push origin --tags` 把本地所有 tag 推送到远程版本库
>
> `$ git push origin tag_name` 推送指定 tag 到远程版本库


#### `$ git tag`

`git tag` 相关的几个常用命令

> `$ git tag -n` 查看本地版本库的所有 tag
>
> `$ git tag tag_name [<commit> | <object>] -m "message"` 创建新 tag
>
> `$ git tag -d tag_name` 删除指定 tag
>
> `$ git tag -v tag_name` 查看指定 tag


### 其它操作

#### `$ git remote set-url origin <url>`

变更当前版本库对应的远程版本库地址

#### 迁移：从 svn 到 git

```
$ git svn clone -r <svn_revision>:HEAD <svn_url> --trunk=<trunk> --tags=<tags> --branches=<branches> --branches=<milestones> <project_name>
```

- `<svn_revision>` : 导出 svn 的起始版本号，如果不带 -r 参数，公司内的 svn revision 已经接近 60w，默认从 0 开始，整个过程将会非常缓慢
- `<svn_url>` : svn 工程的 url，该目录下可能包括 trunk、tags、branches、milestones 目录
- `<trunk>` : svn 工程对应的 trunk 目录名
- `<tags>` : svn 工程对应的 tags 目录名，如果没有，请忽略 --tags 参数
- `<branches>` : svn 工程对应的 branches 目录名，可以是多个。如果没有，请忽略 --branches 参数


## Gitflow

- Gitflow 的安装
  - 见官方的 [Installation](https://github.com/nvie/gitflow/wiki/Installation)

- 常用命令就这几个

![gitflow 基本命令](/xyg_blog/image/git-flow-commands.png)

- 参数说明
  - 本地版 [Command Line Arguments](./gitflow_command_line_arguments.md)
  - 官方版 [Command Line Arguments](https://github.com/nvie/gitflow/wiki/Command-Line-Arguments)

- Gitflow 的开发模式
  - master & develop 为主要分支。所有的开发以 develop 为 base，master 分支始终保持 production-ready 状态
  - 除 master 和 develop 分支外，其它分支名前缀限定为：feaature，release，hotfixes

![gitflow 开发模式](/xyg_blog/image/gitflow-dev-model.png)


## 参考资源

- [Git 命令参考手册](https://git-scm.com/docs)
- 官方出品的在线电子书：[Pro Git](https://git-scm.com/book/zh/v1)
- [gitflow 的 github 地址](https://github.com/nvie/gitflow)
- gitflow 官方的一篇博文：[A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)
- [gitflow 官方 wiki，包括安装、详细的命令行参数说明等](https://github.com/nvie/gitflow/wiki)
