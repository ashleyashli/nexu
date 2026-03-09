# 赵晟（Jason Zhao）面试评估报告

> 一面面试官：黄巍（一面评分 85/100，建议继续推进）
> 二面面试官：杨瑾龙（研发）
> 岗位：全栈开发工程师
> 候选人：赵晟，29 岁，QS40 计算机硕士（NYU），base 上海

---

## 候选人画像与性格特质

### 人物画像：务实型技术探索者

赵晟不是那种埋头刷算法题的纯技术流，也不是只会讲概念的"PPT 工程师"。他更像是一个**动手型的全栈 builder** — 遇到问题先试，做出来再说，然后在实践中形成自己的方法论。

#### 核心性格特质

**1. 自驱力强，主动探索新范式**
- 在商汤自发推动团队使用 AI Coding 工具，向老板争取到 Cursor 报销
- 自建 Linux 服务器 + FRP 内网穿透搭建个人开发环境
- 业余时间做量化交易软件，有独立开发完整产品的欲望
- 让 Claude Code 自运行 4-5 小时不是工作要求，是他自己的探索

**2. 诚实坦率，不包装不吹嘘**
- 面试中多次主动承认不足："评测集是算法团队的，应用端了解不多"、"没做过量化评估，方法来自论文"、"$100 万奖励的 prompt 技巧可能已经过时了"
- 这在面试中很少见 — 大多数候选人会试图掩盖不足。这种坦诚在创业团队中非常可贵，意味着协作时不会隐藏问题
- 一面中对离职原因的描述也很直白（业务亏损、老板被换、开发范式落后）

**3. 实用主义，追求"能跑"而非"完美"**
- 做事风格偏 MVP：先让东西跑起来，再迭代优化
- 一面提到入职思路："通过解决已有问题展现能力"，说明是实干派
- 调研 OpenClaw 时直接读 NPM 包而非从 GitHub 开始 — 效率导向，虽然不够系统但说明不会在调研阶段死磕
- 这种风格和创业公司的节奏匹配度很高

**4. 好奇心广，兴趣驱动**
- 技术栈横跨前端、后端、桌面端、AI 应用 — 不是被要求学的，是自己感兴趣
- 量化交易是个人爱好项目，说明业余时间也在 build 东西
- 一面中对 AI 金融数字员工的构想不是泛泛而谈，有具体的 agent 分工设想

**5. 沟通有逻辑，能把技术讲清楚**
- 两轮面试沟通表现稳定，能结构化地介绍项目和技术方案
- 被追问时不慌，能分层回答（"可以从两部分聊"、"先说场景再说方案"）
- 一面黄巍评价"沟通非常有逻辑"

#### 潜在风险特质

**1. 深度耐心不足**
- 技术广但每个方向的深度有限 — 5 年经验覆盖了 8+ 技术栈
- RAG 评估、检索优化等需要持续钻研的领域明显薄弱
- 可能更适合"快速出活"的任务，不太适合需要深入优化的工作
- 但在 AI Coding 时代，"广而能整合"可能比"窄而深"更有价值

**2. 安全意识偏弱**
- 屏幕共享暴露 API key — 这不是恶意，是习惯问题
- 需要通过团队规范（code review、pre-commit hooks）来约束
- 创业公司初期这是可接受的风险，但需要尽早建立意识

**3. 从"交付驱动"到"数据驱动"需要转型**
- 在商汤做 ToG 项目，"完成合同功能即可"的工作标准
- 创业公司需要持续迭代、用数据说话的文化
- 这不是能力问题，是环境塑造的习惯，可以在新环境中改变

---

### 与 Nexu 团队的匹配度分析

| 匹配维度 | 匹配度 | 说明 |
|---------|--------|------|
| Spec Coding 工作流 | **高** | 已有 Claude Code 长程运行 + worktree 并发编辑的实践，直接匹配 |
| 全栈交付能力 | **高** | 前后端 + AI 应用，创业公司需要能独立交付的人 |
| 产品 Sense | **中高** | 有数字员工的产品构想，对 IM 入口有理解 |
| 团队文化 | **中高** | 诚实坦率、自驱力强、务实，适合小团队快速迭代 |
| AI 算法深度 | **中** | chunking + prompt 有实践，检索优化和评估体系需补齐 |
| 安全意识 | **中低** | 需要通过规范培养 |

---

## 二面技术表现详细评估

### 整体评价

候选人具备 AI 全栈应用开发的完整经历，在长程 AI Coding、Prompt 工程化、多模态处理等方面有实战积累。AI 算法评估的深度有限（受限于商汤"工程/算法分工"模式），但作为全栈工程师而非算法工程师，这属于可培养的短板。

---

### 逐项评估

#### 1. 长 Context 压缩（对应 A9）

| 层次 | 表现 | 评价 |
|------|------|------|
| 基础认知 | 提到了语义切分、重叠算法 | 合格 |
| 压缩策略 | 说了 NLP 语义分析切片 + overlap（PDF 15-25%、聊天 5-10%）、针对性压缩（合同场景只保留相关内容） | 合格，有场景化思考 |
| 工程细节 | 提到正则 + 语义匹配 + 加权（核心词 3 分、无关词 0 分）来定位核心片段 | 中规中矩，加权方案比较粗糙 |
| 信息保真检测 | 用余弦相似度 + BERT 对比压缩前后文本，低于阈值判定丢失 | 知道方法但未给出具体阈值和实测数据 |
| Agent 间传递 | 设计了"元数据镜像"（会话 ID、源文本、时间戳存数据库），审核时调取比对 | 有工程意识，但方案偏重 |
| 结构化 vs 自然语言 | 未涉及 | 未考察 |
| 前沿认知 | 未涉及 | 未考察 |

**小结：** 达到第三层（工程细节），但缺乏量化数据支撑。"余弦相似度检测"说得出来但没给过阈值和实测效果，怀疑是理论推导而非实际做过。

---

#### 2. RAG 评估（对应 A10）

| 考察点 | 表现 | 评价 |
|--------|------|------|
| 核心指标 | 能说出召回率、精确率、检索延迟、幻觉率 | 基本合格 |
| 生成侧指标 | 提到幻觉率（无关内容占比） | 了解但不深入 |
| 工程指标 | 提到首次输出延迟、GPU 显存、内存、TOKEN 消耗、并发数 | 偏基础设施层面，非 RAG 特有 |
| 评测集 | **明确表示"算法团队有评测集，AI 应用端人员了解不多"** | 红灯信号 — 没有自己建过评测集 |
| 评测框架 | 未提到 RAGAS、TruLens 等任何框架 | 不合格 |
| 线上监控 | 未涉及 | 未考察 |

**小结：** 能列出指标名称，但**评测集是别人团队的，自己没建过**。对 RAG 评估的理解停留在"知道有哪些指标"，缺乏端到端的评估实践。按评分对照表属于"基本合格"到"合格"之间。

---

#### 3. 提升相关性（对应 A11）

| 层面 | 表现 | 评价 |
|------|------|------|
| Query 侧 | 未提及 query rewriting / HyDE 等 | 缺失 |
| Embedding 侧 | 未深入讨论 | 缺失 |
| Chunking 策略 | 提到基于文档类型的语义切分、长度滑动窗口、overlap 切分 | 基本合格，覆盖 1 层 |
| 检索策略 | 未提及 hybrid search / reranker | 缺失 |
| Prompt/生成侧 | 未涉及 | 缺失 |
| 系统级 | 未涉及 | 缺失 |

**小结：** 只覆盖了 chunking 一个层面，其他 5 层（query 改写、embedding 优化、检索策略、生成侧优化、系统级策略）均未提及。按评分对照表属于**不合格到基本合格之间**。

---

#### 4. Prompt Engineering（对应 A2）

| 考察点 | 表现 | 评价 |
|--------|------|------|
| 调优方法 | 列举了角色定义、奖励激励、约束前置、上下文注入、CoT、thought-prompt-reason-act | 方法论丰富 |
| 具体案例 | 以 FastAPI 写 PostgreSQL 查询接口为例 | 有具体场景 |
| 量化评估 | **明确表示"未做过量化评估，方法来自论文"** | 红灯信号 |
| 过时认知 | 提到"承诺 100 万美金奖励提升表现"，自己承认现在可能过时 | 诚实，但说明知识更新不够及时 |
| 版本管理 | 提到了单独引擎模块拼接常用 Prompt | 有工程化意识 |

**小结：** 方法论广度不错，但承认没做过 AB 测试或量化评估。"ToB/ToG 项目完成合同即可"的心态说明缺乏精益求精的工程文化。

---

#### 5. OpenClaw 实操（对应 B 系列）

| 考察点 | 表现 | 评价 |
|--------|------|------|
| 调研方法 | 直接读 NPM 包，未去 GitHub 看源码 | 调研不够系统 |
| 工具使用 | 用 Claude Code 操作，知道 worktree、并发编辑 | Claude Code 使用较熟练 |
| 多租户设计 | 被要求 10 分钟内给方案 | 具体方案内容纪要未详细记录 |
| 安全意识 | 屏幕共享时暴露了 API key，被提醒重置 | 安全意识弱 |

**小结：** Claude Code 工具使用熟练度尚可（知道 worktree、并发编辑），但**安全意识差**（共享屏幕暴露 key）、调研方法不系统（不看 GitHub 源码直接读 NPM 包）。

---

#### 6. 工程习惯与工具链

