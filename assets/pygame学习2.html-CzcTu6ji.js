import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,a as n,b as i,d as l,o as p}from"./app-CGH85rGz.js";const r="/my-site/assets/images/%E5%8A%A8%E6%80%81%E5%8D%A1%E7%89%8C%E6%95%88%E6%9E%9C-%E9%9D%99%E6%AD%A2.png",c="/my-site/assets/images/%E5%8A%A8%E6%80%81%E5%8D%A1%E7%89%8C%E6%95%88%E6%9E%9C-%E7%A7%BB%E5%8A%A8.png",d={};function t(m,s){return p(),e("div",null,[s[0]||(s[0]=n("h1",{id:"",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#"},[n("span")])],-1)),i(" more "),s[1]||(s[1]=l(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>本篇中会使用 Pygame 实现一个具有动态效果的扑克牌（卡牌）展示。当鼠标移动到卡牌静止位置的左右两侧时，卡牌会平滑地向相应方向移动并旋转一定角度，并通过线性插值实现平滑过渡效果。</p><h2 id="核心功能与实现" tabindex="-1"><a class="header-anchor" href="#核心功能与实现"><span>核心功能与实现</span></a></h2><h3 id="_1-项目结构" tabindex="-1"><a class="header-anchor" href="#_1-项目结构"><span>1. 项目结构</span></a></h3><ul><li>main.py ：程序入口文件，负责初始化 Pygame、设置屏幕尺寸、定义主游戏循环以及创建卡牌对象并更新、绘制其状态。</li><li>poker.py ：定义 Poker 类，封装卡牌的属性（位置、尺寸、最大移动距离、最大旋转角度等）以及更新和绘制卡牌的方法。</li><li>utils.py ：提供线性插值函数，用于计算卡牌状态变化的增量，实现平滑过渡。</li></ul><h3 id="_2-实现思路-代码实现" tabindex="-1"><a class="header-anchor" href="#_2-实现思路-代码实现"><span>2. 实现思路 &amp;&amp; 代码实现</span></a></h3><h4 id="_2-1-初始化-pygame-和设置屏幕" tabindex="-1"><a class="header-anchor" href="#_2-1-初始化-pygame-和设置屏幕"><span>2.1. 初始化 Pygame 和设置屏幕</span></a></h4><p>在 main.py 中，通过 pygame.init() 初始化 Pygame 系统，然后使用 pygame.display.set_mode() 创建指定尺寸（WIDTH, HEIGHT）的屏幕窗口，设置窗口标题为 “响应式扑克牌动画”。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 初始化pygame</span></span>
<span class="line"><span>pygame.init()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 屏幕尺寸</span></span>
<span class="line"><span>WIDTH, HEIGHT = 1280, 960</span></span>
<span class="line"><span>screen = pygame.display.set_mode((WIDTH, HEIGHT))</span></span>
<span class="line"><span>pygame.display.set_caption(&quot;响应式扑克牌动画&quot;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-卡牌对象创建与属性定义" tabindex="-1"><a class="header-anchor" href="#_2-2-卡牌对象创建与属性定义"><span>2.2. 卡牌对象创建与属性定义</span></a></h4><p>在 Poker 类的 __init__ 方法中，初始化卡牌的矩形区域（用于表示卡牌的位置和尺寸）、最大移动距离、最大旋转角度以及插值因子等属性。卡牌的初始位置通过传入的参数（x, y）确定，中心点坐标根据初始位置和尺寸计算得出。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class Poker:</span></span>
<span class="line"><span>    def __init__(self, x, y, width, height, max_move, max_angle, interpolation_factor):</span></span>
<span class="line"><span>        self.rect = pygame.Rect(x, y, width, height)</span></span>
<span class="line"><span>        self.max_move = max_move</span></span>
<span class="line"><span>        self.max_angle = max_angle</span></span>
<span class="line"><span>        self.interpolation_factor = interpolation_factor</span></span>
<span class="line"><span>        self.current_angle = 0  # 当前旋转角度</span></span>
<span class="line"><span>        self.current_move = 0  # 当前移动距离</span></span>
<span class="line"><span>        self.center = (x + width // 2, y + height // 2)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-卡牌状态更新逻辑" tabindex="-1"><a class="header-anchor" href="#_2-3-卡牌状态更新逻辑"><span>2.3. 卡牌状态更新逻辑</span></a></h4><p>在 Poker 类的 update 方法中，根据鼠标位置更新卡牌的移动距离和旋转角度：</p><ul><li>首先计算鼠标与卡牌静止位置（中心点）在水平方向的距离，判断鼠标是否在卡牌静止位置的左侧或右侧，从而确定目标移动距离（target_move）和目标旋转角度（target_angle）。</li><li>利用线性插值函数计算当前移动距离和旋转角度与目标值之间的增量，并结合时间步长（dt）更新卡牌的当前状态（current_move 和 current_angle）。</li><li>根据新的移动距离计算卡牌的中心位置，确保其在最大移动范围内，并更新卡牌的矩形区域位置。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>def update(self, mouse_pos, dt):</span></span>
<span class="line"><span>    # 计算卡牌中心点</span></span>
<span class="line"><span>    target_move = 0</span></span>
<span class="line"><span>    target_angle = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 检查鼠标是否在卡牌静止位置左右侧</span></span>
<span class="line"><span>    if abs(mouse_pos[0] - self.center[0]) &gt; self.max_move:</span></span>
<span class="line"><span>        # 如果鼠标在卡牌静止位置的左侧</span></span>
<span class="line"><span>        if mouse_pos[0] &lt; self.center[0]:</span></span>
<span class="line"><span>            target_move = -self.max_move</span></span>
<span class="line"><span>            target_angle = -self.max_angle</span></span>
<span class="line"><span>        # 如果鼠标在卡牌静止位置的右侧</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            target_move = self.max_move</span></span>
<span class="line"><span>            target_angle = self.max_angle</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 使用线性插值缓慢移动，并使用dt确保平滑过渡</span></span>
<span class="line"><span>    self.current_move += dt * linear_interpolation(self.current_move, target_move, self.interpolation_factor)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    self.current_angle += dt * linear_interpolation(self.current_angle, target_angle, self.interpolation_factor)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 计算卡牌的新位置，并限制在 max_move 范围内</span></span>
<span class="line"><span>    new_centerx = self.center[0] + self.current_move</span></span>
<span class="line"><span>    new_centerx = min(max(new_centerx, self.center[0] - self.max_move), self.center[0] + self.max_move)</span></span>
<span class="line"><span>    self.rect.centerx = int(new_centerx)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-4-卡牌绘制" tabindex="-1"><a class="header-anchor" href="#_2-4-卡牌绘制"><span>2.4. 卡牌绘制</span></a></h4><p>在 Poker 类的 draw 方法中，使用 Pygame 的绘图功能绘制卡牌：</p><ul><li>创建一个与卡牌尺寸相同的透明表面（Surface），在该表面上绘制卡牌的边框（矩形）。</li><li>使用 pygame.transform.rotate() 对绘制好的卡牌表面进行旋转，旋转角度为当前旋转角度（current_angle）。</li><li>获取旋转后的表面的矩形区域，并将其中心设置为卡牌的当前位置中心，然后将旋转后的表面绘制到主屏幕表面（surface）上。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>def draw(self, surface):</span></span>
<span class="line"><span>    # 绘制卡牌（简单矩形代替）</span></span>
<span class="line"><span>    rotated_card = pygame.Surface((self.rect.width, self.rect.height), pygame.SRCALPHA)</span></span>
<span class="line"><span>    pygame.draw.rect(rotated_card, (0, 0, 0), (0, 0, self.rect.width, self.rect.height), 5)</span></span>
<span class="line"><span>    rotated_card = pygame.transform.rotate(rotated_card, -self.current_angle)</span></span>
<span class="line"><span>    rotated_rect = rotated_card.get_rect(center=self.rect.center)</span></span>
<span class="line"><span>    surface.blit(rotated_card, rotated_rect.topleft)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-主游戏循环" tabindex="-1"><a class="header-anchor" href="#_2-5-主游戏循环"><span>2.5. 主游戏循环</span></a></h4><p>在 main.py 的 game_loop 函数中，定义游戏的主循环：</p><ul><li>处理事件（如关闭窗口事件）。</li><li>获取鼠标当前位置。</li><li>更新卡牌状态（调用 Poker 对象的 update 方法）。</li><li>清空屏幕（填充白色背景）。</li><li>绘制卡牌（调用 Poker 对象的 draw 方法）以及卡牌中心点、屏幕中心点和鼠标位置点（用于辅助观察效果）。</li><li>更新显示（刷新屏幕）。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>def game_loop():</span></span>
<span class="line"><span>    clock = pygame.time.Clock()</span></span>
<span class="line"><span>    # 控制帧率</span></span>
<span class="line"><span>    clock.tick(FRAME_RATE)</span></span>
<span class="line"><span>    running = True</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 创建卡牌对象</span></span>
<span class="line"><span>    poker = Poker(</span></span>
<span class="line"><span>        WIDTH // 2 - CARD_WIDTH // 2,</span></span>
<span class="line"><span>        HEIGHT // 2 - CARD_HEIGHT // 2,</span></span>
<span class="line"><span>        CARD_WIDTH,</span></span>
<span class="line"><span>        CARD_HEIGHT,</span></span>
<span class="line"><span>        max_move,</span></span>
<span class="line"><span>        max_angle,</span></span>
<span class="line"><span>        interpolation_factor</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    while running:</span></span>
<span class="line"><span>        # 事件处理</span></span>
<span class="line"><span>        for event in pygame.event.get():</span></span>
<span class="line"><span>            if event.type == pygame.QUIT:</span></span>
<span class="line"><span>                running = False</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 获取鼠标位置</span></span>
<span class="line"><span>        mouse_pos = pygame.mouse.get_pos()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        dt = clock.tick(FRAME_RATE) / 1000</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 更新卡牌状态</span></span>
<span class="line"><span>        poker.update(mouse_pos, dt)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 清屏</span></span>
<span class="line"><span>        screen.fill(WHITE)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 绘制卡牌</span></span>
<span class="line"><span>        poker.draw(screen)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        pygame.draw.circle(screen, &#39;red&#39;, poker.center, 6)  # 绘制卡牌中心点</span></span>
<span class="line"><span>        pygame.draw.circle(screen, BLACK, ((WIDTH // 2), (HEIGHT // 2)), 5)# 绘制屏幕中心点</span></span>
<span class="line"><span>        pygame.draw.circle(screen, &#39;#666666&#39;, mouse_pos, 5)  # 绘制鼠标位置</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 更新显示</span></span>
<span class="line"><span>        pygame.display.flip()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    pygame.quit()</span></span>
<span class="line"><span>    sys.exit()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-pygame-的使用要点" tabindex="-1"><a class="header-anchor" href="#_3-pygame-的使用要点"><span>3. Pygame 的使用要点</span></a></h3><ul><li><ol><li>坐标系和事件处理 ：Pygame 使用屏幕左上角为原点的坐标系，通过 pygame.event.get() 获取并处理各类事件，如窗口关闭事件（pygame.QUIT）。</li></ol></li><li><ol start="2"><li>表面（Surface）和绘制 ：使用 pygame.Surface 创建绘图表面，可以进行绘制操作（如绘制矩形、旋转等）。通过 blit() 方法将一个表面绘制到另一个表面（如主屏幕表面）上。</li></ol></li><li><ol start="3"><li>矩形（Rect）和碰撞检测 ：pygame.Rect 对象用于表示矩形区域，方便进行位置和尺寸管理以及碰撞检测等操作。在本项目中用于表示卡牌的位置和尺寸。</li></ol></li><li><ol start="4"><li>时间控制和动画效果 ：利用 pygame.time.Clock 控制帧率，确保动画的平滑性。通过计算时间步长（dt）并结合插值函数实现状态变化的平滑过渡，从而产生动画效果。</li></ol></li></ul><h3 id="_4-代码结构与运行" tabindex="-1"><a class="header-anchor" href="#_4-代码结构与运行"><span>4. 代码结构与运行</span></a></h3><p>将上述三个文件（main.py、poker.py、utils.py）放在同一目录下，运行 main.py 即可启动程序，通过移动鼠标观察卡牌的动态响应效果。运行后应有以下效果</p><p><img src="`+r+'" alt="效果1" width="640" height="480"></p><p><img src="'+c+'" alt="效果2" width="640" height="480"></p><h3 id="_5-总结" tabindex="-1"><a class="header-anchor" href="#_5-总结"><span>5. 总结</span></a></h3><p>本项目通过 Pygame 实现了一个简单但具有动态效果的卡牌展示。通过合理利用 Pygame 的绘图、事件处理和时间控制等功能，结合线性插值算法，实现了卡牌随鼠标位置变化而平滑移动和旋转的效果。读者可以根据实际需求对代码进行扩展和修改，如添加更多卡牌、丰富卡牌的外观和动画效果等，以实现更复杂的应用场景。</p>',32))])}const u=a(d,[["render",t]]),h=JSON.parse('{"path":"/coding/pygame%E5%AD%A6%E4%B9%A02.html","title":"pygame学习-2 / 使用pygame实现一个动态卡牌效果","lang":"zh-CN","frontmatter":{"title":"pygame学习-2 / 使用pygame实现一个动态卡牌效果","icon":"book","date":"2025-05-02T00:00:00.000Z","category":["游戏","Python"],"tag":["pygame","学习","教程"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"pygame学习-2 / 使用pygame实现一个动态卡牌效果\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-05-02T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"wiine-ml\\",\\"url\\":\\"https://mister-hope.com\\"}]}"],["meta",{"property":"og:url","content":"https://mister-hope.github.io/my-site/coding/pygame%E5%AD%A6%E4%B9%A02.html"}],["meta",{"property":"og:site_name","content":"wiine-site"}],["meta",{"property":"og:title","content":"pygame学习-2 / 使用pygame实现一个动态卡牌效果"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"教程"}],["meta",{"property":"article:tag","content":"学习"}],["meta",{"property":"article:tag","content":"pygame"}],["meta",{"property":"article:published_time","content":"2025-05-02T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":5.66,"words":1697},"filePathRelative":"coding/pygame学习2.md","excerpt":"\\n"}');export{u as comp,h as data};
