# Puppeteer

一个提供了一系列的 API，可以在无 UI 的情况下调用 Chrome 的各种功能，适用于爬虫、自动化处理等场景。亦可以通过配置，获取完整的 Chrome 功能。

主要功能：

- 生成截图和页面的 PDFs
- 抓取 SPA 并生成预渲染的内容
- 自动提交表单、UI 测试、键盘输入等
- 创建一个最新的自动化测试环境。使用最新的 JavaScript 和浏览器功能直接在最新版本的 Chrome 中运行测试。
- 捕获站点的时间线，帮助诊断性能问题

## 默认设置

默认情况下，启用的是无头的浏览器，也可以设置启用完全版本的浏览器。

- 默认无头浏览器

```javascript
const browser = await puppeteer.launch();
```

- 开启完全版本的浏览器

```javascript
const browser = await puppeteer.launch({headless: false});
```

也可以指定不同的本地其他版本浏览器

```javascript
const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
```