| 考察点 | 表现 | 评价 |
|--------|------|------|
| 项目记忆管理 | 有 memory 目录（design/feature/version），有项目记忆库概念 | 有意识但刚起步 |
| 工具认知 | 知道 GH CLI、agent browser、superpowers 插件 | 工具视野不错 |
| 代码重构观点 | 让 AI 扫描生成知识图谱、补注释、压缩重复函数 | 想法合理但承认没实际做过 |
| 公司不报销 Cursor | 抱怨商汤不报销 Cursor | 可以理解但面试中抱怨不加分 |

---

### 综合评分

| 维度 | 分数 (1-10) | 说明 |
|------|------------|------|
| 简历真实性 | 5 | 一面发现的不一致点（公司名、时间线、团队规模）二面未追问，风险未消除 |
| AI 技术深度 | 5 | 概念广度够，但多个维度承认"没做过量化评估"、"评测集是算法团队的" |
| RAG 实战经验 | 4 | 只触及 chunking 层面的相关性优化，评估体系和检索策略明显短板 |
| Prompt Engineering | 6 | 方法论丰富，有工程化思路（引擎模块），但缺量化验证 |
| 长 Context 管理 | 5 | 有方案有思路，但缺实测数据，元数据镜像方案有一定工程价值 |
| 工具使用 | 7 | Claude Code 较熟练，知道 worktree/并发编辑/GH CLI 等 |
| 工程素养 | 4 | 安全意识弱（暴露 key）、调研不系统（跳过 GitHub）、"完成合同即可"心态 |
| 创业适配度 | 5 | 工具意识和学习意愿不错，但"ToG 完成合同即可"的工作模式与创业公司差距大 |

**总分：5.1 / 10**

---

### 核心发现（红灯 / 黄灯 / 绿灯）

**红灯（重大顾虑）：**
- "评测集是算法团队的，应用端了解不多" — 做了一年半 AI 应用但没建过自己的评测集
- "未做过量化评估，方法来自论文" — Prompt 调优靠论文指导而非实验验证
- 相关性优化只覆盖 chunking，不知道 query rewriting / hybrid search / reranker
- 屏幕共享暴露 API key — 安全意识
- "ToB/ToG 完成合同即可" — 工程质量标准偏低

**黄灯（需关注）：**
- 一面发现的简历不一致点（公司名、时间线、50 人团队）未在二面验证
- 调研方法：直接读 NPM 包而非系统性地看 GitHub 源码 + 文档
- 工作中的 AI 评估工作主要依赖算法团队，自身参与度低

**绿灯（正面信号）：**
- Claude Code 使用较熟练，知道 worktree、并发编辑等进阶用法
- 有项目记忆库的工程化思路（memory 目录结构）
- 对 AI Coding 工具链有广泛了解（GH CLI、agent browser、superpowers）
- 沟通顺畅，诚实承认不足（没做过量化评估、方法来自论文）

---

### 录用建议

**谨慎考虑（偏不推荐）。**

候选人的核心问题是**"知其然不知其所以然"** — 能列出 RAG、Prompt、Agent 的概念和方法论，但缺乏深度实践和量化验证的习惯。在商汤的一年半中，AI 评估和算法优化主要依赖算法团队，自己更多是"工程化集成"角色，与简历描述的"AI 全栈开发工程师"定位有差距。

**如果考虑录用，需要验证的前提：**
1. 一面发现的简历不一致点需要正面回答（公司名、时间线、团队规模）
2. 薪资期望（77 万）是否匹配创业公司早期预算
3. 能否接受从"完成合同即可"转变为"数据驱动、持续优化"的工作模式

---

# 以下为二面前准备的提问材料（保留备查）

---

# 赵晟（Jason Zhao）二面提问准备

## 一、简历与一面信息不一致点（需核实）

### 1. 公司名称不一致

| 简历写法 | 一面提及 | 疑问 |
|---------|---------|------|
| 上海尚镜智能科技有限公司 | 商汤科技 | 尚镜是商汤子公司？外包？还是简历美化？ |
| 富途证券国际集团有限公司 | 富安智信息技术有限公司（FNZ） | 富途和FNZ是完全不同的公司，哪个是真实的？ |

**提问：** "你简历上写的是富途证券，但上次聊的时候提到的是 FNZ 富安智，这两段经历是同一份工作吗？能具体说说吗？"

**预期答案：** 如果是同一段经历，候选人可能做了简历美化（用知名度更高的公司名替换）。如果是两段不同经历，则简历存在遗漏或合并。无论哪种情况，都需要候选人解释清楚。FNZ 是新西兰金融科技公司，与富途证券无关。

---

### 2. 时间线重叠

- 简历显示硕士 2019.09 - 2024.06（纽约大学）
- 但 2021.05 - 2023.01 在上海九尺网络科技工作（Todesk）
- 2023.03 - 2024.03 在"富途/FNZ"工作

**提问：** "你硕士是 2019 到 2024 年，但同期你在上海九尺和 FNZ 都有全职工作，这个时间线是怎么安排的？是休学了还是远程读书？"

**预期答案：** 可能是 part-time 硕士、延期毕业、或者时间线有水分。一面提到他本科最后一年去纽约理工做交换生，然后申请了 NYU。需要确认硕士是否全日制、是否中途回国工作。

---

### 3. 团队规模存疑

- 简历写 "曾带领 50+ 人技术团队"
- 一面提到职级 L6+，对标字节 P6（接近 2-2）
- 一面描述 team leader 角色时说 "不直接带人"、"80% 时间写代码"

**提问：** "简历提到带领过 50+ 人团队，能具体说说是什么场景？是直接汇报关系还是项目协作关系？"

**预期答案：** 大概率是项目协作中涉及 50+ 人，而非直接管理。P6 级别直接管理 50 人在任何大厂都不现实。看候选人是否诚实回答。

---

### 4. 项目描述混乱

简历中"万象行业大模型平台"项目描述里写着：
> "负责 Todesk 多平台客户端（Electron + Java）全栈开发"

这明显是 Todesk 的项目描述错误复制到了商汤的项目下。

**提问（可选，看情况）：** "万象平台这个项目，你的具体分工是什么？前后端各负责哪些模块？"

**目的：** 不直接指出错误，看候选人能否准确描述自己做的事情，验证项目经历的真实性。

---

## 二、技术深度验证

### 5. Python 后端实际经验

一面声称后端主要用 Python（FastAPI），但简历上大部分项目是 Java/Spring。

**提问：** "你提到后端主要用 FastAPI，能聊聊你在商汤用 FastAPI 搭建的一个具体服务吗？比如请求怎么进来、中间件怎么设计、怎么处理异步任务、数据库用什么 ORM？"

**期望考察点：**
- FastAPI 的依赖注入机制
- Pydantic model 的使用
- async/await 在实际场景中的应用
- SQLAlchemy 或 Tortoise ORM 的使用经验
- 是否了解 ASGI、uvicorn worker 配置

**合格答案标准：** 能说清一个完整的请求链路，涉及中间件、路由、依赖注入、数据库操作、异步任务（如 Celery/RQ）等。如果只能说出 FastAPI 基本用法，说明经验较浅。

---

### 6. React 实际深度

**提问：** "我们的前端是 React，你能聊聊你在实际项目中遇到过的 React 性能问题吗？你是怎么定位和解决的？"

**期望考察点：**
- 是否了解 React 重渲染机制（reconciliation）
- useMemo / useCallback / React.memo 的正确使用场景
- 是否用过 React DevTools Profiler
- 大列表虚拟化（react-window / react-virtuoso）
- 状态管理方案的取舍（Context vs Zustand vs Redux）

**合格答案标准：** 能举出具体案例，说明问题现象、定位过程、解决方案。而不是只背概念。

---

### 7. 系统设计能力

**提问：** "如果让你设计一个多租户的 AI Bot 平台，用户可以在 Web 上创建 Bot 并连接到 Slack，你会怎么设计这个系统的架构？重点聊聊：多租户隔离、配置热加载、消息路由这三个方面。"

**期望考察点：**（这正是 Nexu 在做的事情）
- 多租户数据隔离策略（共享表 + tenant_id vs 独立 schema）
- 配置热加载机制（文件 watch / webhook / pub-sub）
- 消息路由（Slack event 如何路由到正确的 bot 处理逻辑）
- API Gateway 的设计
- 是否考虑到 rate limiting、credential 安全存储

**合格答案标准：** 不需要和 Nexu 方案一致，但要能说出合理的架构，考虑到关键问题。如果能提到 event-driven 架构、配置中心、密钥加密存储等，说明有实际架构经验。

---

### 8. AI Agent 工程实践

一面中候选人提到了让 Claude Code 长时间自运行的实践。

**提问：** "你一面提到让 Claude Code 自运行 4-5 小时，能具体聊聊你的状态机是怎么设计的吗？怎么处理 context window 耗尽的问题？怎么判断 agent 是否陷入了死循环？"

**期望考察点：**
- 状态机的状态定义和转换条件
- 长 context 的压缩/摘要策略
- 失败检测和恢复机制
- 测试验证策略（怎么判断生成的代码是正确的）
- 是否了解 ReAct、Plan-and-Execute 等 agent 模式

**合格答案标准：** 能说出具体的实现细节，而不只是概念性描述。重点看他是否真正自己设计过这套系统，还是只是简单试用过 Claude Code。

---

## 三、AI 技术深度验证

候选人自称"全栈 AI 应用开发工程师"，简历提到 LLM 大模型、Agent 架构、Prompt 工程、向量数据库、多模态交互等。以下问题按由浅入深排列，可根据面试时间选择。

---

### A1. RAG 架构设计（必问）

**提问：** "你在商汤做行业大模型平台，肯定涉及企业知识库。聊聊你们 RAG 系统的架构？从文档进来到最终生成回答，整个链路是怎样的？遇到过什么坑？"

