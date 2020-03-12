# wuhan-ncov-2020
## 武汉新型冠状病毒实时省市数据

## 程序基本介绍
Docker + typescript + hapi

- [x] Backend: RESTful APIs
  - 新添加北美病例，COVID-19 https://ncov.page/
- [x] Frontend, 开发中 https://github.com/hehez/ncov-web


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
  - http://144.202.28.205:5000/api/wuhan/1

最新新闻:
  - http://144.202.28.205:5000/api/wuhan/8
  
大汇总明细, 当日累计+当日增量 (实时):
  - http://144.202.28.205:5000/api/wuhan/6

实时辟谣 (有数据，已过期):
  - http://144.202.28.205:5000/api/wuhan/7
