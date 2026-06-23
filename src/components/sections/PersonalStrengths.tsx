const STRENGTHS = [
  {
    title: '跨界融合',
    desc: '建筑、游戏、AI 与艺术的交叉视角，带来独特的问题解决方式与创意表达。',
  },
  {
    title: '技术驱动',
    desc: '熟练运用 UE5、AI 工具链与现代前端技术，用技术赋能创意落地。',
  },
  {
    title: '审美素养',
    desc: '深厚的美学功底与设计素养，从宋代美学到现代极简，融会贯通。',
  },
  {
    title: '持续探索',
    desc: '始终保持对新技术、新媒介的好奇心，不断拓展创意表达的边界。',
  },
];

export function PersonalStrengths() {
  return (
    <section className="scroll-mt-header bg-canvas-white border-y border-rule" style={{ padding: '80px 0' }}>
      <div className="container-page">
        <div className="mb-12">
          <span className="text-[10px] font-semibold text-ink-muted uppercase" style={{ letterSpacing: '2px' }}>
            STRENGTHS
          </span>
          <h2 className="mt-2 text-[36px] font-bold text-ink" style={{ letterSpacing: '-1px' }}>
            个人优势
          </h2>
          <p className="mt-2 text-[15px] text-ink-secondary">
            多元背景塑造独特的竞争力
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STRENGTHS.map((item, i) => (
            <div key={item.title} className="p-6 rounded border border-rule bg-canvas-white hover:shadow-card-hover transition-all duration-300">
              <span className="text-[11px] font-medium text-ink-muted font-mono">
                {(i + 1).toString().padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-[13px] text-ink-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
