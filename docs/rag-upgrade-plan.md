# RAG升级方案

## 当前MVP

当前版本采用“脱敏案例结构化数据 + 关键词检索 + 可选大模型生成”：

- 没有 `AI_API_KEY` 时，使用本地规则回答，保证内测可用。
- 有 `AI_API_KEY` 时，先选出相关脱敏案例，再把案例作为上下文交给大模型生成回答。
- 回答后支持“说中了/没说中”，用于评估内测质量。

## 下一步RAG

1. 把 `E:\罗莉红Agent` 中的 Word/PDF 案例脱敏，统一转成 Markdown。
2. 每个案例拆成固定结构：

```markdown
# 案例标题
## 用户类型
## 初始困境
## 关键冲突
## 罗老师判断
## 使用工具
## 过程细节
## 结果变化
## 可迁移启发
## 禁止公开信息
```

3. 按 500-800 中文字切块，每块保留案例标题、标签、用户阶段和隐私等级。
4. 存入向量数据库，例如 Supabase pgvector。
5. 检索时只召回 `is_public = true` 或 `privacy_level = anonymized` 的内容。
6. AI回答必须返回引用案例标题，不允许编造“罗老师曾经服务过某某”。

## 推荐表结构

```sql
create extension if not exists vector;

create table if not exists knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  case_id uuid,
  title text not null,
  tags text[] default '{}',
  audience text,
  content text not null,
  privacy_level text default 'anonymized',
  embedding vector(1536),
  created_at timestamptz default now()
);
```

## 回答边界

- 不做心理疾病诊断。
- 不承诺录取结果。
- 不给法律、医疗、投资建议。
- 信息不足时先追问，不强行给结论。
- 重大选择引导预约人工咨询。
