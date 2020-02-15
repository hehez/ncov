# wuhan-ncov-2020
## 武汉新型冠状病毒实时省市数据

## 程序基本介绍
Docker + typescript + hapi

- [x] Backend: RESTful APIs
- [ ] Frontend, 开发中 https://github.com/hehez/ncov-web


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
  - http://144.202.28.205:5000/api/wuhan/2
  
历史汇总:
  - http://144.202.28.205:5000/api/wuhan/3
  
大汇总明细, 当日累计+当日增量:
  - http://144.202.28.205:5000/api/wuhan/6

实时辟谣:
  - http://144.202.28.205:5000/api/wuhan/7
