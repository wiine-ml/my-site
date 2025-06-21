import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,a as n,b as i,d as l,o as p}from"./app-CGH85rGz.js";const t={};function r(d,s){return p(),e("div",null,[s[0]||(s[0]=n("h1",{id:"_1",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1"},[n("span",null,"1.")])],-1)),i(" more "),s[1]||(s[1]=l(`<blockquote><p>本教程将基于一定计算机编程基础的基础上进行介绍。<br> Godot默认使用的GDScript语言与Python的使用方式比较相似，在有一定Python的基础上会对学习使用Godot引擎有很大的帮助。</p></blockquote><h2 id="认识-gdscript" tabindex="-1"><a class="header-anchor" href="#认识-gdscript"><span>认识 GDScript</span></a></h2><h3 id="gdscript-中的变量定义" tabindex="-1"><a class="header-anchor" href="#gdscript-中的变量定义"><span>GDScript 中的变量定义</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># GDScript 中使用 var 关键字声明变变量, 在不指定类型时后续可以存储任意类型的数据</span></span>
<span class="line"><span># 如果要在声明变量时限定类型可以使用 :type 指定类型，后续只能存储该类型的数据。</span></span>
<span class="line"><span># 如果指定了初始值可以使用 := 自动推导变量类型，同样的后续只能存储该类型的数据。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 其基本语法如下</span></span>
<span class="line"><span>var &lt;变量名称&gt; [: 类型] [= &lt;初始值&gt;]</span></span>
<span class="line"><span>var &lt;variable_name&gt; [: type] [= &lt;iniial value&gt;]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量名称（标识符）仅限于标识符仅限于含字母字符（ a 到 z 和 A 到 Z ）、 数字（ 0 到 9 ）和下划线 _ 的字符串，不能以数字开头，且大小写敏感（如 foo 和 FOO 就是两个不同的标识符）。<br> 需要注意在声明变量的时候不要使用 GDScript 中保留的关键字 <a href="https://docs.godotengine.org/zh-cn/4.x/tutorials/scripting/gdscript/gdscript_basics.html#identifiers" target="_blank" rel="noopener noreferrer">godot文档/GDScript - 关键字</a></p><h3 id="gdscript-中的运算符" tabindex="-1"><a class="header-anchor" href="#gdscript-中的运算符"><span>GDScript 中的运算符</span></a></h3><p>在GDScript中许多运算符的使用与Python中运算符的使用类似，具体运算符优先级可以参考 <a href="https://docs.godotengine.org/zh-cn/4.x/tutorials/scripting/gdscript/gdscript_basics.html#operators" target="_blank" rel="noopener noreferrer">godot文档/GDScript - 运算符</a>。在复杂运算中需要格外注意运算符的优先级，但考虑到代码的可读性与避免运算歧义，官方文档中也建议使用括号 ( ) 处理运算优先级。</p><p>以下示例展示一些GDScript中一些特殊的运算符使用</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>not x   # 非运算 - 推荐使用的方式</span></span>
<span class="line"><span>x and y # 与运算 - 推荐使用的方式</span></span>
<span class="line"><span>x or y  # 或运算 - 推荐使用的方式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>!x      # 非运算 - 不推荐使用的方式</span></span>
<span class="line"><span>x &amp;&amp; y  # 与运算 - 不推荐使用的方式</span></span>
<span class="line"><span>x || y  # 或运算 - 不推荐使用的方式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>x as Node # GDScript中 使用 as 关键字进行类型转换</span></span>
<span class="line"><span></span></span>
<span class="line"><span>x is Node # 使用 is 关键字进行类型检查</span></span>
<span class="line"><span>x is not Node </span></span>
<span class="line"><span></span></span>
<span class="line"><span>x if condition else y # 真表达式 if 条件 else 假表达式 三元（目）运算符</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gdscript-中的字面量" tabindex="-1"><a class="header-anchor" href="#gdscript-中的字面量"><span>GDScript 中的字面量</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>null # 空值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&#39;Hello, Godot!&#39; # 字符串</span></span>
<span class="line"><span>&quot;Hello, Godot!&quot; </span></span>
<span class="line"><span>&#39;&#39;&#39;Hello, Godot!&#39;&#39;&#39;</span></span>
<span class="line"><span>&quot;&quot;&quot;Hello, Godot!&quot;&quot;&quot; # GDScript中支持使用单引号、双引号、以及使用三对引号定义字符串</span></span>
<span class="line"><span></span></span>
<span class="line"><span>r&#39;Hello, Godot!&#39; # 字符串前加 r 表示原始字符串</span></span>
<span class="line"><span></span></span>
<span class="line"><span># &amp; 字符串是不可变字符串，用于表示唯一名称，具有相同值的两个 StringName 是同一个对象，比较速度极快，而一般字符串是普通的可变字符串。</span></span>
<span class="line"><span>&amp;&#39;Hello, Godot!&#39; </span></span>
<span class="line"><span></span></span>
<span class="line"><span># ^ 字符串用于表示节点路径，代表节点层次结构中指向某个节点或属性的路径。节点树的路径表示与文件系统路径表示相似，&quot;..&quot; 和 &quot;.&quot; 都是特殊的节点名称，分别指向父节点和当前节点。</span></span>
<span class="line"><span>^&quot;A&quot;            # 指向直接子节点 A。</span></span>
<span class="line"><span>^&quot;A/B&quot;          # 指向 A 的子节点 B。</span></span>
<span class="line"><span>^&quot;.&quot;            # 指向当前节点。</span></span>
<span class="line"><span>^&quot;..&quot;           # 指向父节点。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>^&quot;/root&quot;        # 以斜杠开头的路径是绝对路径，径从 SceneTree 开始，指向 SceneTree 的根 Window。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>^&quot;:position&quot;    # 比较独特的是节点路径也可以指向属性，如示例即指向该对象的位置。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 整数和浮点数可用 _ 进行分隔，使其更加易读</span></span>
<span class="line"><span>12_345_678</span></span>
<span class="line"><span>3.141_592_7</span></span>
<span class="line"><span>0x8080_0000_ffff</span></span>
<span class="line"><span>0b11_00_11_00</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意也有两种长得像字面量，但实际上不是字面量的量</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>$NodePath is get_node(&quot;NodePath&quot;) # 通过路径获取节点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>%UniqueNode is get_node(&quot;%UniqueNode&quot;) # 通过唯一名称获取节点（可以通过右键单击节点设置唯一名称访问）</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13))])}const v=a(t,[["render",r]]),u=JSON.parse('{"path":"/godot-tutorial/Godot%E6%95%99%E7%A8%8B-1.html","title":"1. GDScript中的变量","lang":"zh-CN","frontmatter":{"title":"1. GDScript中的变量","icon":"gears","date":"2025-06-01T00:00:00.000Z","category":["godot"],"tag":["教程","godot","GDScript"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"1. GDScript中的变量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-06-01T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"wiine-ml\\",\\"url\\":\\"https://mister-hope.com\\"}]}"],["meta",{"property":"og:url","content":"https://mister-hope.github.io/my-site/godot-tutorial/Godot%E6%95%99%E7%A8%8B-1.html"}],["meta",{"property":"og:site_name","content":"wiine-site"}],["meta",{"property":"og:title","content":"1. GDScript中的变量"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"GDScript"}],["meta",{"property":"article:tag","content":"godot"}],["meta",{"property":"article:tag","content":"教程"}],["meta",{"property":"article:published_time","content":"2025-06-01T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":3.19,"words":958},"filePathRelative":"godot-tutorial/Godot教程-1.md","excerpt":"\\n"}');export{v as comp,u as data};
