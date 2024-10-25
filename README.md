# NodeHub

节点订阅聚合管理系统，支持订阅链接管理、自动聚合节点、自定义分发

## 技术栈

- 数据库: Supabase
- 语言: JavaScript
- 框架: Next.js 14
- 部署: Vercel

## 功能概览

1. 公开访问: 查看订阅链接基本信息（提供者、剩余流量、有效期、节点数量）
2. OAuth2认证：可以添加订阅链接，通过获取到的用户信息记录贡献者
3. 认证登录：通过环境变量设置账号密码，登录后可以解锁完整的管理面板
4. 自定义分发: 通过域名后缀定制化分发订阅链接，通过订阅链接获取订阅配置文件yaml

## 管理面板功能

- 订阅链接概览: 展示节点数量、有效期、剩余流量等信息
- 自动更新: 设置订阅链接自动更新周期
- 流量阈值: 设定剩余流量阈值，低于阈值时停止提供节点
- 手动更新: 支持手动触发节点更新
- 节点管理:
  - 节点选择: 勾选节点以显示在总订阅链接中
  - 节点屏蔽: 屏蔽特定节点，不在总订阅链接中显示
  - 节点测试: 面板内进行节点测试
  - 节点排序: 自定义节点排序方式
- 自定义分发: 设置订阅链接后缀和包含的节点

## 使用说明

1. 访问域名查看公开信息
2. 登录后进入管理面板
3. 使用自定义后缀访问定制化订阅链接


## 数据库创建
```
-- 创建subscriptions表
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL UNIQUE,
  provider VARCHAR(255),
  contributor_info JSONB,
  remaining_traffic BIGINT,
  expiration_date TIMESTAMP WITH TIME ZONE,
  auto_update_interval INT,
  traffic_threshold BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建nodes表
CREATE TABLE nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  server VARCHAR(255) NOT NULL,
  port INT NOT NULL,
  password VARCHAR(255),
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(subscription_id, name, server, port)
);

-- 创建custom_distributions表
CREATE TABLE custom_distributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  suffix VARCHAR(255) NOT NULL UNIQUE,
  node_ids UUID[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```