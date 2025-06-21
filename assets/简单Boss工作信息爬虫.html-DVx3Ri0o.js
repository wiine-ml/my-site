import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,a as n,b as e,d as l,o as p}from"./app-CGH85rGz.js";const r={};function d(t,s){return p(),i("div",null,[s[0]||(s[0]=n("h1",{id:"",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#"},[n("span")])],-1)),e(" more "),s[1]||(s[1]=l(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>  本文将带你实现一个简单的 Boss 工作信息爬虫，通过 Python 及其相关库，模拟浏览器操作，从 Boss 直聘网站获取并解析工作招聘信息，最终以清晰的格式展示出来。</p><h2 id="程序概览" tabindex="-1"><a class="header-anchor" href="#程序概览"><span>程序概览</span></a></h2><p>该爬虫程序主要分为以下几个部分：</p><blockquote><ul><li>URL 构造 ：根据用户指定的查询条件动态生成目标招聘页面的 URL。</li><li>数据抓取 ：利用 Selenium 模拟浏览器打开生成的 URL，获取页面的 HTML 内容。</li><li>数据解析 ：使用 BeautifulSoup 解析 HTML，提取职位名称、薪资范围、工作经验要求、学历要求等关键信息。</li><li>结果展示 ：将解析得到的职位信息以特定格式打印输出。</li></ul></blockquote><h2 id="详细拆解" tabindex="-1"><a class="header-anchor" href="#详细拆解"><span>详细拆解</span></a></h2><h3 id="_1-环境准备" tabindex="-1"><a class="header-anchor" href="#_1-环境准备"><span>1. 环境准备</span></a></h3><p>确保安装了以下工具和库：</p><blockquote><ul><li>Python</li><li>Selenium 库（通过 pip install selenium 安装）</li><li>Webdriver_manager 库（通过 pip install webdriver-manager 安装）</li><li>BeautifulSoup 库（通过 pip install beautifulsoup4 安装）</li></ul></blockquote><h3 id="_2-代码实现" tabindex="-1"><a class="header-anchor" href="#_2-代码实现"><span>2. 代码实现</span></a></h3><h4 id="_2-1-导入必要的模块" tabindex="-1"><a class="header-anchor" href="#_2-1-导入必要的模块"><span>2.1. 导入必要的模块</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>from selenium import webdriver</span></span>
<span class="line"><span>from selenium.webdriver.common.by import By</span></span>
<span class="line"><span>from selenium.webdriver.common.keys import Keys</span></span>
<span class="line"><span>from selenium.webdriver.edge.service import Service</span></span>
<span class="line"><span>from webdriver_manager.microsoft import EdgeChromiumDriverManager</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span>from bs4 import BeautifulSoup</span></span>
<span class="line"><span>import sys</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中：<br> 导入 Selenium 相关模块用于模拟浏览器操作。<br> 导入 time 模块用于设置等待时间，确保页面加载完成。<br> 导入 BeautifulSoup 用于解析 HTML 内容。<br> 导入 sys 模块用于处理命令行参数。</p><h4 id="_2-2-定义目标页面基础-url-和职位信息存储列表" tabindex="-1"><a class="header-anchor" href="#_2-2-定义目标页面基础-url-和职位信息存储列表"><span>2.2. 定义目标页面基础 URL 和职位信息存储列表</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 目标页面</span></span>
<span class="line"><span>base_url = &quot;https://www.zhipin.com/web/geek/jobs&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 存储职位信息搜索结果的列表</span></span>
<span class="line"><span>result_jobs = []</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>指定要爬取的 Boss 直聘招聘页面的基础 URL。<br> 创建一个空列表 result_jobs，用于存储后续提取的职位信息。</p><h4 id="_2-3-定义职位信息类" tabindex="-1"><a class="header-anchor" href="#_2-3-定义职位信息类"><span>2.3. 定义职位信息类</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>class JobInfo:</span></span>
<span class="line"><span>    def __init__(self, title, salary, experience, education, tags, company, location):</span></span>
<span class="line"><span>        self.title = title  # 职位名称</span></span>
<span class="line"><span>        self.salary = salary  # 薪资范围</span></span>
<span class="line"><span>        self.experience = experience  # 工作经验要求</span></span>
<span class="line"><span>        self.education = education  # 学历要求</span></span>
<span class="line"><span>        self.tags = tags  # 职位标签（如技能要求、福利等）</span></span>
<span class="line"><span>        self.company = company  # 公司名称</span></span>
<span class="line"><span>        self.location = location  # 工作地点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def __str__(self):</span></span>
<span class="line"><span>        job_info_text = f&quot;职位名称: {self.title}\\n&quot; + f&quot;工作经验: {self.experience}\\n&quot; + f&quot;学历要求: {self.education}\\n&quot; + f&quot;职位标签: {&#39;, &#39;.join(self.tags)}\\n&quot; + f&quot;公司名称: {self.company}\\n&quot; + f&quot;工作地点: {self.location}\\n&quot;</span></span>
<span class="line"><span>        return job_info_text</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义一个 JobInfo 类，用于封装职位的各项信息，包括职位名称、薪资范围、工作经验要求、学历要求、职位标签、公司名称和工作地点。<br> 通过 str 方法定义该类实例的字符串表示形式，方便后续打印输出。</p><h4 id="_2-4-设置查询条件字典" tabindex="-1"><a class="header-anchor" href="#_2-4-设置查询条件字典"><span>2.4. 设置查询条件字典</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>option_city = {</span></span>
<span class="line"><span>    &#39;全国&#39;: 100010000,</span></span>
<span class="line"><span>    &#39;北京&#39;: 101010100,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>option_jobType = {</span></span>
<span class="line"><span>    &#39;全职&#39;: 1901,</span></span>
<span class="line"><span>    &#39;兼职&#39;: 1903,</span></span>
<span class="line"><span>    &#39;实习&#39;: 1902,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>option_salary = {</span></span>
<span class="line"><span>    &#39;3K以下&#39;: 402,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>option_experience = {</span></span>
<span class="line"><span>    &#39;在校生&#39;: 108,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>option_degree = {</span></span>
<span class="line"><span>    &#39;初中及以下&#39;: 209,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>option_industry = {</span></span>
<span class="line"><span>    &#39;互联网&#39;: 100020,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>option_scale = {</span></span>
<span class="line"><span>    &#39;0-20人&#39;: 301,</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义多个字典，每个字典对应一种查询条件（如城市、工作类型、薪资范围等），键为条件的可读名称，值为对应的实际参数值，这些参数值用于构造 URL 查询字符串。</p><h4 id="_2-5-定义-url-构造函数" tabindex="-1"><a class="header-anchor" href="#_2-5-定义-url-构造函数"><span>2.5. 定义 URL 构造函数</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>def url_construct(**kwargs) -&gt; str:</span></span>
<span class="line"><span>    query_params = []</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 遍历所有选项字典</span></span>
<span class="line"><span>    for key, value in kwargs.items():</span></span>
<span class="line"><span>        if value is not None:</span></span>
<span class="line"><span>            query_params.append(f&quot;{key}={value}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 将查询参数拼接到基础 URL 中</span></span>
<span class="line"><span>    if query_params:</span></span>
<span class="line"><span>        query_string = &quot;&amp;&quot;.join(query_params)</span></span>
<span class="line"><span>        return f&quot;{base_url}?{query_string}&quot;</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        return base_url</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义 url_construct 函数，接收可变关键字参数 **kwargs。<br> 遍历传入的关键字参数，将非空的参数键值对构造成查询字符串的一部分。<br> 将所有查询部分用 &quot;&amp;&quot; 连接，并拼接到基础 URL 后面，生成最终的目标 URL。如果没有查询条件，则直接返回基础 URL。</p><h4 id="_2-6-定义职位信息获取函数" tabindex="-1"><a class="header-anchor" href="#_2-6-定义职位信息获取函数"><span>2.6. 定义职位信息获取函数</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>def job_getter(target_url):</span></span>
<span class="line"><span>    # 初始化 WebDriver（使用 Edge 浏览器）</span></span>
<span class="line"><span>    driver = webdriver.Edge(service=Service(EdgeChromiumDriverManager().install()))</span></span>
<span class="line"><span>    driver.get(target_url)</span></span>
<span class="line"><span>    # 等待页面加载完成</span></span>
<span class="line"><span>    print(&#39;start waiting&#39;)</span></span>
<span class="line"><span>    time.sleep(3)  # 等待 5 秒，确保页面加载完成</span></span>
<span class="line"><span>    print(&#39;end waiting&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 获取页面的 HTML 内容</span></span>
<span class="line"><span>    html_content = driver.page_source</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 使用 BeautifulSoup 解析 HTML</span></span>
<span class="line"><span>    soup = BeautifulSoup(html_content, &#39;lxml&#39;)</span></span>
<span class="line"><span>    print(&#39;get soup success&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 查找 job-list-container 下的 &lt;ul&gt; 列表</span></span>
<span class="line"><span>    job_list_container = soup.find(&#39;div&#39;, class_=&#39;job-list-container&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if job_list_container:</span></span>
<span class="line"><span>        job_items = job_list_container.find_all(&#39;li&#39;, class_=&#39;job-card-box&#39;)</span></span>
<span class="line"><span>        for item in job_items:</span></span>
<span class="line"><span>            # 提取职位信息</span></span>
<span class="line"><span>            title = item.find(&#39;a&#39;, class_=&#39;job-name&#39;).get_text(strip=True) if item.find(&#39;a&#39;, class_=&#39;job-name&#39;) else &quot;未知职位&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            # 获取薪资范围（使用 Selenium 获取伪元素内容）</span></span>
<span class="line"><span>            salary_element = item.find(&#39;span&#39;, class_=&#39;job-salary&#39;)</span></span>
<span class="line"><span>            if salary_element:</span></span>
<span class="line"><span>                # 获取 salary_element 的 DOM 元素</span></span>
<span class="line"><span>                salary_dom = driver.find_element(By.XPATH, f&quot;//span[@class=&#39;job-salary&#39; and contains(text(), &#39;{salary_element.get_text(strip=True)}&#39;)]&quot;)</span></span>
<span class="line"><span>                try:</span></span>
<span class="line"><span>                    # 尝试获取伪元素的 content 属性值</span></span>
<span class="line"><span>                    salary = driver.execute_script(</span></span>
<span class="line"><span>                        &quot;return window.getComputedStyle(arguments[0], &#39;::after&#39;).getPropertyValue(&#39;content&#39;);&quot;,</span></span>
<span class="line"><span>                        salary_dom</span></span>
<span class="line"><span>                    ).strip(&#39;&quot;&#39;).strip(&quot;&#39;&quot;)</span></span>
<span class="line"><span>                    # 如果获取到的内容为空，尝试直接获取文本内容</span></span>
<span class="line"><span>                    if not salary.strip():</span></span>
<span class="line"><span>                        salary = salary_element.get_text(strip=True)</span></span>
<span class="line"><span>                except Exception as e:</span></span>
<span class="line"><span>                    print(f&quot;获取薪资范围失败: {e}&quot;)</span></span>
<span class="line"><span>                    salary = &quot;薪资面议&quot;</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                salary = &quot;薪资面议&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            experience = item.find(&#39;ul&#39;, class_=&#39;tag-list&#39;).find_all(&#39;li&#39;)[0].get_text(strip=True) if item.find(&#39;ul&#39;, class_=&#39;tag-list&#39;) and len(item.find(&#39;ul&#39;, class_=&#39;tag-list&#39;).find_all(&#39;li&#39;)) &gt; 0 else &quot;经验不限&quot;</span></span>
<span class="line"><span>            education = item.find(&#39;ul&#39;, class_=&#39;tag-list&#39;).find_all(&#39;li&#39;)[1].get_text(strip=True) if item.find(&#39;ul&#39;, class_=&#39;tag-list&#39;) and len(item.find(&#39;ul&#39;, class_=&#39;tag-list&#39;).find_all(&#39;li&#39;)) &gt; 1 else &quot;学历不限&quot;</span></span>
<span class="line"><span>            tags = [tag.get_text(strip=True) for tag in item.find(&#39;ul&#39;, class_=&#39;tag-list&#39;).find_all(&#39;li&#39;)[2:]] if item.find(&#39;ul&#39;, class_=&#39;tag-list&#39;) else []</span></span>
<span class="line"><span>            company = item.find(&#39;span&#39;, class_=&#39;boss-name&#39;).get_text(strip=True) if item.find(&#39;span&#39;, class_=&#39;boss-name&#39;) else &quot;未知公司&quot;</span></span>
<span class="line"><span>            location = item.find(&#39;span&#39;, class_=&#39;company-location&#39;).get_text(strip=True) if item.find(&#39;span&#39;, class_=&#39;company-location&#39;) else &quot;未知地点&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            # 创建 JobInfo 实例并添加到列表</span></span>
<span class="line"><span>            job = JobInfo(title, salary, experience, education, tags, company, location)</span></span>
<span class="line"><span>            result_jobs.append(job)</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        print(&quot;未找到 job-list-container&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 关闭浏览器</span></span>
<span class="line"><span>    driver.quit()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化 Edge 浏览器的 WebDriver，并打开目标 URL 对应的页面。<br> 通过 time.sleep(3) 等待页面加载 3 秒，确保页面元素能够被正确获取。<br> 获取页面的 HTML 内容，并使用 BeautifulSoup 进行解析。<br> 查找包含职位列表的 job-list-container 元素，如果找到，则进一步提取每个职位卡片（job-card-box）中的信息。<br> 对于每个职位卡片，分别提取职位名称、薪资范围、工作经验要求、学历要求、职位标签、公司名称和工作地点等信息。<br> 在提取薪资范围时，由于页面中薪资信息可能存在于伪元素中，因此使用 Selenium 提供的 execute_script 方法，通过 JavaScript 获取伪元素的 content 属性值，若获取失败，则尝试直接获取元素的文本内容。<br> 将提取到的职位信息封装成 JobInfo 对象，并添加到 result_jobs 列表中。<br> 最后，关闭浏览器。</p><h4 id="_2-7-定义职位信息打印函数" tabindex="-1"><a class="header-anchor" href="#_2-7-定义职位信息打印函数"><span>2.7. 定义职位信息打印函数</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>def job_printer():</span></span>
<span class="line"><span>    for job in result_jobs:</span></span>
<span class="line"><span>        print(job)</span></span>
<span class="line"><span>        print(&quot;-&quot; * 50)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>遍历 result_jobs 列表中的每个 JobInfo 对象，调用其 str 方法获取职位信息的字符串表示，并打印输出。<br> 每打印完一个职位信息后，打印一行由 50 个 &quot;-&quot; 组成的分隔线，用于区分不同的职位信息。</p><h4 id="_2-8-主函数入口" tabindex="-1"><a class="header-anchor" href="#_2-8-主函数入口"><span>2.8. 主函数入口</span></a></h4><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>if __name__ == &quot;__main__&quot;:</span></span>
<span class="line"><span>    # 从命令行参数中获取查询条件</span></span>
<span class="line"><span>    query_options = {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 遍历命令行参数（跳过脚本名称）</span></span>
<span class="line"><span>    for arg in sys.argv[1:]:</span></span>
<span class="line"><span>        # 解析参数并添加到查询条件字典</span></span>
<span class="line"><span>        if arg in option_city:</span></span>
<span class="line"><span>            query_options[&#39;city&#39;] = option_city[arg]</span></span>
<span class="line"><span>        elif arg in option_jobType:</span></span>
<span class="line"><span>            query_options[&#39;jobType&#39;] = option_jobType[arg]</span></span>
<span class="line"><span>        elif arg in option_salary:</span></span>
<span class="line"><span>            query_options[&#39;salary&#39;] = option_salary[arg]</span></span>
<span class="line"><span>        elif arg in option_experience:</span></span>
<span class="line"><span>            query_options[&#39;experience&#39;] = option_experience[arg]</span></span>
<span class="line"><span>        elif arg in option_degree:</span></span>
<span class="line"><span>            query_options[&#39;degree&#39;] = option_degree[arg]</span></span>
<span class="line"><span>        elif arg in option_industry:</span></span>
<span class="line"><span>            query_options[&#39;industry&#39;] = option_industry[arg]</span></span>
<span class="line"><span>        elif arg in option_scale:</span></span>
<span class="line"><span>            query_options[&#39;scale&#39;] = option_scale[arg]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    target_url = url_construct(**query_options)</span></span>
<span class="line"><span>    print(target_url)</span></span>
<span class="line"><span>    job_getter(target_url)</span></span>
<span class="line"><span>    job_printer()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断当前脚本是否作为主程序运行。<br> 初始化一个空字典 query_options，用于存储从命令行参数解析得到的查询条件。<br> 遍历命令行参数（跳过第一个参数，即脚本名称），根据参数值匹配之前定义的各个查询条件字典，将对应的键值对添加到 query_options 字典中。<br> 调用 url_construct 函数，根据 query_options 字典中的查询条件生成目标 URL，并打印该 URL。<br> 调用 job_getter 函数，获取并解析目标 URL 页面中的职位信息。<br> 最后，调用 job_printer 函数，将获取到的职位信息打印输出。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>  通过以上步骤，我们实现了一个简单的 Boss 工作信息爬虫。该爬虫能够根据用户指定的查询条件，构造相应的招聘页面 URL，模拟浏览器打开页面并提取职位信息，最终以清晰的格式展示出来。你可以根据实际需求对爬虫进行进一步的优化和扩展，例如增加异常处理、支持更多查询条件、将结果保存到文件或数据库等。</p>`,36))])}const u=a(r,[["render",d]]),v=JSON.parse('{"path":"/program-design/%E7%AE%80%E5%8D%95Boss%E5%B7%A5%E4%BD%9C%E4%BF%A1%E6%81%AF%E7%88%AC%E8%99%AB.html","title":"简单Boss工作信息爬虫","lang":"zh-CN","frontmatter":{"title":"简单Boss工作信息爬虫","icon":"code","date":"2025-04-30T00:00:00.000Z","category":["教程"],"tag":["Python","爬虫","教程"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"简单Boss工作信息爬虫\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-04-30T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"wiine-ml\\",\\"url\\":\\"https://mister-hope.com\\"}]}"],["meta",{"property":"og:url","content":"https://mister-hope.github.io/my-site/program-design/%E7%AE%80%E5%8D%95Boss%E5%B7%A5%E4%BD%9C%E4%BF%A1%E6%81%AF%E7%88%AC%E8%99%AB.html"}],["meta",{"property":"og:site_name","content":"wiine-site"}],["meta",{"property":"og:title","content":"简单Boss工作信息爬虫"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"教程"}],["meta",{"property":"article:tag","content":"爬虫"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:published_time","content":"2025-04-30T00:00:00.000Z"}]]},"git":{},"readingTime":{"minutes":6.97,"words":2092},"filePathRelative":"program-design/简单Boss工作信息爬虫.md","excerpt":"\\n"}');export{u as comp,v as data};
