# wuhan-ncov-2020
## 武汉新型冠状病毒实时省市数据

## 程序基本介绍
Docker + typescript + hapi

- [x] Backend: RESTful APIs
- [ ] Frontend


## 快速上手指南
### 要求
安装 Docker

### 部署运行
启动
```
make start
```

删除
```bash
make stop
```

### 例子

简单汇总:
  - ncov.page/api/wuhan/1

最新新闻:
  - ncov.page/api/wuhan/2
  
历史汇总:
  - ncov.page/api/wuhan/3
  
大汇总明细, 当日累计+当日增量:
  - ncov.page/api/wuhan/6

实时辟谣:
  - ncov.page/api/wuhan/7
