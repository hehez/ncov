# wuhan-ncov-2020
## 武汉新型冠状病毒实时省市数据

## 程序基本介绍
- [x] RESTful APIs
- [ ] Frontend


## 快速上手指南
### 要求
安装 Docker

### 部署运行
```
make start
```

### 例子

简单汇总:
  - http://144.202.28.205/api/wuhan/1

最新新闻:
  - http://144.202.28.205/api/wuhan/2
  
历史汇总:
  - http://144.202.28.205/api/wuhan/3
  
截止当前累计各省市明细:
  - http://144.202.28.205/api/wuhan/4
  
~~当日增量各省市明细:~~
  - http://144.202.28.205/api/wuhan/5
  
大汇总, 当日累计+当日增量:
  - http://144.202.28.205/api/wuhan/6

实时辟谣:
  - http://144.202.28.205/api/wuhan/7