**追问方向：**
- 文档解析用什么？（Unstructured / LlamaParse / 自研？）怎么处理 PDF 表格、图片？
- chunk 策略怎么选的？（固定长度 vs 语义分割 vs recursive splitter）chunk size 和 overlap 怎么定的？
- embedding 模型用什么？（BGE / text2vec / OpenAI ada？）怎么评估 embedding 质量？
- 向量数据库用什么？（Milvus / Qdrant / Chroma / pgvector？）为什么选这个？
- 检索时 top-k 怎么定？用没用 reranker？（Cohere rerank / BGE reranker / cross-encoder）
- 怎么处理多轮对话中的指代消解？（query rewriting）
- 怎么评估 RAG 效果？（有没有建评测集、用 RAGAS 之类的框架？）

**合格答案标准：**
- 能说清完整链路：文档解析 → chunking → embedding → 存储 → 检索 → rerank → prompt assembly → LLM 生成
- 能说出至少 2-3 个实际踩过的坑（比如：chunk 太大导致相关性下降、embedding 模型对中文效果差、检索召回率低需要 hybrid search）
- 了解 hybrid search（向量 + BM25/keyword 混合检索）

**不合格信号：**
- 只能说出"把文档切片存向量数据库然后检索"这种一句话概括
- 不知道 reranker 是什么
- 没有评估 RAG 效果的意识

---

### A2. Prompt Engineering 实践（必问）

**提问：** "你在实际项目中是怎么做 prompt 管理的？举一个你优化 prompt 前后效果差异很大的例子。"

**追问方向：**
- prompt 是硬编码在代码里还是有模板管理系统？
- 有没有用过 few-shot / chain-of-thought / self-consistency 等技巧？
- 怎么做 prompt 版本管理和 A/B 测试？
- 遇到过 LLM 幻觉（hallucination）问题吗？怎么缓解的？
- 有没有用过 structured output（JSON mode / function calling / tool use）？
- 知不知道 prompt injection 攻击？你们怎么防护的？

**合格答案标准：**
- 能给出具体的优化案例，说清楚改了什么、为什么有效
- 了解 system prompt / user prompt 的分工
- 知道 structured output 的实现方式
- 对幻觉有实际处理经验（如添加 citation、限定回答范围、使用 grounding）

---

### A3. LLM 应用工程细节（重要）

**提问：** "做 LLM 应用有很多工程细节，聊几个具体的：
1. 你们怎么处理 token 限制的？比如用户输入很长或者知识库上下文很多时？
2. 流式输出（streaming）你们是怎么实现的？前后端各怎么处理？
3. 成本控制怎么做的？线上请求一天花多少钱大概心里有数吗？"

**期望考察点：**

**Token 管理：**
- 是否了解 tiktoken / tokenizer 的使用
- 是否做过 context window 的动态裁剪（truncation strategy）
- 是否用过 sliding window / summarization 来处理长对话

**Streaming：**
- 后端：SSE（Server-Sent Events）vs WebSocket
- 前端：EventSource API / fetch + ReadableStream
- 是否处理过流式输出中的 JSON 解析（partial JSON parsing）
- 错误处理：流式中断后的重连和恢复

**成本控制：**
- 是否了解不同模型的价格差异（GPT-4 vs GPT-3.5 vs 开源模型）
- 有没有做过 prompt caching（减少重复 token）
- 有没有做过路由策略（简单问题用小模型，复杂问题用大模型）
- 是否了解 batch API 降低成本

**合格答案标准：** 能说出至少每个子问题的具体实现方式，而不是泛泛而谈。

---

### A4. Agent 架构设计（重要 — 结合一面追问）

**提问：** "你一面提到做过 Agent 相关的工作。我想深入聊聊——如果让你从零设计一个能自主完成多步骤任务的 AI Agent 系统，你会怎么设计？"

**追问方向：**
- Agent 的核心循环是什么？（Observe → Think → Act → Observe...）
- 你了解哪些 agent 设计模式？（ReAct / Plan-and-Execute / Reflection / Multi-Agent）
- Tool calling 怎么实现的？tool 的 schema 怎么定义？LLM 怎么选择调用哪个 tool？
- 多 agent 协作场景有没有做过？agent 之间怎么通信？谁来做 orchestration？
- Agent 的 memory 怎么设计？（短期 working memory vs 长期 memory）
- 怎么防止 agent 无限循环？设计了哪些安全边界？（max iterations / budget limit / human-in-the-loop）
- 怎么 debug agent？一个 agent 跑了 20 步出了错，怎么定位是哪一步出的问题？

**合格答案标准：**
- 能画出 agent 的核心循环（不一定要画图，能口头描述清楚）
- 了解 function calling / tool use 的机制（不只是概念，要知道 JSON schema 怎么写、LLM 怎么返回 tool call）
- 能说出实际遇到的 agent 失败案例和解决方式
- 有 observability 意识（logging、tracing agent steps）

**不合格信号：**
- 只用过 LangChain 的 AgentExecutor，说不出底层原理
- 不知道 function calling 的具体格式
- 没有考虑过 agent 的安全边界和失败处理

---

### A5. 模型部署与推理优化（按需）

候选人简历提到"支撑亿级参数模型推理"、"QPS 达 1000+"。

**提问：** "你简历提到你们的平台 QPS 达 1000+，这个是推理服务的 QPS 吗？能聊聊你们模型推理服务的架构？怎么做到这个吞吐量的？"

**追问方向：**
- 推理框架用什么？（vLLM / TGI / TensorRT-LLM / Triton？）
- 知不知道 KV Cache、PagedAttention 的原理？
- 有没有做过量化？（INT8 / INT4 / GPTQ / AWQ）量化对效果的影响怎么评估？
- 批处理策略是什么？（continuous batching / dynamic batching）
- GPU 资源怎么调度的？用 K8s + GPU operator？
- 模型版本管理怎么做的？灰度发布怎么做？

**合格答案标准：**
- 能说出实际使用的推理框架和选型理由
- 了解 KV Cache 的概念（面试不要求能推导数学，但要知道它解决什么问题）
- 如果说 QPS 1000+，需要解释清楚是什么场景（LLM 推理 QPS 1000 是非常高的数字，可能是短文本 / embedding 而非长文本生成）

**验真信号：** LLM 推理和传统 API 的 QPS 概念非常不同。如果候选人说 QPS 1000+ 是大模型对话生成，且用的不是超大规模集群，那这个数字大概率是夸大的。真实的 LLM 对话场景通常几十到几百 QPS 已经很高了。

---

### A6. Fine-tuning 经验（按需）

**提问：** "你们有没有做过模型微调？在什么场景下选择微调而不是 RAG？"

**追问方向：**
- 用什么方法？（Full fine-tuning / LoRA / QLoRA？）
- 训练数据怎么准备的？数据质量怎么把控？
- 怎么评估微调后的效果？（自动评测 + 人工评测？用什么指标？）
- 微调 vs RAG vs prompt engineering 的选择标准是什么？

**合格答案标准：**
- 能说出具体的微调场景和选择理由
- 了解 LoRA 的基本原理（低秩适配，不用改原模型权重）
- 知道微调数据质量 > 数量的原则
- 能合理对比 RAG 和 fine-tuning 的适用场景

**不要求：** 不要求了解训练细节（这是算法岗的事），但要知道什么时候该用、效果怎么评估。

---

### A7. 多模态应用（按需 — 简历提到多模态）

候选人简历提到"多模态交互系统（语音、图像、文本）"。

**提问：** "你简历提到做过多模态交互，语音、图像、文本结合的场景。能具体聊聊这个系统的架构吗？比如语音进来之后经过哪些环节最终生成图像？"

**追问方向：**
- 语音转文字用什么？（Whisper / Paraformer / 商汤自研？）
- 图像生成用什么模型？（Stable Diffusion / DALL-E / 商汤自研？）
- 多模态理解用什么？（GPT-4V / LLaVA / 商汤自研？）
- 不同模态之间的编排（orchestration）怎么做？
- 延迟怎么优化的？（语音转文字 + LLM 推理 + 图像生成 链路加起来很长）

**合格答案标准：** 能说出完整的处理链路，每个环节用了什么模型/服务，以及实际遇到的延迟/质量问题。

---

### A8. AI 安全与合规（加分项）

**提问：** "做 AI 应用上线，安全和合规是绑不开的。你们怎么处理内容安全问题？比如用户输入了不当内容，或者模型输出了有害信息？"

**追问方向：**
- 有没有做过输入过滤 / 输出审核？
- 了解 prompt injection 吗？怎么防护？
- 模型幻觉（hallucination）在你们的场景里怎么处理？
- 如果是面向政府客户（商汤的场景），有什么额外的合规要求？

---

### A9. 长 Context 压缩与管理（深入专题）

候选人一面提到让 Claude Code 自运行 4-5 小时、"压缩成执行 prompt"、建立状态机等，这些都直接涉及长 context 管理。以下问题层层递进，可以深挖。

---

#### 第一层：基础认知

**提问：** "你做 agent 长时间运行，context window 肯定会爆。先聊个基础问题——你觉得 context 变长之后，除了超出 token 限制，还有什么问题？"

**期望答案要点：**
- **成本线性增长** — token 数越多，API 调用费用越高（input token 也计费）
- **延迟增加** — attention 计算复杂度与 context 长度相关，TTFT（Time to First Token）会显著变慢
- **Lost in the middle** — 研究表明 LLM 对 context 中间部分的信息检索能力最弱（Nelson Liu et al., 2023），不是越长越好
- **注意力稀释** — context 越长，模型对关键信息的注意力越分散，指令遵循能力下降
- **幻觉风险增加** — 长 context 中矛盾信息增多时，模型更容易产生幻觉

