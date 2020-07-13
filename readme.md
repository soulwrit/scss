# CSS 库的设计原则
在之前的开发工作中，我几乎都是在严格执行`CSS BEM`，这种规则最显著的代表作就是`bootstrap`，起初，也就是前几年，我都是循规蹈矩的积累属于自己的`CSS Lib`，后来在写了改，改了删，删了又写之后，发现很多问题，比如`顾此失彼`，比如`过分优化`等，都会导致我停留在一个阶段无法前进，而代码也显得很臃肿，尤其是使用`CSS BEM`之后，往往会出现一堆选择器对应一个或一段样式，而且样式层级与DOM结构关系确定，尽管此时没有复用性，因此我决定按照自己的想法来实现一套`CSS Lib`，首先，我把`Lib`中的样式大致分为两类：
- 第一类属于工具类，不存在嵌套关系，属于最顶级的类，可以在全局四处使用
- 第二类就是组件类，存在严格的嵌套关系，并且层级之间使用了`>`来确定关系，避免样式污染与多余的匹配，举个例子
```css
    .menu {
        /* 一些 css code */
    }
    .menu .item {
        /* 一些 css code */
    }
```
再来一段`HTML`
```html
    <div class='menu'>
        <div class='item'>
            <div class='some class'>
                <div class='item'> item ...</div>
            </div>
        </div>
    </div>
```
简单一分析，在上述代码中我定义了一个`.menu`的类，用来描述`menu`的外表，但在`menu`组件中能匹配到`.menu .item`这层关系的具有两组，`div.menu div.item`与`div.menu ... div.item`,  或许你内层的`.item`需要这种样式，抛开这种情况不说，通常是不需要的，因此就需要你去为内层的`.item`重命名，或者加一些其他的限制条件，但不论怎样，对于`词穷`的我来说，内层不能再使用`.item`是一件很痛苦的事情，因此我会做如下处理：
```css
    .menu {
        /* 一些 css code */
    }
    .menu>.item {
        /* 一些 css code */
    }
```
这样我就可以在内层继续使用`.item`定义一些别的样式，在本`Lib`中，我就是这么处理我的CSS组件的，因此我的CSS组件对应的DOM结构是固定的。
---
除此之外，我坚守的原则不再是`BEM`，我希望特定的语义词限定特定的样式，不能是在全局工具类中，还是在CSS组件中，比如`disabled`,`readonly`等等，如此这般都会被我定义一个全局类，而当它们出现在特定组件内时，需要补充或者重构，只需要加上组件类进行限定即可，我称之为`CSS 语义化简写限定（Semantically Shorthand qualified）`简称`SSQ`，也许你能在这个世界上找到类似的成熟的`css lib`，比如[Semantic-ui](https://github.com/Semantic-Org/Semantic-UI-CSS)，但还是存在具体的区别的
1. 本`Lib`中，我是拒绝书写一些复杂的选择器的，比如过长的属性值选择或者CSS高版本提供的一些兼容比较差的选择，而且优化了层级关系，处理掉了没必要存在的包装，虽然这可能会导致一些问题，但对于组件而言不过是个`权衡`的问题
2. `CSS类名简写`，这并不是什么新东西，在一些约定俗称的类名面前，我选择使用约定的，尽量保证看一眼就能明白，看一次就能记住的原则，简写可以保证类名足够短，在`ssr`中，可以有效的减小`HTML`文件的大小与`CSS sources`的大小，当然你可能不在乎这么一点点的优化，这只是为了自己在书写过程中能简洁快速一些。这也存在一些弊端，对于新人或者不熟悉的此规则的人来说，存在一些学习成本，需要明白和知道这些规则

## 全局工具类类名与简写对照
- `tac`==>`text-center` 文本居中
- `tar`==>`text-right`  文本居右 
- `taj`==>`text-justify` 文本两端对齐
- `cb` ==>`clear-both` 清除浮动
- `fl` ==>`float-left` 左浮动
- `fr` ==>`float-right` 右浮动
- `ff` ==>`float-full` 100%浮动
- `non`==>`none` 元素display: none
- `hid`==>`hidden` 完全隐藏
- `vhid`==>`visually-hidden` 不可见
- `blk`==>`block` 块元素
- `inb`==>`inline-block` 行内块元素
- `ellipsis`==>`text-ellipsis` 文本溢出
- `s` ==>`scroll` 滚动条样式
- `sx`==>`scroll-x` 水平滚动条
- `sy`==>`scroll-y` 垂直滚动条
- `placeholder` 占位符样式
- `disabled` 禁用样式
- `required` 必须样式
- `fakelink` 使用其他元素模仿`a`（超链接）的样式
- `svgico` 使用 `svg` 做图标组件时的样式
- `wrap` 行尾换行
- `swrap` 行顶换行

## 组件类中的css类名简称
- `i`  ==> `item`  一个序列项
- `hd` ==> `head` 一个容器的头部（顶栏）
- `nk` ==> `neck` 一个容器的脖子部位（副标题栏）
- `bd` ==> `body` 一个容易的内容体（身体，主体）
- `ft` ==> `foot` 一个容器的脚部（底部栏）
- `tit`==> `title` 标题