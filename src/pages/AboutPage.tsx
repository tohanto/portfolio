import { LazyImage } from '@/components/ui/LazyImage';
import SplitText from '@/components/ui/SplitText';
import { Link } from 'react-router-dom';
import { assetPath } from '@/utils/assetPath';

/* ───────────────────────────────────────────
 * AboutPage — 1:1 Pixso 2:67 (关于我)
 * Hero → 教育经历 → 实践经历(5 items) → 专业技能 → 游戏经历 → Contact CTA
 * ─────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════
          1. Hero Section — Pixso 2:68: photo left (606px) + text right (834px)
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-canvas-white">
        <div className="flex max-md:flex-col h-[692px] max-md:h-auto">
          {/* Left: Photo — Pixso 2:69, 606px wide */}
          <div className="w-[606px] max-md:w-full h-[692px] max-md:h-80 shrink-0 relative overflow-hidden bg-surface">
            <LazyImage
              src={assetPath("/00个人简介/01基本信息/生活照3.jpg")}
              alt="杨涵"
              containerClassName="w-full h-full"
              className="object-cover"
            />
          </div>

          {/* Right: Text — Pixso 2:70, 834px wide, padding 80px 72px, white bg */}
          <div className="flex-1 flex items-center bg-canvas-white" style={{ padding: '80px 72px' }}>
            <div className="max-w-[640px]">
              {/* Label: "01 — ABOUT ME" 10px Semi Bold, #999, letter-spacing 2px */}
              <span className="block text-[10px] font-semibold text-ink-muted" style={{ letterSpacing: '2px' }}>
                01 — ABOUT ME
              </span>

              {/* Title: "你好，我是杨涵" 52px Bold, #111, letter-spacing -1.5px (Removed 陈子墨 per user request) */}
              <SplitText
                text="你好，我是杨涵"
                tag="h1"
                className="mt-4 text-[52px] font-bold text-ink leading-[1.05]"
                style={{ letterSpacing: '-1.5px' }}
                delay={50}
                duration={0.7}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.15}
                rootMargin="-80px"
                textAlign="left"
              />

              {/* Bio: 16px Regular, #555, line-height 180%, max-width 640px */}
              <p className="mt-6 text-base text-ink-secondary leading-[1.8] max-w-[640px]" style={{ fontSize: '16px' }}>
                我是一名深耕跨界空间创作的东南大学建筑学设计在读研究生，擅长融合建筑空间逻辑、游戏交互设计、生成式 AI 艺术与视觉创作。本科毕业于湖南大学，现就读于东南大学建筑学院，长期同步落地实体建筑方案、虚拟游戏场景、AI 设计工具多线实践，依托完整建筑学专业功底打通现实营建与虚拟交互的创作链路，以多元设计语言探索虚实空间融合的全新设计路径。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          2. 教育经历 — Pixso 2:84: 1440×692, bg #F8F8F8
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-canvas" style={{ padding: '80px 60px' }}>
        <span className="text-[10px] font-semibold text-ink-muted" style={{ letterSpacing: '2px' }}>
          02 — EDUCATION
        </span>
        <h2 className="mt-2 text-[36px] font-bold text-ink" style={{ letterSpacing: '-1px' }}>
          教育经历
        </h2>

        <div className="mt-12">
          {/* ─── 东南大学 ─── */}
          <div className="flex max-md:flex-col border-t border-rule" style={{ padding: '32px 0' }}>
            <span className="w-[180px] shrink-0 text-[13px] text-ink-muted">
              2024 — 至今
            </span>
            <div className="flex-1" style={{ paddingLeft: '40px' }}>
              <h3 className="text-lg font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>
                东南大学（双一流985） · 建筑学 · 全日制硕士
              </h3>
              <div className="mt-2 text-[14px] text-ink-secondary leading-[1.6] space-y-0">
                <p>· 主修课程：建筑设计（92）、开放建筑设计实践（92）等</p>
                <p>· 工作内容：完成导师工作室内建筑项目的初步设计与建模、选取恰当角度渲染以强化建筑表达效果</p>
              </div>
            </div>
          </div>

          {/* ─── 湖南大学 ─── */}
          <div className="flex max-md:flex-col border-t border-rule" style={{ padding: '32px 0' }}>
            <span className="w-[180px] shrink-0 text-[13px] text-ink-muted">
              2019 — 2024
            </span>
            <div className="flex-1" style={{ paddingLeft: '40px' }}>
              <h3 className="text-lg font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>
                湖南大学（双一流985） · 建筑学 · 全日制本科
              </h3>
              <div className="mt-2 text-[14px] text-ink-secondary leading-[1.6] space-y-0">
                <p>· 平均学分绩点排名 39/130（前 30%）</p>
                <p>· 主修课程：建筑设计、室内设计、中国建筑史（94）、计算机辅助建筑设计（89）等</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. 实践经历 — Pixso 2:103: white bg, padding 80px 60px, 5 items
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-canvas-white" style={{ padding: '80px 60px' }}>
        <span className="text-[10px] font-semibold text-ink-muted" style={{ letterSpacing: '2px' }}>
          03 — EXPERIENCE
        </span>
        <h2 className="mt-2 text-[36px] font-bold text-ink" style={{ letterSpacing: '-1px' }}>
          实践经历
        </h2>

        <div className="mt-12 space-y-0">
          {/* ─── Practice 1: 智能城市设计平台 ─── */}
          <div className="flex max-lg:flex-col border-t border-rule" style={{ padding: '32px 0' }}>
            <span className="w-[180px] shrink-0 text-[13px] text-ink-muted">
              2026.04 — 至今
            </span>
            <div className="flex-1 flex max-lg:flex-col gap-6" style={{ paddingLeft: '40px' }}>
              <div className="flex-1 rounded-[20px] p-8" style={{ backgroundColor: '#F8F8F8', boxShadow: '5px 4px 15px rgba(0,0,0,0.25)' }}>
                <h3 className="text-lg font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>
                  智能城市设计平台-街坊建筑组框架搭建（进行中）
                </h3>
                <div className="mt-2 text-[14px] text-ink-secondary leading-[1.6] space-y-1">
                  <p>1.目标建立一个可解释人工智能"灰箱"生成的工程级城市设计平台</p>
                  <p>2.参与工程级城市设计智能生成平台的街坊与建筑生成板块的研究，统筹建筑生成部分相关内容</p>
                  <p>3.深入拆解 R/B/A/M 四类地块的建筑空间生成逻辑，将建筑设计规则转化为可解释的 AI 生成约束</p>
                  <p>4.通过拆解对比多种建筑智能生成方法，完成地块场地部分技术路线制作</p>
                </div>
              </div>
              <div className="w-[45%] max-lg:w-full shrink-0 h-[300px] max-lg:h-48 rounded-lg overflow-hidden">
                <LazyImage src={assetPath("/00个人简介/03实践经历/平台.png")} alt="智能城市设计平台" containerClassName="w-full h-full" className="object-cover" />
              </div>
            </div>
          </div>

          {/* ─── Practice 2: vibe coding 人才招聘 ─── */}
          <div className="flex max-lg:flex-col border-t border-rule" style={{ padding: '32px 0' }}>
            <span className="w-[180px] shrink-0 text-[13px] text-ink-muted">
              2026.05 — 2026.06
            </span>
            <div className="flex-1 flex max-lg:flex-col gap-6" style={{ paddingLeft: '40px' }}>
              <div className="flex-1 rounded-[20px] p-8" style={{ backgroundColor: '#F8F8F8', boxShadow: '5px 4px 15px rgba(0,0,0,0.25)' }}>
                <h3 className="text-lg font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>
                  基于vibe coding的人才招聘游戏方案设计demo
                </h3>
                <div className="mt-2 text-[14px] text-ink-secondary leading-[1.6] space-y-1">
                  <p>1.针对传统群面主观性强、难以量化评估的行业痛点，设计开发了一款基于对等性机制的游戏化群面测评工具，支持4人实时协作，通过游戏行为数据对五大职场核心能力进行系统化评估。</p>
                  <p>2.该工具融合大五人格等经典心理测试理论，实现行为数据与能力维度的精准映射。在开发过程中，综合运用豆包、DeepSeek、Claude Code、Cursor、Nanobanana等多款生成式AI工具，完成从需求分析、规则设计、视觉呈现到代码实现的全流程开发，提升开发效率与产品专业度。</p>
                  <p>3.网页链接：<a href="https://tohanto.github.io/demo/" target="_blank" rel="noopener noreferrer" className="text-signal underline hover:text-signal-hover">https://tohanto.github.io/demo/</a></p>
                </div>
              </div>
              <Link to="/ai/ai-recruitment" className="w-[45%] max-lg:w-full shrink-0 h-[300px] max-lg:h-48 rounded-lg overflow-hidden block">
                <LazyImage src={assetPath("/03AI辅助/sunshine/01封面.jpg")} alt="vibe coding人才招聘" containerClassName="w-full h-full" className="object-cover hover:opacity-90 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* ─── Practice 3: 轻宋产品手册 ─── */}
          <div className="flex max-lg:flex-col border-t border-rule" style={{ padding: '32px 0' }}>
            <span className="w-[180px] shrink-0 text-[13px] text-ink-muted">
              2025.08 — 2025.10
            </span>
            <div className="flex-1 flex max-lg:flex-col gap-6" style={{ paddingLeft: '40px' }}>
              <div className="flex-1 rounded-[20px] p-8" style={{ backgroundColor: '#F8F8F8', boxShadow: '5px 4px 15px rgba(0,0,0,0.25)' }}>
                <h3 className="text-lg font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>
                  产品手册制作：电建地产宋式产品手册V4.0"轻宋"
                </h3>
                <div className="mt-2 text-[14px] text-ink-secondary leading-[1.6] space-y-1">
                  <p>1.在导师带领下参与"轻宋"产品研发，负责从宋代文化溯源分析到设计手册编制的全流程工作</p>
                  <p>2.根据目标客群和产品迭代需求，以轻宋的"轻"为切入点，建立以用户体验为核心的设计标签体系</p>
                  <p>3.从传统文化溯源，将抽象的宋代美学的不同部分拆解为结构化设计元素，从宏观到微观建立可复用的审美标签库，为后续设计决策提供方向导则和演绎基础，输出了一套标准化视觉规范成果</p>
                </div>
              </div>
              <Link to="/architecture/qing-song" className="w-[45%] max-lg:w-full shrink-0 h-[300px] max-lg:h-48 rounded-lg overflow-hidden block">
                <LazyImage src={assetPath("/01建筑设计/01轻宋产品手册/封面.png")} alt="轻宋产品手册" containerClassName="w-full h-full" className="object-cover hover:opacity-90 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* ─── Practice 4 — 《闪灵》场景还原 ─── */}
          <div className="flex max-lg:flex-col border-t border-rule" style={{ padding: '32px 0' }}>
            <span className="w-[180px] shrink-0 text-[13px] text-ink-muted">
              2021.11 — 2025.04
            </span>
            <div className="flex-1 flex max-lg:flex-col gap-6" style={{ paddingLeft: '40px' }}>
              <div className="flex-1 rounded-[20px] p-8" style={{ backgroundColor: '#F8F8F8', boxShadow: '5px 4px 15px rgba(0,0,0,0.25)' }}>
                <h3 className="text-lg font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>
                  《闪灵》电影建筑空间还原与UE5漫游demo
                </h3>
                <div className="mt-2 text-[14px] text-ink-secondary leading-[1.6] space-y-1">
                  <p>1.通过逐帧拉片分析电影场景，识别出影视布景在空间逻辑上的矛盾点，在平面绘制与建模过程中优化空间关系，完成严谨、可自洽的建筑场景复原</p>
                  <p>
                    2.在Twinmotion中参与展示视频制作，担任场景导演，根据故事脚本完成镜头设计、场景串联与可视化渲染，形成完整空间叙事。视频链接：
                    <a href="https://www.bilibili.com/video/BV1GP4y1H7Wo/?spm_id_from=333.1387.homepage.video_card.click&vd_source=f525bea357b0c53ffb41aa7b0f9ecb37" target="_blank" rel="noopener noreferrer" className="text-signal underline hover:text-signal-hover">https://www.bilibili.com/video/BV1GP4y1H7Wo/</a>
                  </p>
                  <p>
                    3.使用Unreal Engine（UE4和UE5）搭建沉浸式漫游Demo，从用户体验角度对交互UE5漫游视频逻辑进行迭代优化，并解决穿模等体验问题，提升场景沉浸感与操作体验，重构电影空间的叙事张力与氛围。视频链接：
                    <a href="https://www.bilibili.com/video/BV1GP4y1H7Wo/?spm_id_from=333.1387.homepage.video_card.click&vd_source=f525bea357b0c53ffb41aa7b0f9ecb37" target="_blank" rel="noopener noreferrer" className="text-signal underline hover:text-signal-hover">https://www.bilibili.com/video/BV1GP4y1H7Wo/</a>
                  </p>
                </div>
              </div>
              <Link to="/games/shining-wandering" className="w-[45%] max-lg:w-full shrink-0 h-[300px] max-lg:h-48 rounded-lg overflow-hidden block">
                <LazyImage src={assetPath("/02游戏设计/shining/封面.png")} alt="闪灵场景还原" containerClassName="w-full h-full" className="object-cover hover:opacity-90 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          4. 专业技能 — Pixso 2:122: 1440×692, bg #F8F8F8
          Cards centered on page
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-canvas" style={{ padding: '80px 60px' }}>
        <span className="text-[10px] font-semibold text-ink-muted" style={{ letterSpacing: '2px' }}>
          04 — SKILLS
        </span>
        <h2 className="mt-2 text-[36px] font-bold text-ink text-center" style={{ letterSpacing: '-1px' }}>
          专业技能
        </h2>

        {/* 3×2 grid — centered, matching Pixso 2:125 */}
        <div className="mt-12 flex justify-center">
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-20 gap-y-[50px]">
            {SKILLS.map((skill) => (
              <div
                key={skill.category}
                className="border border-rule bg-canvas-white flex flex-col"
                style={{ width: '280px', padding: '24px', gap: '8px' }}
              >
                <span className="text-[10px] font-semibold text-signal" style={{ letterSpacing: '2px' }}>
                  {skill.category}
                </span>
                <span className="text-base font-bold text-ink" style={{ fontSize: '16px' }}>
                  {skill.tools}
                </span>
                <span className="text-[13px] text-ink-secondary leading-[1.5]">
                  {skill.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          5. 游戏经历 — Pixso 2:150: 1440×777, white bg
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-canvas-white" style={{ padding: '80px 60px' }}>
        <span className="text-[10px] font-semibold text-ink-muted" style={{ letterSpacing: '2px' }}>
          05 — GAMING
        </span>
        <h2 className="mt-2 text-[36px] font-bold text-ink" style={{ letterSpacing: '-1px' }}>
          游戏经历
        </h2>

        <div className="mt-12 text-base text-ink-secondary leading-[1.7] max-w-[1244px] space-y-1" style={{ fontSize: '16px' }}>
          <p><strong className="text-ink font-semibold">1.开放世界：</strong>原神（2022.7-今，60级，氪金1000+，成就数960，角色数66，主线已完成）、无限暖暖（游戏时长1-2个月）</p>
          <p><strong className="text-ink font-semibold">2.卡牌RPG：</strong>崩坏：星穹铁道（开服玩家，70级，成就数798，角色数57，小月卡玩家，主线已完成）、明日方舟（2025.5-今，75级，主线至11-14，干员数144，蚀刻章91）</p>
          <p><strong className="text-ink font-semibold">3.MOBA：</strong>王者荣耀（1000H+，氪金100+，最高段位星耀Ⅱ）</p>
          <p><strong className="text-ink font-semibold">4.竞技类：</strong>蛋仔派队（2023.1-2025.3，微氪）、第五人格（2024.12-2025.9）、和平精英、CSGO、QQ飞车（PC端＋手游端，游戏时长1000H+，最高段位星耀Ⅳ）</p>
          <p><strong className="text-ink font-semibold">5.休闲益智类：</strong>乐克乐克LocoRoco、神庙逃亡、滑雪大冒险、小黄人快跑、开心消消乐</p>
          <p><strong className="text-ink font-semibold">6.女性向：</strong>奇迹暖暖、恋与制作人</p>
          <p><strong className="text-ink font-semibold">7.模拟经营类与解谜类：</strong>江南百景图、可口的披萨，美味的披萨（3个月）、锈湖Cube Escape、纸嫁衣系列（1-4）</p>
          <p><strong className="text-ink font-semibold">8.音乐节奏类：</strong>节奏大师（5年+）、跳舞的线、phigros</p>
          <p><strong className="text-ink font-semibold">9.Steam端：</strong>恐鬼症、人类一败涂地、猛兽派对、超级鸡马、picopark、胡闹厨房（全通关）、雀魂、大富翁、糖豆人、双人成行</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          6. Contact CTA — Pixso About page: "期待与您的沟通" + contact info
          ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="scroll-mt-header flex flex-col items-center justify-center" style={{ padding: '80px 60px', backgroundColor: '#111111' }}>
        {/* "CONTACT" label — 10px Semi Bold, #999, letter-spacing 2px */}
        <span className="text-[10px] font-semibold uppercase" style={{ color: '#999999', letterSpacing: '2px' }}>
          CONTACT
        </span>

        {/* Title — 48px Bold, white, letter-spacing -1.5px */}
        <h2 className="mt-4 text-[48px] font-bold text-ink-inverse leading-[1.1] text-center" style={{ letterSpacing: '-1.5px' }}>
          期待与您的沟通
        </h2>

        {/* Subtitle — 16px Regular, #999 */}
        <p className="mt-4 text-base text-center" style={{ color: '#999999', fontSize: '16px' }}>
          无论是建筑、游戏、AI还是视觉艺术项目，我都将保持持续探索、深入学习的态度
        </p>

        {/* 3 contact buttons — 200px × 52px, horizontal, gap 16px */}
        <div className="mt-8 flex justify-center gap-4 max-md:flex-col max-md:items-center">
          <div className="h-[52px] flex items-center justify-center gap-2" style={{ width: '200px', border: '1px solid #555555', backgroundColor: 'transparent' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="font-semibold text-ink-inverse" style={{ fontSize: '14px', letterSpacing: '0.5px' }}>13050970961</span>
          </div>
          <div className="h-[52px] flex items-center justify-center gap-2" style={{ width: '200px', border: 'none', backgroundColor: '#CC6600' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13L2 4" />
            </svg>
            <span className="font-semibold text-ink-inverse" style={{ fontSize: '14px', letterSpacing: '0.5px' }}>yhhan_1107@163.com</span>
          </div>
          <div className="h-[52px] flex items-center justify-center gap-2" style={{ width: '200px', border: '1px solid #555555', backgroundColor: 'transparent' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.952-7.062-6.122zm-2.18 2.769c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
            </svg>
            <span className="font-semibold text-ink-inverse" style={{ fontSize: '14px', letterSpacing: '0.5px' }}>WeChat：yhhh0846</span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Skills data — matching Pixso 2:125 grid ── */
const SKILLS = [
  { category: '三维建模', tools: 'Rhino / SU / 3ds Max', desc: '参数化建模、曲面设计、空间形态生成' },
  { category: '模型渲染', tools: 'Vray / D5 / Twinmotion', desc: '效果图渲染调校、空间氛围营造' },
  { category: 'AI辅助', tools: 'Stable Diffusion / Claude Code', desc: 'AI图像生成、AI网页搭建、风格控制' },
  { category: '游戏设计', tools: 'UE4 / UE5', desc: '关卡设计、脚本编写、游戏场景构建' },
  { category: '视觉艺术', tools: 'Adobe Suite', desc: 'PS / AI / PR / Pt / ID 视觉设计与后期处理' },
  { category: '交互设计', tools: 'Figma / UI设计', desc: '界面原型设计、组件体系、用户体验规划' },
];