**不合格信号：** 只知道"token 会超限"，不了解长 context 对质量、延迟、成本的影响。

---

#### 第二层：压缩策略选型

**提问：** "那你在实际项目中用过哪些 context 压缩策略？各自的优缺点是什么？"

**期望候选人至少能说出 3-4 种并对比：**

| 策略 | 原理 | 优点 | 缺点 |
|------|------|------|------|
| **截断（Truncation）** | 直接丢弃最早的消息，保留最近的 N 条 | 简单、零开销 | 丢失关键上下文，agent 会"失忆" |
| **滑动窗口（Sliding Window）** | 保留最近 K 轮对话 + 一段 system prompt | 实现简单 | 窗口外信息完全丢失 |
| **摘要压缩（Summarization）** | 用 LLM 将旧对话总结为精简摘要，替换原文 | 保留语义信息 | 摘要本身会丢失细节；额外 LLM 调用成本；摘要累积后也会膨胀 |
| **分层记忆（Hierarchical Memory）** | 短期记忆（recent messages）+ 长期记忆（summary/embedding store） | 兼顾最近细节和全局上下文 | 架构复杂，需要设计检索策略 |
| **Token-level 压缩** | 如 LLMLingua / Selective Context，用小模型识别并删除不重要的 token | 高压缩比、保留关键信息 | 需要额外模型推理；对格式敏感的内容可能损坏 |
| **RAG 外挂** | 将历史信息存入向量数据库，按需检索注入 | 可无限扩展 | 检索质量依赖 embedding；实时性差 |

**追问：** "如果让你选一种策略用在你的长程运行 agent 上，你会选哪个？为什么？"

**合格答案标准：** 不是选"最先进的"，而是能根据场景做取舍。比如：agent 编码场景，最重要的是保留当前任务目标和已完成步骤，所以可能用"摘要 + 结构化状态"比纯摘要更好。

---

#### 第三层：摘要压缩的工程细节（重点追问）

候选人一面提到"压缩成执行 prompt"，这里深挖。

**提问：** "你说把 context 压缩成执行 prompt，这个压缩过程具体是怎么做的？用什么模型做摘要？prompt 怎么写的？怎么保证压缩后不丢关键信息？"

**期望考察点：**

1. **什么时候触发压缩？**
   - 按 token 阈值（比如用了 80% context window 就触发）？
   - 按轮次（每 N 轮压缩一次）？
   - 按时间间隔？
   - 候选人有没有考虑过压缩时机对连贯性的影响？

2. **压缩用什么模型？**
   - 用同一个大模型（如 Claude）？成本高但质量好
   - 用小模型（如 GPT-3.5 / Haiku）？便宜但可能丢信息
   - 是否考虑过用非 LLM 方式（extractive summarization / keyword extraction）？

3. **压缩 prompt 怎么设计？**
   - 是通用摘要 prompt 还是针对编码场景定制？
   - 有没有要求保留特定结构（如：当前任务、已完成步骤、未解决问题、关键代码路径）？
   - 有没有做过压缩后信息保留率的评测？

4. **递归压缩的膨胀问题**
   - 如果 agent 跑 4-5 小时，需要多次压缩。摘要累加起来本身也会很长，怎么处理？
   - 有没有做"摘要的摘要"（recursive summarization）？效果如何？
   - 有没有考虑过固定格式的结构化状态（而非自然语言摘要）来控制膨胀？

**合格答案标准：** 能说出具体的压缩 prompt 长什么样、触发条件是什么、用什么模型做压缩。如果只是说"让 AI 总结一下之前的对话"就太笼统了。

---

#### 第四层：结构化状态 vs 自然语言摘要

**提问：** "压缩 context 有两个流派：一种是用自然语言摘要，另一种是维护一个结构化状态对象（比如 JSON）。你怎么看这两种方式？你的 agent 用的是哪种？"

**期望讨论：**

```
自然语言摘要:
"用户要求实现登录功能。已完成数据库 schema 设计和 API 路由。
 正在处理前端表单验证。遇到 CORS 问题待解决。"

结构化状态:
{
  "task": "实现登录功能",
  "completed": ["db schema", "api routes"],
  "in_progress": "frontend form validation",
  "blockers": ["CORS config"],
  "key_files": ["src/auth/login.ts", "src/db/users.ts"],
  "decisions": ["用 JWT 而非 session", "密码用 bcrypt"]
}
```

**各自优缺点：**
- 自然语言：灵活、LLM 理解好，但不可控、容易膨胀
- 结构化状态：可控、紧凑、可程序化处理，但不够灵活、定义 schema 有成本
- 实际中往往是混合使用：结构化状态 + 关键决策的自然语言备注

**合格答案标准：** 能分析两种方式的取舍，最好是说出自己实际用了哪种以及为什么。

---

#### 第五层：长 context agent 的信息保真度验证

**提问：** "agent 跑了几个小时，context 被压缩了好多次。你怎么确保它还'记得'最初的任务目标？有没有出现过压缩后 agent 偏离目标的情况？怎么发现和修复的？"

**期望考察点：**
- **目标锚定（Goal anchoring）** — 是否在每次压缩后都保留原始任务描述？
- **信息衰减检测** — 有没有机制检测关键信息是否在压缩中丢失？
- **实际失败案例** — 能不能说出一个真实的例子：agent 因为 context 压缩丢信息导致做错了事
- **修复策略** — 比如 pinned messages（不会被压缩的固定消息）、periodic goal re-injection

**这是区分"真做过"和"只是试用过"的关键问题。** 真正跑过长程 agent 的人一定遇到过这类问题。

---

#### 第六层：前沿认知（加分题）

**提问：** "现在有些模型号称支持 100K、200K 甚至百万级 context window。你觉得如果模型的 context window 足够大，还需要做压缩吗？"

**期望答案要点：**
- **仍然需要**，原因：
  - 成本：200K tokens 的请求费用非常高，不是每次都需要把全部历史灌进去
  - 延迟：长 context TTFT 会很慢（几十秒），实时场景不可接受
  - Lost in the middle 问题在长 context 下更严重
  - 注意力稀释：关键指令被大量无关信息淹没
- **但可以改变压缩策略**：
  - 从"必须压缩"变成"选择性压缩"
  - 可以保留更多原始信息，只对明确不重要的内容压缩
  - 长 context window 是 safety net，不是不需要管理

**加分答案：** 提到 context caching（如 Anthropic 的 prompt caching、Google 的 context caching），可以降低重复 context 的成本但不解决注意力稀释问题。

---

#### 长 Context 压缩面试评估对照

| 层次 | 考察内容 | 通过标准 |
|------|---------|---------|
| 第一层 基础认知 | 长 context 的问题不只是 token 超限 | 能说出 cost / latency / lost-in-the-middle 中至少两个 |
| 第二层 策略选型 | 知道多种压缩策略并能对比 | 能说出 3+ 种策略及各自适用场景 |
| 第三层 工程细节 | 压缩的实际实现 | 能说出具体触发条件、压缩 prompt、模型选型 |
| 第四层 结构化 vs 自然语言 | 架构选型能力 | 能分析两种方式的取舍 |
| 第五层 信息保真 | 实际踩坑经验 | 能举出因压缩丢信息导致的失败案例 |
| 第六层 前沿认知 | 技术视野 | 知道长 context window 不等于不需要管理 |

**建议：** 从第一层开始，逐层深入。如果候选人在第二层就答不上来，就不用继续了。如果能聊到第四五层且有实际案例，说明确实有深度实践经验。

---

### A10. RAG 评估体系（深入专题）

候选人声称做过行业大模型平台，RAG 是核心能力。评估体系是区分"只会搭 demo"和"真正做过生产级 RAG"的试金石。

---

#### 开场提问

**提问：** "你们 RAG 系统上线后，怎么评估效果好不好？用了哪些指标？有没有建评测集？"

---

#### 一、检索阶段指标

这些指标衡量"找得准不准"，和搜索引擎评估体系一脉相承。

**提问：** "RAG 的第一步是检索，你们怎么评估检索质量？"

| 指标 | 含义 | 计算方式 | 实际意义 |
|------|------|---------|---------|
| **Recall@K（召回率）** | 前 K 条结果中包含了多少相关文档 | 命中的相关文档数 / 总相关文档数 | 衡量"有没有漏掉关键信息" |
| **Precision@K（精准率）** | 前 K 条结果中有多少是真正相关的 | 相关文档数 / K | 衡量"检索结果有多干净、噪声多不多" |
| **MRR（Mean Reciprocal Rank）** | 第一条相关结果排在第几位的倒数 | 1/第一条相关结果的排名位置，取平均 | 衡量"最相关的文档是否排在前面" |
| **NDCG（Normalized DCG）** | 考虑排序位置的相关性评分 | 相关性按位置衰减加权 | 衡量"排序质量"，比 Precision 更精细 |
| **Hit Rate（命中率）** | 前 K 条中是否至少包含一条相关文档 | 命中的 query 数 / 总 query 数 | 最粗粒度的"能不能找到"指标 |

**追问：**
- "你们 top-k 设多少？recall 和 precision 之间怎么平衡？"（k 大 recall 高但 precision 低，k 小反之）
- "用了 reranker 之后，这些指标变化大吗？具体提升了多少？"
- "hybrid search（向量 + keyword）对 recall 提升有多大？"

---

#### 二、生成阶段指标

这些指标衡量"回答得好不好"，是 RAG 独有的维度。

**提问：** "检索找到了相关文档，但模型最终的回答质量怎么衡量？"

| 指标 | 含义 | 怎么评 |
|------|------|--------|
| **Faithfulness（忠实度）** | 回答是否忠于检索到的文档内容，有没有编造 | 检查回答中的每个 claim 是否能在 context 中找到依据 |
| **Answer Relevance（答案相关性）** | 回答是否真正回答了用户的问题 | 从答案反向生成问题，看和原始问题的相似度 |
| **Context Relevance（上下文相关性）** | 注入给 LLM 的 context 是否和问题相关 | 评估检索结果中有多少对回答有贡献 |
| **Context Utilization（上下文利用率）** | 模型是否有效利用了检索到的信息 | 回答引用了多少检索结果中的内容 |
| **Hallucination Rate（幻觉率）** | 回答中有多少内容是 context 里没有的编造 | 逐 claim 检查是否有源头 |
| **Answer Correctness（答案正确性）** | 和 ground truth 对比的最终正确率 | 需要人工标注 ground truth |

**追问：**
- "Faithfulness 和 Answer Correctness 的区别是什么？"
  - 答：Faithfulness 是"忠于检索结果"，但检索结果本身可能是错的；Correctness 是"最终答案对不对"，需要 ground truth
- "你们怎么判断模型是在用 context 回答还是在用自己的参数知识回答？"
  - 这个问题很实际，很多 RAG 系统的模型其实忽略了检索结果，用自己的知识回答

---

#### 三、评测框架与工具

**提问：** "这些指标你们是自己算的还是用了什么框架？"

| 框架 | 特点 |
|------|------|
| **RAGAS** | 最主流的 RAG 评估框架，自动化评估 faithfulness / relevance / context precision 等，用 LLM 做 judge |
| **TruLens** | 提供 feedback functions，可监控线上 RAG 质量 |
| **LangSmith** | LangChain 官方，偏 tracing + 评估一体化 |
| **Phoenix (Arize)** | 侧重 observability，可看 embedding drift |
| **deepeval** | 开源评测框架，支持自定义指标 |
| **自建评测** | 基于标注数据 + LLM-as-Judge |

**追问：**
- "RAGAS 的评估原理你了解吗？它怎么在没有 ground truth 的情况下评估 faithfulness 的？"
  - 答：RAGAS 用 LLM 将回答拆解成若干 statements，逐条检查是否能被 context 支持。不需要人工标注 ground truth，但依赖 judge LLM 的质量
- "你觉得 LLM-as-Judge 靠谱吗？有什么局限？"
  - 答：存在 position bias（偏爱排在前面的答案）、verbosity bias（偏爱长答案）、self-enhancement bias（偏爱同模型输出）。通常需要多个 judge 取平均，或用更强的模型做 judge

---

#### 四、评测数据集构建

**提问：** "评估需要数据集。你们的评测集怎么建的？多大规模？多久更新一次？"

**期望考察点：**

1. **数据来源**
   - 人工标注？成本高但质量好
   - 从用户日志中挖掘 query？需要标注 ground truth
   - LLM 自动生成 QA pairs？便宜但需要人工审核
   - 有没有用类似 RAGET（RAGAS 的自动评测集生成工具）？

2. **数据集结构**
   - 每条数据包含什么？（query, ground truth answer, relevant document IDs）
   - 有没有分类型？（事实类、对比类、推理类、多跳类）
   - 有没有 hard negatives？（语义接近但不相关的干扰文档）

3. **规模与维护**
   - 多少条评测数据？（少于 50 条基本不具备统计意义）
   - 知识库更新后评测集怎么同步？
   - 有没有做过 regression test？（新版本不能比旧版本差）

**合格答案标准：** 能说出评测集的具体规模、构建方式、更新策略。如果说"没有建评测集，靠人工看效果"，说明工程成熟度不足。

---

#### 五、线上监控指标

**提问：** "评测集是离线评估。上线后你们怎么持续监控 RAG 质量？"

| 指标 | 含义 |
|------|------|
| **检索空返回率** | 没有检索到任何相关文档的 query 占比 — 说明知识库覆盖不足 |
| **低相关性检索率** | 检索结果相似度分数低于阈值的占比 — 说明 embedding 质量或 query 质量问题 |
| **拒答率** | 模型回答"无法回答"或"信息不足"的比例 — 过高说明检索/知识库有问题 |
| **用户反馈（thumbs up/down）** | 最直接的质量信号 — 但样本量和偏差需注意 |
| **引用准确率** | 回答中引用的源文档是否确实包含该信息 — 可自动化检测 |
| **Embedding drift** | 新文档的 embedding 分布是否和旧文档偏移 — 模型更新或数据分布变化时需关注 |
| **Latency P50/P95** | 检索 + 生成的总延迟 — 影响用户体验 |

**追问：** "你们有没有遇到过线上 RAG 质量突然下降的情况？原因是什么？怎么发现的？"

**期望案例：** 比如知识库更新了新文档导致旧 query 的检索结果变差；embedding 模型切换后分布不兼容；chunk 策略调整后某些类型的问题 recall 下降等。

---

#### 六、端到端评估 vs 分阶段评估

**提问：** "你倾向于端到端评估（只看最终回答对不对）还是分阶段评估（分别评检索和生成）？为什么？"

**期望答案：**
- **两者都要做**，但侧重点不同：
  - 端到端评估：最终面向用户的是回答质量，这是北极星指标
  - 分阶段评估：用于定位问题。如果端到端指标下降了，需要知道是检索的问题还是生成的问题
- **调优顺序**：先优化检索（recall），再优化排序（precision/rerank），最后优化生成（prompt/model）
- 类比：就像 Web 应用的监控，既要看整体响应时间（端到端），也要看数据库查询时间、API 处理时间（分阶段）

---

#### RAG 评估面试评分对照

| 层次 | 候选人表现 | 评价 |
|------|-----------|------|
| 只知道"看回答对不对" | 没有量化思维 | 不合格 |
| 能说出 recall / precision | 基础检索指标有了解 | 基本合格 |
| 能说出 faithfulness / hallucination rate 等生成指标 | 理解 RAG 两阶段评估 | 合格 |
| 用过 RAGAS 等框架，建过评测集 | 有实际评估经验 | 良好 |
| 有线上监控体系 + 分阶段 debug 流程 + 评测集维护策略 | 生产级 RAG 经验 | 优秀 |

---

### A11. 提升 RAG 相关性评分的方式（深入专题）

相关性是 RAG 系统的核心痛点。这个问题可以一层层往下追，考察候选人优化 RAG 的实战深度。

---

#### 开场提问

**提问：** "假设你们 RAG 系统上线后，用户反馈'回答不准'、'经常答非所问'。你会从哪些方面去提升相关性？"

**不要给提示，看候选人自己能想到多少层面。** 然后逐层追问。

---

#### 一、Query 侧优化（用户问题不够好）

很多时候不是检索不行，是用户的 query 本身质量差、模糊、或者和文档用语不匹配。

| 技术 | 做法 | 解决什么问题 |
|------|------|-------------|
| **Query Rewriting（查询改写）** | 用 LLM 将用户口语化/模糊的问题改写成更精确的检索 query | 用户说"那个功能怎么用"→ 改写成"XX 平台数据导出功能的使用步骤" |
| **HyDE（Hypothetical Document Embedding）** | 先让 LLM 生成一个"假想的理想答案"，用这个假想答案去做 embedding 检索 | 缩小 query 和 document 之间的语义鸿沟（query 通常短而抽象，document 长而具体） |
| **Query Decomposition（查询分解）** | 将复合问题拆成多个子问题，分别检索再合并 | "A 和 B 有什么区别？" → 分别检索 A 和 B 的信息 |
| **Multi-query（多路查询）** | 用 LLM 将一个问题改写成多个不同表述，分别检索取并集 | 同一个意思的不同说法可能匹配不同的文档 |
| **Step-back Prompting** | 先让 LLM 提取问题背后更高层级的概念，用概念去检索 | 具体问题的答案可能在更宏观的文档中 |

**追问：**
- "Query Rewriting 和 HyDE 你用过哪个？效果提升多少？"
- "HyDE 的原理能解释一下吗？为什么用假想答案做 embedding 比用原始 query 效果好？"
  - 答：因为 embedding 模型在训练时见到的是"文档-文档"或"文档-答案"的对，query 和 document 在 embedding 空间中天然有 gap。HyDE 把 query 先转换成类似文档的形态再去检索，更容易匹配。

---

#### 二、Embedding 侧优化（向量表示不够好）

| 技术 | 做法 | 解决什么问题 |
|------|------|-------------|
| **换更好的 embedding 模型** | 从通用模型（如 OpenAI ada）换到领域微调过的模型（如 BGE-zh / Jina / Cohere embed） | 通用模型对专业术语的语义理解可能不够 |
| **Fine-tune embedding 模型** | 用业务数据（query-document pairs）微调 embedding 模型 | 让模型学到领域特有的语义关系 |
| **多向量表示（ColBERT 风格）** | 每个 token 一个向量，做 late interaction 匹配 | 细粒度匹配，比单向量更精确但成本更高 |
| **Matryoshka Embedding** | 训练时让 embedding 在不同维度截断都有效 | 可以用短向量做粗筛、长向量做精排，平衡速度和精度 |

**追问：**
- "你们用的什么 embedding 模型？为什么选它？有没有做过不同模型的对比评测？"
- "Embedding 模型对中文效果怎么样？有没有遇到中英文混合的问题？"

---

#### 三、Chunking 策略优化（文档切得不好）

chunk 质量直接决定检索上限，切得不好后面再怎么优化都白搭。

| 策略 | 做法 | 适用场景 |
|------|------|---------|
| **固定长度切分** | 按 token 数切，设置 overlap | 最简单，适合结构统一的文档 |
| **语义切分（Semantic Chunking）** | 用 embedding 相似度检测语义断点，在语义变化大的地方切 | 保证每个 chunk 语义完整 |
| **递归切分（Recursive Splitter）** | 按标题 → 段落 → 句子层级递归切分 | 保留文档结构 |
| **基于文档结构切分** | 按 Markdown 标题、HTML tag、PDF 段落切分 | 结构化文档（技术文档、手册） |
| **Agentic Chunking** | 让 LLM 判断每段内容应该属于哪个 chunk | 最灵活但成本最高 |
| **Parent-Child Chunking** | 小 chunk 用于检索（精确匹配），命中后返回大 chunk 给 LLM（上下文完整） | 兼顾检索精度和上下文完整性 |

**追问：**
- "你们 chunk size 设了多少？overlap 多少？怎么定的这个数？"
  - 合格答案：不是拍脑袋定的，是通过实验对比不同 size 下的 recall 来确定的。典型值 256-1024 tokens，overlap 10-20%
- "Parent-Child Chunking 的思路你了解吗？"
  - 这是一个很实用的技巧：用小 chunk（128 tokens）做检索保证精度，命中后把它的 parent chunk（1024 tokens）送给 LLM 保证上下文完整

---

#### 四、检索策略优化（搜得不够好）

| 技术 | 做法 | 解决什么问题 |
|------|------|-------------|
| **Hybrid Search（混合检索）** | 向量检索 + BM25/keyword 检索，结果融合 | 向量检索擅长语义匹配，keyword 检索擅长精确术语匹配，互补 |
| **Reranker（重排序）** | 检索 top-50 后用 cross-encoder 模型重排，取 top-5 | cross-encoder 比 bi-encoder 更精确但更慢，用于精排 |
| **Metadata Filtering（元数据过滤）** | 检索前先按 metadata（部门、文档类型、时间）过滤 | 缩小搜索范围，减少噪声 |
| **递归检索（Recursive Retrieval）** | 先检索到大主题，再在主题内做精确检索 | 处理层次化知识库 |
| **多轮检索（Iterative Retrieval）** | 第一次检索结果不满意时，用 LLM 生成新 query 再检索 | 自动弥补第一次检索的不足 |
| **知识图谱增强** | 结合知识图谱做实体关系推理后再检索 | 处理需要多跳推理的问题 |

**追问：**
- "Hybrid Search 的融合你们用什么算法？"
  - 期望答案：RRF（Reciprocal Rank Fusion）— 简单有效，将两个排序列表按倒数排名加权合并。或者 weighted sum 归一化分数
- "Reranker 你们用什么模型？和不用 reranker 比效果差多少？"
  - 常见选择：Cohere Rerank / BGE-Reranker / cross-encoder from sentence-transformers
  - 通常 reranker 能把 NDCG 提升 10-30%
- "先向量检索再 rerank，和直接用 cross-encoder 检索全库，区别是什么？"
  - 答：cross-encoder 需要对每一对 (query, document) 做推理，全库检索 O(N) 太慢。所以用 bi-encoder（向量检索）做粗筛 O(1)，再用 cross-encoder 做精排 O(K)。这是经典的两阶段检索架构

---

#### 五、Prompt / 生成侧优化（模型没用好检索结果）

检索到了相关文档，但模型的回答仍然不好。

| 技术 | 做法 | 解决什么问题 |
|------|------|-------------|
| **Context 排序** | 最相关的文档放在 prompt 最前面或最后面 | 缓解 lost-in-the-middle 问题 |
| **Context 压缩** | 用 LLM 或规则提取检索文档中与 query 最相关的段落 | 减少噪声，让模型聚焦关键信息 |
| **引用要求** | prompt 中要求模型标注引用来源 [1][2] | 约束模型基于 context 回答，降低幻觉 |
| **拒答指令** | prompt 中明确说"如果 context 中没有相关信息，回答不知道" | 减少模型用参数知识瞎编 |
| **Few-shot 示例** | 在 prompt 中给出高质量 QA 示例 | 教模型回答的格式和风格 |
| **Chain of Thought** | 让模型先分析检索结果再回答 | 提升推理准确性 |

**追问：**
- "你们检索结果塞给 LLM 的时候，是按相关性排序还是按文档原始顺序？"
- "如果检索到 5 条但其中 2 条是噪声，你怎么处理？直接都塞给模型还是先过滤？"
  - 好的做法：要么用 reranker 设阈值过滤低分结果，要么用 context compression 提取关键段落

---

#### 六、系统级优化（架构层面）

| 技术 | 做法 | 解决什么问题 |
|------|------|-------------|
| **Routing（路由）** | 根据 query 类型决定走 RAG 还是直接用 LLM 回答 | 不是所有问题都需要检索，通用问题走 RAG 反而引入噪声 |
| **Corrective RAG（CRAG）** | 检索后先评估结果质量，质量低就换策略（如 web search） | 动态应对检索失败 |
| **Self-RAG** | 模型自己判断是否需要检索、检索结果是否有用、回答是否忠实 | 让模型参与检索决策 |
| **Agentic RAG** | 用 agent 循环：检索 → 评估 → 不满意就改 query 重试 → 满意就回答 | 多轮自动优化 |
| **Evaluation-driven Iteration** | 建评测集，每次改动后跑 benchmark 对比 | 确保优化真的有效，避免拆东墙补西墙 |

**追问：**
- "你们做过这种'检索结果不好就自动换策略'的逻辑吗？"
- "怎么判断检索结果质量'够不够好'？阈值怎么定的？"

---

#### 提问总结：一张图看全貌

```
用户 Query
  │
  ├─ ① Query 侧: rewrite / HyDE / decomposition / multi-query
  │
  ▼
Embedding
  │
  ├─ ② Embedding 侧: 选模型 / fine-tune / ColBERT
  │
  ▼
知识库（Chunks）
  │
  ├─ ③ Chunking 策略: semantic / recursive / parent-child
  │
  ▼
检索
  │
  ├─ ④ 检索策略: hybrid search / metadata filter / reranker
  │
  ▼
Context Assembly
  │
  ├─ ⑤ Prompt 侧: context 排序 / 压缩 / 引用约束 / 拒答指令
  │
  ▼
LLM 生成
  │
  ├─ ⑥ 系统级: routing / CRAG / Self-RAG / Agentic RAG
  │
  ▼
最终回答
```

**面试时最佳用法：** 先让候选人自由回答，看他能覆盖几层。然后针对他没提到的层面追问。

---

#### 相关性优化面试评分对照

| 候选人表现 | 覆盖层面 | 评价 |
|-----------|---------|------|
| 只说"换更好的模型"或"多塞点 context" | 无体系 | 不合格 |
| 能提到 chunking + reranker | 触及 2 层 | 基本合格 |
| 覆盖 query 改写 + embedding 选型 + hybrid search + reranker | 覆盖 3-4 层 | 合格 |
| 上述 + 有量化对比数据（提升了多少个点） | 有实测经验 | 良好 |
| 全链路优化思路清晰 + 有 evaluation-driven 迭代经验 + 能说出每层的具体取舍 | 生产级经验 | 优秀 |

---

### B. OpenClaw 实操题（业务贴合专题）

以下题目基于 Nexu 的真实架构设计，不需要候选人提前了解 OpenClaw，而是给他足够的上下文信息后，看他能不能现场分析、设计、排查。考察的是**工程思维和系统设计能力**，不是背知识。

---

#### 使用方式

1. 先用 2 分钟口头介绍 Nexu 的核心架构（见下方"背景介绍话术"）
2. 然后抛出题目，给候选人思考和作答
3. 可以根据时间选 1-2 道题深入聊

---

#### 背景介绍话术（面试时念给候选人）

> "我们在做一个多租户 AI Bot 平台。用户在 Web 上创建 Bot、配置 system prompt，然后把 Bot 连接到自己的 Slack workspace。
>
> 底层架构是这样的：我们有一个叫 OpenClaw 的 Gateway 引擎，一个 Gateway 进程可以同时服务 50+ 个不同用户的 Bot。每个 Bot 有自己的 Slack 账号、自己的 agent 配置、自己的对话记忆。
>
> 整个系统通过一个 JSON 配置文件驱动。配置里有四个核心概念：
> - **agents**：Bot 列表，每个 Bot 是一个 agent
> - **channels.slack.accounts**：每个 Bot 连接的 Slack workspace 凭证
> - **bindings**：路由表，把某个 Slack account 的消息路由到对应的 agent
> - **gateway**：运行时配置（端口、认证、热加载模式等）
>
> 当用户在 Slack 发消息时，Slack 把 webhook 发到我们的 API，API 根据 team_id 查找是哪个 Bot，然后把请求转发到对应的 Gateway 进程。Gateway 根据配置里的 bindings 找到对应的 agent 处理消息。"

---

#### B1. 配置生成：从数据库到运行时配置（设计题，15-20 分钟）

**提问：** "现在给你这样一个场景：数据库里有 3 个 Bot，分别连接了不同的 Slack workspace。请你设计一个 `generateConfig()` 函数，从数据库查出这些 Bot 的信息，生成一份完整的 Gateway 配置。"

**给候选人的输入示例（可以画在白板或发给他）：**

```
数据库中的数据：

Bot A (id: "bot_a1b2c3")
  - name: "客服助手"
  - system_prompt: "你是一个客服机器人..."
  - model: "claude-sonnet-4"
  - 连接的 Slack: team_id="T111", botToken="xoxb-aaa", signingSecret="ss-aaa"

Bot B (id: "bot_d4e5f6")
  - name: "代码审查"
  - system_prompt: "你是一个 code reviewer..."
  - model: "claude-sonnet-4"
  - 连接的 Slack: team_id="T222", botToken="xoxb-bbb", signingSecret="ss-bbb"

Bot C (id: "bot_g7h8i9")
  - name: "周报助手"
  - system_prompt: "你是一个帮写周报的助手..."
  - model: "claude-haiku"
  - 连接的 Slack: team_id="T333", botToken="xoxb-ccc", signingSecret="ss-ccc"
```

**期望候选人输出类似这样的配置结构：**

```json
{
  "gateway": { "port": 18789, "auth": { ... }, "reload": { "mode": "hybrid" } },
  "agents": {
    "list": [
      { "id": "bot_a1b2c3", "name": "客服助手", "default": true, "workspace": "/data/agents/bot_a1b2c3" },
      { "id": "bot_d4e5f6", "name": "代码审查", "workspace": "/data/agents/bot_d4e5f6" },
      { "id": "bot_g7h8i9", "name": "周报助手", "workspace": "/data/agents/bot_g7h8i9" }
    ]
  },
  "channels": {
    "slack": {
      "accounts": {
        "slack-T111": { "botToken": "xoxb-aaa", "signingSecret": "ss-aaa", ... },
        "slack-T222": { "botToken": "xoxb-bbb", "signingSecret": "ss-bbb", ... },
        "slack-T333": { "botToken": "xoxb-ccc", "signingSecret": "ss-ccc", ... }
      }
    }
  },
  "bindings": [
    { "agentId": "bot_a1b2c3", "match": { "channel": "slack", "accountId": "slack-T111" } },
    { "agentId": "bot_d4e5f6", "match": { "channel": "slack", "accountId": "slack-T222" } },
    { "agentId": "bot_g7h8i9", "match": { "channel": "slack", "accountId": "slack-T333" } }
  ]
}
```

**考察点与追问：**

1. **数据隔离意识**
   - "每个 agent 的 workspace 为什么要分开？" → 对话记忆、文件、配置隔离
   - "如果两个 Bot 连了同一个 Slack workspace，bindings 怎么处理？" → 需要更细粒度的路由（channel/user 级别）

2. **凭证安全**
   - "botToken 这些敏感信息在数据库里怎么存？" → 加密存储，只在生成配置时解密
   - "配置文件落盘后怎么保护？" → 文件权限、临时文件、或内存传递

3. **默认值和边界**
   - "只有一个 agent 能设 default: true，你怎么选？" → 按某种确定性规则（如按名字排序第一个）
   - "如果某个 Bot 的 Slack token 过期了怎么办？" → 应该在生成配置前校验，不合法的跳过，记录告警

4. **热加载**
   - "如果用户在 Web 上改了 Bot C 的 system prompt，怎么让 Gateway 生效？" → 重新生成配置 → 写入磁盘 → Gateway 检测文件变化 → 热加载
   - "热加载时正在进行的对话会断吗？" → 好的设计是 hybrid 模式，新配置只影响新对话

---

#### B2. 事件路由排查：消息去哪了？（Debug 题，10-15 分钟）

**提问：** "线上突然收到用户反馈：'我在 Slack 里 @了我的 Bot，但 Bot 没有任何反应。' 你怎么排查？"

**给候选人的系统架构图（口述或画）：**

```
Slack → Nexu API (/api/slack/events) → 查数据库找路由 → 转发到 Gateway Pod → Gateway 内部路由 → Agent 处理 → 回复 Slack
```

**期望候选人的排查思路（按层级）：**

| 排查层级 | 检查什么 | 可能的原因 |
|---------|---------|-----------|
| **① Slack 侧** | Slack 是否真的发了 webhook？Event Subscriptions 配置对不对？ | Slack app 的 Request URL 没配对、app 被 uninstall 了 |
| **② API 接收** | API 的 `/api/slack/events` 有没有收到请求？看 access log | 网络问题、Ingress 配置错误 |
| **③ 签名验证** | HMAC 签名校验通过了吗？ | signing secret 不匹配（可能用户重新生成了 secret 但没更新） |
| **④ 路由查找** | `webhook_routes` 表里能不能找到这个 team_id 对应的路由？ | 路由记录被删了、team_id 匹配不上 |
| **⑤ 转发到 Gateway** | API 转发请求到 Gateway Pod，Pod 能不能访问？ | Pod IP 变了但数据库里的 IP 没更新、Pod 挂了 |
| **⑥ Gateway 内部路由** | Gateway 收到请求后，能不能通过 bindings 找到对应的 agent？ | 配置里的 accountId 和实际请求的不匹配、bindings 数组为空 |
| **⑦ Agent 处理** | Agent 有没有成功调用 LLM？ | API key 过期、模型不可用、agent workspace 损坏 |
| **⑧ 回复 Slack** | 回复时用的 botToken 还有效吗？ | token 被 revoke 了 |

**追问（考察深度）：**

- "如果排查发现 Gateway 收到了请求，但 agent 没有处理。可能是什么原因？"
  - **groupPolicy 配置问题**：如果 groupPolicy 没有显式设置，默认是 `allowlist`，会**静默丢弃**所有群消息，没有任何日志。这是最隐蔽的坑。
  - requireMention 设置：用户可能在群聊里发消息但没 @bot
  - dmPolicy 设置：如果是私聊但 dmPolicy 不是 open

- "假设你完全没接触过这个系统，第一步你会看什么？"
  - 好的回答：先看日志（API 侧和 Gateway 侧），确定请求到了哪一层就断了
  - 不好的回答：一上来就猜原因改配置

---

#### B3. 配置热加载设计（架构题，10-15 分钟）

**提问：** "用户在 Web 上做了一个操作（比如改了 Bot 的名字、换了模型、或者断开了 Slack 连接），这个变更需要实时生效到 Gateway。请你设计这个配置热加载的流程。"

**追问方向：**

1. **触发时机**
   - "哪些操作需要触发配置更新？"
     - 期望：Bot 属性修改、Slack OAuth 完成/断开、凭证变更、Bot 启用/停用
   - "是每次操作都立即重新生成全量配置，还是增量更新？"
     - 讨论点：全量更新简单可靠但可能有性能问题；增量更新复杂但更高效。实际中小规模（50 个 bot）全量重新生成很快，不值得做增量的复杂度

2. **传递机制**
   - "配置怎么从 API 服务传到 Gateway 进程？"
     - 方案对比：
       - **文件 + 文件监听（chokidar）**：简单、可靠、Gateway 原生支持。缺点是依赖共享存储
       - **HTTP API 推送**：API 直接调 Gateway 的 reload 接口。缺点是耦合度高
       - **消息队列（Redis pub/sub）**：解耦，但多了一个依赖
       - **数据库轮询**：Gateway 定时查 config_version。延迟高但最简单
   - 我们实际用的是**文件 + chokidar + 版本号**的混合方案

3. **一致性保证**
   - "热加载过程中如果有用户正在和 Bot 对话怎么办？"
     - 期望：hybrid 模式 — 正在进行的对话继续用旧配置，新对话用新配置
   - "如果两个 API 请求几乎同时触发配置更新，会不会冲突？"
     - 期望：版本号/序列号机制，或用分布式锁保证只有一个 writer

4. **失败处理**
   - "新配置如果有错误（比如某个 botToken 过期了），会发生什么？"
     - 好的设计：生成配置前做校验，跳过有问题的 bot；配置文件用 Zod schema 校验后再写入
   - "Gateway 加载新配置失败了怎么办？"
     - 期望：回滚到上一个有效配置，或保持当前配置不变

---

#### B4. 多租户安全隔离（安全设计题，10 分钟）

**提问：** "50 个不同用户的 Bot 跑在同一个 Gateway 进程里。一个恶意用户有没有办法通过他的 Bot 访问到其他用户 Bot 的数据？你会怎么设计隔离？"

**期望候选人考虑的维度：**

| 隔离维度 | 风险 | 防护措施 |
|---------|------|---------|
| **对话记忆** | Bot A 能不能看到 Bot B 的聊天记录？ | 每个 agent 独立 workspace 目录，文件系统级别隔离 |
| **凭证** | Bot A 能不能拿到 Bot B 的 Slack token？ | 凭证只在内存中存在，运行时配置不暴露给 agent；配置文件权限控制 |
| **工具执行** | Bot A 执行代码时能不能读 Bot B 的文件？ | sandbox 容器化隔离，每个 agent 只挂载自己的 workspace |
| **LLM 调用** | Bot A 的 prompt 会不会泄露到 Bot B？ | agent 间独立的 LLM session，不共享 context |
| **资源滥用** | 一个 Bot 大量调用 LLM 导致其他 Bot 变慢？ | rate limiting per agent，资源配额 |
| **配置注入** | 用户输入的 bot name/prompt 有没有可能注入配置？ | 对用户输入做转义/校验，配置用 schema 严格验证 |

**追问：**
- "如果要做到真正的强隔离，是不是应该一个 Bot 一个进程？那为什么我们选择多租户共享进程？"
  - 答：资源效率。一个 Gateway 进程的内存开销、连接管理成本是固定的。50 个 Bot 各起一个进程意味着 50 倍的基础开销。在 Bot 大部分时间空闲的场景下，共享进程更经济。安全边界通过 workspace 隔离 + sandbox 来补偿。

---

#### B5. 快速上手编码题（Coding，15-20 分钟）

**提问：** "给你一段 Gateway 的配置 JSON，写一个函数实现消息路由。"

**给候选人的输入：**

```typescript
// Gateway 配置的简化版
interface GatewayConfig {
  agents: {
    list: Array<{
      id: string;
      name: string;
      default?: boolean;
    }>;
  };
  bindings: Array<{
    agentId: string;
    match: {
      channel: string;       // "slack" | "discord" | "feishu"
      accountId?: string;    // 可选，不填则匹配所有该 channel 的消息
      peerId?: string;       // 可选，匹配特定用户
    };
  }>;
}

// 一条进来的消息
interface IncomingMessage {
  channel: string;      // "slack"
  accountId: string;    // "slack-T111"
  peerId: string;       // "U12345" (发消息的用户)
}

// 要求：实现这个函数
// 返回应该处理这条消息的 agent id
// 路由优先级：peerId 精确匹配 > accountId 精确匹配 > channel 通配 > default agent
function routeMessage(config: GatewayConfig, message: IncomingMessage): string | null {
  // 你的实现
}
```

**参考答案：**

```typescript
function routeMessage(config: GatewayConfig, message: IncomingMessage): string | null {
  // 1. peerId 精确匹配（最高优先级）
  const peerMatch = config.bindings.find(b =>
    b.match.channel === message.channel &&
    b.match.accountId === message.accountId &&
    b.match.peerId === message.peerId
  );
  if (peerMatch) return peerMatch.agentId;

  // 2. accountId 精确匹配
  const accountMatch = config.bindings.find(b =>
    b.match.channel === message.channel &&
    b.match.accountId === message.accountId &&
    !b.match.peerId
  );
  if (accountMatch) return accountMatch.agentId;

  // 3. channel 通配（accountId 为 "*" 或未设置）
  const channelMatch = config.bindings.find(b =>
    b.match.channel === message.channel &&
    (!b.match.accountId || b.match.accountId === "*") &&
    !b.match.peerId
  );
  if (channelMatch) return channelMatch.agentId;

  // 4. default agent
  const defaultAgent = config.agents.list.find(a => a.default);
  return defaultAgent?.id ?? null;
}
```

**考察点：**
- 能不能理解多层优先级匹配逻辑
- 边界处理：没有匹配到任何 binding 时怎么办
- TypeScript 类型使用是否自然
- 代码是否清晰可读

**加分追问：**
- "这个 `find` 的线性查找在 50 个 bot、50 个 binding 的场景下性能可以接受吗？如果 binding 有 10000 条呢？怎么优化？"
  - 答：预构建哈希表 `Map<"channel:accountId:peerId", agentId>`，查找 O(1)
- "如果一条消息匹配到多个 binding（比如两个 bot 都绑了同一个 Slack workspace），应该怎么处理？"
  - 讨论点：按优先级取第一个 vs 报配置错误 vs 都通知但只有一个回复

---

#### OpenClaw 实操题评分对照

| 题号 | 考察能力 | 优先级 | 时间 | 适用场景 |
|------|---------|--------|------|---------|
| B1 配置生成 | 系统设计 + 安全意识 + 边界处理 | 高 | 15-20min | 考察候选人能否理解多租户配置架构 |
| B2 事件路由排查 | Debug 思维 + 系统理解 | 高 | 10-15min | 考察线上问题排查的系统性 |
| B3 热加载设计 | 架构设计 + 一致性思维 | 中 | 10-15min | 考察分布式系统设计能力 |
| B4 安全隔离 | 安全思维 + 架构权衡 | 中 | 10min | 考察安全意识和工程取舍 |
| B5 编码实操 | 编码能力 + 逻辑清晰度 | 高 | 15-20min | 直接看代码写得怎么样 |

**建议组合：**
- 时间充裕（30-40min）：B1 + B5（设计 + 编码）
- 时间有限（15-20min）：B2（纯讨论，不需要写代码，信息量大）
- 侧重考察架构：B3 + B4

---

### AI 技术面评估快速对照表

| 问题编号 | 考察能力 | 难度 | 优先级 | 预计时间 |
|---------|---------|------|--------|---------|
| A1 RAG | 系统设计 + 工程实践 | 中 | 必问 | 8-10 min |
| A2 Prompt | 实操经验 | 低-中 | 必问 | 5 min |
| A3 LLM工程 | 工程细节 | 中 | 重要 | 8-10 min |
| A4 Agent | 架构设计 + 实操 | 中-高 | 重要 | 10 min |
| A5 推理优化 | 基础设施 | 高 | 按需（验证简历数据） | 5-8 min |
| A6 Fine-tuning | ML工程 | 中 | 按需 | 5 min |
| A7 多模态 | 系统集成 | 中 | 按需（验证简历） | 5 min |
| A8 安全合规 | 工程素养 | 低-中 | 加分项 | 3-5 min |

**建议：** 必问 A1 + A2，再从 A3/A4 选一个深入聊。如果时间充裕，用 A5 验证简历中"QPS 1000+"的真实性。

---

## 四、工程素养与协作

### 9. 代码质量与工程实践

**提问：** "你们在商汤的项目中，代码审查是怎么做的？CI/CD 流程是什么样的？你个人在代码质量方面有什么坚持？"

**期望考察点：**
- 是否有 PR review 的习惯
- 是否了解 linting、formatting 工具
- 是否写测试（单元测试、集成测试）
- CI/CD pipeline 的理解
- 对技术债的态度

---

### 10. 创业公司适配度

**提问：** "你之前的经历主要在中大型公司，创业公司节奏很不一样。举个例子，如果某天早上产品说了一个需求，下午就要上线，你会怎么处理？"

**期望考察点：**
- 是否能接受快速迭代
- 如何平衡速度和质量
- 是否有 MVP 思维
- 遇到不确定性时的决策方式

---

### 11. 全栈能力边界

**提问：** "全栈是一个很广的概念。如果把你的技术能力画个雷达图，前端、后端、DevOps、AI/ML、系统设计这五个维度，你会怎么给自己打分（1-10）？最弱的是哪个？你打算怎么补？"

**目的：** 考察自我认知是否准确。一面中候选人技术栈列了很多（Python、Java、Node.js、C#、C++/Qt、React、Vue、Flutter、Electron），太广容易浅。看他是否能诚实评估自己。

---

## 四、文化与价值观

### 12. AI Coding 范式理解

一面中候选人批评商汤的开发范式没有适应 AI Coding。

**提问：** "你说商汤还在用传统敏捷开发，没适应 AI Coding 范式。那你理想中的 AI Coding 工作流是什么样的？你觉得 AI 能替代开发流程中的哪些环节，哪些不能？"

**期望考察点：**
- 对 AI 辅助开发的理解深度
- 是否有实际使用 AI 工具提效的经验
- 对 AI 局限性的认知（不能盲目乐观）
- 是否了解 spec-driven development（我们正在用的方式）

---

### 13. 对产品方向的理解

**提问：** "上次黄巍聊了我们在做基于 IM 入口的下一代办公系统。你觉得这个方向最大的挑战是什么？如果让你来做，你会从哪里切入？"

**目的：** 考察产品 sense 和独立思考能力。不要求答案完美，看思考的深度和角度。

---

## 五、Coding 实操（可选）

### 14. 现场编码题

如果时间允许，可以出一道贴合业务的编码题：

**题目：** "写一个函数，输入是一组 Slack workspace 的 bot 配置（包含 bot_id, workspace_id, trigger_keywords），输出是一个路由表，能根据 workspace_id + keyword 快速找到对应的 bot_id。要求：O(1) 查找时间复杂度，支持一个 keyword 匹配多个 bot（返回数组），支持通配符 `*` 表示匹配所有 keyword。"

```typescript
interface BotConfig {
  botId: string;
  workspaceId: string;
  triggerKeywords: string[]; // ["help", "ask", "*"] - * means match all
}

// 实现这个函数
function buildRouteTable(configs: BotConfig[]): RouteTable;
function lookup(table: RouteTable, workspaceId: string, keyword: string): string[];
```

**考察点：** 数据结构设计、边界条件处理、TypeScript 类型定义能力。

---

## 六、综合评估维度

| 维度 | 权重 | 一面印象 | 二面重点验证 |
|------|------|---------|-------------|
| 简历真实性 | 高 | 存在多处不一致 | 公司名称、时间线、团队规模 |
| 技术深度 | 高 | 广但可能浅 | Python/React 实际经验深度 |
| 系统设计 | 中 | 未充分考察 | 多租户架构设计能力 |
| AI 工程实践 | 中 | 有实践但深度待验证 | Agent 状态机设计细节 |
| 工程素养 | 中 | 未充分考察 | 代码质量、测试、CI/CD |
| 创业适配度 | 中 | 态度积极 | 快速迭代能力、MVP 思维 |
| 文化匹配 | 中 | 基本匹配 | 对产品方向的理解深度 |
| 英语能力 | 低 | 自称可作为工作语言 | 可用英文聊几分钟验证 |

---

## 七、风险提示

1. **简历美化风险较高** — 公司名称不一致、项目描述复制粘贴错误、数据指标可能夸大（"单日 1000+ 亿级交易规模"对于 FNZ 体量存疑）
2. **技术栈过广** — 列了 8+ 种语言/框架，5 年经验覆盖这么多栈，每个可能都不够深
3. **Level 偏初级** — P6 / 2-2 级别，5 年经验，在大厂属于中规中矩，需验证独立承担复杂系统的能力
4. **薪资期望** — 当前 59 万 + 30% ≈ 77 万，需评估是否匹配创业公司早期阶段的预算

## 八、建议提问顺序

1. 先聊简历不一致点（5-10 分钟）→ 建立真实性基线
2. 技术深度验证（15-20 分钟）→ Python + React + 系统设计
3. AI 工程实践（10 分钟）→ Agent 实操细节
4. 文化与协作（10 分钟）→ 创业适配度 + 产品理解
5. 现场编码（15-20 分钟，可选）→ 实际编码能力
6. 候选人提问（5 分钟）
